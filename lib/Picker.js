'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  position: relative;\n'], ['\n  position: relative;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: ', ';\n  opacity: ', ';\n  transition: opacity 200ms linear;\n  margin-top: 1rem;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n  width: 232px;\n  height: 400px;\n  z-index: 100;\n  padding-top: 0.5rem;\n'], ['\n  position: ', ';\n  opacity: ', ';\n  transition: opacity 200ms linear;\n  margin-top: 1rem;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n  width: 232px;\n  height: 400px;\n  z-index: 100;\n  padding-top: 0.5rem;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  padding-right: 0;\n  border-radius: 2px;\n  overflow-y: scroll;\n  height: 362px;\n  margin-top: 0.2rem;\n'], ['\n  padding-right: 0;\n  border-radius: 2px;\n  overflow-y: scroll;\n  height: 362px;\n  margin-top: 0.2rem;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  cursor: pointer;\n  margin: 0 auto;\n  display: block;\n  margin-top: 5px;\n  border-radius: 3px;\n'], ['\n  cursor: pointer;\n  margin: 0 auto;\n  display: block;\n  margin-top: 5px;\n  border-radius: 3px;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  background-color: transparent;\n  border: 1px solid #ddd;\n  border-radius: 2px;\n  color: inherit;\n  font-size: 14px;\n  height: auto;\n  line-height: 1;\n  margin: 0;\n  padding: 7px 10px;\n  width: 94%;\n  margin: 0 auto;\n  display: block;\n  &:focus {\n    outline: none;\n  }\n'], ['\n  background-color: transparent;\n  border: 1px solid #ddd;\n  border-radius: 2px;\n  color: inherit;\n  font-size: 14px;\n  height: auto;\n  line-height: 1;\n  margin: 0;\n  padding: 7px 10px;\n  width: 94%;\n  margin: 0 auto;\n  display: block;\n  &:focus {\n    outline: none;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

require('whatwg-fetch');

var _reactInfiniteScroller = require('react-infinite-scroller');

var _reactInfiniteScroller2 = _interopRequireDefault(_reactInfiniteScroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function debounce(fn, delay) {
	var timer = null;
	return function () {
		var context = this,
		    args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}

var _class = function (_Component) {
	_inherits(_class, _Component);

	function _class(props) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		_this.loadMore = function () {
			var _this$state = _this.state,
			    loading = _this$state.loading,
			    searchValue = _this$state.searchValue,
			    page = _this$state.page;

			var nextPage = page + 1;
			console.log("loadmore", nextPage);
			if (loading) {
				return;
			}
			if (searchValue) {
				_this.searchGifs(Number(nextPage) * 20);
			} else {
				_this.loadTrendingGifs(Number(nextPage) * 20);
			}
		};

		_this.state = {
			gifs: [],
			searchValue: '',
			loading: true,
			giphySearchUrl: 'https://api.giphy.com/v1/gifs/search?api_key=' + _this.props.apiKey,
			giphyTrendingUrl: 'https://api.giphy.com/v1/gifs/trending?api_key=' + _this.props.apiKey,
			page: 0
		};

		_this.searchGifs = debounce(_this.searchGifs, 500);
		_this.loadTrendingGifs();
		return _this;
	}

	_createClass(_class, [{
		key: 'loadTrendingGifs',
		value: function loadTrendingGifs(offset) {
			var _this2 = this;

			var _state = this.state,
			    giphyTrendingUrl = _state.giphyTrendingUrl,
			    page = _state.page;


			var url = giphyTrendingUrl;
			if (offset) {
				url += '&offset=' + offset;
			}

			fetch(url, {
				method: 'get'
			}).then(function (response) {
				return response.json();
			}).then(function (response) {
				var gifs = response.data.map(function (g, i) {
					return g.images;
				});
				_this2.setState({
					gifs: _this2.state.gifs.concat(gifs),
					page: page + 1,
					loading: false
				});
			});
		}
	}, {
		key: 'searchGifs',
		value: function searchGifs(offset) {
			var _this3 = this;

			var _state2 = this.state,
			    giphySearchUrl = _state2.giphySearchUrl,
			    searchValue = _state2.searchValue,
			    page = _state2.page;

			if (searchValue.length < 1) {
				return;
			}

			var url = giphySearchUrl + '&q=' + searchValue.replace(' ', '+');
			if (offset) {
				url += '&offset=' + offset;
			}

			this.setState({
				loading: true
			});
			fetch(url, {
				method: 'get'
			}).then(function (response) {
				return response.json();
			}).then(function (response) {
				var gifs = response.data.map(function (g, i) {
					return g.images;
				});
				_this3.setState({
					gifs: _this3.state.gifs.concat(gifs),
					page: page + 1,
					loading: false
				});
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
			this.setState({
				searchValue: event.target.value,
				page: -1,
				gifs: []
			}, function () {
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

			var _state3 = this.state,
			    gifs = _state3.gifs,
			    loading = _state3.loading;
			var _props = this.props,
			    visible = _props.visible,
			    modal = _props.modal;

			return _react2.default.createElement(
				Wrapper,
				{ className: this.props.className },
				_react2.default.createElement(
					GiphyPickerWrapper,
					{ visible: visible, modal: modal },
					_react2.default.createElement(Input, {
						name: 'giphy-search',
						type: 'text',
						className: this.props.inputClassName,
						autoCapitalize: 'none',
						autoComplete: 'off',
						autoCorrect: 'off',
						onChange: this.onSearchChange.bind(this),
						value: this.state.searchValue,
						onKeyDown: this.onKeyDown.bind(this),
						placeholder: this.props.placeholder }),
					_react2.default.createElement(
						GiphyWrapper,
						null,
						_react2.default.createElement(
							_reactInfiniteScroller2.default,
							{
								loadMore: this.loadMore,
								hasMore: !loading
								// loader={this.props.loader}
								, initialLoad: false,
								useWindow: false
							},
							gifs.map(function (g, i) {
								var gifUrl = g.fixed_width.url;
								return _react2.default.createElement(Giphy, {
									key: i,
									className: _this5.props.gifClassName,
									src: gifUrl,
									onClick: function onClick() {
										_this5.onGiphySelect(g);
									} });
							})
						)
					)
				),
				this.props.children
			);
		}
	}], [{
		key: 'propTypes',
		get: function get() {
			return {
				onSelected: _propTypes2.default.func.isRequired,
				visible: _propTypes2.default.bool,
				modal: _propTypes2.default.bool,
				apiKey: _propTypes2.default.string,
				loader: _propTypes2.default.element,
				placeholder: _propTypes2.default.string,
				className: _propTypes2.default.string,
				inputClassName: _propTypes2.default.string,
				gifClassName: _propTypes2.default.string,
				children: _propTypes2.default.element
			};
		}
	}, {
		key: 'defaultProps',
		get: function get() {
			return {
				visible: true,
				modal: false,
				apiKey: "dc6zaTOxFJmzC",
				placeholder: "Search for GIFs",
				loader: _react2.default.createElement(
					'p',
					null,
					'Loading...'
				)
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

var GiphyWrapper = _styledComponents2.default.div(_templateObject3);

var Giphy = _styledComponents2.default.img(_templateObject4);

var Input = _styledComponents2.default.input(_templateObject5);