/* setup enzyme */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

/* setup jsdom */
var jsdom = require('jsdom')
const { JSDOM } = jsdom
const window = new JSDOM('').window
global.window = window
global.document = window.document

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Picker from '../Picker'

test('Picker renders correctly and matches snapshot', () => {
  const handleSelected = jest.fn()
  const component = renderer.create(
    <Picker onSelected={handleSelected} />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Picker renders the correct elements and props', () => {
  const handleSelected = jest.fn()

  const wrapper = shallow(
    <Picker onSelected={handleSelected} />
  )

  /* mock and return gifs */

  wrapper
    .find(`[name="giphy-search"]`)
    .simulate('keydown', { which: 'a' })

  // expect(handleSelected).toBeCalled();

  expect(wrapper.find(`[name="giphy-search"]`).length).toEqual(1)
  expect(wrapper.find(`[placeholder="Search for gifs"]`).length).toEqual(1)

  // console.log(wrapper.debug())
})
