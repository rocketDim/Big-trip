"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilterTemplate = void 0;

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

exports.createFilterTemplate = createFilterTemplate;