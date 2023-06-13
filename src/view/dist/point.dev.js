"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _const = require("./../const.js");

var _utils = require("./../utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createPointOfferTemplate = function createPointOfferTemplate(offers) {
  return offers.length > 0 ? "".concat(offers.map(function (_ref) {
    var title = _ref.title,
        price = _ref.price;
    return "<li\n    class=\"event__offer\">\n    <span class=\"event__offer-title\">".concat(title, "</span>\n    &plus;&euro;&nbsp;\n    <span class=\"event__offer-price\">").concat(price, "</span>\n    </li>");
  }).join('')) : '';
};

var createPointTemplate = function createPointTemplate(pointData) {
  var type = pointData.type,
      destination = pointData.destination,
      dateFrom = pointData.dateFrom,
      dateTo = pointData.dateTo,
      basePrice = pointData.basePrice,
      isFavorite = pointData.isFavorite,
      offers = pointData.offers;
  var favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  return "<li class=\"trip-events__item\">\n    <div class=\"event\">\n      <time class=\"event__date\" datetime=\"".concat((0, _utils.humanizeDate)(dateFrom, _const.DateFormat.ISO), "\">").concat((0, _utils.humanizeDate)(dateFrom, _const.DateFormat.DAY_MONTH), "</time>\n      <div class=\"event__type\">\n        <img class=\"event__type-icon\" width=\"42\" height=\"42\" src=\"img/icons/").concat(type, ".png\" alt=\"Event type icon\">\n      </div>\n      <h3 class=\"event__title\">").concat(type, " ").concat(destination.name, "</h3>\n      <div class=\"event__schedule\">\n        <p class=\"event__time\">\n          <time class=\"event__start-time\" datetime=\"").concat((0, _utils.humanizeDate)(dateFrom, _const.DateFormat.ISO), "\">").concat((0, _utils.humanizeDate)(dateFrom), "</time>\n          &mdash;\n          <time class=\"event__end-time\" datetime=\"").concat((0, _utils.humanizeDate)(dateTo, _const.DateFormat.ISO), "\">").concat((0, _utils.humanizeDate)(dateTo), "</time>\n        </p>\n        <p class=\"event__duration\">").concat((0, _utils.getTimeDuration)(dateFrom, dateTo), "</p>\n      </div>\n      <p class=\"event__price\">\n        &euro;&nbsp;<span class=\"event__price-value\">").concat(basePrice, "</span>\n      </p>\n      <h4 class=\"visually-hidden\">Offers:</h4>\n      <ul class=\"event__selected-offers\">\n        ").concat(createPointOfferTemplate(offers), "\n      </ul>\n      <button class=\"event__favorite-btn ").concat(favoriteClassName, "\" type=\"button\">\n        <span class=\"visually-hidden\">Add to favorite</span>\n        <svg class=\"event__favorite-icon\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n          <path d=\"M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z\"/>\n        </svg>\n      </button>\n      <button class=\"event__rollup-btn\" type=\"button\">\n        <span class=\"visually-hidden\">Open event</span>\n      </button>\n    </div>\n  </li>");
};

var Point =
/*#__PURE__*/
function () {
  function Point(pointData) {
    _classCallCheck(this, Point);

    this._pointData = pointData;
    this._element = null;
  }

  _createClass(Point, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createPointTemplate(this._pointData);
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

  return Point;
}();

exports["default"] = Point;