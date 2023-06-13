"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEscEvent = exports.createElement = exports.RenderPosition = exports.render = exports.compareTwoDates = exports.isEventContinues = exports.isDateCurrent = exports.isDateInFuture = exports.isDateExpired = exports.getTimeDuration = exports.humanizeDate = exports.pickOffersDependOnType = exports.generateRandomArray = exports.getRandomArrayElement = exports.getRandomInteger = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _duration = _interopRequireDefault(require("dayjs/plugin/duration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dayjs["default"].extend(_duration["default"]);

var DAYS_COUNT = 10;
var TimeFormat = {
  HOUR_PER_DAY: 1440,
  MINUTE_PER_HOUR: 60,
  MILLISECOND_PER_MINUTE: 60000
};
var RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend'
}; // https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

exports.RenderPosition = RenderPosition;

var getRandomInteger = function getRandomInteger() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var lower = Math.ceil(Math.min(a, b));
  var upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

exports.getRandomInteger = getRandomInteger;

var getRandomArrayElement = function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
};

exports.getRandomArrayElement = getRandomArrayElement;

var generateRandomArray = function generateRandomArray(array) {
  var minLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : array.length;
  var temp;
  var j;

  for (var i = array.length - 1; i > 0; i--) {
    j = getRandomInteger(0, i);
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  array.length = getRandomInteger(minLength, maxLength);
  return array;
};

exports.generateRandomArray = generateRandomArray;

var pickOffersDependOnType = function pickOffersDependOnType(type, offers) {
  return offers.find(function (item) {
    return item.type === type;
  }).offers;
};

exports.pickOffersDependOnType = pickOffersDependOnType;
var dateConverter = {
  'D MMM': function DMMM(date) {
    return (0, _dayjs["default"])(date).format('D MMM');
  },
  'HH:mm': function HHMm(date) {
    return (0, _dayjs["default"])(date).format('HH:mm');
  },
  'YYYY-MM-DDTHH:mm': function YYYYMMDDTHHMm(date) {
    return (0, _dayjs["default"])(date).format('YYYY-MM-DDTHH:mm');
  },
  'DD/MM/YY HH:mm': function DDMMYYHHMm(date) {
    return (0, _dayjs["default"])(date).format('DD/MM/YY HH:mm');
  }
};

var humanizeDate = function humanizeDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HH:mm';
  return dateConverter[format](date);
};

exports.humanizeDate = humanizeDate;

var compareTwoDates = function compareTwoDates(dateA, dateB) {
  return (0, _dayjs["default"])(dateA).diff(dateB);
};

exports.compareTwoDates = compareTwoDates;

var getTimeDuration = function getTimeDuration(initialDate, expirationDate) {
  var difference = compareTwoDates(expirationDate, initialDate);

  var duration = _dayjs["default"].duration(difference).$d;

  var day = duration.days < DAYS_COUNT ? "0".concat(duration.days, "D") : "".concat(duration.days, "D");
  var hour = duration.hours < DAYS_COUNT ? "0".concat(duration.hours, "H") : "".concat(duration.hours, "H");
  var minute = duration.minutes < DAYS_COUNT ? "0".concat(duration.minutes, "M") : "".concat(duration.minutes, "M");
  var total = difference / TimeFormat.MILLISECOND_PER_MINUTE > TimeFormat.HOUR_PER_DAY ? "".concat(day, " ").concat(hour, " ").concat(minute) : difference / TimeFormat.MILLISECOND_PER_MINUTE > TimeFormat.MINUTE_PER_HOUR ? "".concat(hour, " ").concat(minute) : minute;
  return total;
};

exports.getTimeDuration = getTimeDuration;

var isDateExpired = function isDateExpired(date) {
  return (0, _dayjs["default"])().isAfter(date, 'm');
};

exports.isDateExpired = isDateExpired;

var isDateInFuture = function isDateInFuture(date) {
  return (0, _dayjs["default"])().isBefore(date, 'm');
};

exports.isDateInFuture = isDateInFuture;

var isDateCurrent = function isDateCurrent(date) {
  return (0, _dayjs["default"])().isSame(date, 'm');
};

exports.isDateCurrent = isDateCurrent;

var isEventContinues = function isEventContinues(dateFrom, dateTo) {
  return isDateExpired(dateFrom) && isDateInFuture(dateTo);
};

exports.isEventContinues = isEventContinues;

var createElement = function createElement(template) {
  var newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

exports.createElement = createElement;

var render = function render(container, element) {
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RenderPosition.BEFOREEND;

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

exports.render = render;

var isEscEvent = function isEscEvent(evt) {
  return evt.key === ('Escape' || 'Esc');
};

exports.isEscEvent = isEscEvent;