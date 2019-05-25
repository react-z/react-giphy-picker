# react-giphy-picker

[![npm version](https://badge.fury.io/js/react-giphy-picker.svg)](https://badge.fury.io/js/react-giphy-picker)

![](https://raw.githubusercontent.com/StevenIseki/react-giphy-picker/master/example/screenshot.gif)

react-giphy-picker is a simple gif picker component using giphy API

On select it returns a Gif object in the format specified for an image from Giphy's search API [giphy sample-response-search](https://github.com/Giphy/GiphyAPI#sample-response-search)

## Install

`npm install react-giphy-picker --save`

## Usage basic

```jsx
import Picker from 'react-giphy-picker'
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

class TestComponent extends Component {
  log (gif) {
    console.log(gif)
  }

  render () {
    return (
      <div>
        <Picker onSelected={this.log.bind(this)} />
      </div>
    )
  }
}

ReactDOM.render(
  <TestComponent />,
  document.getElementById('root')
)
```

## Props

#### `onSelected` (required)
Handler returns the emoji character selected from the emoji picker.

#### `visible`
Opacity to show or hide the picker. Defaults to `true`.

#### `modal`
If you want the emoji picker to be a modal.
`true` will set the wrapper as `position: absolute`.
Or `false`, which is the default will be `position: static`.

## Styles
Uses styled-components 💅 for the base styling.

## Development
    yarn
    yarn dev

## Test
    yarn test

## Build
    yarn
    yarn build

## Publish
    npm login
    npm version patch
    git add -A
    git push origin master
    npm publish

## License

[MIT](http://isekivacenz.mit-license.org/)
