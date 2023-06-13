"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createListEmptyTemplate = function createListEmptyTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

var ListEmpty =
/*#__PURE__*/
function () {
  function ListEmpty() {
    _classCallCheck(this, ListEmpty);

    this._element = null;
  }

  _createClass(ListEmpty, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createListEmptyTemplate();
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

  return ListEmpty;
}();

exports["default"] = ListEmpty;