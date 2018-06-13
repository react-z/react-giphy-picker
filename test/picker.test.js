import React from 'react'
import { mount } from 'enzyme'
import Picker from '../src/Picker'

describe('Giphy Picker component', () => {

	it('should render GIF picker with onSelected prop', function (t) {
		const log = (gif) => {
			console.log(gif)
		}

		const wrapper = mount(<Picker onSelected={log} />)
		expect(wrapper.props().onSelected).toEqual(log)
		t()
	})

	it('should render GIF picker with custom api key', function (t) {
		const log = (gif) => {
			console.log(gif)
		}
		const apiKey = 'testing'

		const wrapper = mount(<Picker onSelected={log} apiKey={apiKey} />)
		expect(wrapper.props().apiKey).toEqual(apiKey)
		expect(wrapper.state().giphySearchUrl).toEqual(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`)
		expect(wrapper.state().giphyTrendingUrl).toEqual(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
		t()
	})

})
