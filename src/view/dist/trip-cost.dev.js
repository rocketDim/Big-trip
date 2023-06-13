"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./../utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getTotalCost = function getTotalCost(pointData) {
  var totalCost = 0;
  pointData.forEach(function (_ref) {
    var basePrice = _ref.basePrice;
    return totalCost += basePrice;
  });
  return totalCost;
};

var createTripCostTemplate = function createTripCostTemplate(pointData) {
  return "<p class=\"trip-info__cost\">\n    Total: &euro;&nbsp;<span class=\"trip-info__cost-value\">".concat(getTotalCost(pointData), "</span>\n  </p>");
};

var TripCost =
/*#__PURE__*/
function () {
  function TripCost(pointData) {
    _classCallCheck(this, TripCost);

    this._pointData = pointData;
    this._element = null;
  }

  _createClass(TripCost, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createTripCostTemplate(this._pointData);
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

  return TripCost;
}();

exports["default"] = TripCost;