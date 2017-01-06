/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _fancytree = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A simple layer between the jQuery front-end and the JS tree library used.
	 *
	 * By default, it uses the FancytreeAdapter. You can pass other adapters by
	 * changing the `adapter` setting.
	 *
	 * @author Wouter J <wouter@wouterj.nl>
	 */
	/*
	 * This file is part of the Symfony CMF package.
	 *
	 * (c) 2011-2017 Symfony CMF
	 *
	 * For the full copyright and license information, please view the LICENSE
	 * file that was distributed with this source code.
	 */

	_jquery2.default.fn.cmfTree = function (options) {
	    options = _jquery2.default.extend({
	        adapter: null,
	        request: {
	            load: null
	        },
	        actions: {}
	    }, options);

	    // configure options
	    var $treeOutput = (0, _jquery2.default)(this);
	    var selectElement = function selectElement(selector) {
	        if ('string' == typeof selector) {
	            return (0, _jquery2.default)(selector);
	        } else if (selector instanceof _jquery2.default) {
	            return selector;
	        }

	        throw 'Cannot handle selector ' + selector + '. You may want to pass a jQuery object or a jQuery selector.';
	    };

	    if (!options.request.load) {
	        throw 'cmfTree needs an AJAX URL to lazy load the tree, pass it using the `request.load` option.';
	    }

	    if (!options.adapter) {
	        options.adapter = new _fancytree.FancytreeAdapter(options);
	    }
	    var adapter = options.adapter;

	    if (!adapter.bindToElement) {
	        throw 'cmfTree adapters must have a bindToElement() method to specify the output element of the tree.';
	    }

	    for (var actionName in options.actions) {
	        if (!options.actions.hasOwnProperty(actionName)) {
	            continue;
	        }

	        if (!adapter.addAction) {
	            throw 'The configured cmfTree adapter does not support actions, implement the addAction() method or use another adapter.';
	        }
	        var action = options.actions[actionName];

	        if (!action.url) {
	            throw 'actions should have a url defined, "' + actionName + '" does not.';
	        }

	        adapter.addAction(actionName, action.url, action.icon);
	    }

	    // render tree
	    adapter.bindToElement($treeOutput);

	    // optionally bind the tree to an input element
	    if (options.path_output) {
	        if (!adapter.bindToInput) {
	            throw 'The configured cmfTree adapter does not support binding to an input field, implement the bindToInput() method or use another adapter.';
	        }

	        adapter.bindToInput(selectElement(options.path_output));
	    }

	    return adapter;
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FancytreeAdapter = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of the Symfony CMF package.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * (c) 2011-2017 Symfony CMF
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * For the full copyright and license information, please view the LICENSE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * file that was distributed with this source code.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _map = __webpack_require__(3);

	var _map2 = _interopRequireDefault(_map);

	__webpack_require__(51);

	__webpack_require__(52);

	__webpack_require__(53);

	__webpack_require__(58);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var cache = new _map2.default();

	function getPropertyFromString(propertyPath, list) {
	    var isOptional = propertyPath.substr(0, 1) === '?';
	    var props = propertyPath.substr(1).split('.');
	    var currentNode = list;
	    for (var prop in props) {
	        currentNode = currentNode[props[prop]];

	        if (undefined === currentNode) {
	            if (isOptional) {
	                break;
	            }

	            throw 'Attribute "' + props[prop] + '" does not exists';
	        }
	    }

	    return currentNode;
	}

	/**
	 * A tree browser adapter for the Fancytree library.
	 *
	 * @author Wouter J <wouter@wouterj.nl>
	 * @see https://github.com/mar10/fancytree
	 */

	var FancytreeAdapter = exports.FancytreeAdapter = function () {
	    function FancytreeAdapter(options) {
	        _classCallCheck(this, FancytreeAdapter);

	        if (!window.jQuery || !jQuery.fn.fancytree) {
	            throw 'The FancytreeAdapter requires both jQuery and the FancyTree library.';
	        }

	        if (!options.request) {
	            throw 'The FancytreeAdapter requires a request option.';
	        }

	        this.requestData = options.request;
	        this.rootNode = options.root_node || '/';
	        this.useCache = undefined === options.use_cache ? true : options.use_cache;

	        // available actions (array)
	        this.actions = new Array();
	        // the Fancytree instance (FancytreeTree)
	        this.tree = null;
	        // the tree element (jQuery)
	        this.$tree = null;
	    }

	    _createClass(FancytreeAdapter, [{
	        key: 'bindToElement',
	        value: function bindToElement($elem) {
	            if (this.$tree) {
	                throw 'Cannot bind to multiple elements.';
	            }

	            if (!$elem instanceof jQuery) {
	                throw 'FancytreeAdapter can only be adapted to a jQuery object.';
	            }

	            this.$tree = $elem;
	            var actions = this.actions;
	            var requestNode = this.requestNode;
	            var requestNodeToFancytreeNode = function requestNodeToFancytreeNode(requestNode) {
	                if (requestNode.length === 0) {
	                    return;
	                }

	                var fancytreeNode = {
	                    title: false == requestNode.label ? '' : requestNode.label,
	                    key: false == requestNode.node_name ? '' : requestNode.node_name,
	                    children: [],
	                    actions: {}
	                };

	                for (var actionName in actions) {
	                    var action = actions[actionName];
	                    var url = action.url;
	                    if (_typeof(action.url) == 'object' && action.url.hasOwnProperty('data')) {
	                        url = getPropertyFromString(action.url.data, requestNode);
	                    }

	                    if (url === undefined) {
	                        continue;
	                    }
	                    fancytreeNode['actions'][actionName] = { label: actionName, iconClass: action.icon, url: url };
	                }

	                var childrenCount = 0;
	                for (name in requestNode.children) {
	                    if (!requestNode.children.hasOwnProperty(name)) {
	                        continue;
	                    }

	                    var child = requestNodeToFancytreeNode(requestNode.children[name]);
	                    if (child) {
	                        fancytreeNode.children.push(child);
	                    }
	                    childrenCount++;
	                }

	                if (childrenCount) {
	                    fancytreeNode.folder = true;
	                    fancytreeNode.lazy = true;
	                }

	                return fancytreeNode;
	            };

	            var requestData = this.requestData;
	            var useCache = this.useCache;
	            this.$tree.fancytree({
	                // the start data (root node + children)
	                source: useCache && cache.has(this.rootNode) ? cache.get(this.rootNode) : requestData.load(this.rootNode),

	                // lazy load the children when a node is collapsed
	                lazyLoad: function lazyLoad(event, data) {
	                    var path = data.node.getKeyPath();
	                    if (useCache && cache.has(path)) {
	                        data.result = cache.get(path);
	                    } else {
	                        var loadData = requestData.load(path);

	                        if (Array.isArray(loadData)) {
	                            data.result = loadData;
	                        } else {
	                            data.result = jQuery.extend({
	                                data: {}
	                            }, loadData);
	                        }
	                    }
	                },

	                // transform the JSON response into a data structure that's supported by FancyTree
	                postProcess: function postProcess(event, data) {
	                    if (null == data.error) {
	                        var result = requestNodeToFancytreeNode(data.response), currentNodeKey = data.node.key;
	                        if ("" === result.key || currentNodeKey == result.key) {
	                            result = result.children;
	                        } else {
	                            result = [result];
	                        }

	                        if (result.length == 1) {
	                            result[0].expanded = true;
	                        }

	                        data.result = result;
	                        if (useCache) {
	                            cache.set(data.node.getKeyPath(), result);
	                        }
	                    } else {
	                        data.result = {
	                            // todo: maybe use a more admin friendly error message in prod?
	                            error: 'An error occured while retrieving the nodes: ' + data.error
	                        };
	                    }
	                },

	                // always show the active node
	                activeVisible: true
	            });

	            if (this.actions) {
	                this.$tree.cmfContextMenu({
	                    delegate: 'span.fancytree-title',
	                    wrapperTemplate: '<ul class="dropdown-menu" style="display:block;"></ul>',
	                    actionTemplate: '<li role="presentation"><a role="menuitem" href="{{ url }}"><i class="{{ iconClass }}"></i> {{ label }}</li>',
	                    actions: function actions($node) {
	                        return jQuery.ui.fancytree.getNode($node).data.actions;
	                    }
	                });
	            }

	            this.tree = this.$tree.fancytree('getTree');
	        }
	    }, {
	        key: 'bindToInput',
	        value: function bindToInput($input) {
	            var _this = this;

	            var root = this.rootNode;
	            if (root.substr(-1) == '/') {
	                var root = this.rootNode.substr(0, -1);
	            }
	            var rootParent = root.substr(0, root.lastIndexOf('/'));

	            // output active node to input field
	            this.$tree.fancytree('option', 'activate', function (event, data) {
	                $input.val(rootParent + data.node.getKeyPath());
	            });

	            var showKey = function showKey(key) {
	                _this.tree.loadKeyPath(key, function (node, status) {
	                    if ('ok' == status) {
	                        node.setExpanded();
	                        node.setActive();
	                    }
	                });
	            };
	            var removeRoot = function removeRoot(path) {
	                if (0 === path.indexOf(rootParent + '/')) {
	                    return path.substr(rootParent.length + 1);
	                }

	                return path;
	            };

	            // use initial input value as active node
	            this.$tree.bind('fancytreeinit', function (event, data) {
	                showKey(removeRoot($input.val()));
	            });

	            // change active node when the value of the input field changed
	            $input.on('change', function (e) {
	                showKey(removeRoot($(this).val()));
	            });
	        }
	    }, {
	        key: 'addAction',
	        value: function addAction(name, url, icon) {
	            this.actions[name] = { url: url, icon: icon };
	        }
	    }], [{
	        key: '_resetCache',
	        value: function _resetCache() {
	            cache.clear();
	        }
	    }]);

	    return FancytreeAdapter;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(18);
	__webpack_require__(31);
	__webpack_require__(37);
	module.exports = __webpack_require__(17).Map;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(5)
	  , test    = {};
	test[__webpack_require__(7)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(11)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(6)
	  , TAG = __webpack_require__(7)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(8)('wks')
	  , uid    = __webpack_require__(10)
	  , Symbol = __webpack_require__(9).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// add fake Function#toString
	// for correct work wrapped methods / constructors with methods like LoDash isNative
	var global    = __webpack_require__(9)
	  , hide      = __webpack_require__(12)
	  , SRC       = __webpack_require__(10)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	__webpack_require__(17).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  if(typeof val == 'function'){
	    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    val.hasOwnProperty('name') || hide(val, 'name', key);
	  }
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    hide(O, key, val);
	  }
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(13)
	  , createDesc = __webpack_require__(14);
	module.exports = __webpack_require__(15) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(19)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(22)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(20)
	  , defined   = __webpack_require__(21);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(23)
	  , $export        = __webpack_require__(24)
	  , redefine       = __webpack_require__(11)
	  , hide           = __webpack_require__(12)
	  , has            = __webpack_require__(27)
	  , Iterators      = __webpack_require__(28)
	  , $iterCreate    = __webpack_require__(29)
	  , setToStringTag = __webpack_require__(30)
	  , getProto       = __webpack_require__(13).getProto
	  , ITERATOR       = __webpack_require__(7)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(17)
	  , hide      = __webpack_require__(12)
	  , redefine  = __webpack_require__(11)
	  , ctx       = __webpack_require__(25)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)redefine(target, key, out);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(26);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(13)
	  , descriptor     = __webpack_require__(14)
	  , setToStringTag = __webpack_require__(30)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(12)(IteratorPrototype, __webpack_require__(7)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(13).setDesc
	  , has = __webpack_require__(27)
	  , TAG = __webpack_require__(7)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	var global      = __webpack_require__(9)
	  , hide        = __webpack_require__(12)
	  , Iterators   = __webpack_require__(28)
	  , ITERATOR    = __webpack_require__(7)('iterator')
	  , NL          = global.NodeList
	  , HTC         = global.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype
	  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
	if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
	if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(33)
	  , step             = __webpack_require__(34)
	  , Iterators        = __webpack_require__(28)
	  , toIObject        = __webpack_require__(35);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(22)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(7)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(36)
	  , defined = __webpack_require__(21);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(6);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(38);

	// 23.1 Map Objects
	__webpack_require__(49)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(13)
	  , hide         = __webpack_require__(12)
	  , redefineAll  = __webpack_require__(39)
	  , ctx          = __webpack_require__(25)
	  , strictNew    = __webpack_require__(40)
	  , defined      = __webpack_require__(21)
	  , forOf        = __webpack_require__(41)
	  , $iterDefine  = __webpack_require__(22)
	  , step         = __webpack_require__(34)
	  , ID           = __webpack_require__(10)('id')
	  , $has         = __webpack_require__(27)
	  , isObject     = __webpack_require__(44)
	  , setSpecies   = __webpack_require__(48)
	  , DESCRIPTORS  = __webpack_require__(15)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;

	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(11);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(25)
	  , call        = __webpack_require__(42)
	  , isArrayIter = __webpack_require__(45)
	  , anObject    = __webpack_require__(43)
	  , toLength    = __webpack_require__(46)
	  , getIterFn   = __webpack_require__(47);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(43);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(44);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(28)
	  , ITERATOR   = __webpack_require__(7)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(20)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(5)
	  , ITERATOR  = __webpack_require__(7)('iterator')
	  , Iterators = __webpack_require__(28);
	module.exports = __webpack_require__(17).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(9)
	  , $           = __webpack_require__(13)
	  , DESCRIPTORS = __webpack_require__(15)
	  , SPECIES     = __webpack_require__(7)('species');

	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(9)
	  , $export        = __webpack_require__(24)
	  , redefine       = __webpack_require__(11)
	  , redefineAll    = __webpack_require__(39)
	  , forOf          = __webpack_require__(41)
	  , strictNew      = __webpack_require__(40)
	  , isObject       = __webpack_require__(44)
	  , fails          = __webpack_require__(16)
	  , $iterDetect    = __webpack_require__(50)
	  , setToStringTag = __webpack_require__(30);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO;
	    if(!ACCEPT_ITERABLES){
	      C = wrapper(function(target, iterable){
	        strictNew(target, C, NAME);
	        var that = new Base;
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    IS_WEAK || instance.forEach(function(val, key){
	      BUGGY_ZERO = 1 / key === -Infinity;
	    });
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(7)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A very flexible and simple jQuery context menu plugin.
	 *
	 * @author Wouter J <wouter@wouterj.nl>
	 */
	_jquery2.default.fn.cmfContextMenu = function (options) {
	    var options = _jquery2.default.extend({
	        /**
	         * The selector used to delegate the contextmenu event too.
	         *
	         *     $('#tree').cmfContextMenu({ delegate: '.hasMenu' })
	         *
	         * Will delegate the contextmenu event to all `.hasMenu`
	         * childs in `#tree`.
	         *
	         * @var string|null
	         */
	        delegate: null,

	        /**
	         * A list of actions in the context menu or a callback.
	         *
	         * In case of a callback, it will be called with the target
	         * element. This means the action list can be build dynamically
	         * based on the target.
	         *
	         * The contextmenu will not be shown if this list is empty or if
	         * the callback returned `false`.
	         *
	         * @var object|function
	         */
	        actions: [],

	        /**
	         * A callback that's called when an action is selected.
	         *
	         * The callback will be provided with the element the contextmenu was
	         * bound to and the click event.
	         *
	         * @var function
	         */
	        select: function select($action, event) {},

	        /**
	         * The template to use for the wrapper element.
	         *
	         * @var string
	         */
	        wrapperTemplate: '<ul id="cmf-context-menu"></ul>',

	        /**
	         * The template to use for each action element.
	         *
	         * You can include vars with the `{{ varName }}` syntax. The available
	         * vars are the properties of the action object set in `actions`.
	         *
	         * @var string
	         */
	        actionTemplate: '<li><i class="{{ iconClass }}"></i> {{ label }}</li>'
	    }, options);

	    var $body = (0, _jquery2.default)('body');
	    var $menu;

	    // respond to right click
	    (0, _jquery2.default)(this).on('contextmenu', options.delegate, function (e) {
	        e.preventDefault();

	        var $target = (0, _jquery2.default)(this);

	        // remove already shown menu
	        $menu && $menu.remove();

	        // generate actions
	        var actions = options.actions;
	        if (typeof actions === 'function') {
	            actions = actions($target);
	        }

	        if (false === actions || _jquery2.default.isEmptyObject(actions)) {
	            return;
	        }

	        // generate the menu element
	        $menu = function () {
	            var $wrapper = (0, _jquery2.default)(options.wrapperTemplate);
	            var $menu = $wrapper.is('ul') ? $wrapper : $wrapper.find('ul');
	            for (var cmd in actions) {
	                var action = actions[cmd];
	                var $action = (0, _jquery2.default)(function () {
	                    var tmp = options.actionTemplate;
	                    for (var prop in action) {
	                        if (!action.hasOwnProperty(prop)) {
	                            continue;
	                        }

	                        tmp = tmp.replace('{{ ' + prop + ' }}', action[prop]);
	                    }

	                    return tmp;
	                }());

	                $action.data('cmd', cmd);

	                $menu.append($action);
	            }

	            return $wrapper;
	        }();

	        // align it on the page
	        $menu.css({
	            top: e.pageY,
	            left: e.pageX
	        });

	        $body.append($menu);

	        var select = options.select;
	        // respond to a click on an action
	        $menu.on('click', 'li', function (e) {
	            e.stopPropagation();

	            select($target, e);
	        });
	    });

	    // when clicked anywhere outside of the contextmenu, hide the menu
	    (0, _jquery2.default)('html').on('click', function (e) {
	        $menu && $menu.remove();
	    });
	}; /*
	    * This file is part of the Symfony CMF package.
	    *
	    * (c) 2011-2017 Symfony CMF
	    *
	    * For the full copyright and license information, please view the LICENSE
	    * file that was distributed with this source code.
	    */

/***/ },
/* 52 */
/***/ function(module, exports) {

	/*!
	 * jquery.fancytree.js
	 * Dynamic tree view control, with support for lazy loading of branches.
	 * https://github.com/mar10/fancytree/
	 *
	 * Copyright (c) 2006-2014, Martin Wendt (http://wwWendt.de)
	 * Released under the MIT license
	 * https://github.com/mar10/fancytree/wiki/LicenseInfo
	 *
	 * @version 2.7.0
	 * @date 2014-12-21T15:57
	 */

	/** Core Fancytree module.
	 */


	// Start of local namespace
	;(function($, window, document, undefined) {
	"use strict";

	// prevent duplicate loading
	if ( $.ui && $.ui.fancytree ) {
		$.ui.fancytree.warn("Fancytree: ignored duplicate include");
		return;
	}


	/* *****************************************************************************
	 * Private functions and variables
	 */

	function _assert(cond, msg){
		// TODO: see qunit.js extractStacktrace()
		if(!cond){
			msg = msg ? ": " + msg : "";
			// consoleApply("assert", [!!cond, msg]);
			$.error("Fancytree assertion failed" + msg);
		}
	}

	_assert($.ui, "Fancytree requires jQuery UI (http://jqueryui.com)");

	function consoleApply(method, args){
		var i, s,
			fn = window.console ? window.console[method] : null;

		if(fn){
			try{
				fn.apply(window.console, args);
			} catch(e) {
				// IE 8?
				s = "";
				for( i=0; i<args.length; i++){
					s += args[i];
				}
				fn(s);
			}
		}
	}

	/*Return true if x is a FancytreeNode.*/
	function _isNode(x){
		return !!(x.tree && x.statusNodeType !== undefined);
	}

	/** Return true if dotted version string is equal or higher than requested version.
	 *
	 * See http://jsfiddle.net/mar10/FjSAN/
	 */
	function isVersionAtLeast(dottedVersion, major, minor, patch){
		var i, v, t,
			verParts = $.map($.trim(dottedVersion).split("."), function(e){ return parseInt(e, 10); }),
			testParts = $.map(Array.prototype.slice.call(arguments, 1), function(e){ return parseInt(e, 10); });

		for( i = 0; i < testParts.length; i++ ){
			v = verParts[i] || 0;
			t = testParts[i] || 0;
			if( v !== t ){
				return ( v > t );
			}
		}
		return true;
	}

	/** Return a wrapper that calls sub.methodName() and exposes
	 *  this        : tree
	 *  this._local : tree.ext.EXTNAME
	 *  this._super : base.methodName()
	 */
	function _makeVirtualFunction(methodName, tree, base, extension, extName){
		// $.ui.fancytree.debug("_makeVirtualFunction", methodName, tree, base, extension, extName);
		// if(rexTestSuper && !rexTestSuper.test(func)){
		//     // extension.methodName() doesn't call _super(), so no wrapper required
		//     return func;
		// }
		// Use an immediate function as closure
		var proxy = (function(){
			var prevFunc = tree[methodName],      // org. tree method or prev. proxy
				baseFunc = extension[methodName], //
				_local = tree.ext[extName],
				_super = function(){
					return prevFunc.apply(tree, arguments);
				};

			// Return the wrapper function
			return function(){
				var prevLocal = tree._local,
					prevSuper = tree._super;
				try{
					tree._local = _local;
					tree._super = _super;
					return  baseFunc.apply(tree, arguments);
				}finally{
					tree._local = prevLocal;
					tree._super = prevSuper;
				}
			};
		})(); // end of Immediate Function
		return proxy;
	}

	/**
	 * Subclass `base` by creating proxy functions
	 */
	function _subclassObject(tree, base, extension, extName){
		// $.ui.fancytree.debug("_subclassObject", tree, base, extension, extName);
		for(var attrName in extension){
			if(typeof extension[attrName] === "function"){
				if(typeof tree[attrName] === "function"){
					// override existing method
					tree[attrName] = _makeVirtualFunction(attrName, tree, base, extension, extName);
				}else if(attrName.charAt(0) === "_"){
					// Create private methods in tree.ext.EXTENSION namespace
					tree.ext[extName][attrName] = _makeVirtualFunction(attrName, tree, base, extension, extName);
				}else{
					$.error("Could not override tree." + attrName + ". Use prefix '_' to create tree." + extName + "._" + attrName);
				}
			}else{
				// Create member variables in tree.ext.EXTENSION namespace
				if(attrName !== "options"){
					tree.ext[extName][attrName] = extension[attrName];
				}
			}
		}
	}


	function _getResolvedPromise(context, argArray){
		if(context === undefined){
			return $.Deferred(function(){this.resolve();}).promise();
		}else{
			return $.Deferred(function(){this.resolveWith(context, argArray);}).promise();
		}
	}


	function _getRejectedPromise(context, argArray){
		if(context === undefined){
			return $.Deferred(function(){this.reject();}).promise();
		}else{
			return $.Deferred(function(){this.rejectWith(context, argArray);}).promise();
		}
	}


	function _makeResolveFunc(deferred, context){
		return function(){
			deferred.resolveWith(context);
		};
	}


	function _getElementDataAsDict($el){
		// Evaluate 'data-NAME' attributes with special treatment for 'data-json'.
		var d = $.extend({}, $el.data()),
			json = d.json;
		delete d.fancytree; // added to container by widget factory
		if( json ) {
			delete d.json;
			// <li data-json='...'> is already returned as object (http://api.jquery.com/data/#data-html5)
			d = $.extend(d, json);
		}
		return d;
	}


	// TODO: use currying
	function _makeNodeTitleMatcher(s){
		s = s.toLowerCase();
		return function(node){
			return node.title.toLowerCase().indexOf(s) >= 0;
		};
	}


	function _makeNodeTitleStartMatcher(s){
		var reMatch = new RegExp("^" + s, "i");
		return function(node){
			return reMatch.test(node.title);
		};
	}

	var i,
		FT = null, // initialized below
		ENTITY_MAP = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;", "/": "&#x2F;"},
		IGNORE_KEYCODES = { 16: true, 17: true, 18: true },
		SPECIAL_KEYCODES = {
			8: "backspace", 9: "tab", 10: "return", 13: "return",
			// 16: null, 17: null, 18: null, // ignore shift, ctrl, alt
			19: "pause", 20: "capslock", 27: "esc", 32: "space", 33: "pageup",
			34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up",
			39: "right", 40: "down", 45: "insert", 46: "del", 59: ";", 61: "=",
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6",
			103: "7", 104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".",
			111: "/", 112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5",
			117: "f6", 118: "f7", 119: "f8", 120: "f9", 121: "f10", 122: "f11",
			123: "f12", 144: "numlock", 145: "scroll", 173: "-", 186: ";", 187: "=",
			188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
			221: "]", 222: "'"},
		//boolean attributes that can be set with equivalent class names in the LI tags
		CLASS_ATTRS = "active expanded focus folder hideCheckbox lazy selected unselectable".split(" "),
		CLASS_ATTR_MAP = {},
		//	Top-level Fancytree node attributes, that can be set by dict
		NODE_ATTRS = "expanded extraClasses folder hideCheckbox key lazy refKey selected title tooltip unselectable".split(" "),
		NODE_ATTR_MAP = {},
		// Attribute names that should NOT be added to node.data
		NONE_NODE_DATA_MAP = {"active": true, "children": true, "data": true, "focus": true};

	for(i=0; i<CLASS_ATTRS.length; i++){ CLASS_ATTR_MAP[CLASS_ATTRS[i]] = true; }
	for(i=0; i<NODE_ATTRS.length; i++){ NODE_ATTR_MAP[NODE_ATTRS[i]] = true; }


	/* *****************************************************************************
	 * FancytreeNode
	 */


	/**
	 * Creates a new FancytreeNode
	 *
	 * @class FancytreeNode
	 * @classdesc A FancytreeNode represents the hierarchical data model and operations.
	 *
	 * @param {FancytreeNode} parent
	 * @param {NodeData} obj
	 *
	 * @property {Fancytree} tree The tree instance
	 * @property {FancytreeNode} parent The parent node
	 * @property {string} key Node id (must be unique inside the tree)
	 * @property {string} title Display name (may contain HTML)
	 * @property {object} data Contains all extra data that was passed on node creation
	 * @property {FancytreeNode[] | null | undefined} children Array of child nodes.<br>
	 *     For lazy nodes, null or undefined means 'not yet loaded'. Use an empty array
	 *     to define a node that has no children.
	 * @property {boolean} expanded Use isExpanded(), setExpanded() to access this property.
	 * @property {string} extraClasses Addtional CSS classes, added to the node's `&lt;span>`
	 * @property {boolean} folder Folder nodes have different default icons and click behavior.<br>
	 *     Note: Also non-folders may have children.
	 * @property {string} statusNodeType null or type of temporarily generated system node like 'loading', or 'error'.
	 * @property {boolean} lazy True if this node is loaded on demand, i.e. on first expansion.
	 * @property {boolean} selected Use isSelected(), setSelected() to access this property.
	 * @property {string} tooltip Alternative description used as hover banner
	 */
	function FancytreeNode(parent, obj){
		var i, l, name, cl;

		this.parent = parent;
		this.tree = parent.tree;
		this.ul = null;
		this.li = null;  // <li id='key' ftnode=this> tag
		this.statusNodeType = null; // if this is a temp. node to display the status of its parent
		this._isLoading = false;    // if this node itself is loading
		this._error = null;         // {message: '...'} if a load error occured
		this.data = {};

		// TODO: merge this code with node.toDict()
		// copy attributes from obj object
		for(i=0, l=NODE_ATTRS.length; i<l; i++){
			name = NODE_ATTRS[i];
			this[name] = obj[name];
		}
		// node.data += obj.data
		if(obj.data){
			$.extend(this.data, obj.data);
		}
		// copy all other attributes to this.data.NAME
		for(name in obj){
			if(!NODE_ATTR_MAP[name] && !$.isFunction(obj[name]) && !NONE_NODE_DATA_MAP[name]){
				// node.data.NAME = obj.NAME
				this.data[name] = obj[name];
			}
		}

		// Fix missing key
		if( this.key == null ){ // test for null OR undefined
			if( this.tree.options.defaultKey ) {
				this.key = this.tree.options.defaultKey(this);
				_assert(this.key, "defaultKey() must return a unique key");
			} else {
				this.key = "_" + (FT._nextNodeKey++);
			}
		} else {
			this.key = "" + this.key; // Convert to string (#217)
		}

		// Fix tree.activeNode
		// TODO: not elegant: we use obj.active as marker to set tree.activeNode
		// when loading from a dictionary.
		if(obj.active){
			_assert(this.tree.activeNode === null, "only one active node allowed");
			this.tree.activeNode = this;
		}
		if( obj.selected ){ // #186
			this.tree.lastSelectedNode = this;
		}
		// TODO: handle obj.focus = true
		// Create child nodes
		this.children = null;
		cl = obj.children;
		if(cl && cl.length){
			this._setChildren(cl);
		}
		// Add to key/ref map (except for root node)
	//	if( parent ) {
		this.tree._callHook("treeRegisterNode", this.tree, true, this);
	//	}
	}


	FancytreeNode.prototype = /** @lends FancytreeNode# */{
		/* Return the direct child FancytreeNode with a given key, index. */
		_findDirectChild: function(ptr){
			var i, l,
				cl = this.children;

			if(cl){
				if(typeof ptr === "string"){
					for(i=0, l=cl.length; i<l; i++){
						if(cl[i].key === ptr){
							return cl[i];
						}
					}
				}else if(typeof ptr === "number"){
					return this.children[ptr];
				}else if(ptr.parent === this){
					return ptr;
				}
			}
			return null;
		},
		// TODO: activate()
		// TODO: activateSilently()
		/* Internal helper called in recursive addChildren sequence.*/
		_setChildren: function(children){
			_assert(children && (!this.children || this.children.length === 0), "only init supported");
			this.children = [];
			for(var i=0, l=children.length; i<l; i++){
				this.children.push(new FancytreeNode(this, children[i]));
			}
		},
		/**
		 * Append (or insert) a list of child nodes.
		 *
		 * @param {NodeData[]} children array of child node definitions (also single child accepted)
		 * @param {FancytreeNode | string | Integer} [insertBefore] child node (or key or index of such).
		 *     If omitted, the new children are appended.
		 * @returns {FancytreeNode} first child added
		 *
		 * @see FancytreeNode#applyPatch
		 */
		addChildren: function(children, insertBefore){
			var i, l, pos,
				firstNode = null,
				nodeList = [];

			if($.isPlainObject(children) ){
				children = [children];
			}
			if(!this.children){
				this.children = [];
			}
			for(i=0, l=children.length; i<l; i++){
				nodeList.push(new FancytreeNode(this, children[i]));
			}
			firstNode = nodeList[0];
			if(insertBefore == null){
				this.children = this.children.concat(nodeList);
			}else{
				insertBefore = this._findDirectChild(insertBefore);
				pos = $.inArray(insertBefore, this.children);
				_assert(pos >= 0, "insertBefore must be an existing child");
				// insert nodeList after children[pos]
				this.children.splice.apply(this.children, [pos, 0].concat(nodeList));
			}
			if( !this.parent || this.parent.ul || this.tr ){
				// render if the parent was rendered (or this is a root node)
				this.render();
			}
			if( this.tree.options.selectMode === 3 ){
				this.fixSelection3FromEndNodes();
			}
			return firstNode;
		},
		/**
		 * Append or prepend a node, or append a child node.
		 *
		 * This a convenience function that calls addChildren()
		 *
		 * @param {NodeData} node node definition
		 * @param {string} [mode=child] 'before', 'after', 'firstChild', or 'child' ('over' is a synonym for 'child')
		 * @returns {FancytreeNode} new node
		 */
		addNode: function(node, mode){
			if(mode === undefined || mode === "over"){
				mode = "child";
			}
			switch(mode){
			case "after":
				return this.getParent().addChildren(node, this.getNextSibling());
			case "before":
				return this.getParent().addChildren(node, this);
			case "firstChild":
				// Insert before the first child if any
				var insertBefore = (this.children ? this.children[0] : null);
				return this.addChildren(node, insertBefore);
			case "child":
			case "over":
				return this.addChildren(node);
			}
			_assert(false, "Invalid mode: " + mode);
		},
		/**
		 * Append new node after this.
		 *
		 * This a convenience function that calls addNode(node, 'after')
		 *
		 * @param {NodeData} node node definition
		 * @returns {FancytreeNode} new node
		 */
		appendSibling: function(node){
			return this.addNode(node, "after");
		},
		/**
		 * Modify existing child nodes.
		 *
		 * @param {NodePatch} patch
		 * @returns {$.Promise}
		 * @see FancytreeNode#addChildren
		 */
		applyPatch: function(patch) {
			// patch [key, null] means 'remove'
			if(patch === null){
				this.remove();
				return _getResolvedPromise(this);
			}
			// TODO: make sure that root node is not collapsed or modified
			// copy (most) attributes to node.ATTR or node.data.ATTR
			var name, promise, v,
				IGNORE_MAP = { children: true, expanded: true, parent: true }; // TODO: should be global

			for(name in patch){
				v = patch[name];
				if( !IGNORE_MAP[name] && !$.isFunction(v)){
					if(NODE_ATTR_MAP[name]){
						this[name] = v;
					}else{
						this.data[name] = v;
					}
				}
			}
			// Remove and/or create children
			if(patch.hasOwnProperty("children")){
				this.removeChildren();
				if(patch.children){ // only if not null and not empty list
					// TODO: addChildren instead?
					this._setChildren(patch.children);
				}
				// TODO: how can we APPEND or INSERT child nodes?
			}
			if(this.isVisible()){
				this.renderTitle();
				this.renderStatus();
			}
			// Expand collapse (final step, since this may be async)
			if(patch.hasOwnProperty("expanded")){
				promise = this.setExpanded(patch.expanded);
			}else{
				promise = _getResolvedPromise(this);
			}
			return promise;
		},
		/** Collapse all sibling nodes.
		 * @returns {$.Promise}
		 */
		collapseSiblings: function() {
			return this.tree._callHook("nodeCollapseSiblings", this);
		},
		/** Copy this node as sibling or child of `node`.
		 *
		 * @param {FancytreeNode} node source node
		 * @param {string} [mode=child] 'before' | 'after' | 'child'
		 * @param {Function} [map] callback function(NodeData) that could modify the new node
		 * @returns {FancytreeNode} new
		 */
		copyTo: function(node, mode, map) {
			return node.addNode(this.toDict(true, map), mode);
		},
		/** Count direct and indirect children.
		 *
		 * @param {boolean} [deep=true] pass 'false' to only count direct children
		 * @returns {int} number of child nodes
		 */
		countChildren: function(deep) {
			var cl = this.children, i, l, n;
			if( !cl ){
				return 0;
			}
			n = cl.length;
			if(deep !== false){
				for(i=0, l=n; i<l; i++){
					n += cl[i].countChildren();
				}
			}
			return n;
		},
		// TODO: deactivate()
		/** Write to browser console if debugLevel >= 2 (prepending node info)
		 *
		 * @param {*} msg string or object or array of such
		 */
		debug: function(msg){
			if( this.tree.options.debugLevel >= 2 ) {
				Array.prototype.unshift.call(arguments, this.toString());
				consoleApply("log", arguments);
			}
		},
		/** Deprecated.
		 * @deprecated since 2014-02-16. Use resetLazy() instead.
		 */
		discard: function(){
			this.warn("FancytreeNode.discard() is deprecated since 2014-02-16. Use .resetLazy() instead.");
			return this.resetLazy();
		},
		// TODO: expand(flag)
		/**Find all nodes that contain `match` in the title.
		 *
		 * @param {string | function(node)} match string to search for, of a function that
		 * returns `true` if a node is matched.
		 * @returns {FancytreeNode[]} array of nodes (may be empty)
		 * @see FancytreeNode#findAll
		 */
		findAll: function(match) {
			match = $.isFunction(match) ? match : _makeNodeTitleMatcher(match);
			var res = [];
			this.visit(function(n){
				if(match(n)){
					res.push(n);
				}
			});
			return res;
		},
		/**Find first node that contains `match` in the title (not including self).
		 *
		 * @param {string | function(node)} match string to search for, of a function that
		 * returns `true` if a node is matched.
		 * @returns {FancytreeNode} matching node or null
		 * @example
		 * <b>fat</b> text
		 */
		findFirst: function(match) {
			match = $.isFunction(match) ? match : _makeNodeTitleMatcher(match);
			var res = null;
			this.visit(function(n){
				if(match(n)){
					res = n;
					return false;
				}
			});
			return res;
		},
		/* Apply selection state (internal use only) */
		_changeSelectStatusAttrs: function (state) {
			var changed = false;

			switch(state){
			case false:
				changed = ( this.selected || this.partsel );
				this.selected = false;
				this.partsel = false;
				break;
			case true:
				changed = ( !this.selected || !this.partsel );
				this.selected = true;
				this.partsel = true;
				break;
			case undefined:
				changed = ( this.selected || !this.partsel );
				this.selected = false;
				this.partsel = true;
				break;
			default:
				_assert(false, "invalid state: " + state);
			}
			// this.debug("fixSelection3AfterLoad() _changeSelectStatusAttrs()", state, changed);
			if( changed ){
				this.renderStatus();
			}
			return changed;
		},
		/**
		 * Fix selection status, after this node was (de)selected in multi-hier mode.
		 * This includes (de)selecting all children.
		 */
		fixSelection3AfterClick: function() {
			var flag = this.isSelected();

	//		this.debug("fixSelection3AfterClick()");

			this.visit(function(node){
				node._changeSelectStatusAttrs(flag);
			});
			this.fixSelection3FromEndNodes();
		},
		/**
		 * Fix selection status for multi-hier mode.
		 * Only end-nodes are considered to update the descendants branch and parents.
		 * Should be called after this node has loaded new children or after
		 * children have been modified using the API.
		 */
		fixSelection3FromEndNodes: function() {
	//		this.debug("fixSelection3FromEndNodes()");
			_assert(this.tree.options.selectMode === 3, "expected selectMode 3");

			// Visit all end nodes and adjust their parent's `selected` and `partsel`
			// attributes. Return selection state true, false, or undefined.
			function _walk(node){
				var i, l, child, s, state, allSelected,someSelected,
					children = node.children;

				if( children && children.length ){
					// check all children recursively
					allSelected = true;
					someSelected = false;

					for( i=0, l=children.length; i<l; i++ ){
						child = children[i];
						// the selection state of a node is not relevant; we need the end-nodes
						s = _walk(child);
						if( s !== false ) {
							someSelected = true;
						}
						if( s !== true ) {
							allSelected = false;
						}
					}
					state = allSelected ? true : (someSelected ? undefined : false);
				}else{
					// This is an end-node: simply report the status
	//				state = ( node.unselectable ) ? undefined : !!node.selected;
					state = !!node.selected;
				}
				node._changeSelectStatusAttrs(state);
				return state;
			}
			_walk(this);

			// Update parent's state
			this.visitParents(function(node){
				var i, l, child, state,
					children = node.children,
					allSelected = true,
					someSelected = false;

				for( i=0, l=children.length; i<l; i++ ){
					child = children[i];
					// When fixing the parents, we trust the sibling status (i.e.
					// we don't recurse)
					if( child.selected || child.partsel ) {
						someSelected = true;
					}
					if( !child.unselectable && !child.selected ) {
						allSelected = false;
					}
				}
				state = allSelected ? true : (someSelected ? undefined : false);
				node._changeSelectStatusAttrs(state);
			});
		},
		// TODO: focus()
		/**
		 * Update node data. If dict contains 'children', then also replace
		 * the hole sub tree.
		 * @param {NodeData} dict
		 *
		 * @see FancytreeNode#addChildren
		 * @see FancytreeNode#applyPatch
		 */
		fromDict: function(dict) {
			// copy all other attributes to this.data.xxx
			for(var name in dict){
				if(NODE_ATTR_MAP[name]){
					// node.NAME = dict.NAME
					this[name] = dict[name];
				}else if(name === "data"){
					// node.data += dict.data
					$.extend(this.data, dict.data);
				}else if(!$.isFunction(dict[name]) && !NONE_NODE_DATA_MAP[name]){
					// node.data.NAME = dict.NAME
					this.data[name] = dict[name];
				}
			}
			if(dict.children){
				// recursively set children and render
				this.removeChildren();
				this.addChildren(dict.children);
			}
			this.renderTitle();
	/*
			var children = dict.children;
			if(children === undefined){
				this.data = $.extend(this.data, dict);
				this.render();
				return;
			}
			dict = $.extend({}, dict);
			dict.children = undefined;
			this.data = $.extend(this.data, dict);
			this.removeChildren();
			this.addChild(children);
	*/
		},
		/** Return the list of child nodes (undefined for unexpanded lazy nodes).
		 * @returns {FancytreeNode[] | undefined}
		 */
		getChildren: function() {
			if(this.hasChildren() === undefined){ // TODO: only required for lazy nodes?
				return undefined; // Lazy node: unloaded, currently loading, or load error
			}
			return this.children;
		},
		/** Return the first child node or null.
		 * @returns {FancytreeNode | null}
		 */
		getFirstChild: function() {
			return this.children ? this.children[0] : null;
		},
		/** Return the 0-based child index.
		 * @returns {int}
		 */
		getIndex: function() {
	//		return this.parent.children.indexOf(this);
			return $.inArray(this, this.parent.children); // indexOf doesn't work in IE7
		},
		/** Return the hierarchical child index (1-based, e.g. '3.2.4').
		 * @returns {string}
		 */
		getIndexHier: function(separator) {
			separator = separator || ".";
			var res = [];
			$.each(this.getParentList(false, true), function(i, o){
				res.push(o.getIndex() + 1);
			});
			return res.join(separator);
		},
		/** Return the parent keys separated by options.keyPathSeparator, e.g. "id_1/id_17/id_32".
		 * @param {boolean} [excludeSelf=false]
		 * @returns {string}
		 */
		getKeyPath: function(excludeSelf) {
			var path = [],
				sep = this.tree.options.keyPathSeparator;
			this.visitParents(function(n){
				if(n.parent && n.key){
					path.unshift(n.key);
				}
			}, !excludeSelf);
			return sep + path.join(sep);
		},
		/** Return the last child of this node or null.
		 * @returns {FancytreeNode | null}
		 */
		getLastChild: function() {
			return this.children ? this.children[this.children.length - 1] : null;
		},
		/** Return node depth. 0: System root node, 1: visible top-level node, 2: first sub-level, ... .
		 * @returns {int}
		 */
		getLevel: function() {
			var level = 0,
				dtn = this.parent;
			while( dtn ) {
				level++;
				dtn = dtn.parent;
			}
			return level;
		},
		/** Return the successor node (under the same parent) or null.
		 * @returns {FancytreeNode | null}
		 */
		getNextSibling: function() {
			// TODO: use indexOf, if available: (not in IE6)
			if( this.parent ){
				var i, l,
					ac = this.parent.children;

				for(i=0, l=ac.length-1; i<l; i++){ // up to length-2, so next(last) = null
					if( ac[i] === this ){
						return ac[i+1];
					}
				}
			}
			return null;
		},
		/** Return the parent node (null for the system root node).
		 * @returns {FancytreeNode | null}
		 */
		getParent: function() {
			// TODO: return null for top-level nodes?
			return this.parent;
		},
		/** Return an array of all parent nodes (top-down).
		 * @param {boolean} [includeRoot=false] Include the invisible system root node.
		 * @param {boolean} [includeSelf=false] Include the node itself.
		 * @returns {FancytreeNode[]}
		 */
		getParentList: function(includeRoot, includeSelf) {
			var l = [],
				dtn = includeSelf ? this : this.parent;
			while( dtn ) {
				if( includeRoot || dtn.parent ){
					l.unshift(dtn);
				}
				dtn = dtn.parent;
			}
			return l;
		},
		/** Return the predecessor node (under the same parent) or null.
		 * @returns {FancytreeNode | null}
		 */
		getPrevSibling: function() {
			if( this.parent ){
				var i, l,
					ac = this.parent.children;

				for(i=1, l=ac.length; i<l; i++){ // start with 1, so prev(first) = null
					if( ac[i] === this ){
						return ac[i-1];
					}
				}
			}
			return null;
		},
		/** Return true if node has children. Return undefined if not sure, i.e. the node is lazy and not yet loaded).
		 * @returns {boolean | undefined}
		 */
		hasChildren: function() {
			if(this.lazy){
				if(this.children == null ){
					// null or undefined: Not yet loaded
					return undefined;
				}else if(this.children.length === 0){
					// Loaded, but response was empty
					return false;
				}else if(this.children.length === 1 && this.children[0].isStatusNode() ){
					// Currently loading or load error
					return undefined;
				}
				return true;
			}
			return !!( this.children && this.children.length );
		},
		/** Return true if node has keyboard focus.
		 * @returns {boolean}
		 */
		hasFocus: function() {
			return (this.tree.hasFocus() && this.tree.focusNode === this);
		},
		/** Write to browser console if debugLevel >= 1 (prepending node info)
		 *
		 * @param {*} msg string or object or array of such
		 */
		info: function(msg){
			if( this.tree.options.debugLevel >= 1 ) {
				Array.prototype.unshift.call(arguments, this.toString());
				consoleApply("info", arguments);
			}
		},
		/** Return true if node is active (see also FancytreeNode#isSelected).
		 * @returns {boolean}
		 */
		isActive: function() {
			return (this.tree.activeNode === this);
		},
		/** Return true if node is a direct child of otherNode.
		 * @param {FancytreeNode} otherNode
		 * @returns {boolean}
		 */
		isChildOf: function(otherNode) {
			return (this.parent && this.parent === otherNode);
		},
		/** Return true, if node is a direct or indirect sub node of otherNode.
		 * @param {FancytreeNode} otherNode
		 * @returns {boolean}
		 */
		isDescendantOf: function(otherNode) {
			if(!otherNode || otherNode.tree !== this.tree){
				return false;
			}
			var p = this.parent;
			while( p ) {
				if( p === otherNode ){
					return true;
				}
				p = p.parent;
			}
			return false;
		},
		/** Return true if node is expanded.
		 * @returns {boolean}
		 */
		isExpanded: function() {
			return !!this.expanded;
		},
		/** Return true if node is the first node of its parent's children.
		 * @returns {boolean}
		 */
		isFirstSibling: function() {
			var p = this.parent;
			return !p || p.children[0] === this;
		},
		/** Return true if node is a folder, i.e. has the node.folder attribute set.
		 * @returns {boolean}
		 */
		isFolder: function() {
			return !!this.folder;
		},
		/** Return true if node is the last node of its parent's children.
		 * @returns {boolean}
		 */
		isLastSibling: function() {
			var p = this.parent;
			return !p || p.children[p.children.length-1] === this;
		},
		/** Return true if node is lazy (even if data was already loaded)
		 * @returns {boolean}
		 */
		isLazy: function() {
			return !!this.lazy;
		},
		/** Return true if node is lazy and loaded. For non-lazy nodes always return true.
		 * @returns {boolean}
		 */
		isLoaded: function() {
			return !this.lazy || this.hasChildren() !== undefined; // Also checks if the only child is a status node
		},
		/** Return true if children are currently beeing loaded, i.e. a Ajax request is pending.
		 * @returns {boolean}
		 */
		isLoading: function() {
			return !!this._isLoading;
		},
		/**
		 * @deprecated since v2.4.0:  Use isRootNode() instead
		 */
		isRoot: function() {
			return this.isRootNode();
		},
		/** Return true if this is the (invisible) system root node.
		 * @returns {boolean}
		 */
		isRootNode: function() {
			return (this.tree.rootNode === this);
		},
		/** Return true if node is selected, i.e. has a checkmark set (see also FancytreeNode#isActive).
		 * @returns {boolean}
		 */
		isSelected: function() {
			return !!this.selected;
		},
		/** Return true if this node is a temporarily generated system node like
		 * 'loading', or 'error' (node.statusNodeType contains the type).
		 * @returns {boolean}
		 */
		isStatusNode: function() {
			return !!this.statusNodeType;
		},
		/** Return true if this a top level node, i.e. a direct child of the (invisible) system root node.
		 * @returns {boolean}
		 */
		isTopLevel: function() {
			return (this.tree.rootNode === this.parent);
		},
		/** Return true if node is lazy and not yet loaded. For non-lazy nodes always return false.
		 * @returns {boolean}
		 */
		isUndefined: function() {
			return this.hasChildren() === undefined; // also checks if the only child is a status node
		},
		/** Return true if all parent nodes are expanded. Note: this does not check
		 * whether the node is scrolled into the visible part of the screen.
		 * @returns {boolean}
		 */
		isVisible: function() {
			var i, l,
				parents = this.getParentList(false, false);

			for(i=0, l=parents.length; i<l; i++){
				if( ! parents[i].expanded ){ return false; }
			}
			return true;
		},
		/** Deprecated.
		 * @deprecated since 2014-02-16: use load() instead.
		 */
		lazyLoad: function(discard) {
			this.warn("FancytreeNode.lazyLoad() is deprecated since 2014-02-16. Use .load() instead.");
			return this.load(discard);
		},
		/**
		 * Load all children of a lazy node if neccessary. The *expanded* state is maintained.
		 * @param {boolean} [forceReload=false] Pass true to discard any existing nodes before.
		 * @returns {$.Promise}
		 */
		load: function(forceReload) {
			var res, source,
				that = this;

			_assert( this.isLazy(), "load() requires a lazy node" );
			// _assert( forceReload || this.isUndefined(), "Pass forceReload=true to re-load a lazy node" );
			if( !forceReload && !this.isUndefined() ) {
				return _getResolvedPromise(this);
			}
			if( this.isLoaded() ){
				this.resetLazy(); // also collapses
			}
			// This method is also called by setExpanded() and loadKeyPath(), so we
			// have to avoid recursion.
			source = this.tree._triggerNodeEvent("lazyLoad", this);
			if( source === false ) { // #69
				return _getResolvedPromise(this);
			}
			_assert(typeof source !== "boolean", "lazyLoad event must return source in data.result");
			res = this.tree._callHook("nodeLoadChildren", this, source);
			if( this.expanded ) {
				res.always(function(){
					that.render();
				});
			}
			return res;
		},
		/** Expand all parents and optionally scroll into visible area as neccessary.
		 * Promise is resolved, when lazy loading and animations are done.
		 * @param {object} [opts] passed to `setExpanded()`.
		 *     Defaults to {noAnimation: false, noEvents: false, scrollIntoView: true}
		 * @returns {$.Promise}
		 */
		makeVisible: function(opts) {
			var i,
				that = this,
				deferreds = [],
				dfd = new $.Deferred(),
				parents = this.getParentList(false, false),
				len = parents.length,
				effects = !(opts && opts.noAnimation === true),
				scroll = !(opts && opts.scrollIntoView === false);

			// Expand bottom-up, so only the top node is animated
			for(i = len - 1; i >= 0; i--){
				// that.debug("pushexpand" + parents[i]);
				deferreds.push(parents[i].setExpanded(true, opts));
			}
			$.when.apply($, deferreds).done(function(){
				// All expands have finished
				// that.debug("expand DONE", scroll);
				if( scroll ){
					that.scrollIntoView(effects).done(function(){
						// that.debug("scroll DONE");
						dfd.resolve();
					});
				} else {
					dfd.resolve();
				}
			});
			return dfd.promise();
		},
		/** Move this node to targetNode.
		 *  @param {FancytreeNode} targetNode
		 *  @param {string} mode <pre>
		 *      'child': append this node as last child of targetNode.
		 *               This is the default. To be compatble with the D'n'd
		 *               hitMode, we also accept 'over'.
		 *      'before': add this node as sibling before targetNode.
		 *      'after': add this node as sibling after targetNode.</pre>
		 *  @param {function} [map] optional callback(FancytreeNode) to allow modifcations
		 */
		moveTo: function(targetNode, mode, map) {
			if(mode === undefined || mode === "over"){
				mode = "child";
			}
			var pos,
				prevParent = this.parent,
				targetParent = (mode === "child") ? targetNode : targetNode.parent;

			if(this === targetNode){
				return;
			}else if( !this.parent  ){
				throw "Cannot move system root";
			}else if( targetParent.isDescendantOf(this) ){
				throw "Cannot move a node to its own descendant";
			}
			// Unlink this node from current parent
			if( this.parent.children.length === 1 ) {
				if( this.parent === targetParent ){
					return; // #258
				}
				this.parent.children = this.parent.lazy ? [] : null;
				this.parent.expanded = false;
			} else {
				pos = $.inArray(this, this.parent.children);
				_assert(pos >= 0);
				this.parent.children.splice(pos, 1);
			}
			// Remove from source DOM parent
	//		if(this.parent.ul){
	//			this.parent.ul.removeChild(this.li);
	//		}

			// Insert this node to target parent's child list
			this.parent = targetParent;
			if( targetParent.hasChildren() ) {
				switch(mode) {
				case "child":
					// Append to existing target children
					targetParent.children.push(this);
					break;
				case "before":
					// Insert this node before target node
					pos = $.inArray(targetNode, targetParent.children);
					_assert(pos >= 0);
					targetParent.children.splice(pos, 0, this);
					break;
				case "after":
					// Insert this node after target node
					pos = $.inArray(targetNode, targetParent.children);
					_assert(pos >= 0);
					targetParent.children.splice(pos+1, 0, this);
					break;
				default:
					throw "Invalid mode " + mode;
				}
			} else {
				targetParent.children = [ this ];
			}
			// Parent has no <ul> tag yet:
	//		if( !targetParent.ul ) {
	//			// This is the parent's first child: create UL tag
	//			// (Hidden, because it will be
	//			targetParent.ul = document.createElement("ul");
	//			targetParent.ul.style.display = "none";
	//			targetParent.li.appendChild(targetParent.ul);
	//		}
	//		// Issue 319: Add to target DOM parent (only if node was already rendered(expanded))
	//		if(this.li){
	//			targetParent.ul.appendChild(this.li);
	//		}^

			// Let caller modify the nodes
			if( map ){
				targetNode.visit(map, true);
			}
			// Handle cross-tree moves
			if( this.tree !== targetNode.tree ) {
				// Fix node.tree for all source nodes
	//			_assert(false, "Cross-tree move is not yet implemented.");
				this.warn("Cross-tree moveTo is experimantal!");
				this.visit(function(n){
					// TODO: fix selection state and activation, ...
					n.tree = targetNode.tree;
				}, true);
			}

			// A collaposed node won't re-render children, so we have to remove it manually
			// if( !targetParent.expanded ){
			//   prevParent.ul.removeChild(this.li);
			// }

			// Update HTML markup
			if( !prevParent.isDescendantOf(targetParent)) {
				prevParent.render();
			}
			if( !targetParent.isDescendantOf(prevParent) && targetParent !== prevParent) {
				targetParent.render();
			}
			// TODO: fix selection state
			// TODO: fix active state

	/*
			var tree = this.tree;
			var opts = tree.options;
			var pers = tree.persistence;


			// Always expand, if it's below minExpandLevel
	//		tree.logDebug ("%s._addChildNode(%o), l=%o", this, ftnode, ftnode.getLevel());
			if ( opts.minExpandLevel >= ftnode.getLevel() ) {
	//			tree.logDebug ("Force expand for %o", ftnode);
				this.bExpanded = true;
			}

			// In multi-hier mode, update the parents selection state
			// DT issue #82: only if not initializing, because the children may not exist yet
	//		if( !ftnode.data.isStatusNode() && opts.selectMode==3 && !isInitializing )
	//			ftnode._fixSelectionState();

			// In multi-hier mode, update the parents selection state
			if( ftnode.bSelected && opts.selectMode==3 ) {
				var p = this;
				while( p ) {
					if( !p.hasSubSel )
						p._setSubSel(true);
					p = p.parent;
				}
			}
			// render this node and the new child
			if ( tree.bEnableUpdate )
				this.render();

			return ftnode;

	*/
		},
		/** Set focus relative to this node and optionally activate.
		 *
		 * @param {number} where The keyCode that would normally trigger this move,
		 *		e.g. `$.ui.keyCode.LEFT` would collapse the node if it
		 *      is expanded or move to the parent oterwise.
		 * @param {boolean} [activate=true]
		 * @returns {$.Promise}
		 */
		// navigate: function(where, activate) {
		// 	console.time("navigate")
		// 	this._navigate(where, activate)
		// 	console.timeEnd("navigate")
		// },
		navigate: function(where, activate) {
			var i, parents,
				handled = true,
				KC = $.ui.keyCode,
				sib = null;

			// Navigate to node
			function _goto(n){
				if( n ){
					try { n.makeVisible(); } catch(e) {} // #272
					// Node may still be hidden by a filter
					if( ! $(n.span).is(":visible") ) {
						n.debug("Navigate: skipping hidden node");
						n.navigate(where, activate);
						return;
					}
					return activate === false ? n.setFocus() : n.setActive();
				}
			}

			switch( where ) {
				case KC.BACKSPACE:
					if( this.parent && this.parent.parent ) {
						_goto(this.parent);
					}
					break;
				case KC.LEFT:
					if( this.expanded ) {
						this.setExpanded(false);
						_goto(this);
					} else if( this.parent && this.parent.parent ) {
						_goto(this.parent);
					}
					break;
				case KC.RIGHT:
					if( !this.expanded && (this.children || this.lazy) ) {
						this.setExpanded();
						_goto(this);
					} else if( this.children && this.children.length ) {
						_goto(this.children[0]);
					}
					break;
				case KC.UP:
					sib = this.getPrevSibling();
					// #359: skip hidden sibling nodes, preventing a _goto() recursion
					while( sib && !$(sib.span).is(":visible") ) {
						sib = sib.getPrevSibling();
					}
					while( sib && sib.expanded && sib.children && sib.children.length ) {
						sib = sib.children[sib.children.length - 1];
					}
					if( !sib && this.parent && this.parent.parent ){
						sib = this.parent;
					}
					_goto(sib);
					break;
				case KC.DOWN:
					if( this.expanded && this.children && this.children.length ) {
						sib = this.children[0];
					} else {
						parents = this.getParentList(false, true);
						for(i=parents.length-1; i>=0; i--) {
							sib = parents[i].getNextSibling();
							// #359: skip hidden sibling nodes, preventing a _goto() recursion
							while( sib && !$(sib.span).is(":visible") ) {
								sib = sib.getNextSibling();
							}
							if( sib ){ break; }
						}
					}
					_goto(sib);
					break;
				default:
					handled = false;
			}
		},
		/**
		 * Remove this node (not allowed for system root).
		 */
		remove: function() {
			return this.parent.removeChild(this);
		},
		/**
		 * Remove childNode from list of direct children.
		 * @param {FancytreeNode} childNode
		 */
		removeChild: function(childNode) {
			return this.tree._callHook("nodeRemoveChild", this, childNode);
		},
		/**
		 * Remove all child nodes and descendents. This converts the node into a leaf.<br>
		 * If this was a lazy node, it is still considered 'loaded'; call node.resetLazy()
		 * in order to trigger lazyLoad on next expand.
		 */
		removeChildren: function() {
			return this.tree._callHook("nodeRemoveChildren", this);
		},
		/**
		 * This method renders and updates all HTML markup that is required
		 * to display this node in its current state.<br>
		 * Note:
		 * <ul>
		 * <li>It should only be neccessary to call this method after the node object
		 *     was modified by direct access to its properties, because the common
		 *     API methods (node.setTitle(), moveTo(), addChildren(), remove(), ...)
		 *     already handle this.
		 * <li> {@link FancytreeNode#renderTitle} and {@link FancytreeNode#renderStatus}
		 *     are implied. If changes are more local, calling only renderTitle() or
		 *     renderStatus() may be sufficient and faster.
		 * <li>If a node was created/removed, node.render() must be called <i>on the parent</i>.
		 * </ul>
		 *
		 * @param {boolean} [force=false] re-render, even if html markup was already created
		 * @param {boolean} [deep=false] also render all descendants, even if parent is collapsed
		 */
		render: function(force, deep) {
			return this.tree._callHook("nodeRender", this, force, deep);
		},
		/** Create HTML markup for the node's outer <span> (expander, checkbox, icon, and title).
		 * @see Fancytree_Hooks#nodeRenderTitle
		 */
		renderTitle: function() {
			return this.tree._callHook("nodeRenderTitle", this);
		},
		/** Update element's CSS classes according to node state.
		 * @see Fancytree_Hooks#nodeRenderStatus
		 */
		renderStatus: function() {
			return this.tree._callHook("nodeRenderStatus", this);
		},
		/**
		 * Remove all children, collapse, and set the lazy-flag, so that the lazyLoad
		 * event is triggered on next expand.
		 */
		resetLazy: function() {
			this.removeChildren();
			this.expanded = false;
			this.lazy = true;
			this.children = undefined;
			this.renderStatus();
		},
		/** Schedule activity for delayed execution (cancel any pending request).
		 *  scheduleAction('cancel') will only cancel a pending request (if any).
		 * @param {string} mode
		 * @param {number} ms
		 */
		scheduleAction: function(mode, ms) {
			if( this.tree.timer ) {
				clearTimeout(this.tree.timer);
	//            this.tree.debug("clearTimeout(%o)", this.tree.timer);
			}
			this.tree.timer = null;
			var self = this; // required for closures
			switch (mode) {
			case "cancel":
				// Simply made sure that timer was cleared
				break;
			case "expand":
				this.tree.timer = setTimeout(function(){
					self.tree.debug("setTimeout: trigger expand");
					self.setExpanded(true);
				}, ms);
				break;
			case "activate":
				this.tree.timer = setTimeout(function(){
					self.tree.debug("setTimeout: trigger activate");
					self.setActive(true);
				}, ms);
				break;
			default:
				throw "Invalid mode " + mode;
			}
	//        this.tree.debug("setTimeout(%s, %s): %s", mode, ms, this.tree.timer);
		},
		/**
		 *
		 * @param {boolean | PlainObject} [effects=false] animation options.
		 * @param {object} [options=null] {topNode: null, effects: ..., parent: ...} this node will remain visible in
		 *     any case, even if `this` is outside the scroll pane.
		 * @returns {$.Promise}
		 */
		scrollIntoView: function(effects, options) {
			if( options !== undefined && _isNode(options) ) {
				this.warn("scrollIntoView() with 'topNode' option is deprecated since 2014-05-08. Use 'options.topNode' instead.");
				options = {topNode: options};
			}
			// this.$scrollParent = (this.options.scrollParent === "auto") ? $ul.scrollParent() : $(this.options.scrollParent);
			// this.$scrollParent = this.$scrollParent.length ? this.$scrollParent || this.$container;

			var topNodeY, nodeY, horzScrollbarHeight, containerOffsetTop,
				opts = $.extend({
					effects: (effects === true) ? {duration: 200, queue: false} : effects,
					scrollOfs: this.tree.options.scrollOfs,
					scrollParent: this.tree.options.scrollParent || this.tree.$container,
					topNode: null
				}, options),
				dfd = new $.Deferred(),
				that = this,
				nodeHeight = $(this.span).height(),
				$container = $(opts.scrollParent),
				topOfs = opts.scrollOfs.top || 0,
				bottomOfs = opts.scrollOfs.bottom || 0,
				containerHeight = $container.height(),// - topOfs - bottomOfs,
				scrollTop = $container.scrollTop(),
				$animateTarget = $container,
				isParentWindow = $container[0] === window,
				topNode = opts.topNode || null,
				newScrollTop = null;

			// this.debug("scrollIntoView(), scrollTop=", scrollTop, opts.scrollOfs);
			_assert($(this.span).is(":visible"), "scrollIntoView node is invisible"); // otherwise we cannot calc offsets

			if( isParentWindow ) {
				nodeY = $(this.span).offset().top;
				topNodeY = (topNode && topNode.span) ? $(topNode.span).offset().top : 0;
				$animateTarget = $("html,body");

			} else {
				_assert($container[0] !== document && $container[0] !== document.body, "scrollParent should be an simple element or `window`, not document or body.");

				containerOffsetTop = $container.offset().top,
				nodeY = $(this.span).offset().top - containerOffsetTop + scrollTop; // relative to scroll parent
				topNodeY = topNode ? $(topNode.span).offset().top - containerOffsetTop  + scrollTop : 0;
				horzScrollbarHeight = Math.max(0, ($container.innerHeight() - $container[0].clientHeight));
				containerHeight -= horzScrollbarHeight;
			}

			// this.debug("    scrollIntoView(), nodeY=", nodeY, "containerHeight=", containerHeight);
			if( nodeY < (scrollTop + topOfs) ){
				// Node is above visible container area
				newScrollTop = nodeY - topOfs;
				// this.debug("    scrollIntoView(), UPPER newScrollTop=", newScrollTop);

			}else if((nodeY + nodeHeight) > (scrollTop + containerHeight - bottomOfs)){
				newScrollTop = nodeY + nodeHeight - containerHeight + bottomOfs;
				// this.debug("    scrollIntoView(), LOWER newScrollTop=", newScrollTop);
				// If a topNode was passed, make sure that it is never scrolled
				// outside the upper border
				if(topNode){
					_assert(topNode.isRoot() || $(topNode.span).is(":visible"), "topNode must be visible");
					if( topNodeY < newScrollTop ){
						newScrollTop = topNodeY - topOfs;
						// this.debug("    scrollIntoView(), TOP newScrollTop=", newScrollTop);
					}
				}
			}

			if(newScrollTop !== null){
				// this.debug("    scrollIntoView(), SET newScrollTop=", newScrollTop);
				if(opts.effects){
					opts.effects.complete = function(){
						dfd.resolveWith(that);
					};
					$animateTarget.stop(true).animate({
						scrollTop: newScrollTop
					}, opts.effects);
				}else{
					$animateTarget[0].scrollTop = newScrollTop;
					dfd.resolveWith(this);
				}
			}else{
				dfd.resolveWith(this);
			}
			return dfd.promise();
		},

		/**Activate this node.
		 * @param {boolean} [flag=true] pass false to deactivate
		 * @param {object} [opts] additional options. Defaults to {noEvents: false}
		 * @returns {$.Promise}
		 */
		setActive: function(flag, opts){
			return this.tree._callHook("nodeSetActive", this, flag, opts);
		},
		/**Expand or collapse this node. Promise is resolved, when lazy loading and animations are done.
		 * @param {boolean} [flag=true] pass false to collapse
		 * @param {object} [opts] additional options. Defaults to {noAnimation: false, noEvents: false}
		 * @returns {$.Promise}
		 */
		setExpanded: function(flag, opts){
			return this.tree._callHook("nodeSetExpanded", this, flag, opts);
		},
		/**Set keyboard focus to this node.
		 * @param {boolean} [flag=true] pass false to blur
		 * @see Fancytree#setFocus
		 */
		setFocus: function(flag){
			return this.tree._callHook("nodeSetFocus", this, flag);
		},
		/**Select this node, i.e. check the checkbox.
		 * @param {boolean} [flag=true] pass false to deselect
		 */
		setSelected: function(flag){
			return this.tree._callHook("nodeSetSelected", this, flag);
		},
		/**Mark a lazy node as 'error', 'loading', or 'ok'.
		 * @param {string} status 'error', 'ok'
		 * @param {string} [message]
		 * @param {string} [details]
		 */
		setStatus: function(status, message, details){
			return this.tree._callHook("nodeSetStatus", this, status, message, details);
		},
		/**Rename this node.
		 * @param {string} title
		 */
		setTitle: function(title){
			this.title = title;
			this.renderTitle();
		},
		/**Sort child list by title.
		 * @param {function} [cmp] custom compare function(a, b) that returns -1, 0, or 1 (defaults to sort by title).
		 * @param {boolean} [deep=false] pass true to sort all descendant nodes
		 */
		sortChildren: function(cmp, deep) {
			var i,l,
				cl = this.children;

			if( !cl ){
				return;
			}
			cmp = cmp || function(a, b) {
				var x = a.title.toLowerCase(),
					y = b.title.toLowerCase();
				return x === y ? 0 : x > y ? 1 : -1;
				};
			cl.sort(cmp);
			if( deep ){
				for(i=0, l=cl.length; i<l; i++){
					if( cl[i].children ){
						cl[i].sortChildren(cmp, "$norender$");
					}
				}
			}
			if( deep !== "$norender$" ){
				this.render();
			}
		},
		/** Convert node (or whole branch) into a plain object.
		 *
		 * The result is compatible with node.addChildren().
		 *
		 * @param {boolean} [recursive=false] include child nodes
		 * @param {function} [callback] callback(dict) is called for every node, in order to allow modifications
		 * @returns {NodeData}
		 */
		toDict: function(recursive, callback) {
			var i, l, node,
				dict = {},
				self = this;

			$.each(NODE_ATTRS, function(i, a){
				if(self[a] || self[a] === false){
					dict[a] = self[a];
				}
			});
			if(!$.isEmptyObject(this.data)){
				dict.data = $.extend({}, this.data);
				if($.isEmptyObject(dict.data)){
					delete dict.data;
				}
			}
			if( callback ){
				callback(dict);
			}
			if( recursive ) {
				if(this.hasChildren()){
					dict.children = [];
					for(i=0, l=this.children.length; i<l; i++ ){
						node = this.children[i];
						if( !node.isStatusNode() ){
							dict.children.push(node.toDict(true, callback));
						}
					}
				}else{
	//                dict.children = null;
				}
			}
			return dict;
		},
		/** Flip expanded status.  */
		toggleExpanded: function(){
			return this.tree._callHook("nodeToggleExpanded", this);
		},
		/** Flip selection status.  */
		toggleSelected: function(){
			return this.tree._callHook("nodeToggleSelected", this);
		},
		toString: function() {
			return "<FancytreeNode(#" + this.key + ", '" + this.title + "')>";
		},
		/** Call fn(node) for all child nodes.<br>
		 * Stop iteration, if fn() returns false. Skip current branch, if fn() returns "skip".<br>
		 * Return false if iteration was stopped.
		 *
		 * @param {function} fn the callback function.
		 *     Return false to stop iteration, return "skip" to skip this node and
		 *     its children only.
		 * @param {boolean} [includeSelf=false]
		 * @returns {boolean}
		 */
		visit: function(fn, includeSelf) {
			var i, l,
				res = true,
				children = this.children;

			if( includeSelf === true ) {
				res = fn(this);
				if( res === false || res === "skip" ){
					return res;
				}
			}
			if(children){
				for(i=0, l=children.length; i<l; i++){
					res = children[i].visit(fn, true);
					if( res === false ){
						break;
					}
				}
			}
			return res;
		},
		/** Call fn(node) for all child nodes and recursively load lazy children.<br>
		 * <b>Note:</b> If you need this method, you probably should consider to review
		 * your architecture! Recursivley loading nodes is a perfect way for lazy
		 * programmers to flood the server with requests ;-)
		 *
		 * @param {function} [fn] optional callback function.
		 *     Return false to stop iteration, return "skip" to skip this node and
		 *     its children only.
		 * @param {boolean} [includeSelf=false]
		 * @returns {$.Promise}
		 */
		visitAndLoad: function(fn, includeSelf, _recursion) {
			var dfd, res, loaders,
				node = this;

			// node.debug("visitAndLoad");
			if( fn && includeSelf === true ) {
				res = fn(node);
				if( res === false || res === "skip" ) {
					return _recursion ? res : _getResolvedPromise();
				}
			}
			if( !node.children && !node.lazy ) {
				return _getResolvedPromise();
			}
			dfd = new $.Deferred();
			loaders = [];
			// node.debug("load()...");
			node.load().done(function(){
				// node.debug("load()... done.");
				for(var i=0, l=node.children.length; i<l; i++){
					res = node.children[i].visitAndLoad(fn, true, true);
					if( res === false ) {
						dfd.reject();
						break;
					} else if ( res !== "skip" ) {
						loaders.push(res); // Add promise to the list
					}
				}
				$.when.apply(this, loaders).then(function(){
					dfd.resolve();
				});
			});
			return dfd.promise();
		},
		/** Call fn(node) for all parent nodes, bottom-up, including invisible system root.<br>
		 * Stop iteration, if fn() returns false.<br>
		 * Return false if iteration was stopped.
		 *
		 * @param {function} fn the callback function.
		 *     Return false to stop iteration, return "skip" to skip this node and children only.
		 * @param {boolean} [includeSelf=false]
		 * @returns {boolean}
		 */
		visitParents: function(fn, includeSelf) {
			// Visit parent nodes (bottom up)
			if(includeSelf && fn(this) === false){
				return false;
			}
			var p = this.parent;
			while( p ) {
				if(fn(p) === false){
					return false;
				}
				p = p.parent;
			}
			return true;
		},
		/** Write warning to browser console (prepending node info)
		 *
		 * @param {*} msg string or object or array of such
		 */
		warn: function(msg){
			Array.prototype.unshift.call(arguments, this.toString());
			consoleApply("warn", arguments);
		}
	};


	/* *****************************************************************************
	 * Fancytree
	 */
	/**
	 * Construct a new tree object.
	 *
	 * @class Fancytree
	 * @classdesc The controller behind a fancytree.
	 * This class also contains 'hook methods': see {@link Fancytree_Hooks}.
	 *
	 * @param {Widget} widget
	 *
	 * @property {FancytreeOptions} options
	 * @property {FancytreeNode} rootNode
	 * @property {FancytreeNode} activeNode
	 * @property {FancytreeNode} focusNode
	 * @property {jQueryObject} $div
	 * @property {object} widget
	 * @property {object} ext
	 * @property {object} data
	 * @property {object} options
	 * @property {string} _id
	 * @property {string} statusClassPropName
	 * @property {string} ariaPropName
	 * @property {string} nodeContainerAttrName
	 * @property {string} $container
	 * @property {FancytreeNode} lastSelectedNode
	 */
	function Fancytree(widget) {
		this.widget = widget;
		this.$div = widget.element;
		this.options = widget.options;
		if( this.options ) {
			if(  $.isFunction(this.options.lazyload ) && !$.isFunction(this.options.lazyLoad) ) {
				this.options.lazyLoad = function() {
					FT.warn("The 'lazyload' event is deprecated since 2014-02-25. Use 'lazyLoad' (with uppercase L) instead.");
					return widget.options.lazyload.apply(this, arguments);
				};
			}
			if( $.isFunction(this.options.loaderror) ) {
				$.error("The 'loaderror' event was renamed since 2014-07-03. Use 'loadError' (with uppercase E) instead.");
			}
			if( this.options.fx !== undefined ) {
				FT.warn("The 'fx' options was replaced by 'toggleEffect' since 2014-11-30.");
			}
		}
		this.ext = {}; // Active extension instances
		// allow to init tree.data.foo from <div data-foo=''>
		this.data = _getElementDataAsDict(this.$div);
		this._id = $.ui.fancytree._nextId++;
		this._ns = ".fancytree-" + this._id; // append for namespaced events
		this.activeNode = null;
		this.focusNode = null;
		this._hasFocus = null;
		this.lastSelectedNode = null;
		this.systemFocusElement = null;
		this.lastQuicksearchTerm = "";
		this.lastQuicksearchTime = 0;

		this.statusClassPropName = "span";
		this.ariaPropName = "li";
		this.nodeContainerAttrName = "li";

		// Remove previous markup if any
		this.$div.find(">ul.fancytree-container").remove();

		// Create a node without parent.
		var fakeParent = { tree: this },
			$ul;
		this.rootNode = new FancytreeNode(fakeParent, {
			title: "root",
			key: "root_" + this._id,
			children: null,
			expanded: true
		});
		this.rootNode.parent = null;

		// Create root markup
		$ul = $("<ul>", {
			"class": "ui-fancytree fancytree-container"
		}).appendTo(this.$div);
		this.$container = $ul;
		this.rootNode.ul = $ul[0];

		if(this.options.debugLevel == null){
			this.options.debugLevel = FT.debugLevel;
		}
		// Add container to the TAB chain
		// See http://www.w3.org/TR/wai-aria-practices/#focus_activedescendant
		this.$container.attr("tabindex", this.options.tabbable ? "0" : "-1");
		if(this.options.aria){
			this.$container
				.attr("role", "tree")
				.attr("aria-multiselectable", true);
		}
	}


	Fancytree.prototype = /** @lends Fancytree# */{
		/* Return a context object that can be re-used for _callHook().
		 * @param {Fancytree | FancytreeNode | EventData} obj
		 * @param {Event} originalEvent
		 * @param {Object} extra
		 * @returns {EventData}
		 */
		_makeHookContext: function(obj, originalEvent, extra) {
			var ctx, tree;
			if(obj.node !== undefined){
				// obj is already a context object
				if(originalEvent && obj.originalEvent !== originalEvent){
					$.error("invalid args");
				}
				ctx = obj;
			}else if(obj.tree){
				// obj is a FancytreeNode
				tree = obj.tree;
				ctx = { node: obj, tree: tree, widget: tree.widget, options: tree.widget.options, originalEvent: originalEvent };
			}else if(obj.widget){
				// obj is a Fancytree
				ctx = { node: null, tree: obj, widget: obj.widget, options: obj.widget.options, originalEvent: originalEvent };
			}else{
				$.error("invalid args");
			}
			if(extra){
				$.extend(ctx, extra);
			}
			return ctx;
		},
		/* Trigger a hook function: funcName(ctx, [...]).
		 *
		 * @param {string} funcName
		 * @param {Fancytree|FancytreeNode|EventData} contextObject
		 * @param {any}  [_extraArgs] optional additional arguments
		 * @returns {any}
		 */
		_callHook: function(funcName, contextObject, _extraArgs) {
			var ctx = this._makeHookContext(contextObject),
				fn = this[funcName],
				args = Array.prototype.slice.call(arguments, 2);
			if(!$.isFunction(fn)){
				$.error("_callHook('" + funcName + "') is not a function");
			}
			args.unshift(ctx);
	//		this.debug("_hook", funcName, ctx.node && ctx.node.toString() || ctx.tree.toString(), args);
			return fn.apply(this, args);
		},
		/* Check if current extensions dependencies are met and throw an error if not.
		 *
		 * This method may be called inside the `treeInit` hook for custom extensions.
		 *
		 * @param {string} extension name of the required extension
		 * @param {boolean} [required=true] pass `false` if the extension is optional, but we want to check for order if it is present
		 * @param {boolean} [before] `true` if `name` must be included before this, `false` otherwise (use `null` if order doesn't matter)
		 * @param {string} [message] optional error message (defaults to a descriptve error message)
		 */
		_requireExtension: function(name, required, before, message) {
			before = !!before;
			var thisName = this._local.name,
				extList = this.options.extensions,
				isBefore = $.inArray(name, extList) < $.inArray(thisName, extList),
				isMissing = required && this.ext[name] == null,
				badOrder = !isMissing && before != null && (before !== isBefore);

			_assert(thisName && thisName !== name);

			if( isMissing || badOrder ){
				if( !message ){
					if( isMissing || required ){
						message = "'" + thisName + "' extension requires '" + name + "'";
						if( badOrder ){
							message += " to be registered " + (before ? "before" : "after") + " itself";
						}
					}else{
						message = "If used together, `" + name + "` must be registered " + (before ? "before" : "after") + " `" + thisName + "`";
					}
				}
				$.error(message);
				return false;
			}
			return true;
		},
		/** Activate node with a given key and fire focus and activate events.
		 *
		 * A prevously activated node will be deactivated.
		 * If activeVisible option is set, all parents will be expanded as necessary.
		 * Pass key = false, to deactivate the current node only.
		 * @param {string} key
		 * @returns {FancytreeNode} activated node (null, if not found)
		 */
		activateKey: function(key) {
			var node = this.getNodeByKey(key);
			if(node){
				node.setActive();
			}else if(this.activeNode){
				this.activeNode.setActive(false);
			}
			return node;
		},
		/** (experimental)
		 *
		 * @param {Array} patchList array of [key, NodePatch] arrays
		 * @returns {$.Promise} resolved, when all patches have been applied
		 * @see TreePatch
		 */
		applyPatch: function(patchList) {
			var dfd, i, p2, key, patch, node,
				patchCount = patchList.length,
				deferredList = [];

			for(i=0; i<patchCount; i++){
				p2 = patchList[i];
				_assert(p2.length === 2, "patchList must be an array of length-2-arrays");
				key = p2[0];
				patch = p2[1];
				node = (key === null) ? this.rootNode : this.getNodeByKey(key);
				if(node){
					dfd = new $.Deferred();
					deferredList.push(dfd);
					node.applyPatch(patch).always(_makeResolveFunc(dfd, node));
				}else{
					this.warn("could not find node with key '" + key + "'");
				}
			}
			// Return a promise that is resovled, when ALL patches were applied
			return $.when.apply($, deferredList).promise();
		},
		/* TODO: implement in dnd extension
		cancelDrag: function() {
			var dd = $.ui.ddmanager.current;
			if(dd){
				dd.cancel();
			}
		},
	   */
	   /** Return the number of nodes.
		* @returns {integer}
		*/
		count: function() {
			return this.rootNode.countChildren();
		},
		/** Write to browser console if debugLevel >= 2 (prepending tree name)
		 *
		 * @param {*} msg string or object or array of such
		 */
		debug: function(msg){
			if( this.options.debugLevel >= 2 ) {
				Array.prototype.unshift.call(arguments, this.toString());
				consoleApply("log", arguments);
			}
		},
		// TODO: disable()
		// TODO: enable()
		// TODO: enableUpdate()

		/** Find the next visible node that starts with `match`, starting at `startNode`
		 * and wrap-around at the end.
		 *
		 * @param {string|function} match
		 * @param {FancytreeNode} [startNode] defaults to first node
		 * @returns {FancytreeNode} matching node or null
		 */
		findNextNode: function(match, startNode, visibleOnly) {
			var stopNode = null,
				parentChildren = startNode.parent.children,
				matchingNode = null,
				walkVisible = function(parent, idx, fn) {
					var i, grandParent,
						parentChildren = parent.children,
						siblingCount = parentChildren.length,
						node = parentChildren[idx];
					// visit node itself
					if( node && fn(node) === false ) {
						return false;
					}
					// visit descendants
					if( node && node.children && node.expanded ) {
						if( walkVisible(node, 0, fn) === false ) {
							return false;
						}
					}
					// visit subsequent siblings
					for( i = idx + 1; i < siblingCount; i++ ) {
						if( walkVisible(parent, i, fn) === false ) {
							return false;
						}
					}
					// visit parent's subsequent siblings
					grandParent = parent.parent;
					if( grandParent ) {
						return walkVisible(grandParent, grandParent.children.indexOf(parent) + 1, fn);
					} else {
						// wrap-around: restart with first node
						return walkVisible(parent, 0, fn);
					}
				};

			match = (typeof match === "string") ? _makeNodeTitleStartMatcher(match) : match;
			startNode = startNode || this.getFirstChild();

			walkVisible(startNode.parent, parentChildren.indexOf(startNode), function(node){
				// Stop iteration if we see the start node a second time
				if( node === stopNode ) {
					return false;
				}
				stopNode = stopNode || node;
				// Ignore nodes hidden by a filter
				if( ! $(node.span).is(":visible") ) {
					node.debug("quicksearch: skipping hidden node");
					return;
				}
				// Test if we found a match, but search for a second match if this
				// was the currently active node
				if( match(node) ) {
					// node.debug("quicksearch match " + node.title, startNode);
					matchingNode = node;
					if( matchingNode !== startNode ) {
						return false;
					}
				}
			});
			return matchingNode;
		},
		// TODO: fromDict
		/**
		 * Generate INPUT elements that can be submitted with html forms.
		 *
		 * In selectMode 3 only the topmost selected nodes are considered.
		 *
		 * @param {boolean | string} [selected=true]
		 * @param {boolean | string} [active=true]
		 */
		generateFormElements: function(selected, active) {
			// TODO: test case
			var nodeList,
				selectedName = (selected !== false) ? "ft_" + this._id + "[]" : selected,
				activeName = (active !== false) ? "ft_" + this._id + "_active" : active,
				id = "fancytree_result_" + this._id,
				$result = $("#" + id);

			if($result.length){
				$result.empty();
			}else{
				$result = $("<div>", {
					id: id
				}).hide().insertAfter(this.$container);
			}
			if(selectedName){
				nodeList = this.getSelectedNodes( this.options.selectMode === 3 );
				$.each(nodeList, function(idx, node){
					$result.append($("<input>", {
						type: "checkbox",
						name: selectedName,
						value: node.key,
						checked: true
					}));
				});
			}
			if(activeName && this.activeNode){
				$result.append($("<input>", {
					type: "radio",
					name: activeName,
					value: this.activeNode.key,
					checked: true
				}));
			}
		},
		/**
		 * Return the currently active node or null.
		 * @returns {FancytreeNode}
		 */
		getActiveNode: function() {
			return this.activeNode;
		},
		/** Return the first top level node if any (not the invisible root node).
		 * @returns {FancytreeNode | null}
		 */
		getFirstChild: function() {
			return this.rootNode.getFirstChild();
		},
		/**
		 * Return node that has keyboard focus.
		 * @param {boolean} [ifTreeHasFocus=false] (not yet implemented)
		 * @returns {FancytreeNode}
		 */
		getFocusNode: function(ifTreeHasFocus) {
			// TODO: implement ifTreeHasFocus
			return this.focusNode;
		},
		/**
		 * Return node with a given key or null if not found.
		 * @param {string} key
		 * @param {FancytreeNode} [searchRoot] only search below this node
		 * @returns {FancytreeNode | null}
		 */
		getNodeByKey: function(key, searchRoot) {
			// Search the DOM by element ID (assuming this is faster than traversing all nodes).
			// $("#...") has problems, if the key contains '.', so we use getElementById()
			var el, match;
			if(!searchRoot){
				el = document.getElementById(this.options.idPrefix + key);
				if( el ){
					return el.ftnode ? el.ftnode : null;
				}
			}
			// Not found in the DOM, but still may be in an unrendered part of tree
			// TODO: optimize with specialized loop
			// TODO: consider keyMap?
			searchRoot = searchRoot || this.rootNode;
			match = null;
			searchRoot.visit(function(node){
	//            window.console.log("getNodeByKey(" + key + "): ", node.key);
				if(node.key === key) {
					match = node;
					return false;
				}
			}, true);
			return match;
		},
		/** Return the invisible system root node.
		 * @returns {FancytreeNode}
		 */
		getRootNode: function() {
			return this.rootNode;
		},
		/**
		 * Return an array of selected nodes.
		 * @param {boolean} [stopOnParents=false] only return the topmost selected
		 *     node (useful with selectMode 3)
		 * @returns {FancytreeNode[]}
		 */
		getSelectedNodes: function(stopOnParents) {
			var nodeList = [];
			this.rootNode.visit(function(node){
				if( node.selected ) {
					nodeList.push(node);
					if( stopOnParents === true ){
						return "skip"; // stop processing this branch
					}
				}
			});
			return nodeList;
		},
		/** Return true if the tree control has keyboard focus
		 * @returns {boolean}
		 */
		hasFocus: function(){
			return !!this._hasFocus;
		},
		/** Write to browser console if debugLevel >= 1 (prepending tree name)
		 * @param {*} msg string or object or array of such
		 */
		info: function(msg){
			if( this.options.debugLevel >= 1 ) {
				Array.prototype.unshift.call(arguments, this.toString());
				consoleApply("info", arguments);
			}
		},
	/*
		TODO: isInitializing: function() {
			return ( this.phase=="init" || this.phase=="postInit" );
		},
		TODO: isReloading: function() {
			return ( this.phase=="init" || this.phase=="postInit" ) && this.options.persist && this.persistence.cookiesFound;
		},
		TODO: isUserEvent: function() {
			return ( this.phase=="userEvent" );
		},
	*/

		/**
		 * Make sure that a node with a given ID is loaded, by traversing - and
		 * loading - its parents. This method is ment for lazy hierarchies.
		 * A callback is executed for every node as we go.
		 * @example
		 * tree.loadKeyPath("/_3/_23/_26/_27", function(node, status){
		 *   if(status === "loaded") {
		 *     console.log("loaded intermiediate node " + node);
		 *   }else if(status === "ok") {
		 *     node.activate();
		 *   }
		 * });
		 *
		 * @param {string | string[]} keyPathList one or more key paths (e.g. '/3/2_1/7')
		 * @param {function} callback callback(node, status) is called for every visited node ('loading', 'loaded', 'ok', 'error')
		 * @returns {$.Promise}
		 */
		loadKeyPath: function(keyPathList, callback, _rootNode) {
			var deferredList, dfd, i, path, key, loadMap, node, root, segList,
				sep = this.options.keyPathSeparator,
				self = this;

			if(!$.isArray(keyPathList)){
				keyPathList = [keyPathList];
			}
			// Pass 1: handle all path segments for nodes that are already loaded
			// Collect distinct top-most lazy nodes in a map
			loadMap = {};

			for(i=0; i<keyPathList.length; i++){
				root = _rootNode || this.rootNode;
				path = keyPathList[i];
				// strip leading slash
				if(path.charAt(0) === sep){
					path = path.substr(1);
				}
				// traverse and strip keys, until we hit a lazy, unloaded node
				segList = path.split(sep);
				while(segList.length){
					key = segList.shift();
	//                node = _findDirectChild(root, key);
					node = root._findDirectChild(key);
					if(!node){
						this.warn("loadKeyPath: key not found: " + key + " (parent: " + root + ")");
						callback.call(this, key, "error");
						break;
					}else if(segList.length === 0){
						callback.call(this, node, "ok");
						break;
					}else if(!node.lazy || (node.hasChildren() !== undefined )){
						callback.call(this, node, "loaded");
						root = node;
					}else{
						callback.call(this, node, "loaded");
	//                    segList.unshift(key);
						if(loadMap[key]){
							loadMap[key].push(segList.join(sep));
						}else{
							loadMap[key] = [segList.join(sep)];
						}
						break;
					}
				}
			}
	//        alert("loadKeyPath: loadMap=" + JSON.stringify(loadMap));
			// Now load all lazy nodes and continue itearation for remaining paths
			deferredList = [];
			// Avoid jshint warning 'Don't make functions within a loop.':
			function __lazyload(key, node, dfd){
				callback.call(self, node, "loading");
				node.load().done(function(){
					self.loadKeyPath.call(self, loadMap[key], callback, node).always(_makeResolveFunc(dfd, self));
				}).fail(function(errMsg){
					self.warn("loadKeyPath: error loading: " + key + " (parent: " + root + ")");
					callback.call(self, node, "error");
					dfd.reject();
				});
			}
			for(key in loadMap){
				node = root._findDirectChild(key);
	//            alert("loadKeyPath: lazy node(" + key + ") = " + node);
				dfd = new $.Deferred();
				deferredList.push(dfd);
				__lazyload(key, node, dfd);
			}
			// Return a promise that is resovled, when ALL paths were loaded
			return $.when.apply($, deferredList).promise();
		},
		/** Re-fire beforeActivate and activate events. */
		reactivate: function(setFocus) {
			var res,
				node = this.activeNode;

			if( !node ) {
				return _getResolvedPromise();
			}
			this.activeNode = null; // Force re-activating
			res = node.setActive();
			if( setFocus ){
				node.setFocus();
			}
			return res;
		},
		/** Reload tree from source and return a promise.
		 * @param [source] optional new source (defaults to initial source data)
		 * @returns {$.Promise}
		 */
		reload: function(source) {
			this._callHook("treeClear", this);
			return this._callHook("treeLoad", this, source);
		},
		/**Render tree (i.e. create DOM elements for all top-level nodes).
		 * @param {boolean} [force=false] create DOM elemnts, even is parent is collapsed
		 * @param {boolean} [deep=false]
		 */
		render: function(force, deep) {
			return this.rootNode.render(force, deep);
		},
		// TODO: selectKey: function(key, select)
		// TODO: serializeArray: function(stopOnParents)
		/**
		 * @param {boolean} [flag=true]
		 */
		setFocus: function(flag) {
			return this._callHook("treeSetFocus", this, flag);
		},
		/**
		 * Return all nodes as nested list of {@link NodeData}.
		 *
		 * @param {boolean} [includeRoot=false] Returns the hidden system root node (and its children)
		 * @param {function} [callback(node)] Called for every node
		 * @returns {Array | object}
		 * @see FancytreeNode#toDict
		 */
		toDict: function(includeRoot, callback){
			var res = this.rootNode.toDict(true, callback);
			return includeRoot ? res : res.children;
		},
		/* Implicitly called for string conversions.
		 * @returns {string}
		 */
		toString: function(){
			return "<Fancytree(#" + this._id + ")>";
		},
		/* _trigger a widget event with additional node ctx.
		 * @see EventData
		 */
		_triggerNodeEvent: function(type, node, originalEvent, extra) {
	//		this.debug("_trigger(" + type + "): '" + ctx.node.title + "'", ctx);
			var ctx = this._makeHookContext(node, originalEvent, extra),
				res = this.widget._trigger(type, originalEvent, ctx);
			if(res !== false && ctx.result !== undefined){
				return ctx.result;
			}
			return res;
		},
		/* _trigger a widget event with additional tree data. */
		_triggerTreeEvent: function(type, originalEvent, extra) {
	//		this.debug("_trigger(" + type + ")", ctx);
			var ctx = this._makeHookContext(this, originalEvent, extra),
				res = this.widget._trigger(type, originalEvent, ctx);

			if(res !== false && ctx.result !== undefined){
				return ctx.result;
			}
			return res;
		},
		/** Call fn(node) for all nodes.
		 *
		 * @param {function} fn the callback function.
		 *     Return false to stop iteration, return "skip" to skip this node and children only.
		 * @returns {boolean} false, if the iterator was stopped.
		 */
		visit: function(fn) {
			return this.rootNode.visit(fn, false);
		},
		/** Write warning to browser console (prepending tree info)
		 *
		 * @param {*} msg string or object or array of such
		 */
		warn: function(msg){
			Array.prototype.unshift.call(arguments, this.toString());
			consoleApply("warn", arguments);
		}
	};

	/**
	 * These additional methods of the {@link Fancytree} class are 'hook functions'
	 * that can be used and overloaded by extensions.
	 * (See <a href="https://github.com/mar10/fancytree/wiki/TutorialExtensions">writing extensions</a>.)
	 * @mixin Fancytree_Hooks
	 */
	$.extend(Fancytree.prototype,
		/** @lends Fancytree_Hooks# */
		{
		/** Default handling for mouse click events.
		 *
		 * @param {EventData} ctx
		 */
		nodeClick: function(ctx) {
	//      this.tree.logDebug("ftnode.onClick(" + event.type + "): ftnode:" + this + ", button:" + event.button + ", which: " + event.which);
			var activate, expand,
				// event = ctx.originalEvent,
				targetType = ctx.targetType,
				node = ctx.node;

			// TODO: use switch
			// TODO: make sure clicks on embedded <input> doesn't steal focus (see table sample)
			if( targetType === "expander" ) {
				// Clicking the expander icon always expands/collapses
				this._callHook("nodeToggleExpanded", ctx);

			} else if( targetType === "checkbox" ) {
				// Clicking the checkbox always (de)selects
				this._callHook("nodeToggleSelected", ctx);
				if( ctx.options.focusOnSelect ) { // #358
					this._callHook("nodeSetFocus", ctx, true);
				}

			} else {
				// Honor `clickFolderMode` for
				expand = false;
				activate = true;
				if( node.folder ) {
					switch( ctx.options.clickFolderMode ) {
					case 2: // expand only
						expand = true;
						activate = false;
						break;
					case 3: // expand and activate
						activate = true;
						expand = true; //!node.isExpanded();
						break;
					// else 1 or 4: just activate
					}
				}
				if( activate ) {
					this.nodeSetFocus(ctx);
					this._callHook("nodeSetActive", ctx, true);
				}
				if( expand ) {
					if(!activate){
	//                    this._callHook("nodeSetFocus", ctx);
					}
	//				this._callHook("nodeSetExpanded", ctx, true);
					this._callHook("nodeToggleExpanded", ctx);
				}
			}
			// Make sure that clicks stop, otherwise <a href='#'> jumps to the top
			// if(event.target.localName === "a" && event.target.className === "fancytree-title"){
			// 	event.preventDefault();
			// }
			// TODO: return promise?
		},
		/** Collapse all other  children of same parent.
		 *
		 * @param {EventData} ctx
		 * @param {object} callOpts
		 */
		nodeCollapseSiblings: function(ctx, callOpts) {
			// TODO: return promise?
			var ac, i, l,
				node = ctx.node;

			if( node.parent ){
				ac = node.parent.children;
				for (i=0, l=ac.length; i<l; i++) {
					if ( ac[i] !== node && ac[i].expanded ){
						this._callHook("nodeSetExpanded", ac[i], false, callOpts);
					}
				}
			}
		},
		/** Default handling for mouse douleclick events.
		 * @param {EventData} ctx
		 */
		nodeDblclick: function(ctx) {
			// TODO: return promise?
			if( ctx.targetType === "title" && ctx.options.clickFolderMode === 4) {
	//			this.nodeSetFocus(ctx);
	//			this._callHook("nodeSetActive", ctx, true);
				this._callHook("nodeToggleExpanded", ctx);
			}
			// TODO: prevent text selection on dblclicks
			if( ctx.targetType === "title" ) {
				ctx.originalEvent.preventDefault();
			}
		},
		/** Default handling for mouse keydown events.
		 *
		 * NOTE: this may be called with node == null if tree (but no node) has focus.
		 * @param {EventData} ctx
		 */
		nodeKeydown: function(ctx) {
			// TODO: return promise?
			var matchNode, stamp, res,
				event = ctx.originalEvent,
				node = ctx.node,
				tree = ctx.tree,
				opts = ctx.options,
				which = event.which,
				whichChar = String.fromCharCode(which),
				clean = !(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey),
				$target = $(event.target),
				handled = true,
				activate = !(event.ctrlKey || !opts.autoActivate );

	//		node.debug("ftnode.nodeKeydown(" + event.type + "): ftnode:" + this + ", charCode:" + event.charCode + ", keyCode: " + event.keyCode + ", which: " + event.which);
	//      FT.debug("keyEventToString", which, '"' + String.fromCharCode(which) + '"', '"' + FT.keyEventToString(event) + '"');

			// Set focus to first node, if no other node has the focus yet
			if( !node ){
				this.getFirstChild().setFocus();
				node = ctx.node = this.focusNode;
				node.debug("Keydown force focus on first node");
			}

			if( opts.quicksearch && clean && /\w/.test(whichChar) && !$target.is(":input:enabled") ) {
				// Allow to search for longer streaks if typed in quickly
				stamp = new Date().getTime();
				if( stamp - tree.lastQuicksearchTime > 500 ) {
					tree.lastQuicksearchTerm = "";
				}
				tree.lastQuicksearchTime = stamp;
				tree.lastQuicksearchTerm += whichChar;
				// tree.debug("quicksearch find", tree.lastQuicksearchTerm);
				matchNode = tree.findNextNode(tree.lastQuicksearchTerm, tree.getActiveNode());
				if( matchNode ) {
					matchNode.setActive();
				}
				event.preventDefault();
				return;
			}
			switch( FT.keyEventToString(event) ) {
				case "+":
				case "=": // 187: '+' @ Chrome, Safari
					tree.nodeSetExpanded(ctx, true);
					break;
				case "-":
					tree.nodeSetExpanded(ctx, false);
					break;
				case "space":
					if(opts.checkbox){
						tree.nodeToggleSelected(ctx);
					}else{
						tree.nodeSetActive(ctx, true);
					}
					break;
				case "enter":
					tree.nodeSetActive(ctx, true);
					break;
				case "backspace":
				case "left":
				case "right":
				case "up":
				case "down":
					res = node.navigate(event.which, activate);
					break;
				default:
					handled = false;
			}
			if(handled){
				event.preventDefault();
			}
		},


		// /** Default handling for mouse keypress events. */
		// nodeKeypress: function(ctx) {
		//     var event = ctx.originalEvent;
		// },

		// /** Trigger lazyLoad event (async). */
		// nodeLazyLoad: function(ctx) {
		//     var node = ctx.node;
		//     if(this._triggerNodeEvent())
		// },
		/** Load child nodes (async).
		 *
		 * @param {EventData} ctx
		 * @param {object[]|object|string|$.Promise|function} source
		 * @returns {$.Promise} The deferred will be resolved as soon as the (ajax)
		 *     data was rendered.
		 */
		nodeLoadChildren: function(ctx, source) {
			var ajax, delay, dfd,
				tree = ctx.tree,
				node = ctx.node;

			if($.isFunction(source)){
				source = source();
			}
			// TOTHINK: move to 'ajax' extension?
			if(source.url){
				// `source` is an Ajax options object
				ajax = $.extend({}, ctx.options.ajax, source);
				if(ajax.debugDelay){
					// simulate a slow server
					delay = ajax.debugDelay;
					if($.isArray(delay)){ // random delay range [min..max]
						delay = delay[0] + Math.random() * (delay[1] - delay[0]);
					}

					node.debug("nodeLoadChildren waiting debug delay " + Math.round(delay) + "ms");
					ajax.debugDelay = false;
					dfd = $.Deferred(function (dfd) {
						setTimeout(function () {
							$.ajax(ajax)
								.done(function () {	dfd.resolveWith(this, arguments); })
								.fail(function () {	dfd.rejectWith(this, arguments); });
						}, delay);
					});
				}else{
					dfd = $.ajax(ajax);
				}

				// Defer the deferred: we want to be able to reject, even if ajax
				// resolved ok.
				source = new $.Deferred();
				dfd.done(function (data, textStatus, jqXHR) {
					var errorObj, res;
					if(typeof data === "string"){
						$.error("Ajax request returned a string (did you get the JSON dataType wrong?).");
					}
					// postProcess is similar to the standard ajax dataFilter hook,
					// but it is also called for JSONP
					if( ctx.options.postProcess ){
						res = tree._triggerNodeEvent("postProcess", ctx, ctx.originalEvent, {response: data, error: null, dataType: this.dataType});
						if( res.error ) {
							errorObj = $.isPlainObject(res.error) ? res.error : {message: res.error};
							errorObj = tree._makeHookContext(node, null, errorObj);
							source.rejectWith(this, [errorObj]);
							return;
						}
						data = $.isArray(res) ? res : data;

					} else if (data && data.hasOwnProperty("d") && ctx.options.enableAspx ) {
						// Process ASPX WebMethod JSON object inside "d" property
						data = (typeof data.d === "string") ? $.parseJSON(data.d) : data.d;
					}
					source.resolveWith(this, [data]);
				}).fail(function (jqXHR, textStatus, errorThrown) {
					var errorObj = tree._makeHookContext(node, null, {
						error: jqXHR,
						args: Array.prototype.slice.call(arguments),
						message: errorThrown,
						details: jqXHR.status + ": " + errorThrown
					});
					source.rejectWith(this, [errorObj]);
				});
			}

			if($.isFunction(source.promise)){
				// `source` is a deferred, i.e. ajax request
				_assert(!node.isLoading());
				// node._isLoading = true;
				tree.nodeSetStatus(ctx, "loading");

				source.done(function (children) {
					tree.nodeSetStatus(ctx, "ok");
				}).fail(function(error){
					var ctxErr;
					if (error.node && error.error && error.message) {
						// error is already a context object
						ctxErr = error;
					} else {
						ctxErr = tree._makeHookContext(node, null, {
							error: error, // it can be jqXHR or any custom error
							args: Array.prototype.slice.call(arguments),
							message: error ? (error.message || error.toString()) : ""
						});
					}
					if( tree._triggerNodeEvent("loadError", ctxErr, null) !== false ) {
						tree.nodeSetStatus(ctx, "error", ctxErr.message, ctxErr.details);
					}
				});
			}
			// $.when(source) resolves also for non-deferreds
			return $.when(source).done(function(children){
				var metaData;

				if( $.isPlainObject(children) ){
					// We got {foo: 'abc', children: [...]}
					// Copy extra properties to tree.data.foo
					_assert($.isArray(children.children), "source must contain (or be) an array of children");
					_assert(node.isRoot(), "source may only be an object for root nodes");
					metaData = children;
					children = children.children;
					delete metaData.children;
					$.extend(tree.data, metaData);
				}
				_assert($.isArray(children), "expected array of children");
				node._setChildren(children);
				// trigger fancytreeloadchildren
				tree._triggerNodeEvent("loadChildren", node);
			// }).always(function(){
			// 	node._isLoading = false;
			});
		},
		/** [Not Implemented]  */
		nodeLoadKeyPath: function(ctx, keyPathList) {
			// TODO: implement and improve
			// http://code.google.com/p/dynatree/issues/detail?id=222
		},
		/**
		 * Remove a single direct child of ctx.node.
		 * @param {EventData} ctx
		 * @param {FancytreeNode} childNode dircect child of ctx.node
		 */
		nodeRemoveChild: function(ctx, childNode) {
			var idx,
				node = ctx.node,
				opts = ctx.options,
				subCtx = $.extend({}, ctx, {node: childNode}),
				children = node.children;

			// FT.debug("nodeRemoveChild()", node.toString(), childNode.toString());

			if( children.length === 1 ) {
				_assert(childNode === children[0]);
				return this.nodeRemoveChildren(ctx);
			}
			if( this.activeNode && (childNode === this.activeNode || this.activeNode.isDescendantOf(childNode))){
				this.activeNode.setActive(false); // TODO: don't fire events
			}
			if( this.focusNode && (childNode === this.focusNode || this.focusNode.isDescendantOf(childNode))){
				this.focusNode = null;
			}
			// TODO: persist must take care to clear select and expand cookies
			this.nodeRemoveMarkup(subCtx);
			this.nodeRemoveChildren(subCtx);
			idx = $.inArray(childNode, children);
			_assert(idx >= 0);
			// Unlink to support GC
			childNode.visit(function(n){
				n.parent = null;
			}, true);
			this._callHook("treeRegisterNode", this, false, childNode);
			if ( opts.removeNode ){
				opts.removeNode.call(ctx.tree, {type: "removeNode"}, subCtx);
			}
			// remove from child list
			children.splice(idx, 1);
		},
		/**Remove HTML markup for all descendents of ctx.node.
		 * @param {EventData} ctx
		 */
		nodeRemoveChildMarkup: function(ctx) {
			var node = ctx.node;

			// FT.debug("nodeRemoveChildMarkup()", node.toString());
			// TODO: Unlink attr.ftnode to support GC
			if(node.ul){
				if( node.isRoot() ) {
					$(node.ul).empty();
				} else {
					$(node.ul).remove();
					node.ul = null;
				}
				node.visit(function(n){
					n.li = n.ul = null;
				});
			}
		},
		/**Remove all descendants of ctx.node.
		* @param {EventData} ctx
		*/
		nodeRemoveChildren: function(ctx) {
			var subCtx,
				tree = ctx.tree,
				node = ctx.node,
				children = node.children,
				opts = ctx.options;

			// FT.debug("nodeRemoveChildren()", node.toString());
			if(!children){
				return;
			}
			if( this.activeNode && this.activeNode.isDescendantOf(node)){
				this.activeNode.setActive(false); // TODO: don't fire events
			}
			if( this.focusNode && this.focusNode.isDescendantOf(node)){
				this.focusNode = null;
			}
			// TODO: persist must take care to clear select and expand cookies
			this.nodeRemoveChildMarkup(ctx);
			// Unlink children to support GC
			// TODO: also delete this.children (not possible using visit())
			subCtx = $.extend({}, ctx);
			node.visit(function(n){
				n.parent = null;
				tree._callHook("treeRegisterNode", tree, false, n);
				if ( opts.removeNode ){
					subCtx.node = n;
					opts.removeNode.call(ctx.tree, {type: "removeNode"}, subCtx);
				}
			});
			if( node.lazy ){
				// 'undefined' would be interpreted as 'not yet loaded' for lazy nodes
				node.children = [];
			} else{
				node.children = null;
			}
			this.nodeRenderStatus(ctx);
		},
		/**Remove HTML markup for ctx.node and all its descendents.
		 * @param {EventData} ctx
		 */
		nodeRemoveMarkup: function(ctx) {
			var node = ctx.node;
			// FT.debug("nodeRemoveMarkup()", node.toString());
			// TODO: Unlink attr.ftnode to support GC
			if(node.li){
				$(node.li).remove();
				node.li = null;
			}
			this.nodeRemoveChildMarkup(ctx);
		},
		/**
		 * Create `&lt;li>&lt;span>..&lt;/span> .. &lt;/li>` tags for this node.
		 *
		 * This method takes care that all HTML markup is created that is required
		 * to display this node in it's current state.
		 *
		 * Call this method to create new nodes, or after the strucuture
		 * was changed (e.g. after moving this node or adding/removing children)
		 * nodeRenderTitle() and nodeRenderStatus() are implied.
		 *
		 * Note: if a node was created/removed, nodeRender() must be called for the
		 *       parent.
		 * <code>
		 * <li id='KEY' ftnode=NODE>
		 *     <span class='fancytree-node fancytree-expanded fancytree-has-children fancytree-lastsib fancytree-exp-el fancytree-ico-e'>
		 *         <span class="fancytree-expander"></span>
		 *         <span class="fancytree-checkbox"></span> // only present in checkbox mode
		 *         <span class="fancytree-icon"></span>
		 *         <a href="#" class="fancytree-title"> Node 1 </a>
		 *     </span>
		 *     <ul> // only present if node has children
		 *         <li id='KEY' ftnode=NODE> child1 ... </li>
		 *         <li id='KEY' ftnode=NODE> child2 ... </li>
		 *     </ul>
		 * </li>
		 * </code>
		 *
		 * @param {EventData} ctx
		 * @param {boolean} [force=false] re-render, even if html markup was already created
		 * @param {boolean} [deep=false] also render all descendants, even if parent is collapsed
		 * @param {boolean} [collapsed=false] force root node to be collapsed, so we can apply animated expand later
		 */
		nodeRender: function(ctx, force, deep, collapsed, _recursive) {
			/* This method must take care of all cases where the current data mode
			 * (i.e. node hierarchy) does not match the current markup.
			 *
			 * - node was not yet rendered:
			 *   create markup
			 * - node was rendered: exit fast
			 * - children have been added
			 * - childern have been removed
			 */
			var childLI, childNode1, childNode2, i, l, next, subCtx,
				node = ctx.node,
				tree = ctx.tree,
				opts = ctx.options,
				aria = opts.aria,
				firstTime = false,
				parent = node.parent,
				isRootNode = !parent,
				children = node.children;
			// FT.debug("nodeRender(" + !!force + ", " + !!deep + ")", node.toString());

			if( ! isRootNode && ! parent.ul ) {
				// Calling node.collapse on a deep, unrendered node
				return;
			}
			_assert(isRootNode || parent.ul, "parent UL must exist");

			// Render the node
			if( !isRootNode ){
				// Discard markup on force-mode, or if it is not linked to parent <ul>
				if(node.li && (force || (node.li.parentNode !== node.parent.ul) ) ){
					if(node.li.parentNode !== node.parent.ul){
						// May happen, when a top-level node was dropped over another
						this.debug("Unlinking " + node + " (must be child of " + node.parent + ")");
					}
	//	            this.debug("nodeRemoveMarkup...");
					this.nodeRemoveMarkup(ctx);
				}
				// Create <li><span /> </li>
	//			node.debug("render...");
				if( !node.li ) {
	//	            node.debug("render... really");
					firstTime = true;
					node.li = document.createElement("li");
					node.li.ftnode = node;
					if(aria){
						// TODO: why doesn't this work:
	//					node.li.role = "treeitem";
	//                    $(node.li).attr("role", "treeitem")
	//                    .attr("aria-labelledby", "ftal_" + node.key);
					}
					if( node.key && opts.generateIds ){
						node.li.id = opts.idPrefix + node.key;
					}
					node.span = document.createElement("span");
					node.span.className = "fancytree-node";
					if(aria){
						$(node.span).attr("aria-labelledby", "ftal_" + node.key);
					}
					node.li.appendChild(node.span);

					// Create inner HTML for the <span> (expander, checkbox, icon, and title)
					this.nodeRenderTitle(ctx);

					// Allow tweaking and binding, after node was created for the first time
					if ( opts.createNode ){
						opts.createNode.call(tree, {type: "createNode"}, ctx);
					}
				}else{
	//				this.nodeRenderTitle(ctx);
					this.nodeRenderStatus(ctx);
				}
				// Allow tweaking after node state was rendered
				if ( opts.renderNode ){
					opts.renderNode.call(tree, {type: "renderNode"}, ctx);
				}
			}

			// Visit child nodes
			if( children ){
				if( isRootNode || node.expanded || deep === true ) {
					// Create a UL to hold the children
					if( !node.ul ){
						node.ul = document.createElement("ul");
						if((collapsed === true && !_recursive) || !node.expanded){
							// hide top UL, so we can use an animation to show it later
							node.ul.style.display = "none";
						}
						if(aria){
							$(node.ul).attr("role", "group");
						}
						if ( node.li ) { // issue #67
							node.li.appendChild(node.ul);
						} else {
							node.tree.$div.append(node.ul);
						}
					}
					// Add child markup
					for(i=0, l=children.length; i<l; i++) {
						subCtx = $.extend({}, ctx, {node: children[i]});
						this.nodeRender(subCtx, force, deep, false, true);
					}
					// Remove <li> if nodes have moved to another parent
					childLI = node.ul.firstChild;
					while( childLI ){
						childNode2 = childLI.ftnode;
						if( childNode2 && childNode2.parent !== node ) {
							node.debug("_fixParent: remove missing " + childNode2, childLI);
							next = childLI.nextSibling;
							childLI.parentNode.removeChild(childLI);
							childLI = next;
						}else{
							childLI = childLI.nextSibling;
						}
					}
					// Make sure, that <li> order matches node.children order.
					childLI = node.ul.firstChild;
					for(i=0, l=children.length-1; i<l; i++) {
						childNode1 = children[i];
						childNode2 = childLI.ftnode;
						if( childNode1 !== childNode2 ) {
							// node.debug("_fixOrder: mismatch at index " + i + ": " + childNode1 + " != " + childNode2);
							node.ul.insertBefore(childNode1.li, childNode2.li);
						} else {
							childLI = childLI.nextSibling;
						}
					}
				}
			}else{
				// No children: remove markup if any
				if( node.ul ){
	//				alert("remove child markup for " + node);
					this.warn("remove child markup for " + node);
					this.nodeRemoveChildMarkup(ctx);
				}
			}
			if( !isRootNode ){
				// Update element classes according to node state
				// this.nodeRenderStatus(ctx);
				// Finally add the whole structure to the DOM, so the browser can render
				if(firstTime){
					parent.ul.appendChild(node.li);
				}
			}
		},
		/** Create HTML for the node's outer <span> (expander, checkbox, icon, and title).
		 *
		 * nodeRenderStatus() is implied.
		 * @param {EventData} ctx
		 * @param {string} [title] optinal new title
		 */
		nodeRenderTitle: function(ctx, title) {
			// set node connector images, links and text
			var id, iconSpanClass, nodeTitle, role, tabindex, tooltip,
				node = ctx.node,
				tree = ctx.tree,
				opts = ctx.options,
				aria = opts.aria,
				level = node.getLevel(),
				ares = [],
				iconSrc = node.data.icon;

			if(title !== undefined){
				node.title = title;
			}
			if(!node.span){
				// Silently bail out if node was not rendered yet, assuming
				// node.render() will be called as the node becomes visible
				return;
			}
			// connector (expanded, expandable or simple)
			// TODO: optimize this if clause
			if( level < opts.minExpandLevel ) {
				if( !node.lazy ) {
					node.expanded = true;
				}
				if(level > 1){
					if(aria){
						ares.push("<span role='button' class='fancytree-expander fancytree-expander-fixed'></span>");
					}else{
						ares.push("<span class='fancytree-expander fancytree-expander-fixed''></span>");
					}
				}
				// .. else (i.e. for root level) skip expander/connector alltogether
			} else {
				if(aria){
					ares.push("<span role='button' class='fancytree-expander'></span>");
				}else{
					ares.push("<span class='fancytree-expander'></span>");
				}
			}
			// Checkbox mode
			if( opts.checkbox && node.hideCheckbox !== true && !node.isStatusNode() ) {
				if(aria){
					ares.push("<span role='checkbox' class='fancytree-checkbox'></span>");
				}else{
					ares.push("<span class='fancytree-checkbox'></span>");
				}
			}
			// folder or doctype icon
			role = aria ? " role='img'" : "";
			if( iconSrc === true || (iconSrc !== false && opts.icons !== false) ) {
				// opts.icons defines the default behavior, node.icon == true/false can override this
				if ( iconSrc && typeof iconSrc === "string" ) {
					// node.icon is an image url
					iconSrc = (iconSrc.charAt(0) === "/") ? iconSrc : ((opts.imagePath || "") + iconSrc);
					ares.push("<img src='" + iconSrc + "' class='fancytree-icon' alt='' />");
				} else {
					// See if node.iconClass or opts.iconClass() define a class name
					iconSpanClass = (opts.iconClass && opts.iconClass.call(tree, node, ctx)) || node.data.iconclass || null;
					if( iconSpanClass ) {
						ares.push("<span " + role + " class='fancytree-custom-icon " + iconSpanClass +  "'></span>");
					} else {
						ares.push("<span " + role + " class='fancytree-icon'></span>");
					}
				}
			}

			// node title
			nodeTitle = "";
			if ( opts.renderTitle ){
				nodeTitle = opts.renderTitle.call(tree, {type: "renderTitle"}, ctx) || "";
			}
			if(!nodeTitle){
				tooltip = node.tooltip ? " title='" + FT.escapeHtml(node.tooltip) + "'" : "";
				id = aria ? " id='ftal_" + node.key + "'" : "";
				role = aria ? " role='treeitem'" : "";
				tabindex = opts.titlesTabbable ? " tabindex='0'" : "";

				nodeTitle = "<span " + role + " class='fancytree-title'" + id + tooltip + tabindex + ">" + node.title + "</span>";
			}
			ares.push(nodeTitle);
			// Note: this will trigger focusout, if node had the focus
			//$(node.span).html(ares.join("")); // it will cleanup the jQuery data currently associated with SPAN (if any), but it executes more slowly
			node.span.innerHTML = ares.join("");
			// Update CSS classes
			this.nodeRenderStatus(ctx);
		},
		/** Update element classes according to node state.
		 * @param {EventData} ctx
		 */
		nodeRenderStatus: function(ctx) {
			// Set classes for current status
			var node = ctx.node,
				tree = ctx.tree,
				opts = ctx.options,
	//			nodeContainer = node[tree.nodeContainerAttrName],
				hasChildren = node.hasChildren(),
				isLastSib = node.isLastSibling(),
				aria = opts.aria,
	//            $ariaElem = aria ? $(node[tree.ariaPropName]) : null,
				$ariaElem = $(node.span).find(".fancytree-title"),
				cn = opts._classNames,
				cnList = [],
				statusElem = node[tree.statusClassPropName];

			if( !statusElem ){
				// if this function is called for an unrendered node, ignore it (will be updated on nect render anyway)
				return;
			}
			// Build a list of class names that we will add to the node <span>
			cnList.push(cn.node);
			if( tree.activeNode === node ){
				cnList.push(cn.active);
	//			$(">span.fancytree-title", statusElem).attr("tabindex", "0");
	//			tree.$container.removeAttr("tabindex");
			// }else{
	//			$(">span.fancytree-title", statusElem).removeAttr("tabindex");
	//			tree.$container.attr("tabindex", "0");
			}
			if( tree.focusNode === node ){
				cnList.push(cn.focused);
				if(aria){
	//              $(">span.fancytree-title", statusElem).attr("tabindex", "0");
	//                $(">span.fancytree-title", statusElem).attr("tabindex", "-1");
					// TODO: is this the right element for this attribute?
					$ariaElem
						.attr("aria-activedescendant", true);
	//					.attr("tabindex", "-1");
				}
			}else if(aria){
	//			$(">span.fancytree-title", statusElem).attr("tabindex", "-1");
				$ariaElem
					.removeAttr("aria-activedescendant");
	//				.removeAttr("tabindex");
			}
			if( node.expanded ){
				cnList.push(cn.expanded);
				if(aria){
					$ariaElem.attr("aria-expanded", true);
				}
			}else if(aria){
				$ariaElem.removeAttr("aria-expanded");
			}
			if( node.folder ){
				cnList.push(cn.folder);
			}
			if( hasChildren !== false ){
				cnList.push(cn.hasChildren);
			}
			// TODO: required?
			if( isLastSib ){
				cnList.push(cn.lastsib);
			}
			if( node.lazy && node.children == null ){
				cnList.push(cn.lazy);
			}
			if( node.partsel ){
				cnList.push(cn.partsel);
			}
			if( node.unselectable ){
				cnList.push(cn.unselectable);
			}
			if( node._isLoading ){
				cnList.push(cn.loading);
			}
			if( node._error ){
				cnList.push(cn.error);
			}
			if( node.selected ){
				cnList.push(cn.selected);
				if(aria){
					$ariaElem.attr("aria-selected", true);
				}
			}else if(aria){
				$ariaElem.attr("aria-selected", false);
			}
			if( node.extraClasses ){
				cnList.push(node.extraClasses);
			}
			// IE6 doesn't correctly evaluate multiple class names,
			// so we create combined class names that can be used in the CSS
			if( hasChildren === false ){
				cnList.push(cn.combinedExpanderPrefix + "n" +
						(isLastSib ? "l" : "")
						);
			}else{
				cnList.push(cn.combinedExpanderPrefix +
						(node.expanded ? "e" : "c") +
						(node.lazy && node.children == null ? "d" : "") +
						(isLastSib ? "l" : "")
						);
			}
			cnList.push(cn.combinedIconPrefix +
					(node.expanded ? "e" : "c") +
					(node.folder ? "f" : "")
					);
	//        node.span.className = cnList.join(" ");
			statusElem.className = cnList.join(" ");

			// TODO: we should not set this in the <span> tag also, if we set it here:
			// Maybe most (all) of the classes should be set in LI instead of SPAN?
			if(node.li){
				node.li.className = isLastSib ? cn.lastsib : "";
			}
		},
		/** Activate node.
		 * flag defaults to true.
		 * If flag is true, the node is activated (must be a synchronous operation)
		 * If flag is false, the node is deactivated (must be a synchronous operation)
		 * @param {EventData} ctx
		 * @param {boolean} [flag=true]
		 * @param {object} [opts] additional options. Defaults to {noEvents: false}
		 * @returns {$.Promise}
		 */
		nodeSetActive: function(ctx, flag, callOpts) {
			// Handle user click / [space] / [enter], according to clickFolderMode.
			callOpts = callOpts || {};
			var subCtx,
				node = ctx.node,
				tree = ctx.tree,
				opts = ctx.options,
				noEvents = (callOpts.noEvents === true),
				isActive = (node === tree.activeNode);

			// flag defaults to true
			flag = (flag !== false);
			// node.debug("nodeSetActive", flag);

			if(isActive === flag){
				// Nothing to do
				return _getResolvedPromise(node);
			}else if(flag && !noEvents && this._triggerNodeEvent("beforeActivate", node, ctx.originalEvent) === false ){
				// Callback returned false
				return _getRejectedPromise(node, ["rejected"]);
			}
			if(flag){
				if(tree.activeNode){
					_assert(tree.activeNode !== node, "node was active (inconsistency)");
					subCtx = $.extend({}, ctx, {node: tree.activeNode});
					tree.nodeSetActive(subCtx, false);
					_assert(tree.activeNode === null, "deactivate was out of sync?");
				}
				if(opts.activeVisible){
					// tree.nodeMakeVisible(ctx);
					node.makeVisible({scrollIntoView: false}); // nodeSetFocus will scroll
				}
				tree.activeNode = node;
				tree.nodeRenderStatus(ctx);
				tree.nodeSetFocus(ctx);
				if( !noEvents ) {
					tree._triggerNodeEvent("activate", node, ctx.originalEvent);
				}
			}else{
				_assert(tree.activeNode === node, "node was not active (inconsistency)");
				tree.activeNode = null;
				this.nodeRenderStatus(ctx);
				if( !noEvents ) {
					ctx.tree._triggerNodeEvent("deactivate", node, ctx.originalEvent);
				}
			}
		},
		/** Expand or collapse node, return Deferred.promise.
		 *
		 * @param {EventData} ctx
		 * @param {boolean} [flag=true]
		 * @param {object} [opts] additional options. Defaults to {noAnimation: false, noEvents: false}
		 * @returns {$.Promise} The deferred will be resolved as soon as the (lazy)
		 *     data was retrieved, rendered, and the expand animation finshed.
		 */
		nodeSetExpanded: function(ctx, flag, callOpts) {
			callOpts = callOpts || {};
			var _afterLoad, dfd, i, l, parents, prevAC,
				node = ctx.node,
				tree = ctx.tree,
				opts = ctx.options,
				noAnimation = (callOpts.noAnimation === true),
				noEvents = (callOpts.noEvents === true);

			// flag defaults to true
			flag = (flag !== false);

			// node.debug("nodeSetExpanded(" + flag + ")");

			if((node.expanded && flag) || (!node.expanded && !flag)){
				// Nothing to do
				// node.debug("nodeSetExpanded(" + flag + "): nothing to do");
				return _getResolvedPromise(node);
			}else if(flag && !node.lazy && !node.hasChildren() ){
				// Prevent expanding of empty nodes
				// return _getRejectedPromise(node, ["empty"]);
				return _getResolvedPromise(node);
			}else if( !flag && node.getLevel() < opts.minExpandLevel ) {
				// Prevent collapsing locked levels
				return _getRejectedPromise(node, ["locked"]);
			}else if ( !noEvents && this._triggerNodeEvent("beforeExpand", node, ctx.originalEvent) === false ){
				// Callback returned false
				return _getRejectedPromise(node, ["rejected"]);
			}
			// If this node inside a collpased node, no animation and scrolling is needed
			if( !noAnimation && !node.isVisible() ) {
				noAnimation = callOpts.noAnimation = true;
			}

			dfd = new $.Deferred();

			// Auto-collapse mode: collapse all siblings
			if( flag && !node.expanded && opts.autoCollapse ) {
				parents = node.getParentList(false, true);
				prevAC = opts.autoCollapse;
				try{
					opts.autoCollapse = false;
					for(i=0, l=parents.length; i<l; i++){
						// TODO: should return promise?
						this._callHook("nodeCollapseSiblings", parents[i], callOpts);
					}
				}finally{
					opts.autoCollapse = prevAC;
				}
			}
			// Trigger expand/collapse after expanding
			dfd.done(function(){
				if( flag && opts.autoScroll && !noAnimation ) {
					// Scroll down to last child, but keep current node visible
					node.getLastChild().scrollIntoView(true, {topNode: node}).always(function(){
						if( !noEvents ) {
							ctx.tree._triggerNodeEvent(flag ? "expand" : "collapse", ctx);
						}
					});
				} else {
					if( !noEvents ) {
						ctx.tree._triggerNodeEvent(flag ? "expand" : "collapse", ctx);
					}
				}
			});
			// vvv Code below is executed after loading finished:
			_afterLoad = function(callback){
				var isVisible, isExpanded,
					effect = opts.toggleEffect;

				node.expanded = flag;
				// Create required markup, but make sure the top UL is hidden, so we
				// can animate later
				tree._callHook("nodeRender", ctx, false, false, true);

				// If the currently active node is now hidden, deactivate it
				// if( opts.activeVisible && this.activeNode && ! this.activeNode.isVisible() ) {
				//     this.activeNode.deactivate();
				// }

				// Expanding a lazy node: set 'loading...' and call callback
				// if( bExpand && this.data.isLazy && this.childList === null && !this._isLoading ) {
				//     this._loadContent();
				//     return;
				// }
				// Hide children, if node is collapsed
				if( node.ul ) {
					isVisible = (node.ul.style.display !== "none");
					isExpanded = !!node.expanded;
					if ( isVisible === isExpanded ) {
						node.warn("nodeSetExpanded: UL.style.display already set");

					} else if ( !effect || noAnimation ) {
						node.ul.style.display = ( node.expanded || !parent ) ? "" : "none";

					} else {
						// The UI toggle() effect works with the ext-wide extension,
						// while jQuery.animate() has problems when the title span
						// has positon: absolute

						// duration = opts.fx.duration || 200;
						// easing = opts.fx.easing;
						// $(node.ul).animate(opts.fx, duration, easing, function(){

						// node.debug("nodeSetExpanded: animate start...");
						$(node.ul).toggle(effect.effect, effect.options, effect.duration, function(){
							// node.debug("nodeSetExpanded: animate done");
							callback();
						});
						return;
					}
				}
				callback();
			};
			// ^^^ Code above is executed after loading finshed.

			// Load lazy nodes, if any. Then continue with _afterLoad()
			if(flag && node.lazy && node.hasChildren() === undefined){
				// node.debug("nodeSetExpanded: load start...");
				node.load().done(function(){
					// node.debug("nodeSetExpanded: load done");
					if(dfd.notifyWith){ // requires jQuery 1.6+
						dfd.notifyWith(node, ["loaded"]);
					}
					_afterLoad(function () { dfd.resolveWith(node); });
				}).fail(function(errMsg){
					_afterLoad(function () { dfd.rejectWith(node, ["load failed (" + errMsg + ")"]); });
				});
	/*
				var source = tree._triggerNodeEvent("lazyLoad", node, ctx.originalEvent);
				_assert(typeof source !== "boolean", "lazyLoad event must return source in data.result");
				node.debug("nodeSetExpanded: load start...");
				this._callHook("nodeLoadChildren", ctx, source).done(function(){
					node.debug("nodeSetExpanded: load done");
					if(dfd.notifyWith){ // requires jQuery 1.6+
						dfd.notifyWith(node, ["loaded"]);
					}
					_afterLoad.call(tree);
				}).fail(function(errMsg){
					dfd.rejectWith(node, ["load failed (" + errMsg + ")"]);
				});
	*/
			}else{
				_afterLoad(function () { dfd.resolveWith(node); });
			}
			// node.debug("nodeSetExpanded: returns");
			return dfd.promise();
		},
		/** Focus ot blur this node.
		 * @param {EventData} ctx
		 * @param {boolean} [flag=true]
		 */
		nodeSetFocus: function(ctx, flag) {
			// ctx.node.debug("nodeSetFocus(" + flag + ")");
			var ctx2,
				tree = ctx.tree,
				node = ctx.node;

			flag = (flag !== false);

			// Blur previous node if any
			if(tree.focusNode){
				if(tree.focusNode === node && flag){
					// node.debug("nodeSetFocus(" + flag + "): nothing to do");
					return;
				}
				ctx2 = $.extend({}, ctx, {node: tree.focusNode});
				tree.focusNode = null;
				this._triggerNodeEvent("blur", ctx2);
				this._callHook("nodeRenderStatus", ctx2);
			}
			// Set focus to container and node
			if(flag){
				if( !this.hasFocus() ){
					node.debug("nodeSetFocus: forcing container focus");
					// Note: we pass _calledByNodeSetFocus=true
					this._callHook("treeSetFocus", ctx, true, true);
				}
				// this.nodeMakeVisible(ctx);
				node.makeVisible({scrollIntoView: false});
				tree.focusNode = node;
	//			node.debug("FOCUS...");
	//			$(node.span).find(".fancytree-title").focus();
				this._triggerNodeEvent("focus", ctx);
	//          if(ctx.options.autoActivate){
	//              tree.nodeSetActive(ctx, true);
	//          }
				if(ctx.options.autoScroll){
					node.scrollIntoView();
				}
				this._callHook("nodeRenderStatus", ctx);
			}
		},
		/** (De)Select node, return new status (sync).
		 *
		 * @param {EventData} ctx
		 * @param {boolean} [flag=true]
		 */
		nodeSetSelected: function(ctx, flag) {
			var node = ctx.node,
				tree = ctx.tree,
				opts = ctx.options;
			// flag defaults to true
			flag = (flag !== false);

			node.debug("nodeSetSelected(" + flag + ")", ctx);
			if( node.unselectable){
				return;
			}
			// TODO: !!node.expanded is nicer, but doesn't pass jshint
			// https://github.com/jshint/jshint/issues/455
	//        if( !!node.expanded === !!flag){
			if((node.selected && flag) || (!node.selected && !flag)){
				return !!node.selected;
			}else if ( this._triggerNodeEvent("beforeSelect", node, ctx.originalEvent) === false ){
				return !!node.selected;
			}
			if(flag && opts.selectMode === 1){
				// single selection mode
				if(tree.lastSelectedNode){
					tree.lastSelectedNode.setSelected(false);
				}
			}else if(opts.selectMode === 3){
				// multi.hier selection mode
				node.selected = flag;
	//			this._fixSelectionState(node);
				node.fixSelection3AfterClick();
			}
			node.selected = flag;
			this.nodeRenderStatus(ctx);
			tree.lastSelectedNode = flag ? node : null;
			tree._triggerNodeEvent("select", ctx);
		},
		/** Show node status (ok, loading, error) using styles and a dummy child node.
		 *
		 * @param {EventData} ctx
		 * @param status
		 * @param message
		 * @param details
		 */
		nodeSetStatus: function(ctx, status, message, details) {
			var node = ctx.node,
				tree = ctx.tree;
				// cn = ctx.options._classNames;

			function _clearStatusNode() {
				// Remove dedicated dummy node, if any
				var firstChild = ( node.children ? node.children[0] : null );
				if ( firstChild && firstChild.isStatusNode() ) {
					try{
						// I've seen exceptions here with loadKeyPath...
						if(node.ul){
							node.ul.removeChild(firstChild.li);
							firstChild.li = null; // avoid leaks (DT issue 215)
						}
					}catch(e){}
					if( node.children.length === 1 ){
						node.children = [];
					}else{
						node.children.shift();
					}
				}
			}
			function _setStatusNode(data, type) {
				// Create/modify the dedicated dummy node for 'loading...' or
				// 'error!' status. (only called for direct child of the invisible
				// system root)
				var firstChild = ( node.children ? node.children[0] : null );
				if ( firstChild && firstChild.isStatusNode() ) {
					$.extend(firstChild, data);
					// tree._callHook("nodeRender", firstChild);
					tree._callHook("nodeRenderTitle", firstChild);
				} else {
					data.key = "_statusNode";
					node._setChildren([data]);
					node.children[0].statusNodeType = type;
					tree.render();
				}
				return node.children[0];
			}

			switch( status ){
			case "ok":
				_clearStatusNode();
				// $(node.span).removeClass(cn.loading).removeClass(cn.error);
				node._isLoading = false;
				node._error = null;
				node.renderStatus();
				break;
			case "loading":
				// $(node.span).removeClass(cn.error).addClass(cn.loading);
				if( !node.parent ) {
					_setStatusNode({
						title: tree.options.strings.loading + (message ? " (" + message + ") " : ""),
						tooltip: details,
						extraClasses: "fancytree-statusnode-wait"
					}, status);
				}
				node._isLoading = true;
				node._error = null;
				node.renderStatus();
				break;
			case "error":
				// $(node.span).removeClass(cn.loading).addClass(cn.error);
				_setStatusNode({
					title: tree.options.strings.loadError + (message ? " (" + message + ") " : ""),
					tooltip: details,
					extraClasses: "fancytree-statusnode-error"
				}, status);
				node._isLoading = false;
				node._error = { message: message, details: details };
				node.renderStatus();
				break;
			default:
				$.error("invalid node status " + status);
			}
		},
		/**
		 *
		 * @param {EventData} ctx
		 */
		nodeToggleExpanded: function(ctx) {
			return this.nodeSetExpanded(ctx, !ctx.node.expanded);
		},
		/**
		 * @param {EventData} ctx
		 */
		nodeToggleSelected: function(ctx) {
			return this.nodeSetSelected(ctx, !ctx.node.selected);
		},
		/** Remove all nodes.
		 * @param {EventData} ctx
		 */
		treeClear: function(ctx) {
			var tree = ctx.tree;
			tree.activeNode = null;
			tree.focusNode = null;
			tree.$div.find(">ul.fancytree-container").empty();
			// TODO: call destructors and remove reference loops
			tree.rootNode.children = null;
		},
		/** Widget was created (called only once, even it re-initialized).
		 * @param {EventData} ctx
		 */
		treeCreate: function(ctx) {
		},
		/** Widget was destroyed.
		 * @param {EventData} ctx
		 */
		treeDestroy: function(ctx) {
		},
		/** Widget was (re-)initialized.
		 * @param {EventData} ctx
		 */
		treeInit: function(ctx) {
			//this.debug("Fancytree.treeInit()");
			this.treeLoad(ctx);
		},
		/** Parse Fancytree from source, as configured in the options.
		 * @param {EventData} ctx
		 * @param {object} [source] optional new source (use last data otherwise)
		 */
		treeLoad: function(ctx, source) {
			var type, $ul,
				tree = ctx.tree,
				$container = ctx.widget.element,
				dfd,
				// calling context for root node
				rootCtx = $.extend({}, ctx, {node: this.rootNode});

			if(tree.rootNode.children){
				this.treeClear(ctx);
			}
			source = source || this.options.source;

			if(!source){
				type = $container.data("type") || "html";
				switch(type){
				case "html":
					$ul = $container.find(">ul:first");
					$ul.addClass("ui-fancytree-source ui-helper-hidden");
					source = $.ui.fancytree.parseHtml($ul);
					// allow to init tree.data.foo from <ul data-foo=''>
					this.data = $.extend(this.data, _getElementDataAsDict($ul));
					break;
				case "json":
		//            $().addClass("ui-helper-hidden");
					source = $.parseJSON($container.text());
					if(source.children){
						if(source.title){tree.title = source.title;}
						source = source.children;
					}
					break;
				default:
					$.error("Invalid data-type: " + type);
				}
			}else if(typeof source === "string"){
				// TODO: source is an element ID
				$.error("Not implemented");
			}

			// $container.addClass("ui-widget ui-widget-content ui-corner-all");
			// Trigger fancytreeinit after nodes have been loaded
			dfd = this.nodeLoadChildren(rootCtx, source).done(function(){
				tree.render();
				if( ctx.options.selectMode === 3 ){
					tree.rootNode.fixSelection3FromEndNodes();
				}
				tree._triggerTreeEvent("init", null, { status: true });
			}).fail(function(){
				tree.render();
				tree._triggerTreeEvent("init", null, { status: false });
			});
			return dfd;
		},
		/** Node was inserted into or removed from the tree.
		 * @param {EventData} ctx
		 * @param {boolean} add
		 * @param {FancytreeNode} node
		 */
		treeRegisterNode: function(ctx, add, node) {
		},
		/** Widget got focus.
		 * @param {EventData} ctx
		 * @param {boolean} [flag=true]
		 */
		treeSetFocus: function(ctx, flag, _calledByNodeSetFocus) {
			flag = (flag !== false);

			// this.debug("treeSetFocus(" + flag + "), _calledByNodeSetFocus: " + _calledByNodeSetFocus);
			// this.debug("    focusNode: " + this.focusNode);
			// this.debug("    activeNode: " + this.activeNode);
			if( flag !== this.hasFocus() ){
				this._hasFocus = flag;
				this.$container.toggleClass("fancytree-treefocus", flag);
				this._triggerTreeEvent(flag ? "focusTree" : "blurTree");
			}
		}
	});


	/* ******************************************************************************
	 * jQuery UI widget boilerplate
	 */

	/**
	 * The plugin (derrived from <a href=" http://api.jqueryui.com/jQuery.widget/">jQuery.Widget</a>).<br>
	 * This constructor is not called directly. Use `$(selector).fancytree({})`
	 * to initialize the plugin instead.<br>
	 * <pre class="sh_javascript sunlight-highlight-javascript">// Access widget methods and members:
	 * var tree = $("#tree").fancytree("getTree");
	 * var node = $("#tree").fancytree("getActiveNode", "1234");
	 * </pre>
	 *
	 * @mixin Fancytree_Widget
	 */

	$.widget("ui.fancytree",
		/** @lends Fancytree_Widget# */
		{
		/**These options will be used as defaults
		 * @type {FancytreeOptions}
		 */
		options:
		{
			activeVisible: true,
			ajax: {
				type: "GET",
				cache: false, // false: Append random '_' argument to the request url to prevent caching.
	//          timeout: 0, // >0: Make sure we get an ajax error if server is unreachable
				dataType: "json" // Expect json format and pass json object to callbacks.
			},  //
			aria: false, // TODO: default to true
			autoActivate: true,
			autoCollapse: false,
	//      autoFocus: false,
			autoScroll: false,
			checkbox: false,
			/**defines click behavior*/
			clickFolderMode: 4,
			debugLevel: null, // 0..2 (null: use global setting $.ui.fancytree.debugInfo)
			disabled: false, // TODO: required anymore?
			enableAspx: true, // TODO: document
			extensions: [],
			// fx: { height: "toggle", duration: 200 },
			// toggleEffect: { effect: "drop", options: {direction: "left"}, duration: 200 },
			// toggleEffect: { effect: "slide", options: {direction: "up"}, duration: 200 },
			toggleEffect: { effect: "blind", options: {direction: "vertical", scale: "box"}, duration: 200 },
			generateIds: false,
			icons: true,
			idPrefix: "ft_",
			focusOnSelect: false,
			keyboard: true,
			keyPathSeparator: "/",
			minExpandLevel: 1,
			quicksearch: false,
			scrollOfs: {top: 0, bottom: 0},
			scrollParent: null,
			selectMode: 2,
			strings: {
				loading: "Loading&#8230;",
				loadError: "Load error!"
			},
			tabbable: true,
			titlesTabbable: false,
			_classNames: {
				node: "fancytree-node",
				folder: "fancytree-folder",
				combinedExpanderPrefix: "fancytree-exp-",
				combinedIconPrefix: "fancytree-ico-",
				hasChildren: "fancytree-has-children",
				active: "fancytree-active",
				selected: "fancytree-selected",
				expanded: "fancytree-expanded",
				lazy: "fancytree-lazy",
				focused: "fancytree-focused",
				partsel: "fancytree-partsel",
				unselectable: "fancytree-unselectable",
				lastsib: "fancytree-lastsib",
				loading: "fancytree-loading",
				error: "fancytree-error"
			},
			// events
			lazyLoad: null,
			postProcess: null
		},
		/* Set up the widget, Called on first $().fancytree() */
		_create: function() {
			this.tree = new Fancytree(this);

			this.$source = this.source || this.element.data("type") === "json" ? this.element
				: this.element.find(">ul:first");
			// Subclass Fancytree instance with all enabled extensions
			var extension, extName, i,
				extensions = this.options.extensions,
				base = this.tree;

			for(i=0; i<extensions.length; i++){
				extName = extensions[i];
				extension = $.ui.fancytree._extensions[extName];
				if(!extension){
					$.error("Could not apply extension '" + extName + "' (it is not registered, did you forget to include it?)");
				}
				// Add extension options as tree.options.EXTENSION
	//			_assert(!this.tree.options[extName], "Extension name must not exist as option name: " + extName);
				this.tree.options[extName] = $.extend(true, {}, extension.options, this.tree.options[extName]);
				// Add a namespace tree.ext.EXTENSION, to hold instance data
				_assert(this.tree.ext[extName] === undefined, "Extension name must not exist as Fancytree.ext attribute: '" + extName + "'");
	//			this.tree[extName] = extension;
				this.tree.ext[extName] = {};
				// Subclass Fancytree methods using proxies.
				_subclassObject(this.tree, base, extension, extName);
				// current extension becomes base for the next extension
				base = extension;
			}
			//
			this.tree._callHook("treeCreate", this.tree);
			// Note: 'fancytreecreate' event is fired by widget base class
	//        this.tree._triggerTreeEvent("create");
		},

		/* Called on every $().fancytree() */
		_init: function() {
			this.tree._callHook("treeInit", this.tree);
			// TODO: currently we call bind after treeInit, because treeInit
			// might change tree.$container.
			// It would be better, to move ebent binding into hooks altogether
			this._bind();
		},

		/* Use the _setOption method to respond to changes to options */
		_setOption: function(key, value) {
			var callDefault = true,
				rerender = false;
			switch( key ) {
			case "aria":
			case "checkbox":
			case "icons":
			case "minExpandLevel":
			case "tabbable":
	//		case "nolink":
				this.tree._callHook("treeCreate", this.tree);
				rerender = true;
				break;
			case "source":
				callDefault = false;
				this.tree._callHook("treeLoad", this.tree, value);
				break;
			}
			this.tree.debug("set option " + key + "=" + value + " <" + typeof(value) + ">");
			if(callDefault){
				// In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
				$.Widget.prototype._setOption.apply(this, arguments);
				// TODO: In jQuery UI 1.9 and above, you use the _super method instead
	//          this._super( "_setOption", key, value );
			}
			if(rerender){
				this.tree.render(true, false);  // force, not-deep
			}
		},

		/** Use the destroy method to clean up any modifications your widget has made to the DOM */
		destroy: function() {
			this._unbind();
			this.tree._callHook("treeDestroy", this.tree);
			// this.element.removeClass("ui-widget ui-widget-content ui-corner-all");
			this.tree.$div.find(">ul.fancytree-container").remove();
			this.$source && this.$source.removeClass("ui-helper-hidden");
			// In jQuery UI 1.8, you must invoke the destroy method from the base widget
			$.Widget.prototype.destroy.call(this);
			// TODO: delete tree and nodes to make garbage collect easier?
			// TODO: In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
		},

		// -------------------------------------------------------------------------

		/* Remove all event handlers for our namespace */
		_unbind: function() {
			var ns = this.tree._ns;
			this.element.unbind(ns);
			this.tree.$container.unbind(ns);
			$(document).unbind(ns);
		},
		/* Add mouse and kyboard handlers to the container */
		_bind: function() {
			var that = this,
				opts = this.options,
				tree = this.tree,
				ns = tree._ns
				// selstartEvent = ( $.support.selectstart ? "selectstart" : "mousedown" )
				;

			// Remove all previuous handlers for this tree
			this._unbind();

			//alert("keydown" + ns + "foc=" + tree.hasFocus() + tree.$container);
			// tree.debug("bind events; container: ", tree.$container);
			tree.$container.on("focusin" + ns + " focusout" + ns, function(event){
				var node = FT.getNode(event),
					flag = (event.type === "focusin");
				// tree.debug("Tree container got event " + event.type, node, event);
				// tree.treeOnFocusInOut.call(tree, event);
				if(node){
					// For example clicking into an <input> that is part of a node
					tree._callHook("nodeSetFocus", node, flag);
				}else{
					tree._callHook("treeSetFocus", tree, flag);
				}
			}).on("selectstart" + ns, "span.fancytree-title", function(event){
				// prevent mouse-drags to select text ranges
				// tree.debug("<span title> got event " + event.type);
				event.preventDefault();
			}).on("keydown" + ns, function(event){
				// TODO: also bind keyup and keypress
				// tree.debug("got event " + event.type + ", hasFocus:" + tree.hasFocus());
				// if(opts.disabled || opts.keyboard === false || !tree.hasFocus() ){
				if(opts.disabled || opts.keyboard === false ){
					return true;
				}
				var res,
					node = tree.focusNode, // node may be null
					ctx = tree._makeHookContext(node || tree, event),
					prevPhase = tree.phase;

				try {
					tree.phase = "userEvent";
					// If a 'fancytreekeydown' handler returns false, skip the default
					// handling (implemented by tree.nodeKeydown()).
					if(node){
						res = tree._triggerNodeEvent("keydown", node, event);
					}else{
						res = tree._triggerTreeEvent("keydown", event);
					}
					if ( res === "preventNav" ){
						res = true; // prevent keyboard navigation, but don't prevent default handling of embedded input controls
					} else if ( res !== false ){
						res = tree._callHook("nodeKeydown", ctx);
					}
					return res;
				} finally {
					tree.phase = prevPhase;
				}
			}).on("click" + ns + " dblclick" + ns, function(event){
				if(opts.disabled){
					return true;
				}
				var ctx,
					et = FT.getEventTarget(event),
					node = et.node,
					tree = that.tree,
					prevPhase = tree.phase;

				if( !node ){
					return true;  // Allow bubbling of other events
				}
				ctx = tree._makeHookContext(node, event);
	//			that.tree.debug("event(" + event.type + "): node: ", node);
				try {
					tree.phase = "userEvent";
					switch(event.type) {
					case "click":
						ctx.targetType = et.type;
						return ( tree._triggerNodeEvent("click", ctx, event) === false ) ? false : tree._callHook("nodeClick", ctx);
					case "dblclick":
						ctx.targetType = et.type;
						return ( tree._triggerNodeEvent("dblclick", ctx, event) === false ) ? false : tree._callHook("nodeDblclick", ctx);
					}
	//             } catch(e) {
	// //                var _ = null; // DT issue 117 // TODO
	//                 $.error(e);
				} finally {
					tree.phase = prevPhase;
				}
			});
		},
		/** Return the active node or null.
		 * @returns {FancytreeNode}
		 */
		getActiveNode: function() {
			return this.tree.activeNode;
		},
		/** Return the matching node or null.
		 * @param {string} key
		 * @returns {FancytreeNode}
		 */
		getNodeByKey: function(key) {
			return this.tree.getNodeByKey(key);
		},
		/** Return the invisible system root node.
		 * @returns {FancytreeNode}
		 */
		getRootNode: function() {
			return this.tree.rootNode;
		},
		/** Return the current tree instance.
		 * @returns {Fancytree}
		 */
		getTree: function() {
			return this.tree;
		}
	});

	// $.ui.fancytree was created by the widget factory. Create a local shortcut:
	FT = $.ui.fancytree;

	/**
	 * Static members in the `$.ui.fancytree` namespace.<br>
	 * <br>
	 * <pre class="sh_javascript sunlight-highlight-javascript">// Access static members:
	 * var node = $.ui.fancytree.getNode(element);
	 * alert($.ui.fancytree.version);
	 * </pre>
	 *
	 * @mixin Fancytree_Static
	 */
	$.extend($.ui.fancytree,
		/** @lends Fancytree_Static# */
		{
		/** @type {string} */
		version: "2.7.0",      // Set to semver by 'grunt release'
		/** @type {string} */
		buildType: "production", // Set to 'production' by 'grunt build'
		/** @type {int} */
		debugLevel: 1,            // Set to 1 by 'grunt build'
								  // Used by $.ui.fancytree.debug() and as default for tree.options.debugLevel

		_nextId: 1,
		_nextNodeKey: 1,
		_extensions: {},
		// focusTree: null,

		/** Expose class object as $.ui.fancytree._FancytreeClass */
		_FancytreeClass: Fancytree,
		/** Expose class object as $.ui.fancytree._FancytreeNodeClass */
		_FancytreeNodeClass: FancytreeNode,
		/* Feature checks to provide backwards compatibility */
		jquerySupports: {
			// http://jqueryui.com/upgrade-guide/1.9/#deprecated-offset-option-merged-into-my-and-at
			positionMyOfs: isVersionAtLeast($.ui.version, 1, 9)
			},
		/** Throw an error if condition fails (debug method).
		 * @param {boolean} cond
		 * @param {string} msg
		 */
		assert: function(cond, msg){
			return _assert(cond, msg);
		},
		/** Return a function that executes *fn* at most every *timeout* ms.
		 * @param {integer} timeout
		 * @param {function} fn
		 * @param {boolean} [invokeAsap=false]
		 * @param {any} [ctx]
		 */
		debounce: function(timeout, fn, invokeAsap, ctx) {
			var timer;
			if(arguments.length === 3 && typeof invokeAsap !== "boolean") {
				ctx = invokeAsap;
				invokeAsap = false;
			}
			return function() {
				var args = arguments;
				ctx = ctx || this;
				invokeAsap && !timer && fn.apply(ctx, args);
				clearTimeout(timer);
				timer = setTimeout(function() {
					invokeAsap || fn.apply(ctx, args);
					timer = null;
				}, timeout);
			};
		},
		/** Write message to console if debugLevel >= 2
		 * @param {string} msg
		 */
		debug: function(msg){
			/*jshint expr:true */
			($.ui.fancytree.debugLevel >= 2) && consoleApply("log", arguments);
		},
		/** Write error message to console.
		 * @param {string} msg
		 */
		error: function(msg){
			consoleApply("error", arguments);
		},
		/** Convert &lt;, &gt;, &amp;, &quot;, &#39;, &#x2F; to the equivalent entitites.
		 *
		 * @param {string} s
		 * @returns {string}
		 */
		escapeHtml: function(s){
			return ("" + s).replace(/[&<>"'\/]/g, function (s) {
				return ENTITY_MAP[s];
			});
		},
		/** Return a {node: FancytreeNode, type: TYPE} object for a mouse event.
		 *
		 * @param {Event} event Mouse event, e.g. click, ...
		 * @returns {string} 'title' | 'prefix' | 'expander' | 'checkbox' | 'icon' | undefined
		 */
		getEventTargetType: function(event){
			return this.getEventTarget(event).type;
		},
		/** Return a {node: FancytreeNode, type: TYPE} object for a mouse event.
		 *
		 * @param {Event} event Mouse event, e.g. click, ...
		 * @returns {object} Return a {node: FancytreeNode, type: TYPE} object
		 *     TYPE: 'title' | 'prefix' | 'expander' | 'checkbox' | 'icon' | undefined
		 */
		getEventTarget: function(event){
			var tcn = event && event.target ? event.target.className : "",
				res = {node: this.getNode(event.target), type: undefined};
			// We use a fast version of $(res.node).hasClass()
			// See http://jsperf.com/test-for-classname/2
			if( /\bfancytree-title\b/.test(tcn) ){
				res.type = "title";
			}else if( /\bfancytree-expander\b/.test(tcn) ){
				res.type = (res.node.hasChildren() === false ? "prefix" : "expander");
			}else if( /\bfancytree-checkbox\b/.test(tcn) || /\bfancytree-radio\b/.test(tcn) ){
				res.type = "checkbox";
			}else if( /\bfancytree-icon\b/.test(tcn) ){
				res.type = "icon";
			}else if( /\bfancytree-node\b/.test(tcn) ){
				// Somewhere near the title
				res.type = "title";
			}else if( event && event.target && $(event.target).closest(".fancytree-title").length ) {
				// #228: clicking an embedded element inside a title
				res.type = "title";
			}
			return res;
		},
		/** Return a FancytreeNode instance from element.
		 *
		 * @param {Element | jQueryObject | Event} el
		 * @returns {FancytreeNode} matching node or null
		 */
		getNode: function(el){
			if(el instanceof FancytreeNode){
				return el; // el already was a FancytreeNode
			}else if(el.selector !== undefined){
				el = el[0]; // el was a jQuery object: use the DOM element
			}else if(el.originalEvent !== undefined){
				el = el.target; // el was an Event
			}
			while( el ) {
				if(el.ftnode) {
					return el.ftnode;
				}
				el = el.parentNode;
			}
			return null;
		},
		/* Return a Fancytree instance from element.
		* TODO: this function could help to get around the data('fancytree') / data('ui-fancytree') problem
		* @param {Element | jQueryObject | Event} el
		* @returns {Fancytree} matching tree or null
		* /
		getTree: function(el){
			if(el instanceof Fancytree){
				return el; // el already was a Fancytree
			}else if(el.selector !== undefined){
				el = el[0]; // el was a jQuery object: use the DOM element
			}else if(el.originalEvent !== undefined){
				el = el.target; // el was an Event
			}
			...
			return null;
		},
		*/
		/** Write message to console if debugLevel >= 1
		 * @param {string} msg
		 */
		info: function(msg){
			/*jshint expr:true */
			($.ui.fancytree.debugLevel >= 1) && consoleApply("info", arguments);
		},
		/** Convert a keydown event to a string like 'ctrl+a', 'ctrl+shift+f2'.
		 * @param {event}
		 * @returns {string}
		 */
		keyEventToString: function(event) {
			// Poor-man's hotkeys. See here for a complete implementation:
			//   https://github.com/jeresig/jquery.hotkeys
			var which = event.which,
				s = [];

			if( event.altKey ) { s.push("alt"); }
			if( event.ctrlKey ) { s.push("ctrl"); }
			if( event.metaKey ) { s.push("meta"); }
			if( event.shiftKey ) { s.push("shift"); }
			if( !IGNORE_KEYCODES[which] ) {
				s.push( SPECIAL_KEYCODES[which] || String.fromCharCode(which).toLowerCase() );
			}
			return s.join("+");
		},
		/**
		 * Parse tree data from HTML <ul> markup
		 *
		 * @param {jQueryObject} $ul
		 * @returns {NodeData[]}
		 */
		parseHtml: function($ul) {
			// TODO: understand this:
			/*jshint validthis:true */
			var extraClasses, i, l, iPos, tmp, tmp2, classes, className,
				$children = $ul.find(">li"),
				children = [];

			$children.each(function() {
				var allData,
					$li = $(this),
					$liSpan = $li.find(">span:first", this),
					$liA = $liSpan.length ? null : $li.find(">a:first"),
					d = { tooltip: null, data: {} };

				if( $liSpan.length ) {
					d.title = $liSpan.html();

				} else if( $liA && $liA.length ) {
					// If a <li><a> tag is specified, use it literally and extract href/target.
					d.title = $liA.html();
					d.data.href = $liA.attr("href");
					d.data.target = $liA.attr("target");
					d.tooltip = $liA.attr("title");

				} else {
					// If only a <li> tag is specified, use the trimmed string up to
					// the next child <ul> tag.
					d.title = $li.html();
					iPos = d.title.search(/<ul/i);
					if( iPos >= 0 ){
						d.title = d.title.substring(0, iPos);
					}
				}
				d.title = $.trim(d.title);

				// Make sure all fields exist
				for(i=0, l=CLASS_ATTRS.length; i<l; i++){
					d[CLASS_ATTRS[i]] = undefined;
				}
				// Initialize to `true`, if class is set and collect extraClasses
				classes = this.className.split(" ");
				extraClasses = [];
				for(i=0, l=classes.length; i<l; i++){
					className = classes[i];
					if(CLASS_ATTR_MAP[className]){
						d[className] = true;
					}else{
						extraClasses.push(className);
					}
				}
				d.extraClasses = extraClasses.join(" ");

				// Parse node options from ID, title and class attributes
				tmp = $li.attr("title");
				if( tmp ){
					d.tooltip = tmp; // overrides <a title='...'>
				}
				tmp = $li.attr("id");
				if( tmp ){
					d.key = tmp;
				}
				// Add <li data-NAME='...'> as node.data.NAME
				allData = _getElementDataAsDict($li);
				if(allData && !$.isEmptyObject(allData)) {
					// #56: Allow to set special node.attributes from data-...
					for(i=0, l=NODE_ATTRS.length; i<l; i++){
						tmp = NODE_ATTRS[i];
						tmp2 = allData[tmp];
						if( tmp2 != null ) {
							delete allData[tmp];
							d[tmp] = tmp2;
						}
					}
					// All other data-... goes to node.data...
					$.extend(d.data, allData);
				}
				// Recursive reading of child nodes, if LI tag contains an UL tag
				$ul = $li.find(">ul:first");
				if( $ul.length ) {
					d.children = $.ui.fancytree.parseHtml($ul);
				}else{
					d.children = d.lazy ? undefined : null;
				}
				children.push(d);
	//            FT.debug("parse ", d, children);
			});
			return children;
		},
		/** Add Fancytree extension definition to the list of globally available extensions.
		 *
		 * @param {object} definition
		 */
		registerExtension: function(definition){
			_assert(definition.name != null, "extensions must have a `name` property.");
			_assert(definition.version != null, "extensions must have a `version` property.");
			$.ui.fancytree._extensions[definition.name] = definition;
		},
		/** Inverse of escapeHtml().
		 *
		 * @param {string} s
		 * @returns {string}
		 */
		unescapeHtml: function(s){
			var e = document.createElement("div");
			e.innerHTML = s;
			return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
		},
		/** Write warning message to console.
		 * @param {string} msg
		 */
		warn: function(msg){
			consoleApply("warn", arguments);
		}
	});

	}(jQuery, window, document));


/***/ },
/* 53 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
