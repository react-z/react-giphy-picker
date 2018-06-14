import Picker from '../lib/Picker'
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

class TestComponent extends Component {
	constructor (props) {
		super(props)
		this.state = {
			enteredGif: ''
		}
	}

	log (gif) {
		console.log(gif)
		this.setState({enteredGif: gif})
	}

	renderLoader() {
		return (<p style={{textAlign: 'center'}}>Loading...</p>)
	}

	render () {
		const {enteredGif} = this.state
		let url = ''
		if (enteredGif.fixed_width !== undefined) {
			url = enteredGif.fixed_width.url
		}
		return (
			<div>
				<Picker
					onSelected={::this.log}
					modal={false}
					loader={this.renderLoader()}
				/>
				<img src={url} />
			</div>
		)
	}
}

ReactDOM.render(
	<TestComponent />,
	document.getElementById('root')
)
