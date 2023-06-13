"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./../utils.js");

var _const = require("./../const.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getTotalRoute = function getTotalRoute(pointData) {
  var uniqueCityList = new Set(pointData.map(function (_ref) {
    var destination = _ref.destination;
    return destination.name;
  }));
  var totalRoute = Array.from(uniqueCityList).join(' &mdash; ');
  return totalRoute;
};

var getTotalDateGap = function getTotalDateGap(pointData) {
  var datesFrom = pointData.map(function (_ref2) {
    var dateFrom = _ref2.dateFrom;
    return dateFrom;
  }).sort(_utils.compareTwoDates).shift();
  var datesTo = pointData.map(function (_ref3) {
    var dateTo = _ref3.dateTo;
    return dateTo;
  }).sort(_utils.compareTwoDates).pop();
  return "".concat((0, _utils.humanizeDate)(datesFrom, _const.DateFormat.DAY_MONTH), " - ").concat((0, _utils.humanizeDate)(datesTo, _const.DateFormat.DAY_MONTH));
};

var createTripInfoTemplate = function createTripInfoTemplate(pointData) {
  return "<section class=\"trip-main__trip-info  trip-info\">\n    <div class=\"trip-info__main\">\n      <h1 class=\"trip-info__title\">".concat(getTotalRoute(pointData), "</h1>\n      <p class=\"trip-info__dates\">").concat(getTotalDateGap(pointData), "</p>\n    </div>\n  </section>");
};

var TripInfo =
/*#__PURE__*/
function () {
  function TripInfo(pointData) {
    _classCallCheck(this, TripInfo);

    this._pointData = pointData;
    this._element = null;
  }

  _createClass(TripInfo, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createTripInfoTemplate(this._pointData);
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

  return TripInfo;
}();

exports["default"] = TripInfo;