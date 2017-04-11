/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var colors = ["red", "blue", "unoccupied"];

var eachHTMLCell = function eachHTMLCell(gameBoard, callback) {
  gameBoard.grid.forEach(function (row, rowIdx) {
    row.forEach(function (cell, colIdx) {
      var htmlCell = document.getElementById(rowIdx + "-" + colIdx);
      callback(htmlCell);
    });
  });
};

var populateHTML = exports.populateHTML = function populateHTML(gameBoard, htmlGrid) {
  gameBoard.grid.forEach(function (row, rowIdx) {
    var htmlRow = htmlGrid.insertRow();
    htmlRow.id = rowIdx;
    row.forEach(function (cell, colIdx) {
      var htmlCell = htmlRow.insertCell();
      htmlCell.id = rowIdx + "-" + colIdx;
      htmlCell.classList.add(cell.color);

      if (cell.mountain) {
        htmlCell.classList.add('mountain');
      } else {
        cell.id = htmlCell.id;
        if (cell.king) {
          htmlCell.innerHTML = cell.count;
          htmlCell.classList.add('king');
          if (htmlCell.classList.contains('red')) {
            htmlCell.classList.add('selected');
          }
        } else if (cell.city) {
          htmlCell.innerHTML = cell.count;
          htmlCell.classList.add('city');
        }
      }
    });
  });
};

// refactor this to use eachHTMLCell
var updateHTML = exports.updateHTML = function updateHTML(gameBoard) {
  gameBoard.grid.forEach(function (row, rowIdx) {
    row.forEach(function (cell, colIdx) {
      var htmlCell = document.getElementById(rowIdx + "-" + colIdx);
      if (!cell.mountain) {
        if (cell.color !== 'unoccupied' || cell.city) {
          htmlCell.innerHTML = cell.count;
        }
        colors.forEach(function (color) {
          return htmlCell.classList.remove(color);
        });
        htmlCell.classList.add(cell.color);
      }

      htmlCell.isHidden ? htmlCell.classList.add('hidden') : htmlCell.classList.remove('hidden');
    });
  });
};

var unselectOtherCells = exports.unselectOtherCells = function unselectOtherCells(board) {
  eachHTMLCell(board, function (htmlCell) {
    return htmlCell.classList.remove('selected');
  });
};

var shuffle = exports.shuffle = function shuffle(array) {
  var counter = array.length;

  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);

    counter--;

    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};

var getNextCoordinates = exports.getNextCoordinates = function getNextCoordinates(id, direction) {
  var nextId = void 0;
  var coordinates = id.split('-').map(function (char) {
    return parseInt(char);
  });

  switch (direction) {
    case 'up':
      return [coordinates[0] - 1, coordinates[1]];
    case 'down':
      return [coordinates[0] + 1, coordinates[1]];
    case 'left':
      return [coordinates[0], coordinates[1] - 1];
    case 'right':
      return [coordinates[0], coordinates[1] + 1];
    default:
      console.log('Invalid Move');
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = function () {
  function Command(cell, direction) {
    _classCallCheck(this, Command);

    this.cell = cell;
    this.nextCoordinates = (0, _util.getNextCoordinates)(cell.id, direction);
    this.direction = direction;
  }

  _createClass(Command, [{
    key: 'execute',
    value: function execute(board) {
      var nextCell = board.grid[this.nextCoordinates[0]][this.nextCoordinates[1]];
      if (this.cell && this.cell.color !== 'unoccupied' && !nextCell.mountain) {
        // TODO remove direction class from currentHTMLCell
        this.cell.capture(nextCell);

        // TODO remove fog from adjacent pieces
        if (this.cell.color === 'red') {
          this.removeFog(board);
        }
      }
    }
  }, {
    key: 'removeFog',
    value: function removeFog(board) {
      // get all htmlCells adjacent to the nextHTMLCell, and remove fog class
      // actually, just get normal cells, call reveal on them, and let update do
      // the work of removing/applying the fog

      // use board.visibleCells
    }
  }]);

  return Command;
}();

exports.default = Command;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell() {
    _classCallCheck(this, Cell);

    this.color = "unoccupied";
    this.count = 0;
    this.isHidden = false;
    this.id = null;
  }

  _createClass(Cell, [{
    key: "capture",
    value: function capture(otherCell) {
      if (this.count > 1) {
        if (this.color === otherCell.color) {
          otherCell.count = otherCell.count + this.count - 1;
        } else {
          if (this.count - 1 > otherCell.count) {
            otherCell.count = this.count - otherCell.count - 1;
            otherCell.color = this.color;
          } else {
            otherCell.count = otherCell.count - (this.count - 1);
          }
        }
        this.count = 1;
      }
    }
  }, {
    key: "generateTroops",
    value: function generateTroops() {
      this.count++;
    }
  }, {
    key: "reveal",
    value: function reveal() {
      this.isHidden = false;
    }
  }]);

  return Cell;
}();

exports.default = Cell;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cell = __webpack_require__(2);

var _cell2 = _interopRequireDefault(_cell);

var _special_cells = __webpack_require__(9);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.grid = [];
    this.populateBoard();
    this.kings = this.allCells().filter(function (cell) {
      return cell.king;
    });
  }

  _createClass(Board, [{
    key: 'populateBoard',
    value: function populateBoard() {
      // create an array with all cities, mountains, and cells
      var allCells = [];

      for (var i = 0; i < 80; i++) {
        allCells.push(new _cell2.default());
      }

      for (var j = 0; j < 10; j++) {
        allCells.push(_special_cells.Mountain);
      }

      for (var k = 0; k < 8; k++) {
        allCells.push(new _special_cells.City());
      }

      allCells.push(new _special_cells.King('red'));
      allCells.push(new _special_cells.King('blue'));

      // shuffle array
      (0, _util.shuffle)(allCells);

      // iterate through shuffled array and push things into the grid
      for (var rowIdx = 0; rowIdx < 10; rowIdx++) {
        var row = [];
        for (var colIdx = 0; colIdx < 10; colIdx++) {
          row.push(allCells.pop());
        }

        this.grid.push(row);
      }
    }
  }, {
    key: 'allCells',
    value: function allCells() {
      return this.grid.reduce(function (row1, row2) {
        return row1.concat(row2);
      });
    }
  }, {
    key: 'cities',
    value: function cities() {
      return this.allCells().filter(function (cell) {
        return cell.city;
      });
    }
  }, {
    key: 'capturedTerritory',
    value: function capturedTerritory() {
      return this.allCells().filter(function (cell) {
        return cell.color !== 'unoccupied';
      });
    }
  }, {
    key: 'findCell',
    value: function findCell(id) {
      return this.allCells().find(function (cell) {
        return cell.id === id;
      });
    }
  }, {
    key: 'winner',
    value: function winner() {
      if (document.getElementsByClassName('king red').length === 2) {
        return 'red';
      } else if (document.getElementsByClassName('king blue').length === 2) {
        return 'blue';
      } else {
        return false;
      }
    }
  }, {
    key: 'blueTerritory',
    value: function blueTerritory() {
      return this.allCells().filter(function (cell) {
        return cell.color === 'blue';
      });
    }
  }, {
    key: 'moveableCells',
    value: function moveableCells(cell) {
      var _this = this;

      // TODO refactor this and visibleCells to remove duplication of code
      var coordinates = cell.id.split('-').map(function (char) {
        return parseInt(char);
      });
      var coordinatePairs = [[coordinates[0] - 1, coordinates[1]], [coordinates[0] + 1, coordinates[1]], [coordinates[0], coordinates[1] - 1], [coordinates[0], coordinates[1] + 1]];
      return coordinatePairs.filter(function (pair) {
        return pair.every(function (num) {
          return num >= 0 && num <= 9;
        });
      }).map(function (pair) {
        return _this.grid[pair[0]][pair[1]];
      }).filter(function (adjacentCell) {
        return !adjacentCell.mountain;
      });
    }
  }, {
    key: 'visibleCells',
    value: function visibleCells(cell) {
      var _this2 = this;

      var coordinates = cell.id.split('-').map(function (char) {
        return parseInt(char);
      });
      var coordinatePairs = [[coordinates[0] - 1, coordinates[1]], [coordinates[0] - 1, coordinates[1] - 1], [coordinates[0] + 1, coordinates[1]], [coordinates[0] + 1, coordinates[1] + 1], [coordinates[0], coordinates[1] - 1], [coordinates[0] - 1, coordinates[1] - 1], [coordinates[0], coordinates[1] + 1], [coordinates[0] + 1, coordinates[1] + 1]];
      return coordinatePairs.filter(function (pair) {
        return pair.every(function (num) {
          return num >= 0 && num <= 9;
        });
      }).map(function (pair) {
        return _this2.grid[pair[0]][pair[1]];
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.grid = [];
      this.populateBoard();
      this.kings = this.allCells().filter(function (cell) {
        return cell.king;
      });
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cursor = __webpack_require__(6);

var _cursor2 = _interopRequireDefault(_cursor);

var _adversary = __webpack_require__(5);

var _adversary2 = _interopRequireDefault(_adversary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(board) {
    _classCallCheck(this, Game);

    this.board = board;
    this.cursor = new _cursor2.default(board);
    this.adversary = new _adversary2.default(board);

    this.startIntervals();
  }

  _createClass(Game, [{
    key: 'iterateMovement',
    value: function iterateMovement() {
      var userCommand = this.cursor.nextMove();
      if (userCommand) {
        userCommand.execute(this.board);
      }

      var adversaryCommand = this.adversary.nextMove();
      if (adversaryCommand) {
        adversaryCommand.execute(this.board);
      }

      //TODO this is terrible!  it ends the game before you actually take the enemy piece
      if (this.board.winner()) {
        this.endGame(this.board.winner());
      }
    }
  }, {
    key: 'iterateCityGeneration',
    value: function iterateCityGeneration() {
      this.board.cities().forEach(function (city) {
        if (city.color !== 'unoccupied' || city.count < 40) {
          city.generateTroops();
        }
      });
    }
  }, {
    key: 'iterateTerritoryGeneration',
    value: function iterateTerritoryGeneration() {
      this.board.capturedTerritory().forEach(function (cell) {
        return cell.generateTroops();
      });
    }
  }, {
    key: 'startIntervals',
    value: function startIntervals() {
      this.movementInterval = setInterval(this.iterateMovement.bind(this), 500);
      this.cityInterval = setInterval(this.iterateCityGeneration.bind(this), 1000);
      this.territoryInterval = setInterval(this.iterateTerritoryGeneration.bind(this), 25000);
    }
  }, {
    key: 'removeIntervals',
    value: function removeIntervals() {
      clearInterval(this.movementInterval);
      clearInterval(this.cityInterval);
      clearInterval(this.territoryInterval);
    }
  }, {
    key: 'endGame',
    value: function endGame(winner) {
      this.removeIntervals();

      setTimeout(function () {
        var winModal = document.getElementById('win-modal');
        var winMessage = document.getElementById('win-message');
        var playButton = document.getElementById('play-button');
        var quitButton = document.getElementById('play-button');
        var content = winner === 'red' ? "Congrats! You win!" : "Sorry, want to try again?";

        winModal.classList.remove('is-hidden');
        winMessage.innerHTML = content;
      }, 10);
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _command = __webpack_require__(1);

var _command2 = _interopRequireDefault(_command);

var _move_tree = __webpack_require__(8);

var _move_tree2 = _interopRequireDefault(_move_tree);

var _util = __webpack_require__(0);

var _tree_node = __webpack_require__(10);

var _tree_node2 = _interopRequireDefault(_tree_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Adversary = function () {
  function Adversary(board) {
    _classCallCheck(this, Adversary);

    this.board = board;
    this.king = board.cities().find(function (cell) {
      return cell.king && cell.color === 'blue';
    });
    this.moves = [];
    this.seen = false;
    this.playerKing = null;
  }

  _createClass(Adversary, [{
    key: 'nextMove',
    value: function nextMove() {
      this.addMoves();

      while (this.moves[0].cell.color !== 'blue' || this.moves[0].cell.count < 2) {
        this.moves.shift();
        if (this.moves.length === 0) {
          return false;
        }
      }

      return this.moves.shift();
    }
  }, {
    key: 'addMoves',
    value: function addMoves() {
      switch (this.currentStrategy()) {
        case 'explore':
          this.explore();
          break;
        case 'attack':
          this.attack();
          break;
        case 'defend':
          this.defend();
          break;
        case 'kill':
          this.kill();
          break;
        default:
          console.log("Invalid movement strategy");
      }
    }
  }, {
    key: 'currentStrategy',
    value: function currentStrategy() {
      this.seenByPlayer();

      if (this.seen) {
        return 'defend';
      } else if (this.playerKing) {
        return 'kill';
      } else if (this.canSeePlayer()) {
        return 'attack';
      } else {
        return 'explore';
      }
    }
  }, {
    key: 'explore',
    value: function explore() {
      if (this.moves.length === 0) {
        this.moves = this.moves.concat(this.search(this.king, 'up'));
        this.moves = this.moves.concat(this.search(this.king, 'down'));
        this.moves = this.moves.concat(this.search(this.king, 'left'));
        this.moves = this.moves.concat(this.search(this.king, 'right'));
      }
    }
  }, {
    key: 'search',
    value: function search(startingCell, direction) {
      var continueCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

      var newMoves = [];
      var cell = startingCell;

      for (var i = 0; i < 10; i++) {
        if (cell) {
          var nextCoordinates = (0, _util.getNextCoordinates)(cell.id, direction);
          var nextCell = this.board.findCell(nextCoordinates.join('-'));

          if (this.shouldCapture(cell, nextCell)) {
            newMoves.push(new _command2.default(cell, direction));
            cell = nextCell;
          } else if (continueCount > 0) {
            var otherDirections = void 0;
            switch (direction) {
              case 'up':
              case 'down':
                otherDirections = ['left', 'right'];
                break;
              case 'left':
              case 'right':
                otherDirections = ['up', 'down'];
                break;
              default:
                console.log("Bad direction input");
            }
            var otherDirection = (0, _util.shuffle)(otherDirections).pop();
            return newMoves.concat(this.search(cell, otherDirection, continueCount - 1));
          } else {
            return newMoves;
          }
        }
      }

      return newMoves;
    }
  }, {
    key: 'shouldCapture',
    value: function shouldCapture(cell, nextCell) {
      return nextCell && !nextCell.mountain && !(nextCell.city && nextCell.city.color !== 'blue' && cell.count + 2 < nextCell.count);
    }
  }, {
    key: 'attack',
    value: function attack() {
      // send armies at player squares.  naively follow back to user.
      // okay, so I need something that takes two cells and builds a command path between the two cells
      // after it gets to this arbitrary point of contact, it keeps taking red cells
      // when it runs out of cells on that path, it goes a randomly selected point of contact and repeats
      // when the attacking army runs out of troops, it takes the strongest available army and does the above
      // if (this.moves.length === 0) {
      //   let origin = this.largestArmy();
      //   let contactCell = this.canSeePlayer();
      //   let attackVector = findPath(origin, contactCell, this.board);
      //
      //   // once it has reached the contact point, start taking pieces at random
      //   // let currentCell = contactCell;
      //   // for (var i = 0; i < 10; i++) {
      //   //   attackVector.push(new Command)
      //   this.moves = attackVector;
      //   }
      //
      // }
    }
  }, {
    key: 'kill',
    value: function kill() {
      // once adversary has seen the playerKing, send armies directly to enemy king.
      // okay, so I need something that takes two cells and builds a command path between the two cells
      // then constantly build that path between the most powerful cell and the playerKing
    }
  }, {
    key: 'defend',
    value: function defend() {
      if (this.moves.length === 0) {
        var moveTree = new _move_tree2.default(this.largestArmy(), this.board);
        this.moves.concat(moveTree.findPath(this.king));
      }
    }
  }, {
    key: 'canSeePlayer',
    value: function canSeePlayer() {
      var _this = this;

      // TODO eventually return a random cell that works, not just the first one
      this.board.blueTerritory().forEach(function (cell) {
        _this.board.visibleCells(cell).forEach(function (otherCell) {
          if (otherCell.color === 'red') {
            return cell;
          }
        });
      });
      return false;
    }
  }, {
    key: 'seenByPlayer',
    value: function seenByPlayer() {
      var _this2 = this;

      this.board.visibleCells(this.king).forEach(function (otherCell) {
        if (otherCell.color === 'red') {
          _this2.seen = true;
        }
      });
    }
  }, {
    key: 'largestArmy',
    value: function largestArmy() {
      var currentLargest = void 0;
      this.board.blueTerritory().forEach(function (cell) {
        if (!currentLargest || cell.count > currentLargest.count) {
          currentLargest = cell;
        }
      });

      return currentLargest;
    }
  }]);

  return Adversary;
}();

exports.default = Adversary;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _command = __webpack_require__(1);

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cursor = function () {
  function Cursor(board) {
    _classCallCheck(this, Cursor);

    this.board = board;
    this.moves = [];
  }

  _createClass(Cursor, [{
    key: 'move',
    value: function move(direction) {
      var currentHTMLCell = document.getElementsByClassName('selected')[0];
      var nextCoordinates = (0, _util.getNextCoordinates)(currentHTMLCell.id, direction);

      if (nextCoordinates.every(function (coord) {
        return coord >= 0 && coord <= 9;
      })) {
        var currentCell = this.board.findCell(currentHTMLCell.id);
        var nextHTMLCell = document.getElementById(nextCoordinates.join('-'));

        currentHTMLCell.classList.remove('selected');
        nextHTMLCell.classList.add('selected');

        if (currentCell) {
          // TODO Add direction class to the corresponding htmlCell (to render queue)
          this.moves.push(new _command2.default(currentCell, direction));
        }
      }
    }
  }, {
    key: 'clearMoves',
    value: function clearMoves() {
      this.moves = [];
    }
  }, {
    key: 'nextMove',
    value: function nextMove() {
      if (this.moves.length === 0) {
        return false;
      }

      while (this.moves[0].cell.color !== 'red' || this.moves[0].cell.count < 2) {
        // TODO remove the direction class from the corresponding htmlCell
        this.moves.shift();
        if (this.moves.length === 0) {
          return false;
        }
      }

      return this.moves.shift();
    }

    // getNextCoordinates(id, direction) {
    //   let nextId;
    //   let coordinates = id.split('-').map(char => parseInt(char));
    //
    //   switch (direction) {
    //     case 'up':
    //       return [coordinates[0]-1, coordinates[1]];
    //     case 'down':
    //       return [coordinates[0]+1, coordinates[1]];
    //     case 'left':
    //       return [coordinates[0], coordinates[1]-1];
    //     case 'right':
    //       return [coordinates[0], coordinates[1]+1];
    //     default:
    //       console.log('Invalid Move');
    //   }
    // }

  }]);

  return Cursor;
}();

exports.default = Cursor;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(4);

var _game2 = _interopRequireDefault(_game);

var _board = __webpack_require__(3);

var _board2 = _interopRequireDefault(_board);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default();
var game = new _game2.default(board);
var cursor = game.cursor;
var htmlGrid = document.getElementById("grid");

(0, _util.populateHTML)(board, htmlGrid);

function selectCell(e) {
  if (e.target !== e.currentTarget) {
    var cell = e.target;
    if (!cell.classList.contains('selected')) {
      // TODO: instead, store the previously selected cell and just remove it from that
      (0, _util.unselectOtherCells)(board);
      cell.classList.add('selected');
    }
  }
  e.stopPropagation();
}

htmlGrid.addEventListener("click", selectCell);

key('q', function () {
  return cursor.clearMoves();
});
key('w', function () {
  return cursor.move('up');
});
key('up', function () {
  return cursor.move('up');
});
key('s', function () {
  return cursor.move('down');
});
key('down', function () {
  return cursor.move('down');
});
key('a', function () {
  return cursor.move('left');
});
key('left', function () {
  return cursor.move('left');
});
key('d', function () {
  return cursor.move('right');
});
key('right', function () {
  return cursor.move('right');
});

setInterval(function () {
  return (0, _util.updateHTML)(board);
}, 500);

var infoBox = document.getElementById('about-game');
var winBox = document.getElementById('win-modal');

function openInfo() {
  game.removeIntervals();
  infoBox.classList.remove("is-hidden");
}

function closeInfo() {
  if (!board.winner()) {
    game.startIntervals();
  }
  infoBox.classList.add("is-hidden");
}

function closeWin() {
  winBox.classList.add("is-hidden");
}

function playAgain() {
  board.reset();
  game.removeIntervals();
  game = new _game2.default(board);
  cursor = game.cursor;

  while (htmlGrid.firstChild) {
    htmlGrid.removeChild(htmlGrid.firstChild);
  }

  (0, _util.populateHTML)(board, htmlGrid);
  winBox.classList.add("is-hidden");
  infoBox.classList.add("is-hidden");
}

var aboutButton = document.getElementById("info");
aboutButton.addEventListener("click", openInfo);
var closeAboutButton = document.getElementById('quit-button-info');
closeAboutButton.addEventListener("click", closeInfo);
var closeWinButton = document.getElementById('quit-button');
closeWinButton.addEventListener("click", closeWin);
var newGameButton = document.getElementById("play-button-info");
newGameButton.addEventListener("click", playAgain);
var playAgainButton = document.getElementById("play-button");
playAgainButton.addEventListener("click", playAgain);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tree_node = __webpack_require__(10);

var _tree_node2 = _interopRequireDefault(_tree_node);

var _command = __webpack_require__(1);

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MoveTree = function () {
  function MoveTree(startingCell, board) {
    _classCallCheck(this, MoveTree);

    this.startingCell = startingCell;
    this.visitedCells = [startingCell];
    this.board = board;
    this.rootNode = new _tree_node2.default(startingCell);

    this.buildMoveTree();
  }

  _createClass(MoveTree, [{
    key: 'findPath',
    value: function findPath(targetCell) {
      var endNode = this.rootNode.bfSearch(targetCell);
      var path = this.pathFromEnd(endNode);
      var commands = [];
      var directionToChild = void 0;

      path.forEach(function (node) {
        if (directionToChild) {
          commands.push(new _command2.default(node.cell, directionToChild));
        }
        directionToChild = node.directionFromParent;
      });

      return commands.reverse();
    }
  }, {
    key: 'buildMoveTree',
    value: function buildMoveTree() {
      var _this = this;

      var nodes = [this.rootNode];

      var _loop = function _loop() {
        var currentNode = nodes.shift();
        var newCells = _this.newCells(currentNode);

        newCells.forEach(function (nextCell) {
          var nextNode = new _tree_node2.default(nextCell);
          currentNode.addChild(nextNode);
          nodes.push(nextNode);
        });
      };

      while (nodes.length !== 0) {
        _loop();
      }
    }
  }, {
    key: 'newCells',
    value: function newCells(node) {
      var _this2 = this;

      var newCells = this.board.moveableCells(node.cell).filter(function (candidateCell) {
        return _this2.visitedCells.includes(candidateCell);
      });

      this.visitedCells.concat(newCells);

      return newCells;
    }
  }, {
    key: 'pathFromEnd',
    value: function pathFromEnd(endNode) {
      var nodes = [];
      var currentNode = endNode;

      while (currentNode) {
        nodes.push(currentNode);
        currentNode = currentNode.parent;
      }

      return nodes;
    }
  }]);

  return MoveTree;
}();

exports.default = MoveTree;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.King = exports.Mountain = exports.City = undefined;

var _cell = __webpack_require__(2);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var City = function (_Cell) {
  _inherits(City, _Cell);

  function City() {
    _classCallCheck(this, City);

    var _this = _possibleConstructorReturn(this, (City.__proto__ || Object.getPrototypeOf(City)).call(this));

    _this.city = true;
    _this.count = 40;
    return _this;
  }

  return City;
}(_cell2.default);

var King = function (_City) {
  _inherits(King, _City);

  function King(color) {
    _classCallCheck(this, King);

    var _this2 = _possibleConstructorReturn(this, (King.__proto__ || Object.getPrototypeOf(King)).call(this));

    _this2.king = true;
    _this2.color = color;
    _this2.count = 1;
    return _this2;
  }

  return King;
}(City);

var Mountain = new _cell2.default();
Mountain.mountain = true;
Object.freeze(Mountain);

exports.City = City;
exports.Mountain = Mountain;
exports.King = King;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TreeNode = function () {
  function TreeNode(cell) {
    _classCallCheck(this, TreeNode);

    this.cell = [];
    this.children = [];
    this.parent = null;
    this.directionFromParent = null;
  }

  _createClass(TreeNode, [{
    key: 'setParent',
    value: function setParent(parent) {
      if (parent !== this.parent) {
        if (this.parent) {
          this.parent.removeFromChildren(this);
        }

        this.parent = parent;
        if (this.parent) {
          this.parent.addToChildren(this);
        }

        this.directionFromParent = this.orientFromParent();

        return this;
      }
    }
  }, {
    key: 'addChild',
    value: function addChild(child) {
      child.setParent(this);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      if (child && this.children.includes(child)) {
        child.setParent(null);
      }
    }
  }, {
    key: 'addToChildren',
    value: function addToChildren(newChild) {
      this.children.push(newChild);
    }
  }, {
    key: 'removeFromChildren',
    value: function removeFromChildren(childToRemove) {
      this.children = this.children.filter(function (childNode) {
        return childNode !== childToRemove;
      });
    }
  }, {
    key: 'bfSearch',
    value: function bfSearch(targetCell, callback) {
      if (!callback && targetCell) {
        callback = function callback(cell) {
          return cell.id === targetCell.id;
        };
      }

      var nodes = [this];

      while (nodes.length !== 0) {
        var currentNode = nodes.shift();

        if (callback(currentNode)) {
          return currentNode;
        }

        nodes.concat(currentNode.children);
      }
    }
  }, {
    key: 'orientFromParent',
    value: function orientFromParent() {
      // returns the direction you would have to move, starting from parent, to reach own cell
      var ownCoords = this.cell.id.split('-').map(function (char) {
        return parseInt(char);
      });
      var parentCoords = this.parent.cell.id.split('-').map(function (char) {
        return parseInt(char);
      });

      if (parentCoords[0] > ownCoords[0]) {
        return "up";
      } else if (parentCoords[0] < ownCoords[0]) {
        return "down";
      } else if (parentCoords[1] > ownCoords[1]) {
        return "left";
      } else {
        return "right";
      }
    }
  }]);

  return TreeNode;
}();

exports.default = TreeNode;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map