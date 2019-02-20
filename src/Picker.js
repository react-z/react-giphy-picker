import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'whatwg-fetch'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gifs: [],
      searchValue: '',
      giphySearchUrl: 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC',
      giphyTrendingUrl: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC'
    }

    this.loadTrendingGifs()
  }

  static get propTypes () {
    return {
      onSelected: PropTypes.func.isRequired,
      visible: PropTypes.bool,
      modal: PropTypes.bool
    }
  }

  static get defaultProps () {
    return {
      visible: true,
      modal: false
    }
  }

  loadTrendingGifs () {
    const {giphyTrendingUrl} = this.state
    fetch(giphyTrendingUrl, {
      method: 'get'
    }).then((response) => {
      return response.json()
    }).then((response) => {
      let gifs = response.data.map((g, i) => {return g.images})
      this.setState({gifs})
    })
  }

  searchGifs () {
    const {giphySearchUrl, searchValue} = this.state
    if (searchValue.length < 1) { return }
    let url = giphySearchUrl + '&q=' + searchValue.replace(' ', '+')
    this.setState({gifs: []})
    fetch(url, {
      method: 'get'
    }).then((response) => {
      return response.json()
    }).then((response) => {
      let gifs = response.data.map((g, i) => {return g.images})
      this.setState({gifs})
    })
  }

  onGiphySelect (gif) {
    this.props.onSelected(gif)
  }

  onSearchChange (event) {
    event.stopPropagation()
    this.setState({searchValue: event.target.value}, () => this.searchGifs())
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

  render() {
    const {gifs} = this.state
    const {visible, modal} = this.props
    return (
      <Wrapper>
        <GiphyPickerWrapper visible={visible} modal={modal}>
          <Input
            name='giphy-search'
            type="text"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            onChange={this.onSearchChange.bind(this)}
            value={this.state.searchValue}
            onKeyDown={this.onKeyDown.bind(this)}
            placeholder='Search for gifs' />
          <GiphyWrapper>
            {
              gifs.map((g, i) => {
                let gifUrl = g.fixed_width.url
                return (
                  <Giphy
                    className='giphy-gif'
                    key={i}
                    src={gifUrl}
                    onClick={() => {this.onGiphySelect(g)}} />
                )
              })
            }
          </GiphyWrapper>
        </GiphyPickerWrapper>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
`

const GiphyPickerWrapper = styled.div`
  position: ${props => props.modal ? 'absolute' : 'static'};
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 300ms linear;
  margin-top: 1rem;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  background: white;
  box-shadow: 3px 3px 5px #BFBDBD;
  width: 232px;
  height: 400px;
  overflow-y: scroll;
  z-index: 100;
  padding-top: 1rem;
`

const GiphyPicker = styled.div`
  cursor: pointer;
  border: 1px solid #eee;
  padding: 0.4rem 0.8rem;
  margin: 0;
  border-radius: 2px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const GiphyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  padding-right: 0;
  border-radius: 2px;
  align-items: baseline;
`

const Giphy = styled.img`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 0.21rem;
`

const Input = styled.input`
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 2px;
  color: inherit;
  font-size: 15px;
  height: auto;
  line-height: 1.2;
  margin: 0;
  padding: 16px;
  width: 90%;
  margin: 0 auto;
  display: block;
  &:focus {
    outline: none;
  }
`
