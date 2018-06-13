import React from 'react'
import { mount } from 'enzyme'
import Picker from '../src/Picker'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Giphy Picker component', () => {

	it('should render GIF picker with onSelected prop', async () => {
		const log = (gif) => {
			console.log(gif)
		}

		const wrapper = mount(<Picker onSelected={log} />)
		await expect(wrapper.props().onSelected).toEqual(log)
	})

	it('should render GIF picker with custom api key', async () => {
		const log = (gif) => {
			console.log(gif)
		}
		const apiKey = 'testing'

		const wrapper = mount(<Picker onSelected={log} apiKey={apiKey} />)
		await expect(wrapper.props().apiKey).toEqual(apiKey)
		await expect(wrapper.state().giphySearchUrl).toEqual(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`)
		await expect(wrapper.state().giphyTrendingUrl).toEqual(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
	})

})
