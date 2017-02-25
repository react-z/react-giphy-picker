'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  position: relative;\n'], ['\n  position: relative;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: ', ';\n  opacity: ', ';\n  transition: opacity 300ms linear;\n  margin-top: 1rem;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n  width: 232px;\n  height: 400px;\n  overflow-y: scroll;\n  z-index: 100;\n  padding-top: 1rem;\n'], ['\n  position: ', ';\n  opacity: ', ';\n  transition: opacity 300ms linear;\n  margin-top: 1rem;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n  width: 232px;\n  height: 400px;\n  overflow-y: scroll;\n  z-index: 100;\n  padding-top: 1rem;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  cursor: pointer;\n  border: 1px solid #eee;\n  padding: 0.4rem 0.8rem;\n  margin: 0;\n  border-radius: 2px;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n'], ['\n  cursor: pointer;\n  border: 1px solid #eee;\n  padding: 0.4rem 0.8rem;\n  margin: 0;\n  border-radius: 2px;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n  padding: 0.8rem;\n  padding-right: 0;\n  border-radius: 2px;\n  align-items: baseline;\n'], ['\n  display: flex;\n  flex-direction: column;\n  padding: 0.8rem;\n  padding-right: 0;\n  border-radius: 2px;\n  align-items: baseline;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  cursor: pointer;\n  justify-content: center;\n  align-items: center;\n  padding: 0.21rem;\n'], ['\n  cursor: pointer;\n  justify-content: center;\n  align-items: center;\n  padding: 0.21rem;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  background-color: transparent;\n  border: 1px solid #ddd;\n  border-radius: 2px;\n  color: inherit;\n  font-size: 15px;\n  height: auto;\n  line-height: 1.2;\n  margin: 0;\n  padding: 16px;\n  width: 90%;\n  margin: 0 auto;\n  display: block;\n  &:focus {\n    outline: none;\n  }\n'], ['\n  background-color: transparent;\n  border: 1px solid #ddd;\n  border-radius: 2px;\n  color: inherit;\n  font-size: 15px;\n  height: auto;\n  line-height: 1.2;\n  margin: 0;\n  padding: 16px;\n  width: 90%;\n  margin: 0 auto;\n  display: block;\n  &:focus {\n    outline: none;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

require('whatwg-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

    _this.state = {
      gifs: [],
      searchValue: '',
      giphySearchUrl: 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC',
      giphyTrendingUrl: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC'
    };

    _this.loadTrendingGifs();
    return _this;
  }

  _createClass(_class, [{
    key: 'loadTrendingGifs',
    value: function loadTrendingGifs() {
      var _this2 = this;

      var giphyTrendingUrl = this.state.giphyTrendingUrl;

      fetch(giphyTrendingUrl, {
        method: 'get'
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        var gifs = response.data.map(function (g, i) {
          return g.images;
        });
        _this2.setState({ gifs: gifs });
      });
    }
  }, {
    key: 'searchGifs',
    value: function searchGifs() {
      var _this3 = this;

      var _state = this.state,
          giphySearchUrl = _state.giphySearchUrl,
          searchValue = _state.searchValue;

      if (searchValue.length < 1) {
        return;
      }
      var url = giphySearchUrl + '&q=' + searchValue.replace(' ', '+');
      this.setState({ gifs: [] });
      fetch(url, {
        method: 'get'
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        var gifs = response.data.map(function (g, i) {
          return g.images;
        });
        _this3.setState({ gifs: gifs });
      });
    }
  }, {
    key: 'onGiphySelect',
    value: function onGiphySelect(gif) {
      this.props.onSelected(gif);
    }
  }, {
    key: 'onSearchChange',
    value: function onSearchChange(event) {
      var _this4 = this;

      event.stopPropagation();
      this.setState({ searchValue: event.target.value }, function () {
        return _this4.searchGifs();
      });
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.reset();
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.setState({ searchValue: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var gifs = this.state.gifs;
      var _props = this.props,
          visible = _props.visible,
          modal = _props.modal;

      return _react2.default.createElement(
        Wrapper,
        null,
        _react2.default.createElement(
          GiphyPickerWrapper,
          { visible: visible, modal: modal },
          _react2.default.createElement(Input, {
            name: 'giphy-search',
            type: 'text',
            autoCapitalize: 'none',
            autoComplete: 'off',
            autoCorrect: 'off',
            onChange: this.onSearchChange.bind(this),
            value: this.state.searchValue,
            onKeyDown: this.onKeyDown.bind(this),
            placeholder: 'Search for gifs' }),
          _react2.default.createElement(
            GiphyWrapper,
            null,
            gifs.map(function (g, i) {
              var gifUrl = g.fixed_width.url;
              return _react2.default.createElement(Giphy, {
                className: 'giphy-gif',
                key: i,
                src: gifUrl,
                onClick: function onClick() {
                  _this5.onGiphySelect(g);
                } });
            })
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        onSelected: _react2.default.PropTypes.func.isRequired,
        visible: _react2.default.PropTypes.bool,
        modal: _react2.default.PropTypes.bool
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        visible: true,
        modal: false
      };
    }
  }]);

  return _class;
}(_react.Component);

exports.default = _class;


var Wrapper = _styledComponents2.default.div(_templateObject);

var GiphyPickerWrapper = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.modal ? 'absolute' : 'static';
}, function (props) {
  return props.visible ? 1 : 0;
});

var GiphyPicker = _styledComponents2.default.div(_templateObject3);

var GiphyWrapper = _styledComponents2.default.div(_templateObject4);

var Giphy = _styledComponents2.default.img(_templateObject5);

var Input = _styledComponents2.default.input(_templateObject6);