import Picker from '../lib/Picker'
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

class TestComponent extends Component {
	constructor (props) {
		super(props)
		this.state = {
			enteredGif: '',
			visible: true
		}
	}

	log (gif) {
		console.log(gif)
		this.setState({enteredGif: gif})
	}

	toggleVisible () {
		this.setState({visible: !this.state.visible})
	}

	renderLoader() {
		return (<p style={{textAlign: 'center'}}>Loading...</p>)
	}
	render () {
		const {enteredGif, visible} = this.state
		let url = ''
		if (enteredGif.fixed_width !== undefined) {
			url = enteredGif.fixed_width.url
		}
		return (
			<div>
				<div style={{paddingBottom: '2rem'}}>
					<Picker
						onSelected={::this.log}
						visible={visible}
						modal={false}
						loader={this.renderLoader()}
					/>
				</div>
				<button onClick={::this.toggleVisible}>toggle giphy picker</button>
				<img src={url} />
			</div>
		)
	}
}

ReactDOM.render(
	<TestComponent />,
	document.getElementById('root')
)
