import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'whatwg-fetch'
import InfiniteScroll from 'react-infinite-scroller'

function debounce(fn, delay) {
	var timer = null;
	return function () {
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}

export default class extends Component {

	constructor (props) {
		super(props)
		this.state = {
			gifs: [],
			searchValue: '',
			loading: true,
			hasMore: true,
			giphySearchUrl: `https://api.giphy.com/v1/gifs/search?api_key=${this.props.apiKey}`,
			giphyTrendingUrl: `https://api.giphy.com/v1/gifs/trending?api_key=${this.props.apiKey}`,
			page: 0
		}

		this.searchGifs = debounce(this.searchGifs, 500)
		this.loadTrendingGifs()
	}

	static get propTypes () {
		return {
			onSelected: PropTypes.func.isRequired,
			apiKey: PropTypes.string,
			loader: PropTypes.element,
			placeholder: PropTypes.string,
			imagePlaceholderColor: PropTypes.string,
			inputClassName: PropTypes.string,
			children: PropTypes.element
		}
	}

	static get defaultProps () {
		return {
			apiKey: "dc6zaTOxFJmzC",
			placeholder: "Search for GIFs",
			imagePlaceholderColor: '#E3E3E3',
			loader: (<p>Loading...</p>)
		}
	}

	loadTrendingGifs (offset) {
		const {giphyTrendingUrl, page} = this.state

		let url = giphyTrendingUrl
		if (offset) {
			url += '&offset=' + offset
		}

		fetch(url, {
			method: 'get'
		}).then(res => res.json()).then((response) => {
			let gifs = response.data.map(g => g.images)
			let hasMore = true
			const {total_count, count, offset} = response.pagination
			if (total_count <= (count + offset)) {
				hasMore = false
			}

			this.setState({
				gifs: this.state.gifs.concat(gifs),
				page: page + 1,
				loading: false,
				hasMore: hasMore
			})
		})
	}

	searchGifs (offset) {
		const {giphySearchUrl, searchValue, page} = this.state
		if (searchValue.length < 1) { return }

		let url = giphySearchUrl + '&q=' + searchValue.replace(' ', '+')
		if (offset) {
			url += '&offset=' + offset
		}

		this.setState({
			loading: true
		})
		fetch(url, {
			method: 'get'
		}).then(res => res.json()).then((response) => {
			let gifs = response.data.map(g => g.images)
			let hasMore = true
			const {total_count, count, offset} = response.pagination
			if (total_count <= (count + offset)) {
				hasMore = false
			}

			this.setState({
				gifs: this.state.gifs.concat(gifs),
				page: page + 1,
				loading: false,
				hasMore: hasMore
			})
		})
	}

	onGiphySelect (gif) {
		this.props.onSelected(gif)
	}

	onSearchChange (event) {
		let value = event.target.value
		event.stopPropagation()
		this.setState({
			searchValue: event.target.value,
			page: -1,
			gifs: []
		}, () => {
			if (value) {
				this.searchGifs()
			} else {
				this.loadTrendingGifs()
			}
		})
	}

	onKeyDown (event) {
		if (event.key === 'Escape') {
			event.preventDefault()
			this.reset()
		}
	}

	reset () {
		this.setState({searchValue: ''})
	}

	loadMore = () => {
		const {searchValue, page} = this.state
		let nextPage = page + 1
		let offset = (Number(nextPage) - 1) * 25;
		if (searchValue) {
			this.searchGifs(offset)
		} else {
			this.loadTrendingGifs(offset)
		}
	}

	render() {
		const {gifs, loading, hasMore} = this.state
		return (
			<Wrapper>
				<GiphyPickerWrapper className={"giphy-picker"}>
					<Input
						name='giphy-search'
						type="text"
						className={this.props.inputClassName}
						autoCapitalize="none"
						autoComplete="off"
						autoCorrect="off"
						onChange={::this.onSearchChange}
						value={this.state.searchValue}
						onKeyDown={::this.onKeyDown}
						placeholder={this.props.placeholder} />
					<GiphyWrapper>
						<InfiniteScroll
							loadMore={this.loadMore}
							hasMore={hasMore || (!loading)}
							initialLoad={false}
							useWindow={false}
						>
							{!gifs.length && loading && this.props.loader}
							{
								gifs.map((g, i) => {
									let gifUrl = g.fixed_width.url
									return (
										<Giphy
											style={{
												width: Number(g.fixed_width.width),
												height: Number(g.fixed_width.height),
												backgroundColor: this.props.imagePlaceholderColor
											}}
											key={i}
											src={gifUrl}
											onClick={() => {this.onGiphySelect(g)}} />
									)
								})
							}
						</InfiniteScroll>
					</GiphyWrapper>
				</GiphyPickerWrapper>
				{this.props.children}
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
  position: relative;
`

const GiphyPickerWrapper = styled.div`
  position: relative;
  padding: 10px;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
  background: white;
  width: 230px;
  height: 400px;
  z-index: 100;
`

const GiphyWrapper = styled.div`
  overflow-y: scroll;
  height: calc(100% - 45px);
  margin-top: 10px;
`

const Giphy = styled.img`
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-bottom: 5px;
  border-radius: 3px;
`

const Input = styled.input`
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 2px;
  color: inherit;
  font-size: 14px;
  height: auto;
  line-height: 1;
  margin: 0;
  padding: 7px 10px;
  width: 100%;
  display: block;
  &:focus {
    outline: none;
  }
`
