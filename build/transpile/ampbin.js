'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Database = function () {
  function Database(ref) {
    _classCallCheck(this, Database);

    this.db = firebase.database().ref(ref);
  }

  _createClass(Database, [{
    key: 'set',
    value: function set(obj) {
      this.db.set(obj);
    }
  }, {
    key: 'push',
    value: function push(obj) {
      this.db.push(obj);
    }
  }]);

  return Database;
}();

var Ampbin = function () {
  function Ampbin(database) {
    _classCallCheck(this, Ampbin);

    this.database = database;
  }

  _createClass(Ampbin, [{
    key: 'save',
    value: function save() {
      // TODO: find better way to do this
      var $editors = jotted.$container.querySelectorAll('.jotted-editor');
      var binText = $editors[0].textContent;

      var obj = {
        'bin': binText,
        'timestamp': Date.now()
      };

      this.database.push(obj);
    }
  }, {
    key: 'addSaveHandler',
    value: function addSaveHandler() {
      var _this = this;

      var saveId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'save';

      var saveEl = this.getById(saveId);
      saveEl.onclick = function () {
        return _this.save();
      };
    }
  }, {
    key: 'getById',
    value: function getById(elId) {
      return document.getElementById(elId);
    }
  }]);

  return Ampbin;
}();

var db = new Database('bins');
var ampbin = new Ampbin(db);
ampbin.addSaveHandler();