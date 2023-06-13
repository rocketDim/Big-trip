"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./../utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createTripSortTemplate = function createTripSortTemplate() {
  return "<form class=\"trip-events__trip-sort  trip-sort\" action=\"#\" method=\"get\">\n    <div class=\"trip-sort__item  trip-sort__item--day\">\n      <input id=\"sort-day\" class=\"trip-sort__input  visually-hidden\" type=\"radio\" name=\"trip-sort\" value=\"sort-day\" checked>\n      <label class=\"trip-sort__btn\" for=\"sort-day\">Day</label>\n    </div>\n\n    <div class=\"trip-sort__item  trip-sort__item--event\">\n      <input id=\"sort-event\" class=\"trip-sort__input  visually-hidden\" type=\"radio\" name=\"trip-sort\" value=\"sort-event\" disabled>\n      <label class=\"trip-sort__btn\" for=\"sort-event\">Event</label>\n    </div>\n\n    <div class=\"trip-sort__item  trip-sort__item--time\">\n      <input id=\"sort-time\" class=\"trip-sort__input  visually-hidden\" type=\"radio\" name=\"trip-sort\" value=\"sort-time\">\n      <label class=\"trip-sort__btn\" for=\"sort-time\">Time</label>\n    </div>\n\n    <div class=\"trip-sort__item  trip-sort__item--price\">\n      <input id=\"sort-price\" class=\"trip-sort__input  visually-hidden\" type=\"radio\" name=\"trip-sort\" value=\"sort-price\">\n      <label class=\"trip-sort__btn\" for=\"sort-price\">Price</label>\n    </div>\n\n    <div class=\"trip-sort__item  trip-sort__item--offer\">\n      <input id=\"sort-offer\" class=\"trip-sort__input  visually-hidden\" type=\"radio\" name=\"trip-sort\" value=\"sort-offer\" disabled>\n      <label class=\"trip-sort__btn\" for=\"sort-offer\">Offers</label>\n    </div>\n  </form>";
};

var TripSort =
/*#__PURE__*/
function () {
  function TripSort() {
    _classCallCheck(this, TripSort);

    this._element = null;
  }

  _createClass(TripSort, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createTripSortTemplate();
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

  return TripSort;
}();

exports["default"] = TripSort;