# React GIPHY Component
A simple gif picker component for React using GIPHY API

[![npm version](https://badge.fury.io/js/react-giphy-component.svg)](https://badge.fury.io/js/react-giphy-component)

![](https://github.com/arjunkomath/react-giphy-picker/blob/master/example/screenshot.gif?raw=true)

## Install

NPM -
`npm i react-giphy-component --save`

Yarn -
`yarn add react-giphy-component`

## Usage basic

```jsx
import Picker from 'react-giphy-component'
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
Handler returns the GIF selected from the picker. On select it returns a Gif object in the format specified for an image from Giphy's search API [giphy sample-response-search](https://github.com/Giphy/GiphyAPI#sample-response-search)

#### `visible`
Opacity to show or hide the picker. Defaults to `true`.

#### `modal`
If you want the emoji picker to be a modal.
`true` will set the wrapper as `position: absolute`.
Or `false`, which is the default will be `position: static`.

#### `apiKey`
GIPHY API key, you can get one from https://developers.giphy.com/

#### `loader`
A custom loader react component that will be showing while performing API calls

#### `placeholder`
Input plave holder text

#### `imagePlaceholderColor`
Placeholder background color while rendering GIF images

#### `className`
CSS class name for GIPHY wrapper

#### `inputClassName`
CSS class name for seach keyword input

#### `gifClassName`
CSS class name for GIF image

#### `children`
Child react components

## Styles
Uses styled-components 💅 for the base styling.

## Development

```sh
npm install
npm run build
npm test
npm start
```