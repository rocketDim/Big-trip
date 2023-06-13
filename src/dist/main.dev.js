"use strict";

var _mainMenu = _interopRequireDefault(require("./view/main-menu.js"));

var _filter = _interopRequireDefault(require("./view/filter.js"));

var _tripInfo = _interopRequireDefault(require("./view/trip-info.js"));

var _tripCost = _interopRequireDefault(require("./view/trip-cost.js"));

var _tripSort = _interopRequireDefault(require("./view/trip-sort.js"));

var _pointList = _interopRequireDefault(require("./view/point-list.js"));

var _pointEditor = _interopRequireDefault(require("./view/point-editor.js"));

var _point = _interopRequireDefault(require("./view/point.js"));

var _pointDataGenerator = require("./mock/point-data-generator.js");

var _filterDataGenerator = require("./mock/filter-data-generator.js");

var _utils = require("./utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var POINT_COUNT = 20;
var randomPointsData = new Array(POINT_COUNT).fill(null).map(_pointDataGenerator.generatePointData);
var filterData = (0, _filterDataGenerator.generateFilterData)(randomPointsData);
var siteBodyElement = document.querySelector('.page-body');
var menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
(0, _utils.render)(menuElement, new _mainMenu["default"]().getElement());
var filterElement = siteBodyElement.querySelector('.trip-controls__filters');
(0, _utils.render)(filterElement, new _filter["default"](filterData).getElement());
var tripDetailsElement = siteBodyElement.querySelector('.trip-main');
(0, _utils.render)(tripDetailsElement, new _tripInfo["default"](randomPointsData).getElement(), _utils.RenderPosition.AFTERBEGIN);
var tripInfoElement = tripDetailsElement.querySelector('.trip-info');
(0, _utils.render)(tripInfoElement, new _tripCost["default"](randomPointsData).getElement());
var tripBoardElement = siteBodyElement.querySelector('.trip-events');
(0, _utils.render)(tripBoardElement, new _tripSort["default"]().getElement());
var pointListComponent = new _pointList["default"]();
(0, _utils.render)(tripBoardElement, pointListComponent.getElement());

var renderPoint = function renderPoint(pointListElement, pointData) {
  var pointComponent = new _point["default"](pointData);
  var pointEditorComponent = new _pointEditor["default"](pointData);

  var changeViewToPoint = function changeViewToPoint() {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditorComponent.getElement());
  };

  var changeViewToEdit = function changeViewToEdit() {
    pointListElement.replaceChild(pointEditorComponent.getElement(), pointComponent.getElement());
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', changeViewToEdit);
  pointEditorComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', changeViewToPoint);
  pointEditorComponent.getElement().querySelector('.event--edit').addEventListener('submit', function (evt) {
    evt.preventDefault();
    changeViewToPoint();
  });
  (0, _utils.render)(pointListElement, pointComponent.getElement());
};

for (var i = 0; i < POINT_COUNT; i++) {
  renderPoint(pointListComponent.getElement(), randomPointsData[i]);
}