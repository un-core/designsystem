/**
 *
 * Code generated by @wfp/icon-build-helpers. DO NOT EDIT.
 * @wfp/icon-build-helpers is a fork of @carbon/icon-build-helpers
 */
'use strict';

var iconPropTypes = require('./iconPropTypes-dc77abf6.js');
var React = require('react');
require('@carbon/icon-helpers');
require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _mask, _g, _mask2, _g2;

var _excluded = ["children", "size"];
var ShipNegative = /*#__PURE__*/React__default['default'].forwardRef(function ShipNegative(_ref, ref) {
  var children = _ref.children,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 16 : _ref$size,
      rest = iconPropTypes._objectWithoutProperties(_ref, _excluded);

  if (size === "glyph" || size === "glyph" || size === "glyphpx") {
    return /*#__PURE__*/React__default['default'].createElement(iconPropTypes.Icon, iconPropTypes._objectSpread2({
      width: size,
      height: size,
      ref: ref,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      viewBox: "0 0 56 56"
    }, rest), _mask || (_mask = /*#__PURE__*/React__default['default'].createElement("mask", {
      id: "a",
      width: "56",
      height: "56",
      x: "0",
      y: "0",
      maskUnits: "userSpaceOnUse"
    }, /*#__PURE__*/React__default['default'].createElement("path", {
      "fill-rule": "evenodd",
      d: "M0 0H56V56H0V0Z",
      "clip-rule": "evenodd"
    }))), _g || (_g = /*#__PURE__*/React__default['default'].createElement("g", {
      mask: "url(#a)"
    }, /*#__PURE__*/React__default['default'].createElement("path", {
      d: "M45.0579 39.1807C44.0121 39.1807 43.5751 39.4212 42.916 39.7852C42.113 40.2281 41.1126 40.7788 39.2618 40.7788C37.41 40.7788 36.4096 40.2281 35.6055 39.7852C34.9465 39.4212 34.5114 39.1807 33.4637 39.1807C32.4189 39.1807 31.9828 39.4212 31.3257 39.7852C30.5217 40.2281 29.5223 40.7788 27.6715 40.7788C25.8197 40.7788 24.8213 40.2281 24.0172 39.7852C23.3582 39.4212 22.9231 39.1807 21.8763 39.1807C20.8325 39.1807 20.3965 39.4212 19.7374 39.7852C18.9344 40.2281 17.935 40.7788 16.0841 40.7788C14.2333 40.7788 13.2349 40.2271 12.4318 39.7852C11.7728 39.4212 11.3377 39.1807 10.2929 39.1807C9.42081 39.1807 8.71344 38.4655 8.71344 37.5837C8.71344 36.7009 9.42081 35.9857 10.2929 35.9857C12.1438 35.9857 13.1432 36.5373 13.9452 36.9802C14.6043 37.3433 15.0403 37.5837 16.0841 37.5837C17.1299 37.5837 17.565 37.3433 18.223 36.9802C19.0271 36.5373 20.0255 35.9857 21.8763 35.9857C23.7281 35.9857 24.7285 36.5363 25.5316 36.9802C26.1896 37.3433 26.6257 37.5837 27.6715 37.5837C28.7172 37.5837 29.1513 37.3433 29.8104 36.9802C30.6134 36.5373 31.6128 35.9857 33.4637 35.9857C35.3164 35.9857 36.3158 36.5363 37.1199 36.9802C37.7799 37.3433 38.215 37.5837 39.2618 37.5837C40.3075 37.5837 40.7426 37.3433 41.4026 36.9802C42.2067 36.5363 43.2051 35.9857 45.0579 35.9857C45.93 35.9857 46.6384 36.7009 46.6384 37.5837C46.6384 38.4655 45.93 39.1807 45.0579 39.1807ZM45.0579 45.5729C44.0121 45.5729 43.5751 45.8123 42.916 46.1754C42.113 46.6193 41.1126 47.1699 39.2618 47.1699C37.41 47.1699 36.4096 46.6193 35.6055 46.1754C34.9465 45.8123 34.5114 45.5729 33.4637 45.5729C32.4189 45.5729 31.9828 45.8123 31.3257 46.1754C30.5217 46.6193 29.5223 47.1699 27.6715 47.1699C25.8197 47.1699 24.8213 46.6193 24.0172 46.1754C23.3582 45.8123 22.9231 45.5729 21.8763 45.5729C20.8325 45.5729 20.3965 45.8123 19.7374 46.1754C18.9344 46.6193 17.935 47.1699 16.0841 47.1699C14.2333 47.1699 13.2349 46.6183 12.4318 46.1754C11.7728 45.8123 11.3377 45.5729 10.2929 45.5729C9.42081 45.5729 8.71344 44.8567 8.71344 43.9739C8.71344 43.092 9.42081 42.3768 10.2929 42.3768C12.1438 42.3768 13.1432 42.9284 13.9452 43.3703C14.6043 43.7344 15.0403 43.9739 16.0841 43.9739C17.1299 43.9739 17.565 43.7344 18.223 43.3703C19.0271 42.9284 20.0255 42.3768 21.8763 42.3768C23.7281 42.3768 24.7285 42.9274 25.5316 43.3703C26.1896 43.7344 26.6257 43.9739 27.6715 43.9739C28.7172 43.9739 29.1513 43.7344 29.8104 43.3703C30.6134 42.9284 31.6128 42.3768 33.4637 42.3768C35.3164 42.3768 36.3158 42.9274 37.1199 43.3703C37.7799 43.7344 38.215 43.9739 39.2618 43.9739C40.3075 43.9739 40.7426 43.7344 41.4026 43.3703C42.2067 42.9274 43.2051 42.3768 45.0579 42.3768C45.93 42.3768 46.6384 43.092 46.6384 43.9739C46.6384 44.8567 45.93 45.5729 45.0579 45.5729ZM12.6716 24.0024H41.0998C42.0311 24.0024 42.7828 24.8094 42.6793 25.7361C42.332 29.012 41.0208 31.9916 39.0378 34.3807C38.1519 34.3487 37.7336 34.1243 37.1179 33.7812C36.3188 33.3412 35.3155 32.7906 33.4666 32.7906C31.6109 32.7906 30.6144 33.3412 29.8084 33.7812C29.1523 34.1482 28.7182 34.3876 27.6754 34.3876C26.6247 34.3876 26.1896 34.1482 25.5336 33.7812C24.7285 33.3412 23.7242 32.7906 21.8753 32.7906C20.0275 32.7906 19.0241 33.3412 18.226 33.7812C17.562 34.1482 17.1279 34.3876 16.0841 34.3876C15.3422 34.3876 14.9081 34.2679 14.481 34.0605C12.64 31.7282 11.4236 28.8673 11.0921 25.7361C10.9885 24.8094 11.7393 24.0024 12.6716 24.0024ZM15.0344 18.4103C15.0344 17.9694 15.3876 17.6123 15.8247 17.6123H37.9467C38.3837 17.6123 38.7369 17.9694 38.7369 18.4103V20.8074C38.7369 21.2483 38.3837 21.6064 37.9467 21.6064H15.8247C15.3876 21.6064 15.0344 21.2483 15.0344 20.8074V18.4103ZM19.7749 9.62311C19.7749 9.1842 20.1301 8.8241 20.5642 8.8241H25.3057C25.7398 8.8241 26.0959 9.1842 26.0959 9.62311V14.4162C26.0959 14.8561 25.7398 15.2152 25.3057 15.2152H20.5642C20.1301 15.2152 19.7749 14.8561 19.7749 14.4162V9.62311ZM27.6754 9.62311C27.6754 9.1842 28.0316 8.8241 28.4657 8.8241H33.2062C33.6403 8.8241 33.9954 9.1842 33.9954 9.62311V14.4162C33.9954 14.8561 33.6403 15.2152 33.2062 15.2152H28.4657C28.0316 15.2152 27.6754 14.8561 27.6754 14.4162V9.62311ZM53.6667 0H2.33325C1.04972 0 0 1.06137 0 2.35914V53.6409C0 54.9386 1.04972 56 2.33325 56H53.6667C54.9503 56 56 54.9386 56 53.6409V2.35914C56 1.06137 54.9503 0 53.6667 0Z",
      "clip-rule": "evenodd"
    }))), children);
  }

  return /*#__PURE__*/React__default['default'].createElement(iconPropTypes.Icon, iconPropTypes._objectSpread2({
    width: size,
    height: size,
    ref: ref,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 56 56"
  }, rest), _mask2 || (_mask2 = /*#__PURE__*/React__default['default'].createElement("mask", {
    id: "a",
    width: "56",
    height: "56",
    x: "0",
    y: "0",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    "fill-rule": "evenodd",
    d: "M0 0H56V56H0V0Z",
    "clip-rule": "evenodd"
  }))), _g2 || (_g2 = /*#__PURE__*/React__default['default'].createElement("g", {
    mask: "url(#a)"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M45.0579 39.1807C44.0121 39.1807 43.5751 39.4212 42.916 39.7852C42.113 40.2281 41.1126 40.7788 39.2618 40.7788C37.41 40.7788 36.4096 40.2281 35.6055 39.7852C34.9465 39.4212 34.5114 39.1807 33.4637 39.1807C32.4189 39.1807 31.9828 39.4212 31.3257 39.7852C30.5217 40.2281 29.5223 40.7788 27.6715 40.7788C25.8197 40.7788 24.8213 40.2281 24.0172 39.7852C23.3582 39.4212 22.9231 39.1807 21.8763 39.1807C20.8325 39.1807 20.3965 39.4212 19.7374 39.7852C18.9344 40.2281 17.935 40.7788 16.0841 40.7788C14.2333 40.7788 13.2349 40.2271 12.4318 39.7852C11.7728 39.4212 11.3377 39.1807 10.2929 39.1807C9.42081 39.1807 8.71344 38.4655 8.71344 37.5837C8.71344 36.7009 9.42081 35.9857 10.2929 35.9857C12.1438 35.9857 13.1432 36.5373 13.9452 36.9802C14.6043 37.3433 15.0403 37.5837 16.0841 37.5837C17.1299 37.5837 17.565 37.3433 18.223 36.9802C19.0271 36.5373 20.0255 35.9857 21.8763 35.9857C23.7281 35.9857 24.7285 36.5363 25.5316 36.9802C26.1896 37.3433 26.6257 37.5837 27.6715 37.5837C28.7172 37.5837 29.1513 37.3433 29.8104 36.9802C30.6134 36.5373 31.6128 35.9857 33.4637 35.9857C35.3164 35.9857 36.3158 36.5363 37.1199 36.9802C37.7799 37.3433 38.215 37.5837 39.2618 37.5837C40.3075 37.5837 40.7426 37.3433 41.4026 36.9802C42.2067 36.5363 43.2051 35.9857 45.0579 35.9857C45.93 35.9857 46.6384 36.7009 46.6384 37.5837C46.6384 38.4655 45.93 39.1807 45.0579 39.1807ZM45.0579 45.5729C44.0121 45.5729 43.5751 45.8123 42.916 46.1754C42.113 46.6193 41.1126 47.1699 39.2618 47.1699C37.41 47.1699 36.4096 46.6193 35.6055 46.1754C34.9465 45.8123 34.5114 45.5729 33.4637 45.5729C32.4189 45.5729 31.9828 45.8123 31.3257 46.1754C30.5217 46.6193 29.5223 47.1699 27.6715 47.1699C25.8197 47.1699 24.8213 46.6193 24.0172 46.1754C23.3582 45.8123 22.9231 45.5729 21.8763 45.5729C20.8325 45.5729 20.3965 45.8123 19.7374 46.1754C18.9344 46.6193 17.935 47.1699 16.0841 47.1699C14.2333 47.1699 13.2349 46.6183 12.4318 46.1754C11.7728 45.8123 11.3377 45.5729 10.2929 45.5729C9.42081 45.5729 8.71344 44.8567 8.71344 43.9739C8.71344 43.092 9.42081 42.3768 10.2929 42.3768C12.1438 42.3768 13.1432 42.9284 13.9452 43.3703C14.6043 43.7344 15.0403 43.9739 16.0841 43.9739C17.1299 43.9739 17.565 43.7344 18.223 43.3703C19.0271 42.9284 20.0255 42.3768 21.8763 42.3768C23.7281 42.3768 24.7285 42.9274 25.5316 43.3703C26.1896 43.7344 26.6257 43.9739 27.6715 43.9739C28.7172 43.9739 29.1513 43.7344 29.8104 43.3703C30.6134 42.9284 31.6128 42.3768 33.4637 42.3768C35.3164 42.3768 36.3158 42.9274 37.1199 43.3703C37.7799 43.7344 38.215 43.9739 39.2618 43.9739C40.3075 43.9739 40.7426 43.7344 41.4026 43.3703C42.2067 42.9274 43.2051 42.3768 45.0579 42.3768C45.93 42.3768 46.6384 43.092 46.6384 43.9739C46.6384 44.8567 45.93 45.5729 45.0579 45.5729ZM12.6716 24.0024H41.0998C42.0311 24.0024 42.7828 24.8094 42.6793 25.7361C42.332 29.012 41.0208 31.9916 39.0378 34.3807C38.1519 34.3487 37.7336 34.1243 37.1179 33.7812C36.3188 33.3412 35.3155 32.7906 33.4666 32.7906C31.6109 32.7906 30.6144 33.3412 29.8084 33.7812C29.1523 34.1482 28.7182 34.3876 27.6754 34.3876C26.6247 34.3876 26.1896 34.1482 25.5336 33.7812C24.7285 33.3412 23.7242 32.7906 21.8753 32.7906C20.0275 32.7906 19.0241 33.3412 18.226 33.7812C17.562 34.1482 17.1279 34.3876 16.0841 34.3876C15.3422 34.3876 14.9081 34.2679 14.481 34.0605C12.64 31.7282 11.4236 28.8673 11.0921 25.7361C10.9885 24.8094 11.7393 24.0024 12.6716 24.0024ZM15.0344 18.4103C15.0344 17.9694 15.3876 17.6123 15.8247 17.6123H37.9467C38.3837 17.6123 38.7369 17.9694 38.7369 18.4103V20.8074C38.7369 21.2483 38.3837 21.6064 37.9467 21.6064H15.8247C15.3876 21.6064 15.0344 21.2483 15.0344 20.8074V18.4103ZM19.7749 9.62311C19.7749 9.1842 20.1301 8.8241 20.5642 8.8241H25.3057C25.7398 8.8241 26.0959 9.1842 26.0959 9.62311V14.4162C26.0959 14.8561 25.7398 15.2152 25.3057 15.2152H20.5642C20.1301 15.2152 19.7749 14.8561 19.7749 14.4162V9.62311ZM27.6754 9.62311C27.6754 9.1842 28.0316 8.8241 28.4657 8.8241H33.2062C33.6403 8.8241 33.9954 9.1842 33.9954 9.62311V14.4162C33.9954 14.8561 33.6403 15.2152 33.2062 15.2152H28.4657C28.0316 15.2152 27.6754 14.8561 27.6754 14.4162V9.62311ZM53.6667 0H2.33325C1.04972 0 0 1.06137 0 2.35914V53.6409C0 54.9386 1.04972 56 2.33325 56H53.6667C54.9503 56 56 54.9386 56 53.6409V2.35914C56 1.06137 54.9503 0 53.6667 0Z",
    "clip-rule": "evenodd"
  }))), children);
});
ShipNegative.propTypes = iconPropTypes.iconPropTypes;

module.exports = ShipNegative;
