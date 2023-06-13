"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./../utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createFilterItemTemplate = function createFilterItemTemplate(filterData) {
  return filterData.map(function (_ref) {
    var name = _ref.name,
        amount = _ref.amount;
    return "<div class=\"trip-filters__filter\">\n     <input id=\"filter-".concat(name, "\" class=\"trip-filters__filter-input  visually-hidden\" type=\"radio\" name=\"trip-filter\" value=\"").concat(amount, "\" checked>\n     <label class=\"trip-filters__filter-label\" for=\"filter-everything\">").concat(name, " ").concat(amount, "</label>\n    </div>");
  }).join('');
};

var createFilterTemplate = function createFilterTemplate(filterData) {
  return "<form class=\"trip-filters\" action=\"#\" method=\"get\">\n    ".concat(createFilterItemTemplate(filterData), "\n    <button class=\"visually-hidden\" type=\"submit\">Accept filter</button>\n  </form>");
};

var Filter =
/*#__PURE__*/
function () {
  function Filter(filterData) {
    _classCallCheck(this, Filter);

    this._filterData = filterData;
    this._element = null;
  }

  _createClass(Filter, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createFilterTemplate(this._filterData);
    }
  }, {
    key: "getElement",
    value: function getElement() {
      if (!this._element) {
        this._element = (0, _utils.createElement)(this.getTemplate());
      }

      return this._element;
    }
  }, {
    key: "removeElement",
    value: function removeElement() {
      this._element = null;
    }
  }]);

  return Filter;
}();

exports["default"] = Filter;