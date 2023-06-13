"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _const = require("../const.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EMPTY_POINT = {
  type: (0, _utils.getRandomArrayElement)(_const.types),
  offers: [],
  destination: {
    name: (0, _utils.getRandomArrayElement)(_const.cites),
    description: '',
    pictures: ''
  },
  dateFrom: (0, _dayjs["default"])(),
  dateTo: (0, _dayjs["default"])(),
  basePrice: ''
};

var createEventTypeItemTemplate = function createEventTypeItemTemplate(availableTypes) {
  var currentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return availableTypes.map(function (type) {
    return "<div class=\"event__type-item\">\n    <input id=\"event-type-".concat(type, "-1\" class=\"event__type-input  visually-hidden\" type=\"radio\" name=\"event-type\" value=\"").concat(type, "\" ").concat(type === currentType ? 'checked' : '', ">\n    <label class=\"event__type-label  event__type-label--").concat(type, "\" for=\"event-type-").concat(type, "-1\">").concat(type, "</label>\n    </div>");
  }).join('');
};

var createDestinationOptionTemplate = function createDestinationOptionTemplate(cites) {
  return cites.map(function (city) {
    return "<option value=\"".concat(city, "\"></option>");
  }).join('');
};

var createEventOfferTemplate = function createEventOfferTemplate(offers) {
  return offers.length > 0 ? "<section class=\"event__section  event__section--offers\">\n    <h3 class=\"event__section-title  event__section-title--offers\">Offers</h3>\n    <div class=\"event__available-offers\">\n    ".concat(offers.map(function (_ref) {
    var title = _ref.title,
        price = _ref.price;
    var offerClassName = title.split(' ').pop();
    var checkedAttribute = (0, _utils.getRandomInteger)() ? 'checked' : '';
    return "<div class=\"event__offer-selector\">\n    <input class=\"event__offer-checkbox  visually-hidden\" id=\"event-offer-".concat(offerClassName, "-1\" type=\"checkbox\" name=\"event-offer-").concat(offerClassName, "\" ").concat(checkedAttribute, ">\n    <label class=\"event__offer-label\" for=\"event-offer-").concat(offerClassName, "-1\">\n    <span class=\"event__offer-title\">").concat(title, "</span>\n    &plus;&euro;&nbsp;\n    <span class=\"event__offer-price\">").concat(price, "</span>\n    </label>\n    </div>");
  }).join(''), "\n    </div></section>") : '';
};

var createPhotoContainer = function createPhotoContainer(destination) {
  return destination.pictures.length > 0 ? "<div class=\"event__photos-container\">\n    <div class=\"event__photos-tape\">\n    ".concat(destination.pictures.map(function (photo) {
    return "<img class=\"event__photo\" src=\"".concat(photo.src, "\" alt=\"Event photo\"></img>");
  }).join(''), "\n    </div></div>") : '';
};

var createPointEditorTemplate = function createPointEditorTemplate(pointData) {
  var type = pointData.type,
      dateFrom = pointData.dateFrom,
      dateTo = pointData.dateTo,
      basePrice = pointData.basePrice,
      offers = pointData.offers,
      destination = pointData.destination;
  return "<li class=\"trip-events__item\">\n    <form class=\"event event--edit\" action=\"#\" method=\"post\">\n      <header class=\"event__header\">\n        <div class=\"event__type-wrapper\">\n          <label class=\"event__type  event__type-btn\" for=\"event-type-toggle-1\">\n            <span class=\"visually-hidden\">Choose event type</span>\n            <img class=\"event__type-icon\" width=\"17\" height=\"17\" src=\"img/icons/".concat(type, ".png\" alt=\"Event type icon\">\n          </label>\n          <input class=\"event__type-toggle  visually-hidden\" id=\"event-type-toggle-1\" type=\"checkbox\">\n\n          <div class=\"event__type-list\">\n            <fieldset class=\"event__type-group\">\n              <legend class=\"visually-hidden\">Event type</legend>\n                ").concat(createEventTypeItemTemplate(_const.types, type), "\n            </fieldset>\n          </div>\n        </div>\n\n        <div class=\"event__field-group  event__field-group--destination\">\n          <label class=\"event__label  event__type-output\" for=\"event-destination-1\">\n            ").concat(type, "\n          </label>\n          <input class=\"event__input  event__input--destination\" id=\"event-destination-1\" type=\"text\" name=\"event-destination\" value=\"").concat(destination.name, "\" list=\"destination-list-1\">\n          <datalist id=\"destination-list-1\">\n            ").concat(createDestinationOptionTemplate(_const.cites), "\n          </datalist>\n        </div>\n\n        <div class=\"event__field-group  event__field-group--time\">\n          <label class=\"visually-hidden\" for=\"event-start-time-1\">From</label>\n          <input class=\"event__input  event__input--time\" id=\"event-start-time-1\" type=\"text\" name=\"event-start-time\" value=\"").concat((0, _utils.humanizeDate)(dateFrom, _const.DateFormat.DATE_HOUR), "\">\n          &mdash;\n          <label class=\"visually-hidden\" for=\"event-end-time-1\">To</label>\n          <input class=\"event__input  event__input--time\" id=\"event-end-time-1\" type=\"text\" name=\"event-end-time\" value=\"").concat((0, _utils.humanizeDate)(dateTo, _const.DateFormat.DATE_HOUR), "\">\n        </div>\n\n        <div class=\"event__field-group  event__field-group--price\">\n          <label class=\"event__label\" for=\"event-price-1\">\n            <span class=\"visually-hidden\">Price</span>\n            &euro;\n          </label>\n          <input class=\"event__input  event__input--price\" id=\"event-price-1\" type=\"text\" name=\"event-price\" value=\"").concat(basePrice, "\">\n        </div>\n\n        <button class=\"event__save-btn  btn  btn--blue\" type=\"submit\">Save</button>\n        <button class=\"event__reset-btn\" type=\"reset\">Delete</button>\n        <button class=\"event__rollup-btn\" type=\"button\">\n          <span class=\"visually-hidden\">Open event</span>\n        </button>\n      </header>\n      <section class=\"event__details\">\n        ").concat(createEventOfferTemplate(offers), "\n        <section class=\"event__section  event__section--destination\">\n          <h3 class=\"event__section-title  event__section-title--destination\">Destination</h3>\n          <p class=\"event__destination-description\">").concat(destination.description, "</p>\n          ").concat(createPhotoContainer(destination), "\n        </section>\n      </section>\n    </form>\n  </li>");
};

var PointEditor =
/*#__PURE__*/
function () {
  function PointEditor() {
    var pointData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EMPTY_POINT;

    _classCallCheck(this, PointEditor);

    this._pointData = pointData;
    this._element = null;
  }

  _createClass(PointEditor, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createPointEditorTemplate(this._pointData);
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

  return PointEditor;
}();

exports["default"] = PointEditor;