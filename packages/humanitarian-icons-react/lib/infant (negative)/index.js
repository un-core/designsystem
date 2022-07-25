/**
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Code generated by @un/icon-build-helpers. DO NOT EDIT.
 * @un/icon-build-helpers is a fork of @carbon/icon-build-helpers
 */
'use strict';

var Icon = require('../Icon-17378097.js');
var React = require('react');
require('@carbon/icon-helpers');
require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _mask, _g;

var _excluded = ["children"];
var InfantNegative = /*#__PURE__*/React__default['default'].forwardRef(function InfantNegative(_ref, ref) {
  var children = _ref.children,
      rest = Icon._objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React__default['default'].createElement(Icon.Icon, Icon._extends({
    width: 56,
    height: 56,
    viewBox: "0 0 56 56",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    ref: ref
  }, rest), _mask || (_mask = /*#__PURE__*/React__default['default'].createElement("mask", {
    id: "a",
    width: "56",
    height: "56",
    x: "0",
    y: "0",
    maskUnits: "userSpaceOnUse"
  })), _g || (_g = /*#__PURE__*/React__default['default'].createElement("g", {
    mask: "url(#a)"
  })), children);
});

module.exports = InfantNegative;
