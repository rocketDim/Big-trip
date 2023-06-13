"use strict";

var _mainMenu = require("./view/main-menu.js");

var _tripInfo = require("./view/trip-info.js");

var _tripCost = require("./view/trip-cost.js");

var _filter = require("./view/filter.js");

var _tripBord = require("./view/trip-bord.js");

var _editPoint = require("./view/edit-point.js");

var _point = require("./view/point.js");

var _pointDataGenerator = require("./mock/point-data-generator.js");

var _filterDataGenerator = require("./mock/filter-data-generator.js");

var POINT_COUNT = 20;
var FIRST_POINT_NUMBER = 1;
var randomPointsData = new Array(POINT_COUNT).fill(null).map(_pointDataGenerator.generatePointData);
var filterData = (0, _filterDataGenerator.generateFilterData)(randomPointsData);
var siteBodyElement = document.querySelector('.page-body');

var render = function render(container, template) {
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'beforeend';
  container.insertAdjacentHTML(position, template);
};

var menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
render(menuElement, (0, _mainMenu.createMainMenuTemplate)());
var tripDetailsElement = siteBodyElement.querySelector('.trip-main');
render(tripDetailsElement, (0, _tripInfo.createTripInfoTemplate)(randomPointsData), 'afterbegin');
var tripInfoElement = tripDetailsElement.querySelector('.trip-info');
render(tripInfoElement, (0, _tripCost.CreateTripCostTemplate)(randomPointsData));
var filterElement = siteBodyElement.querySelector('.trip-controls__filters');
render(filterElement, (0, _filter.createFilterTemplate)(filterData));
var tripBordElement = siteBodyElement.querySelector('.trip-events');
render(tripBordElement, (0, _tripBord.createTripBordTemplate)());
var eventListElement = tripBordElement.querySelector('.trip-events__list');
render(eventListElement, (0, _editPoint.createEditPointTemplate)(randomPointsData[0]));

for (var i = FIRST_POINT_NUMBER; i < POINT_COUNT; i++) {
  render(eventListElement, (0, _point.createPointTemplate)(randomPointsData[i]));
}