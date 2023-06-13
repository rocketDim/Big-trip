"use strict";

var _mainMenu = _interopRequireDefault(require("./view/main-menu.js"));

var _filter = _interopRequireDefault(require("./view/filter.js"));

var _tripInfo = _interopRequireDefault(require("./view/trip-info.js"));

var _tripCost = _interopRequireDefault(require("./view/trip-cost.js"));

var _tripSort = _interopRequireDefault(require("./view/trip-sort.js"));

var _pointList = _interopRequireDefault(require("./view/point-list.js"));

var _pointEditor = _interopRequireDefault(require("./view/point-editor.js"));

var _point = _interopRequireDefault(require("./view/point.js"));

var _listEmpty = _interopRequireDefault(require("./view/list-empty.js"));

var _pointDataGenerator = require("./mock/point-data-generator.js");

var _filterDataGenerator = require("./mock/filter-data-generator.js");

var _utils = require("./utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var POINT_COUNT = 20;
var siteBodyElement = document.querySelector('.page-body');
var menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
var filterElement = siteBodyElement.querySelector('.trip-controls__filters');
var tripDetailsElement = siteBodyElement.querySelector('.trip-main');
var tripBoardElement = siteBodyElement.querySelector('.trip-events');
var randomPointsData = new Array(POINT_COUNT).fill(null).map(_pointDataGenerator.generatePointData);
var filterData = (0, _filterDataGenerator.generateFilterData)(randomPointsData);
(0, _utils.render)(menuElement, new _mainMenu["default"]().getElement());
(0, _utils.render)(filterElement, new _filter["default"](filterData).getElement());

var renderPoint = function renderPoint(pointListElement, pointData) {
  var pointComponent = new _point["default"](pointData);
  var pointEditorComponent = new _pointEditor["default"](pointData);

  var onEditorPointEscKeyDown = function onEditorPointEscKeyDown(evt) {
    if (_utils.isEscEvent) {
      evt.preventDefault();
      changeViewToPoint();
    }
  };

  var changeViewToPoint = function changeViewToPoint() {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditorComponent.getElement());
    document.removeEventListener('keydown', onEditorPointEscKeyDown);
  };

  var changeViewToEdit = function changeViewToEdit() {
    pointListElement.replaceChild(pointEditorComponent.getElement(), pointComponent.getElement());
    document.addEventListener('keydown', onEditorPointEscKeyDown);
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', changeViewToEdit);
  pointEditorComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', changeViewToPoint);
  pointEditorComponent.getElement().querySelector('.event--edit').addEventListener('submit', function (evt) {
    evt.preventDefault();
    changeViewToPoint();
  });
  (0, _utils.render)(pointListElement, pointComponent.getElement());
};

var renderBoard = function renderBoard(pointData) {
  if (pointData.length === 0) {
    (0, _utils.render)(tripBoardElement, new _listEmpty["default"]().getElement());
    return;
  }

  var tripInfoComponent = new _tripInfo["default"](randomPointsData);
  (0, _utils.render)(tripDetailsElement, tripInfoComponent.getElement(), _utils.RenderPosition.AFTERBEGIN);
  (0, _utils.render)(tripInfoComponent.getElement(), new _tripCost["default"](randomPointsData).getElement());
  (0, _utils.render)(tripBoardElement, new _tripSort["default"]().getElement());
  var pointListComponent = new _pointList["default"]();
  (0, _utils.render)(tripBoardElement, pointListComponent.getElement());

  for (var i = 0; i < POINT_COUNT; i++) {
    renderPoint(pointListComponent.getElement(), pointData[i]);
  }
};

renderBoard(randomPointsData);