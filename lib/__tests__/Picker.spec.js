"use strict";

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _Picker = _interopRequireDefault(require("../Picker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* setup enzyme */
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
/* setup jsdom */

var jsdom = require('jsdom');

var JSDOM = jsdom.JSDOM;
var window = new JSDOM('').window;
global.window = window;
global.document = window.document;
test('Picker renders correctly and matches snapshot', function () {
  var handleSelected = jest.fn();

  var component = _reactTestRenderer.default.create(_react.default.createElement(_Picker.default, {
    onSelected: handleSelected
  }));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Picker renders the correct elements and props', function () {
  var handleSelected = jest.fn();
  var wrapper = (0, _enzyme.shallow)(_react.default.createElement(_Picker.default, {
    onSelected: handleSelected
  }));
  /* mock and return gifs */

  wrapper.find("[name=\"giphy-search\"]").simulate('keydown', {
    which: 'a'
  }); // expect(handleSelected).toBeCalled();

  expect(wrapper.find("[name=\"giphy-search\"]").length).toEqual(1);
  expect(wrapper.find("[placeholder=\"Search for gifs\"]").length).toEqual(1); // console.log(wrapper.debug())
});