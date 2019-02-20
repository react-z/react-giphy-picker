import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import Picker from '../src/Picker'

test('Giphy Picker component', (t) => {
  const log = (gif) => {
    console.log(gif)
  }

  const wrapper = mount(<Picker onSelected={log} />)

  t.pass(
    expect(wrapper.props().onSelected).toEqual(log)
  )

  t.end()
});
