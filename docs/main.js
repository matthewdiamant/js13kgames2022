/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/zzfx/ZzFX.js":
/*!***********************************!*\
  !*** ./node_modules/zzfx/ZzFX.js ***!
  \***********************************/
/*! exports provided: zzfx, ZZFX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zzfx", function() { return zzfx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZZFX", function() { return ZZFX; });
/*

ZzFX - Zuper Zmall Zound Zynth v1.1.8
By Frank Force 2019
https://github.com/KilledByAPixel/ZzFX

ZzFX Features

- Tiny synth engine with 20 controllable parameters.
- Play sounds via code, no need for sound assed files!
- Compatible with most modern web browsers.
- Small code footprint, the micro version is under 1 kilobyte.
- Can produce a huge variety of sound effect types.
- Sounds can be played with a short call. zzfx(...[,,,,.1,,,,9])
- A small bit of randomness appied to sounds when played.
- Use ZZFX.GetNote to get frequencies on a standard diatonic scale.
- Sounds can be saved out as wav files for offline playback.
- No additional libraries or dependencies are required.

*/
/*

  ZzFX MIT License
  
  Copyright (c) 2019 - Frank Force
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  
*/



// play a zzfx sound
function zzfx(...parameters) { return ZZFX.play(...parameters) }

// zzfx object with some extra functionalty
const ZZFX =
{
    // master volume scale
    volume: .3,
    
    // sample rate for audio
    sampleRate: 44100,
    
    // create shared audio context
    x: new (window.AudioContext || webkitAudioContext),

    // play a sound from zzfx paramerters
    play: function(...parameters)
    {
        // build samples and start sound
        return this.playSamples(this.buildSamples(...parameters));
    },

    // play an array of samples
    playSamples: function(...samples)
    {
        // create buffer and source
        const buffer = this.x.createBuffer(samples.length, samples[0].length, this.sampleRate);
        const source = this.x.createBufferSource();

        samples.map((d,i)=> buffer.getChannelData(i).set(d));
        source.buffer = buffer;
        source.connect(this.x.destination);
        source.start();
        return source;
    },

    // build an array of samples
    buildSamples: function
    (
        volume = 1, 
        randomness = .05,
        frequency = 220,
        attack = 0,
        sustain = 0,
        release = .1,
        shape = 0,
        shapeCurve = 1,
        slide = 0, 
        deltaSlide = 0, 
        pitchJump = 0, 
        pitchJumpTime = 0, 
        repeatTime = 0, 
        noise = 0,
        modulation = 0,
        bitCrush = 0,
        delay = 0,
        sustainVolume = 1,
        decay = 0,
        tremolo = 0
    )
    {
        // init parameters
        const PI2 = Math.PI*2;
        let sampleRate = this.sampleRate,
        sign = v => v>0?1:-1,
        startSlide = slide *= 500 * PI2 / sampleRate / sampleRate,
        startFrequency = 
            frequency *= (1 + randomness*2*Math.random() - randomness) * PI2 / sampleRate,
        b=[], t=0, tm=0, i=0, j=1, r=0, c=0, s=0, f, length;

        // scale by sample rate
        attack = attack * sampleRate + 9; // minimum attack to prevent pop
        decay *= sampleRate;
        sustain *= sampleRate;
        release *= sampleRate;
        delay *= sampleRate;
        deltaSlide *= 500 * PI2 / sampleRate**3;
        modulation *= PI2 / sampleRate;
        pitchJump *= PI2 / sampleRate;
        pitchJumpTime *= sampleRate;
        repeatTime = repeatTime * sampleRate | 0;

        // generate waveform
        for(length = attack + decay + sustain + release + delay | 0;
            i < length; b[i++] = s)
        {
            if (!(++c%(bitCrush*100|0)))                      // bit crush
            { 
                s = shape? shape>1? shape>2? shape>3?         // wave shape
                    Math.sin((t%PI2)**3) :                    // 4 noise
                    Math.max(Math.min(Math.tan(t),1),-1):     // 3 tan
                    1-(2*t/PI2%2+2)%2:                        // 2 saw
                    1-4*Math.abs(Math.round(t/PI2)-t/PI2):    // 1 triangle
                    Math.sin(t);                              // 0 sin

                s = (repeatTime ?
                        1 - tremolo + tremolo*Math.sin(PI2*i/repeatTime) // tremolo
                        : 1) *
                    sign(s)*(Math.abs(s)**shapeCurve) *       // curve 0=square, 2=pointy
                    volume * this.volume * (                  // envelope
                    i < attack ? i/attack :                   // attack
                    i < attack + decay ?                      // decay
                    1-((i-attack)/decay)*(1-sustainVolume) :  // decay falloff
                    i < attack  + decay + sustain ?           // sustain
                    sustainVolume :                           // sustain volume
                    i < length - delay ?                      // release
                    (length - i - delay)/release *            // release falloff
                    sustainVolume :                           // release volume
                    0);                                       // post release

                s = delay ? s/2 + (delay > i ? 0 :            // delay
                    (i<length-delay? 1 : (length-i)/delay) *  // release delay 
                    b[i-delay|0]/2) : s;                      // sample delay
            }

            f = (frequency += slide += deltaSlide) *          // frequency
                Math.cos(modulation*tm++);                    // modulation
            t += f - f*noise*(1 - (Math.sin(i)+1)*1e9%2);     // noise

            if (j && ++j > pitchJumpTime)       // pitch jump
            {
                frequency += pitchJump;         // apply pitch jump
                startFrequency += pitchJump;    // also apply to start
                j = 0;                          // stop pitch jump time
            }

            if (repeatTime && !(++r % repeatTime)) // repeat
            {
                frequency = startFrequency;     // reset frequency
                slide = startSlide;             // reset slide
                j = j || 1;                     // reset pitch jump time
            }
        }

        return b;
    },
    
    // get frequency of a musical note on a diatonic scale
    getNote: function(semitoneOffset=0, rootNoteFrequency=440)
    {
        return rootNoteFrequency * 2**(semitoneOffset/12);
    }

} // ZZFX

/***/ }),

/***/ "./src/AStar.js":
/*!**********************!*\
  !*** ./src/AStar.js ***!
  \**********************/
/*! exports provided: smoothenPath, Grid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smoothenPath", function() { return smoothenPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
/* Default comparison function to be used */
const defaultCmp = function (x, y) {
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
};

/* Push item onto heap, maintaining the heap invariant. */
const heappush = function (array, item, cmp) {
  if (cmp == null) {
    cmp = defaultCmp;
  }
  array.push(item);
  return _siftdown(array, 0, array.length - 1, cmp);
};

/* Pop the smallest item off the heap, maintaining the heap invariant. */
const heappop = function (array, cmp) {
  var lastelt, returnitem;
  if (cmp == null) {
    cmp = defaultCmp;
  }
  lastelt = array.pop();
  if (array.length) {
    returnitem = array[0];
    array[0] = lastelt;
    _siftup(array, 0, cmp);
  } else {
    returnitem = lastelt;
  }
  return returnitem;
};

/*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

const updateItem = function (array, item, cmp) {
  var pos;
  if (cmp == null) {
    cmp = defaultCmp;
  }
  pos = array.indexOf(item);
  if (pos === -1) {
    return;
  }
  _siftdown(array, 0, pos, cmp);
  return _siftup(array, pos, cmp);
};

/* Find the n smallest elements in a dataset. */
const _siftdown = function (array, startpos, pos, cmp) {
  var newitem, parent, parentpos;
  if (cmp == null) {
    cmp = defaultCmp;
  }
  newitem = array[pos];
  while (pos > startpos) {
    parentpos = (pos - 1) >> 1;
    parent = array[parentpos];
    if (cmp(newitem, parent) < 0) {
      array[pos] = parent;
      pos = parentpos;
      continue;
    }
    break;
  }
  return (array[pos] = newitem);
};

const _siftup = function (array, pos, cmp) {
  var childpos, endpos, newitem, rightpos, startpos;
  if (cmp == null) {
    cmp = defaultCmp;
  }
  endpos = array.length;
  startpos = pos;
  newitem = array[pos];
  childpos = 2 * pos + 1;
  while (childpos < endpos) {
    rightpos = childpos + 1;
    if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
      childpos = rightpos;
    }
    array[pos] = array[childpos];
    pos = childpos;
    childpos = 2 * pos + 1;
  }
  array[pos] = newitem;
  return _siftdown(array, startpos, pos, cmp);
};

const Heap = (function () {
  Heap.push = heappush;

  Heap.pop = heappop;

  Heap.updateItem = updateItem;

  function Heap(cmp) {
    this.cmp = cmp != null ? cmp : defaultCmp;
    this.nodes = [];
  }

  Heap.prototype.push = function (x) {
    return heappush(this.nodes, x, this.cmp);
  };

  Heap.prototype.pop = function () {
    return heappop(this.nodes, this.cmp);
  };

  Heap.prototype.updateItem = function (x) {
    return updateItem(this.nodes, x, this.cmp);
  };

  Heap.prototype.empty = function () {
    return this.nodes.length === 0;
  };

  return Heap;
})();

/**
 * Backtrace according to the parent records and return the path.
 * (including both start and end nodes)
 * @param {Node} node End node
 * @return {Array<Array<number>>} the path
 */
function backtrace(node) {
  var path = [[node.x, node.y]];
  while (node.parent) {
    node = node.parent;
    path.push([node.x, node.y]);
  }
  return path.reverse();
}

/**
 * Given the start and end coordinates, return all the coordinates lying
 * on the line formed by these coordinates, based on Bresenham's algorithm.
 * http://en.wikipedia.org/wiki/Bresenham's_line_algorithm#Simplification
 * @param {number} x0 Start x coordinate
 * @param {number} y0 Start y coordinate
 * @param {number} x1 End x coordinate
 * @param {number} y1 End y coordinate
 * @return {Array<Array<number>>} The coordinates on the line
 */
function interpolate(x0, y0, x1, y1) {
  var abs = Math.abs,
    line = [],
    sx,
    sy,
    dx,
    dy,
    err,
    e2;

  dx = abs(x1 - x0);
  dy = abs(y1 - y0);

  sx = x0 < x1 ? 1 : -1;
  sy = y0 < y1 ? 1 : -1;

  err = dx - dy;

  while (true) {
    line.push([x0, y0]);

    if (x0 === x1 && y0 === y1) {
      break;
    }

    e2 = 2 * err;
    if (e2 > -dy) {
      err = err - dy;
      x0 = x0 + sx;
    }
    if (e2 < dx) {
      err = err + dx;
      y0 = y0 + sy;
    }
  }

  return line;
}

/**
 * Smoothen the give path.
 * The original path will not be modified; a new path will be returned.
 * @param {PF.Grid} grid
 * @param {Array<Array<number>>} path The path
 */
function smoothenPath(grid, path) {
  var len = path.length,
    x0 = path[0][0], // path start x
    y0 = path[0][1], // path start y
    x1 = path[len - 1][0], // path end x
    y1 = path[len - 1][1], // path end y
    sx,
    sy, // current start coordinate
    ex,
    ey, // current end coordinate
    newPath,
    i,
    j,
    coord,
    line,
    testCoord,
    blocked,
    lastValidCoord;

  sx = x0;
  sy = y0;
  newPath = [[sx, sy]];

  for (i = 2; i < len; ++i) {
    coord = path[i];
    ex = coord[0];
    ey = coord[1];
    line = interpolate(sx, sy, ex, ey);

    blocked = false;
    for (j = 1; j < line.length; ++j) {
      testCoord = line[j];

      if (!grid.isWalkableAt(testCoord[0], testCoord[1])) {
        blocked = true;
        break;
      }
    }
    if (blocked) {
      lastValidCoord = path[i - 1];
      newPath.push(lastValidCoord);
      sx = lastValidCoord[0];
      sy = lastValidCoord[1];
    }
  }
  newPath.push([x1, y1]);

  return newPath;
}

/**
 * @namespace PF.Heuristic
 * @description A collection of heuristic functions.
 */
var Heuristic = {
  manhattan: function (dx, dy) {
    return dx + dy;
  },
};

var DiagonalMovement = {
  Never: 2,
};

function Node(x, y, walkable) {
  /**
   * The x coordinate of the node on the grid.
   * @type number
   */
  this.x = x;
  /**
   * The y coordinate of the node on the grid.
   * @type number
   */
  this.y = y;
  /**
   * Whether this node can be walked through.
   * @type boolean
   */
  this.walkable = walkable === undefined ? true : walkable;
}

/**
 * The Grid class, which serves as the encapsulation of the layout of the nodes.
 * @constructor
 * @param {number|Array<Array<(number|boolean)>>} width_or_matrix Number of columns of the grid, or matrix
 * @param {number} height Number of rows of the grid.
 * @param {Array<Array<(number|boolean)>>} [matrix] - A 0-1 matrix
 *     representing the walkable status of the nodes(0 or false for walkable).
 *     If the matrix is not supplied, all the nodes will be walkable.  */
function Grid(width_or_matrix, height, matrix) {
  var width;

  if (typeof width_or_matrix !== "object") {
    width = width_or_matrix;
  } else {
    height = width_or_matrix.length;
    width = width_or_matrix[0].length;
    matrix = width_or_matrix;
  }

  /**
   * The number of columns of the grid.
   * @type number
   */
  this.width = width;
  /**
   * The number of rows of the grid.
   * @type number
   */
  this.height = height;

  /**
   * A 2D array of nodes.
   */
  this.nodes = this._buildNodes(width, height, matrix);
}

/**
 * Build and return the nodes.
 * @private
 * @param {number} width
 * @param {number} height
 * @param {Array<Array<number|boolean>>} [matrix] - A 0-1 matrix representing
 *     the walkable status of the nodes.
 * @see Grid
 */
Grid.prototype._buildNodes = function (width, height, matrix) {
  var i,
    j,
    nodes = new Array(height);

  for (i = 0; i < height; ++i) {
    nodes[i] = new Array(width);
    for (j = 0; j < width; ++j) {
      nodes[i][j] = new Node(j, i);
    }
  }

  if (matrix === undefined) {
    return nodes;
  }

  if (matrix.length !== height || matrix[0].length !== width) {
    throw new Error("Matrix size does not fit");
  }

  for (i = 0; i < height; ++i) {
    for (j = 0; j < width; ++j) {
      if (matrix[i][j]) {
        // 0, false, null will be walkable
        // while others will be un-walkable
        nodes[i][j].walkable = false;
      }
    }
  }

  return nodes;
};

Grid.prototype.getNodeAt = function (x, y) {
  return this.nodes[y][x];
};

/**
 * Determine whether the node at the given position is walkable.
 * (Also returns false if the position is outside the grid.)
 * @param {number} x - The x coordinate of the node.
 * @param {number} y - The y coordinate of the node.
 * @return {boolean} - The walkability of the node.
 */
Grid.prototype.isWalkableAt = function (x, y) {
  return this.isInside(x, y) && this.nodes[y][x].walkable;
};

/**
 * Determine whether the position is inside the grid.
 * XXX: `grid.isInside(x, y)` is wierd to read.
 * It should be `(x, y) is inside grid`, but I failed to find a better
 * name for this method.
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
Grid.prototype.isInside = function (x, y) {
  return x >= 0 && x < this.width && y >= 0 && y < this.height;
};

/**
 * Get the neighbors of the given node.
 *
 *     offsets      diagonalOffsets:
 *  +---+---+---+    +---+---+---+
 *  |   | 0 |   |    | 0 |   | 1 |
 *  +---+---+---+    +---+---+---+
 *  | 3 |   | 1 |    |   |   |   |
 *  +---+---+---+    +---+---+---+
 *  |   | 2 |   |    | 3 |   | 2 |
 *  +---+---+---+    +---+---+---+
 *
 *  When allowDiagonal is true, if offsets[i] is valid, then
 *  diagonalOffsets[i] and
 *  diagonalOffsets[(i + 1) % 4] is valid.
 * @param {Node} node
 * @param {DiagonalMovement} diagonalMovement
 */
Grid.prototype.getNeighbors = function (node) {
  var x = node.x,
    y = node.y,
    neighbors = [],
    nodes = this.nodes;

  // ↑
  if (this.isWalkableAt(x, y - 1)) {
    neighbors.push(nodes[y - 1][x]);
  }
  // →
  if (this.isWalkableAt(x + 1, y)) {
    neighbors.push(nodes[y][x + 1]);
  }
  // ↓
  if (this.isWalkableAt(x, y + 1)) {
    neighbors.push(nodes[y + 1][x]);
  }
  // ←
  if (this.isWalkableAt(x - 1, y)) {
    neighbors.push(nodes[y][x - 1]);
  }

  return neighbors;
};

/**
 * A* path-finder. Based upon https://github.com/bgrins/javascript-astar
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 */
function AStarFinder() {
  this.heuristic = Heuristic.manhattan;
  this.weight = 1;
  this.diagonalMovement = DiagonalMovement.Never;
}

/**
 * Find and return the the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
AStarFinder.prototype.findPath = function (startX, startY, endX, endY, grid) {
  var openList = new Heap(function (nodeA, nodeB) {
      return nodeA.f - nodeB.f;
    }),
    startNode = grid.getNodeAt(startX, startY),
    endNode = grid.getNodeAt(endX, endY),
    heuristic = this.heuristic,
    weight = this.weight,
    abs = Math.abs,
    SQRT2 = Math.SQRT2,
    node,
    neighbors,
    neighbor,
    i,
    l,
    x,
    y,
    ng;

  // set the `g` and `f` value of the start node to be 0
  startNode.g = 0;
  startNode.f = 0;

  // push the start node into the open list
  openList.push(startNode);
  startNode.opened = true;

  // while the open list is not empty
  while (!openList.empty()) {
    // pop the position of node which has the minimum `f` value.
    node = openList.pop();
    node.closed = true;

    // if reached the end position, construct the path and return it
    if (node === endNode) {
      return backtrace(endNode);
    }

    // get neigbours of the current node
    neighbors = grid.getNeighbors(node);
    for (i = 0, l = neighbors.length; i < l; ++i) {
      neighbor = neighbors[i];

      if (neighbor.closed) {
        continue;
      }

      x = neighbor.x;
      y = neighbor.y;

      // get the distance between current node and the neighbor
      // and calculate the next g score
      ng = node.g + (x - node.x === 0 || y - node.y === 0 ? 1 : SQRT2);

      // check if the neighbor has not been inspected yet, or
      // can be reached with smaller cost from the current node
      if (!neighbor.opened || ng < neighbor.g) {
        neighbor.g = ng;
        neighbor.h =
          neighbor.h || weight * heuristic(abs(x - endX), abs(y - endY));
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = node;

        if (!neighbor.opened) {
          openList.push(neighbor);
          neighbor.opened = true;
        } else {
          // the neighbor can be reached with smaller cost.
          // Since its f value has been updated, we have to
          // update its position in the open list
          openList.updateItem(neighbor);
        }
      }
    } // end for each neighbor
  } // end while not open list empty

  // fail to find the path
  return [];
};

/* harmony default export */ __webpack_exports__["default"] = (AStarFinder);


/***/ }),

/***/ "./src/Background.js":
/*!***************************!*\
  !*** ./src/Background.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Background; });
class Background {
  constructor({ cw, ch }) {
    this.stars = Array(500)
      .fill(0)
      .map((_) => [
        Math.random() * cw,
        Math.random() * ch,
        Math.floor(Math.random() * 6),
      ]);
  }

  draw(drawer) {
    drawer.draw(() => {
      drawer.drawBackground("#600c0c", "#0c6060");
    });

    this.stars.forEach(([x, y, o]) => {
      drawer.rect({
        adjusted: false,
        fillColor: "#fff" + o,
        rect: [x, y, 8 - o, 8 - o],
      });
    });
  }
}


/***/ }),

/***/ "./src/Building.js":
/*!*************************!*\
  !*** ./src/Building.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HUD__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HUD */ "./src/HUD.js");
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Map */ "./src/Map.js");
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Particle */ "./src/Particle.js");




class Building {
  constructor(x, y, template, color, built, builder = null, miniMapColor) {
    this.health = template.health;
    this.sizeX = template.sizeX;
    this.sizeY = template.sizeY;
    this.name = template.name;
    this.actionsTemplate = template.actions;
    this.buildingProgress = built ? 0 : template.buildTime;
    this.cost = template.cost;
    this.drawBuilding = template.drawBuilding;

    this.x = x;
    this.y = y;
    this.lifespan = 0;
    this.maxHealth = this.health;
    this.selected = false;
    this.type = "building";
    this.tasks = [];
    this.color = color;
    this.miniMapColor = miniMapColor;
    this.attackSelected = 0;
    this.built = built;
    this.builder = builder;
    this.bloodColor = "#666";
    this.inFog = 0;
  }

  attacked() {
    this.attackSelected = 20;
  }

  takeDamage(amount, { particles, d }) {
    this.health -= amount;
    for (let i = 0; i < amount; i++) {
      particles.add(
        new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"](
          "blood",
          this.x + this.sizeX / 2,
          this.y + this.sizeY / 2,
          Math.random() * 8 - 4 + d.dx * 2,
          Math.random() * -16 - 8 + d.dy * 2,
          this.bloodColor
        )
      );
    }
    return this.health <= 0;
  }

  explode({ particles, sound }) {
    sound.play("death");
    for (let i = 0; i < 100; i++) {
      particles.add(
        new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"](
          "blood",
          this.x + this.sizeX / 2,
          this.y + this.sizeY / 2,
          Math.random() * 8 - 4,
          Math.random() * -16 - 8,
          this.bloodColor
        )
      );
    }
    for (let i = 0; i < 20; i++) {
      const c = Math.floor(Math.random() * 34 + 51);
      particles.add(
        new _Particle__WEBPACK_IMPORTED_MODULE_2__["default"](
          "bit",
          this.x + this.sizeX / 2,
          this.y + this.sizeY / 2,
          Math.random() * 8 - 4,
          Math.random() * -16 - 8,
          `#${c}${c}${c}`
        )
      );
    }
  }

  hitbox() {
    return this;
  }

  tick({ player }) {
    this.lifespan += 1;
    const [currentTask] = this.tasks;
    if (currentTask) {
      currentTask.time -= 1;
      if (currentTask.time <= 0) {
        const { complete } = this.tasks.shift();
        complete({ player });
      }
    }

    if (this.attackSelected > 0) this.attackSelected -= 1;
  }

  queueTask(task, { player }) {
    this.tasks.push({ ...task, totalTime: task.time });
  }

  actions({ player }) {
    let output = Array(9).fill({});

    const building = this;
    if (!this.built) {
      output[8] = {
        name: "cancel",
        cost: 0,
        actionable: () => true,
        execute: ({ player }) => {
          player.cancelBuilding(this);
          player.selected = [];
        },
        drawIcon: _HUD__WEBPACK_IMPORTED_MODULE_0__["default"].cancelIcon,
      };
    } else {
      this.actionsTemplate({ building, output, player });
    }
    return output;
  }

  hudDrawCurrentTask(drawer, x, y) {
    const { name, time, totalTime, drawIcon } = this.tasks[0];
    drawer.text({
      text: `${name}`,
      x: x + 200 + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"] + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_MARGIN"],
      y: y + 13,
      size: 5,
    });

    // progress bar
    const PROGRESS_BAR_WIDTH = 200;
    const PROGRESS_BAR_HEIGHT = 10;
    const PROGRESS_BAR_X = x + 200 + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"] + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_MARGIN"];
    const PROGRESS_BAR_Y = y + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"] - PROGRESS_BAR_HEIGHT;
    drawer.rect({
      adjusted: false,
      strokeColor: "#0f0",
      rect: [
        PROGRESS_BAR_X,
        PROGRESS_BAR_Y,
        PROGRESS_BAR_WIDTH,
        PROGRESS_BAR_HEIGHT,
      ],
    });
    drawer.rect({
      adjusted: false,
      fillColor: "#0f0",
      rect: [
        PROGRESS_BAR_X,
        PROGRESS_BAR_Y,
        ((totalTime - time) / totalTime) * PROGRESS_BAR_WIDTH,
        PROGRESS_BAR_HEIGHT,
      ],
    });
    drawer.rect({
      adjusted: false,
      strokeColor: "#0f0",
      rect: [x + 200, y, _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"], _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"]],
    });
    drawIcon(drawer, x + 200, y);
  }

  hudDraw(drawer, x, y) {
    if (this.tasks.length) {
      this.hudDrawCurrentTask(drawer, x, y);
      this.tasks.slice(1).forEach(({ drawIcon }, i) => {
        drawer.rect({
          adjusted: false,
          strokeColor: "#0f0",
          rect: [
            x + 200 + (_HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_MARGIN"] + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"]) * i,
            y + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"] + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_MARGIN"],
            _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"],
            _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"],
          ],
        });
        drawIcon(
          drawer,
          x + 200 + (_HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_MARGIN"] + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"]) * i,
          y + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_MARGIN"] + _HUD__WEBPACK_IMPORTED_MODULE_0__["ICON_BOX_SIZE"]
        );
      });
    }
  }

  hudDrawIcon(drawer, x, y) {
    Building.hudDrawIcon(drawer, x, y);
  }

  draw(drawer) {
    const height = this.sizeY - _Map__WEBPACK_IMPORTED_MODULE_1__["default"].tileSize;
    const drawRing = (color) => {
      drawer.ellipse({
        ellipse: [
          this.x + this.sizeX / 2,
          this.y + height + _Map__WEBPACK_IMPORTED_MODULE_1__["default"].tileSize,
          (this.sizeX + 40) / 2,
          height / 3,
          0,
          0,
          2 * Math.PI,
        ],
        strokeColor: color,
        strokeWidth: 5,
      });
    };
    if (this.selected) drawRing("#4AC");
    if (this.attackSelected > 0) drawRing("#A00");

    this.drawBuilding(
      drawer,
      this.x,
      this.y,
      this.sizeX,
      height,
      this.color,
      this.built ? "F" : "4"
    );

    const hitbox = false;
    if (hitbox) {
      drawer.rect({
        fillColor: "#A006",
        rect: [this.x, this.y, this.sizeX, this.sizeY],
      });
    }

    if (!this.inFog) {
      drawer.miniMap({
        x: this.x,
        y: this.y,
        color: this.miniMapColor,
        sizeX: Math.ceil(this.sizeX / 20),
        sizeY: Math.ceil(this.sizeY / 20),
      });
    }
  }
}

Building.hudDrawIcon = (drawer, x, y) => {};

/* harmony default export */ __webpack_exports__["default"] = (Building);


/***/ }),

/***/ "./src/CPUPlayer.js":
/*!**************************!*\
  !*** ./src/CPUPlayer.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Unit */ "./src/Unit.js");
/* harmony import */ var _distance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./distance */ "./src/distance.js");




const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

class CPUPlayer extends _Player__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ map }) {
    super();
    this.color = "#00A";
    this.miniMapColor = "#F00";
    map.cpuBases.forEach(([x, y]) => {
      this.addBuilding({ type: "base", x: 80 * x, y: 80 * y });
    });
    map.cpuShades.forEach(([x, y]) => {
      this.addUnit({ type: "shade", x: 80 * x, y: 80 * y });
    });
    map.cpuGoblins.forEach(([x, y]) => {
      this.addUnit({ type: "goblin", x: 80 * x, y: 80 * y });
    });
  }

  cpuActions({ map, mines }) {
    const MOVE_RATE = 0.0;
    const WORKER_BUILD_RATE = 0.001;
    const GOBLIN_BUILD_RATE = 0.001;

    // idle workers mine
    this.units
      .filter((unit) => unit.name === "shade" && unit.state === _Unit__WEBPACK_IMPORTED_MODULE_1__["STATES"].IDLE)
      .forEach((unit) => {
        mines.mines.sort((a, b) => Object(_distance__WEBPACK_IMPORTED_MODULE_2__["distance"])(unit, a) - Object(_distance__WEBPACK_IMPORTED_MODULE_2__["distance"])(unit, b));
        const [mine] = mines.mines;
        unit.setMining(mine);
      });

    // idle units randomly wander
    if (Math.random() < MOVE_RATE) {
      const unit = sample(this.units.filter((u) => u.state === _Unit__WEBPACK_IMPORTED_MODULE_1__["STATES"].IDLE));
      if (unit) {
        const path = [
          Math.floor(80 * 18 + 80 * Math.random() * 5),
          Math.floor(80 + 80 * Math.random() * 7),
        ];
        const success = unit.setPath(path, map);
        if (success) unit.state = _Unit__WEBPACK_IMPORTED_MODULE_1__["STATES"].MOVING;
        console.log(
          `cpu moving ${unit.name} to ${path}${success ? "" : ", but failed"}`
        );
      }
    }

    // randomly build workers
    const [base] = this.buildings.filter((b) => b.name === "base");
    if (Math.random() < WORKER_BUILD_RATE) {
      this.tryAction(base, "build shade");
    }

    // build one barracks
    if (
      this.buildings.filter((b) => b.name === "barracks").length === 0 &&
      this.resources >= 250
    ) {
      const builder = sample(this.units.filter((u) => u.builder));
      if (builder) {
        this.placeBuildingForConstruction({
          building: "barracks",
          x: base.x - 300,
          y: base.y,
          map,
          unit: builder,
        });
      }
    }

    // randomly build goblins
    const [barracks] = this.buildings.filter((b) => b.name === "barracks");
    if (Math.random() < GOBLIN_BUILD_RATE) {
      this.tryAction(barracks, "build goblin");
    }
  }

  tryAction(building, actionName) {
    if (!building || !building.built) return false;
    const [action] = building
      .actions({ player: this })
      .filter(({ name }) => name === actionName);

    try {
      const success = action.execute({ player: this });
      console.log(
        `cpu executing ${action.name} on ${building.name}${
          success ? "" : ", but failed"
        }, and has ${this.resources} left`
      );
    } catch (e) {
      console.log("cpu errored on action", building, actionName);
    }
  }

  tick({ map, mines, particles, sound, targets }) {
    this.cpuActions({ map, mines });
    _Player__WEBPACK_IMPORTED_MODULE_0__["default"].tick.call(this, { map, particles, sound, targets });
  }

  draw(drawer) {
    _Player__WEBPACK_IMPORTED_MODULE_0__["default"].draw.call(this, drawer);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (CPUPlayer);


/***/ }),

/***/ "./src/Camera.js":
/*!***********************!*\
  !*** ./src/Camera.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HUD__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HUD */ "./src/HUD.js");
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Map */ "./src/Map.js");



class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.position_x = 0;
    this.position_y = 0;
    this.shakeRemaining = 0;
    this.shakeForce = 0;
  }

  setX(x) {
    this.position_x = this.clampX(x);
  }

  setY(y) {
    this.position_y = this.clampY(y);
  }

  adjustX(x) {
    return x - this.x;
  }

  adjustY(y) {
    return y - this.y;
  }

  clampX(x) {
    return Math.min(Math.max(0, x), _Map__WEBPACK_IMPORTED_MODULE_1__["default"].size - this.width);
  }

  clampY(y) {
    return Math.min(
      Math.max(0, y),
      _Map__WEBPACK_IMPORTED_MODULE_1__["default"].size * (_Map__WEBPACK_IMPORTED_MODULE_1__["default"].tileSizeY / _Map__WEBPACK_IMPORTED_MODULE_1__["default"].tileSize) - this.height
    );
  }

  shake(force, duration) {
    if (force >= this.shakeForce || this.shakeRemaining === 0) {
      this.shakeRemaining = duration;
      this.shakeForce = force;
    }
  }

  applyShake() {
    this.shakeRemaining = Math.max(0, this.shakeRemaining - 1);
    if (!this.shakeRemaining) return;
    const shakeX = Math.random() * this.shakeForce * 2 - this.shakeForce;
    const shakeY = Math.random() * this.shakeForce * 2 - this.shakeForce;
    this.x += shakeX;
    this.y += shakeY;
  }

  tick({ keyboard, mouse }) {
    const SPEED = 15;
    const THRESHOLD = _HUD__WEBPACK_IMPORTED_MODULE_0__["default"].HUD_PADDING;
    const [mx, my] = mouse.mouseScreenLocation;

    if (keyboard.isDown(keyboard.UP) || my < THRESHOLD)
      this.position_y -= SPEED;
    if (keyboard.isDown(keyboard.DOWN) || my > this.height - THRESHOLD)
      this.position_y += SPEED;
    if (keyboard.isDown(keyboard.LEFT) || mx < THRESHOLD)
      this.position_x -= SPEED;
    if (keyboard.isDown(keyboard.RIGHT) || mx > this.width - THRESHOLD)
      this.position_x += SPEED;

    this.setX(this.position_x);
    this.setY(this.position_y);

    this.x = this.position_x;
    this.y = this.position_y;

    this.applyShake();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Camera);


/***/ }),

/***/ "./src/Drawer.js":
/*!***********************!*\
  !*** ./src/Drawer.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Drawer; });
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Camera */ "./src/Camera.js");
/* harmony import */ var _HUD__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HUD */ "./src/HUD.js");
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Map */ "./src/Map.js");




let cx = null;

class Drawer {
  constructor() {
    let canvas = document.querySelector("canvas");
    this.canvas = canvas;
    cx = this.canvas.getContext("2d");
    this.camera = new _Camera__WEBPACK_IMPORTED_MODULE_0__["default"]();

    let container = document.querySelector("body");
    let resize = () => {
      this.camera.height = window.innerHeight;
      this.camera.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      this.height = canvas.height;
      this.width = canvas.width;
    };
    resize();
    container.onresize = resize;

    this.miniMapObjects = [];
  }

  draw(d) {
    cx.save();
    d();
    cx.restore();
  }

  clearBackground() {
    cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(start, end) {
    this.draw(() => {
      const gradient = cx.createLinearGradient(
        0,
        0,
        this.height - _HUD__WEBPACK_IMPORTED_MODULE_1__["default"].HUD_HEIGHT,
        this.width
      );

      gradient.addColorStop(0, start);
      gradient.addColorStop(1, end);

      cx.fillStyle = gradient;

      cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    });
  }

  rect({
    rect,
    fillColor,
    strokeColor,
    shadowBlur = 0,
    shadowColor = "none",
    opacity,
    lineWidth = 1,
    adjusted = true,
    rotation,
    size,
    crisp = true,
  }) {
    if (crisp) {
      rect[0] = Math.floor(rect[0]);
      rect[1] = Math.floor(rect[1]);
    }
    if (adjusted) {
      rect[0] = this.camera.adjustX(rect[0], this.canvas.width);
      rect[1] = this.camera.adjustY(rect[1], this.canvas.height);
    }
    if (rotation) {
      cx.translate(rect[0] + size / 2, rect[1] + size / 2);
      cx.rotate(rotation);
      cx.translate(-1 * rect[0] - size / 2, -1 * rect[1] - size / 2);
    }
    cx.shadowBlur = shadowBlur;
    cx.shadowColor = shadowColor;
    if (opacity) {
      cx.globalAlpha = opacity;
    }
    if (fillColor) {
      cx.fillStyle = fillColor;
      cx.fillRect(...[rect[0], rect[1], ...rect.slice(2)]);
    }
    if (strokeColor) {
      cx.strokeStyle = strokeColor;
      cx.lineWidth = lineWidth;
      cx.strokeRect(...[rect[0], rect[1], ...rect.slice(2)]);
    }
    cx.shadowBlur = 0;
    cx.globalAlpha = 1;
  }

  triangle({ x, y, adjusted = true, fillColor, rotation, size }) {
    this.draw(() => {
      if (adjusted) {
        x = this.camera.adjustX(x, this.canvas.width);
        y = this.camera.adjustY(y, this.canvas.height);
      }
      if (rotation) {
        cx.translate(x + size / 2, y + size / 2);
        cx.rotate(rotation);
        cx.translate(-1 * x - size / 2, -1 * y - size / 2);
      }
      if (fillColor) {
        let region = new Path2D();
        region.moveTo(x, y);
        region.lineTo(x + size, y);
        region.lineTo(x, y + size);
        region.closePath();

        cx.fillStyle = fillColor;
        cx.fill(region);
      }
    });
  }

  ellipse({
    ellipse,
    adjusted = true,
    fillColor,
    strokeColor,
    strokeWidth = 1,
    shadowBlur,
    shadowColor,
  }) {
    if (adjusted) {
      ellipse[0] = this.camera.adjustX(ellipse[0], this.canvas.width);
      ellipse[1] = this.camera.adjustY(ellipse[1], this.canvas.height);
    }
    cx.beginPath();
    cx.ellipse(...ellipse);
    cx.shadowBlur = shadowBlur;
    cx.shadowColor = shadowColor;
    if (fillColor) {
      cx.fillStyle = fillColor;
      cx.fill();
    }
    if (strokeColor) {
      cx.strokeStyle = strokeColor;
      cx.lineWidth = strokeWidth;
      cx.stroke();
    }
    cx.shadowBlur = 0;
  }

  text({ text, x, y, fillColor = "#fff", size = 1 }) {
    cx.fillStyle = fillColor;

    let currX = 0;

    text
      .toUpperCase()
      .split("")
      .map((c) => {
        if (!letters[c]) console.log(c);
        return letters[c];
      })
      .forEach((letter) => {
        let currY = 0;
        let addX = 0;
        letter.forEach((row) => {
          row.forEach((bit, i) => {
            bit && cx.fillRect(currX + i * size + x, currY + y, size, size);
          });
          addX = Math.max(addX, row.length * size);
          currY += size;
        });
        currX += size + addX;
      });
  }

  lines({
    lines,
    shadowBlur = 0,
    shadowColor,
    fillColor,
    strokeColor,
    adjusted = true,
  }) {
    cx.beginPath();
    let sx = lines[0][0];
    let sy = lines[0][1];
    if (adjusted) {
      sx = this.camera.adjustX(sx, this.canvas.width);
      sy = this.camera.adjustY(sy, this.canvas.height);
    }
    cx.moveTo(sx, sy);
    lines.slice(1).forEach(([x, y]) => {
      if (adjusted) {
        x = this.camera.adjustX(x, this.canvas.width);
        y = this.camera.adjustY(y, this.canvas.height);
      }
      cx.lineTo(x, y);
    });
    cx.closePath();
    cx.shadowBlur = shadowBlur;
    cx.shadowColor = shadowColor;
    if (strokeColor) {
      cx.strokeStyle = strokeColor;
      cx.stroke();
    }
    if (fillColor) {
      cx.fillStyle = fillColor;
      cx.fill();
    }
  }

  emoji({ emoji, x, y, flipped, adjusted = true }) {
    this.draw(() => {
      if (adjusted) {
        x = this.camera.adjustX(x, this.canvas.width);
        y = this.camera.adjustY(y, this.canvas.height);
      }
      if (flipped) {
        // cx.scale(-1, 1);
        // cx.translate(canvasWidth.width / 2, canvasHeight.height / 2);
      }

      cx.font = "6px serif";
      cx.fillText(emoji, x, y + 2);
    });
  }

  miniMap({ x, y, size, sizeX, sizeY, color }) {
    const miniMapSize = 250;
    this.miniMapObjects.push(() =>
      this.rect({
        adjusted: false,
        fillColor: color,
        rect: [
          (x / _Map__WEBPACK_IMPORTED_MODULE_2__["default"].size) * miniMapSize + _HUD__WEBPACK_IMPORTED_MODULE_1__["default"].HUD_PADDING,
          this.canvas.height -
            miniMapSize +
            (y / _Map__WEBPACK_IMPORTED_MODULE_2__["default"].size) * miniMapSize -
            _HUD__WEBPACK_IMPORTED_MODULE_1__["default"].HUD_PADDING,
          sizeX || size,
          sizeY || size,
        ],
      })
    );
  }

  clearMiniMap() {
    this.miniMapObjects = [];
  }

  renderMiniMap() {
    this.miniMapObjects.forEach((obj) => {
      this.draw(obj);
    });
  }

  hitbox({ x, y, size }) {
    this.rect({
      rect: [x - size / 2, y - size / 2, size, size],
      color: "#f00",
    });
  }
}

const letters = {};
letters["A"] = [
  [, 1],
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
  [1, , 1],
];
letters["B"] = [
  [1, 1],
  [1, , 1],
  [1, 1, 1],
  [1, , 1],
  [1, 1],
];
letters["C"] = [[1, 1, 1], [1], [1], [1], [1, 1, 1]];
letters["D"] = [
  [1, 1],
  [1, , 1],
  [1, , 1],
  [1, , 1],
  [1, 1],
];
letters["E"] = [[1, 1, 1], [1], [1, 1, 1], [1], [1, 1, 1]];
letters["F"] = [[1, 1, 1], [1], [1, 1], [1], [1]];
letters["G"] = [[, 1, 1], [1], [1, , 1, 1], [1, , , 1], [, 1, 1]];
letters["H"] = [
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
  [1, , 1],
  [1, , 1],
];
letters["I"] = [
  [1, 1, 1],
  [, 1],
  [, 1],
  [, 1],
  [1, 1, 1],
];
letters["J"] = [
  [1, 1, 1],
  [, , 1],
  [, , 1],
  [1, , 1],
  [1, 1, 1],
];
letters["K"] = [
  [1, , , 1],
  [1, , 1],
  [1, 1],
  [1, , 1],
  [1, , , 1],
];
letters["L"] = [[1], [1], [1], [1], [1, 1, 1]];
letters["M"] = [
  [1, 1, 1, 1, 1],
  [1, , 1, , 1],
  [1, , 1, , 1],
  [1, , , , 1],
  [1, , , , 1],
];
letters["N"] = [
  [1, , , 1],
  [1, 1, , 1],
  [1, , 1, 1],
  [1, , , 1],
  [1, , , 1],
];
letters["O"] = [
  [1, 1, 1],
  [1, , 1],
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
];
letters["P"] = [[1, 1, 1], [1, , 1], [1, 1, 1], [1], [1]];
letters["Q"] = [
  [0, 1, 1],
  [1, , , 1],
  [1, , , 1],
  [1, , 1, 1],
  [1, 1, 1, 1],
];
letters["R"] = [
  [1, 1],
  [1, , 1],
  [1, , 1],
  [1, 1],
  [1, , 1],
];
letters["S"] = [[1, 1, 1], [1], [1, 1, 1], [, , 1], [1, 1, 1]];
letters["T"] = [
  [1, 1, 1],
  [, 1],
  [, 1],
  [, 1],
  [, 1],
];
letters["U"] = [
  [1, , 1],
  [1, , 1],
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
];
letters["V"] = [
  [1, , , , 1],
  [1, , , , 1],
  [, 1, , 1],
  [, 1, , 1],
  [, , 1],
];
letters["W"] = [
  [1, , , , 1],
  [1, , , , 1],
  [1, , , , 1],
  [1, , 1, , 1],
  [1, 1, 1, 1, 1],
];
letters["X"] = [
  [1, , , , 1],
  [, 1, , 1],
  [, , 1],
  [, 1, , 1],
  [1, , , , 1],
];
letters["Y"] = [
  [1, , 1],
  [1, , 1],
  [, 1],
  [, 1],
  [, 1],
];
letters["Z"] = [
  [1, 1, 1, 1, 1],
  [, , , 1],
  [, , 1],
  [, 1],
  [1, 1, 1, 1, 1],
];
letters[" "] = [
  [, ,],
  [, ,],
  [, ,],
  [, ,],
  [, ,],
];
letters["0"] = [
  [1, 1, 1],
  [1, , 1],
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
];
letters["1"] = [
  [, 1],
  [, 1],
  [, 1],
  [, 1],
  [, 1],
];
letters["2"] = [
  [1, 1, 1],
  [, , 1],
  [1, 1, 1],
  [1, ,],
  [1, 1, 1],
];
letters["3"] = [
  [1, 1, 1],
  [, , 1],
  [1, 1, 1],
  [, , 1],
  [1, 1, 1],
];
letters["4"] = [
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
  [, , 1],
  [, , 1],
];
letters["5"] = [
  [1, 1, 1],
  [1, ,],
  [1, 1, 1],
  [, , 1],
  [1, 1, 1],
];
letters["6"] = [
  [1, 1, 1],
  [1, ,],
  [1, 1, 1],
  [1, , 1],
  [1, 1, 1],
];
letters["7"] = [
  [1, 1, 1],
  [, , 1],
  [, , 1],
  [, , 1],
  [, , 1],
];
letters["8"] = [
  [1, 1, 1],
  [1, , 1],
  [1, 1, 1],
  [1, , 1],
  [1, 1, 1],
];
letters["9"] = [
  [1, 1, 1],
  [1, , 1],
  [1, 1, 1],
  [, , 1],
  [1, 1, 1],
];
letters["/"] = [
  [, , 1],
  [, , 1],
  [, 1],
  [1, ,],
  [1, ,],
];
letters["!"] = [
  [, 1],
  [, 1],
  [, 1],
  [, ,],
  [, 1],
];


/***/ }),

/***/ "./src/FogOfWar.js":
/*!*************************!*\
  !*** ./src/FogOfWar.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map */ "./src/Map.js");


class FogOfWar {
  constructor() {
    this.tiles = [];
  }

  tick({ humanPlayer, cpuPlayer, mines, map }) {
    const tiles = [];
    for (let y = 0; y < map.height; y++) {
      const row = [];
      for (let x = 0; x < map.width; x++) {
        row.push(1);
      }
      tiles.push(row);
    }

    const clampX = (x) => Math.min(Math.max(0, x), map.width - 1);
    const clampY = (y) => Math.min(Math.max(0, y), map.height - 1);

    humanPlayer.entities().forEach((e) => {
      const SIGHT = 10;

      const [x, y] = map.coordsToTile(e.x, e.y);

      for (let dy = clampY(y - SIGHT); dy <= clampY(y + SIGHT); dy++) {
        const d = Math.floor(
          Math.sqrt(Math.abs(SIGHT ** 2 - Math.abs(dy - y) ** 2))
        );
        for (let dx = clampX(x - d); dx <= clampX(x + d); dx++) {
          tiles[dy][dx] = 0;
        }
      }
    });

    cpuPlayer
      .entities()
      .concat(mines.mines)
      .forEach((e) => {
        const { x, y } = e;
        e.inFog =
          tiles[Math.floor(y / _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize)][Math.floor(x / _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize)];
      });

    this.tiles = tiles;
  }

  draw(drawer) {
    // return;
    this.tiles.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (!tile) return;
        drawer.rect({
          fillColor: "#222",
          rect: [
            x * _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSizeX,
            y * _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSizeY,
            _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSizeX,
            _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSizeY,
          ],
        });
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (FogOfWar);


/***/ }),

/***/ "./src/HUD.js":
/*!********************!*\
  !*** ./src/HUD.js ***!
  \********************/
/*! exports provided: ICON_BOX_SIZE, ICON_BOX_MARGIN, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ICON_BOX_SIZE", function() { return ICON_BOX_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ICON_BOX_MARGIN", function() { return ICON_BOX_MARGIN; });
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map */ "./src/Map.js");


const ICON_BOX_SIZE = 60;
const ICON_BOX_MARGIN = 10;

const INFOBOX_ICON_ROW_MAX = 8;

const INFOBOX_PADDING = 20;

const ACTIONBOX_ROW_MAX = 3;

const miniMapSize = 250;

class HUD {
  constructor() {
    this.selected = [];
  }

  tick({ camera, drawer, map, mouse, player, sound }) {
    this.selected = player.selected;
    this.resources = player.resources;
    this.drawerWidth = drawer.width;
    this.drawerHeight = drawer.height;
    this.actionboxX = this.drawerWidth - HUD.HUD_HEIGHT - HUD.HUD_PADDING;
    this.actionboxY = this.drawerHeight - HUD.HUD_HEIGHT - HUD.HUD_PADDING;
    this.infoboxX = miniMapSize + HUD.HUD_PADDING * 2;
    this.infoboxY = drawer.height - HUD.HUD_HEIGHT - HUD.HUD_PADDING;
    this.actionBoxes = this.getActionBoxes({ player });
    this.actionBoxText = "";

    if (this.selected.length) {
      if (mouse.clickTarget[0] || mouse.clickTarget[1]) {
        this.clickAction({ camera, mouse, player });
      }
      if (mouse.mouseLocation[0] || mouse.mouseLocation[1]) {
        this.hoverActions({ camera, mouse });
      }
    }

    this.miniMapClick({ camera, drawer, map, mouse, player });
    this.miniMapRightClick({ camera, drawer, map, mouse, player, sound });
  }

  miniMapClick({ camera, drawer, map, mouse, player }) {
    const miniMapSize = 250;
    const { clicked, x, y } = player.inMiniMap(
      mouse.clickTarget,
      mouse.clicked,
      drawer,
      camera
    );
    if (clicked) {
      const width = (drawer.width / _Map__WEBPACK_IMPORTED_MODULE_0__["default"].size) * miniMapSize;
      const height =
        (drawer.height / ((_Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSizeY / _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize) * _Map__WEBPACK_IMPORTED_MODULE_0__["default"].size)) *
        miniMapSize;
      const cameraX = ((x - width / 2) / miniMapSize) * 80 * map.width;
      const cameraY = ((y - height / 2) / miniMapSize) * 80 * map.height;
      camera.setX(cameraX);
      camera.setY(cameraY);
    }
  }

  miniMapRightClick({ camera, drawer, map, mouse, player, sound }) {
    const miniMapSize = 250;
    const { clicked, x, y } = player.inMiniMap(
      mouse.rightClickTarget,
      mouse.rightClicked,
      drawer,
      camera
    );
    if (clicked) {
      const mapX = (x / miniMapSize) * 80 * map.width;
      const mapY = (y / miniMapSize) * 80 * map.height;
      if (player.selected.length > 0) {
        player.moveGroup(player.selected, map, [mapX, mapY], sound);
      }
    }
  }

  clickAction({ camera, mouse, player }) {
    let [mouseX, mouseY] = mouse.clickTarget;
    this.actionBoxes.forEach(({ x, y, width, height, action }) => {
      if (!action.name) return;
      if (
        mouseX - camera.x >= x &&
        mouseX - camera.x < x + width &&
        mouseY - camera.y >= y &&
        mouseY - camera.y < y + height
      ) {
        if (action.actionable()) {
          action.execute({ player });
        }
      }
    });
  }

  hoverActions({ camera, mouse }) {
    let [mouseX, mouseY] = mouse.mouseLocation;
    this.actionBoxes.forEach(({ x, y, width, height, action }) => {
      if (
        mouseX - camera.x >= x &&
        mouseX - camera.x < x + width &&
        mouseY - camera.y >= y &&
        mouseY - camera.y < y + height
      ) {
        this.actionBoxText = action.name;
      }
    });
  }

  getActionBoxes({ player }) {
    if (this.selected.length === 0) return [];
    const [entity] = this.selected;
    return entity.actions({ player }).map((action, i) => {
      const x =
        this.actionboxX +
        INFOBOX_PADDING +
        ICON_BOX_SIZE * (i % ACTIONBOX_ROW_MAX) +
        ICON_BOX_MARGIN * ((i % ACTIONBOX_ROW_MAX) - 1);
      const y =
        this.infoboxY +
        INFOBOX_PADDING +
        ICON_BOX_SIZE * Math.floor(i / ACTIONBOX_ROW_MAX) +
        ICON_BOX_MARGIN * (Math.floor(i / ACTIONBOX_ROW_MAX) - 1);
      return {
        x,
        y,
        width: ICON_BOX_SIZE,
        height: ICON_BOX_SIZE,
        icon: action.drawIcon,
        action,
      };
    });
  }

  draw(drawer) {
    // resources
    const RESOURCES_X = drawer.width - 140;
    const RESOURCES_Y = 15;
    drawer.rect({
      adjusted: false,
      fillColor: "#69c",
      rect: [RESOURCES_X, RESOURCES_Y + 2, 20, 20],
    });
    drawer.text({
      text: `${this.resources}`,
      x: RESOURCES_X + 30,
      y: RESOURCES_Y,
      size: 5,
    });

    // hud background
    drawer.rect({
      adjusted: false,
      fillColor: "#666",
      rect: [
        0,
        drawer.height - HUD.HUD_HEIGHT - HUD.HUD_PADDING * 2,
        drawer.width,
        HUD.HUD_HEIGHT + HUD.HUD_PADDING * 2,
      ],
    });

    // infobox
    drawer.rect({
      adjusted: false,
      fillColor: "#111",
      rect: [
        this.infoboxX,
        this.infoboxY,
        drawer.width - HUD.HUD_HEIGHT - miniMapSize - HUD.HUD_PADDING * 4,
        HUD.HUD_HEIGHT,
      ],
    });

    if (this.selected.length === 1) {
      // one selected
      const [entity] = this.selected;
      drawer.text({
        text: entity.name,
        x: this.infoboxX + INFOBOX_PADDING,
        y: this.infoboxY + INFOBOX_PADDING,
        size: 5,
      });

      entity.hudDraw(
        drawer,
        this.infoboxX + INFOBOX_PADDING,
        this.infoboxY + INFOBOX_PADDING + 60,
        entity.name
      );

      drawer.text({
        text: `${entity.health} / ${entity.maxHealth}`,
        x: this.infoboxX + INFOBOX_PADDING,
        y: this.infoboxY + INFOBOX_PADDING + 140,
        size: 3,
      });
    } else if (this.selected.length > 1) {
      // multiple selected
      const units = this.selected.slice(0, INFOBOX_ICON_ROW_MAX * 3);
      units.forEach((unit, i) => {
        const x =
          this.infoboxX +
          INFOBOX_PADDING +
          ICON_BOX_SIZE * (i % INFOBOX_ICON_ROW_MAX) +
          ICON_BOX_MARGIN * ((i % INFOBOX_ICON_ROW_MAX) - 1);
        const y =
          this.infoboxY +
          INFOBOX_PADDING +
          ICON_BOX_SIZE * Math.floor(i / INFOBOX_ICON_ROW_MAX) +
          ICON_BOX_MARGIN * (Math.floor(i / INFOBOX_ICON_ROW_MAX) - 1);
        drawer.rect({
          adjusted: false,
          strokeColor: "#0f0",
          rect: [x, y, ICON_BOX_SIZE, ICON_BOX_SIZE],
        });
        drawer.rect({
          adjusted: false,
          strokeColor: "#0f0",
          rect: [x, y, ICON_BOX_SIZE, ICON_BOX_SIZE],
        });
        unit.hudDrawIcon(drawer, x, y, unit.name);
      });
    }

    // actions
    drawer.rect({
      adjusted: false,
      fillColor: "#111",
      rect: [this.actionboxX, this.actionboxY, HUD.HUD_HEIGHT, HUD.HUD_HEIGHT],
    });
    if (this.selected.length === 1) {
      this.actionBoxes.forEach(({ x, y, width, height, icon, action }) => {
        if (!action.name) return;
        drawer.rect({
          adjusted: false,
          strokeColor: action.actionable()
            ? "#0f0"
            : "rgba(100, 100, 100, 0.7)",
          rect: [x, y, width, height],
        });
        icon(drawer, x, y);
        if (!action.actionable()) {
          drawer.rect({
            adjusted: false,
            fillColor: "rgba(100, 100, 100, 0.7)",
            rect: [x, y, width, height],
          });
        }
      });
    }

    if (this.actionBoxText) {
      drawer.text({
        text: this.actionBoxText,
        x: this.actionboxX + ICON_BOX_MARGIN,
        y: this.actionboxY + (ICON_BOX_SIZE + ICON_BOX_MARGIN) * 3 - 17,
        size: 3,
      });
    }
  }
}

HUD.cancelIcon = (drawer, x, y) => {
  drawer.ellipse({
    adjusted: false,
    ellipse: [
      x + ICON_BOX_SIZE / 2,
      y + ICON_BOX_SIZE / 2,
      20,
      20,
      0,
      0,
      2 * Math.PI,
    ],
    strokeColor: "#0F0",
    strokeWidth: 6,
  });
  drawer.draw(() => {
    drawer.rect({
      adjusted: false,
      rect: [x + ICON_BOX_SIZE / 4, y + ICON_BOX_SIZE / 4, 40, 6],
      fillColor: "#0F0",
      rotation: Math.PI / 4,
      size: 6,
    });
  });
};

HUD.HUD_HEIGHT = 220;
HUD.HUD_PADDING = 10;

/* harmony default export */ __webpack_exports__["default"] = (HUD);


/***/ }),

/***/ "./src/HumanPlayer.js":
/*!****************************!*\
  !*** ./src/HumanPlayer.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Building__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Building */ "./src/Building.js");
/* harmony import */ var _HUD__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HUD */ "./src/HUD.js");
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Map */ "./src/Map.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Unit */ "./src/Unit.js");
/* harmony import */ var _buildingTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buildingTypes */ "./src/buildingTypes.js");
/* harmony import */ var _collision__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./collision */ "./src/collision.js");








const MODES = { NORMAL: 0, PLACE_BUILDING: 1 };

class HumanPlayer extends _Player__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor({ map }) {
    super();
    this.selected = [];
    this.color = "#A00";
    this.miniMapColor = "#0F0";
    map.humanBases.forEach(([x, y]) => {
      this.addBuilding({ type: "base", x: 80 * x, y: 80 * y });
    });
    map.humanShades.forEach(([x, y]) => {
      this.addUnit({ type: "shade", x: 80 * x, y: 80 * y });
    });
    map.humanGoblins.forEach(([x, y]) => {
      this.addUnit({ type: "goblin", x: 80 * x, y: 80 * y });
    });
    this.mode = MODES.NORMAL;
    this.placeBuildingUnit = null;
    this.placeBuildingBuilding = null;
    this.drawPlaceBuilding = null;
    this.moveFeedback = [];
  }

  dragSelect(mouse, entities, sound) {
    let collisions = entities.filter((entity) => {
      let [mx, my, endx, endy] = mouse.releaseDrag;
      return Object(_collision__WEBPACK_IMPORTED_MODULE_6__["boxCollision"])(entity.hitbox(), {
        x: mx,
        y: my,
        sizeX: endx - mx,
        sizeY: endy - my,
      });
    });
    if (collisions.map((c) => c.type).includes("unit")) {
      collisions = collisions.filter((c) => c.type === "unit");
    }
    if (collisions.length === 0) return;
    sound.play("click");
    entities.forEach((entity) => (entity.selected = false));
    collisions.forEach((entity) => (entity.selected = true));
    this.selected = collisions;
  }

  clickSelect(mouse, entities, sound) {
    let [mouseX, mouseY] = mouse.clickTarget;
    if (mouseX || mouseY) {
      entities.forEach((entity) => {
        if (Object(_collision__WEBPACK_IMPORTED_MODULE_6__["pointCollision"])(entity.hitbox(), { x: mouseX, y: mouseY })) {
          entities.forEach((entity) => (entity.selected = false));
          this.selected = [entity];
          entity.selected = true;
          sound.play("click");
        }
      });
    }
  }

  select(mouse, sound) {
    const entities = [this.units, this.buildings].flat();
    if (mouse.releaseDrag) {
      this.dragSelect(mouse, entities, sound);
    } else {
      this.clickSelect(mouse, entities, sound);
    }
  }

  enemyEntities({ cpuPlayer, target }) {
    const { buildings, units } = cpuPlayer;
    const enemies = units.concat(buildings);
    return enemies.filter((enemy) =>
      Object(_collision__WEBPACK_IMPORTED_MODULE_6__["pointCollision"])(enemy.hitbox(), { x: target[0], y: target[1] })
    );
  }

  unitActions({ cpuPlayer, map, mines, mouse, sound, unit }) {
    const { rightClickTarget } = mouse;

    if (unit.state === _Unit__WEBPACK_IMPORTED_MODULE_4__["STATES"].BUILD_BUILDING) return;
    if (mouse.rightClickTarget[0] || mouse.rightClickTarget[1]) {
      if (unit.canMine) {
        const [mine] = mines.mines.filter((mine) =>
          Object(_collision__WEBPACK_IMPORTED_MODULE_6__["pointCollision"])(mine, {
            x: rightClickTarget[0],
            y: rightClickTarget[1],
          })
        );
        if (mine) {
          unit.setMining(mine);
          sound.play("click");
          return;
        }
        if (unit.carryingResource) {
          const [base] = this.buildings.filter(
            (building) =>
              building.name === "base" &&
              Object(_collision__WEBPACK_IMPORTED_MODULE_6__["pointCollision"])(building.hitbox(), {
                x: rightClickTarget[0],
                y: rightClickTarget[1],
              })
          );
          if (base) {
            unit.returnResource(this, map, base);
            sound.play("click");
            return;
          }
        }
      }

      const [enemy] = this.enemyEntities({
        cpuPlayer,
        target: rightClickTarget,
      });
      if (enemy) {
        unit.setTarget(enemy, map);
        sound.play("click");
        return;
      }

      return true;
    }
  }

  placeBuildingMode({ unit, building }) {
    this.mode = MODES.PLACE_BUILDING;
    this.placeBuildingUnit = unit;
    this.placeBuildingBuilding = building;
  }

  cancelPlaceBuilding() {
    this.mode = MODES.INITIAL;
    this.placeBuildingUnit = null;
    this.placeBuildingBuilding = null;
  }

  placeBuildingActions(map, mouse, sound) {
    const { clickTarget, mouseLocation } = mouse;
    if (this.mode === MODES.PLACE_BUILDING) {
      const [mx, my] = mouseLocation;
      const [tx, ty] = map.coordsToTile(mx, my);
      const [x, y] = map.tileToCoords(tx, ty, false);

      if (mouseLocation) {
        this.drawPlaceBuilding = (drawer) => {
          _buildingTypes__WEBPACK_IMPORTED_MODULE_5__["default"][this.placeBuildingBuilding].drawBuilding(
            drawer,
            x,
            y,
            _Map__WEBPACK_IMPORTED_MODULE_2__["default"].tileSize * 3,
            _Map__WEBPACK_IMPORTED_MODULE_2__["default"].tileSize * 2,
            this.color,
            "4"
          );
        };
      }

      if (clickTarget[0] || clickTarget[1]) {
        sound.play("click");
        this.placeBuildingForConstruction({
          building: this.placeBuildingBuilding,
          x,
          y,
          map,
          unit: this.placeBuildingUnit,
        });
        this.cancelPlaceBuilding();
      }
    }
  }

  moveGroup(units, map, target, sound) {
    const X_OFFSET = 70;
    const Y_OFFSET = 70;
    const MAX_ROW = 8;
    units.forEach((unit, i) => {
      const [x, y] = [
        target[0] + (i % MAX_ROW) * X_OFFSET,
        target[1] + Math.floor(i / MAX_ROW) * Y_OFFSET,
      ];
      unit.setPath([x, y], map);
      this.moveFeedback.push({ x, y, time: 20 });
      unit.state = _Unit__WEBPACK_IMPORTED_MODULE_4__["STATES"].MOVING;
    });
    sound.play("click");
  }

  inMiniMap(click, clicked, drawer, camera) {
    const miniMapX = clicked && click[0] - _HUD__WEBPACK_IMPORTED_MODULE_1__["default"].HUD_PADDING - camera.x;
    const miniMapY =
      clicked && click[1] - (drawer.height - 250 - _HUD__WEBPACK_IMPORTED_MODULE_1__["default"].HUD_PADDING) - camera.y;
    return {
      clicked:
        miniMapX !== null &&
        miniMapY !== null &&
        miniMapX >= 0 &&
        miniMapX < 250 &&
        miniMapY >= 0 &&
        miniMapY < 250,
      x: miniMapX,
      y: miniMapY,
    };
  }

  inHud(click, clicked, drawer, camera) {
    return (
      clicked &&
      click[1] - camera.y >=
        drawer.height - _HUD__WEBPACK_IMPORTED_MODULE_1__["default"].HUD_HEIGHT - _HUD__WEBPACK_IMPORTED_MODULE_1__["default"].HUD_PADDING * 2
    );
  }

  mouseActions({ camera, drawer, cpuPlayer, map, mines, mouse, sound }) {
    const { clicked, rightClicked, clickTarget, rightClickTarget } = mouse;
    if (this.inMiniMap(clickTarget, clicked, drawer, camera).clicked) {
      console.log("minimap click");
      return;
    }
    if (
      this.inMiniMap(rightClickTarget, rightClicked, drawer, camera).clicked
    ) {
      console.log("minimap right click");
      return;
    }
    if (this.inHud(clickTarget, clicked, drawer, camera)) {
      console.log("hud click");
      return;
    }
    if (this.inHud(rightClickTarget, rightClicked, drawer, camera)) {
      console.log("hud right click");
      return;
    }

    this.select(mouse, sound);

    this.placeBuildingActions(map, mouse, sound);

    const movingUnits = [];
    this.units.forEach((unit) => {
      if (!unit.selected) return;
      if (this.unitActions({ cpuPlayer, map, mines, mouse, sound, unit })) {
        movingUnits.push(unit);
      }
    });
    if (movingUnits.length) {
      this.moveGroup(movingUnits, map, rightClickTarget, sound);
    }
  }

  tick({
    camera,
    cpuPlayer,
    drawer,
    map,
    mines,
    mouse,
    particles,
    sound,
    targets,
  }) {
    this.mouseActions({ camera, cpuPlayer, drawer, map, mines, mouse, sound });

    this.moveFeedback = this.moveFeedback
      .map((mf) => ({ ...mf, time: mf.time - 1 }))
      .filter((mf) => mf.time > 0);

    _Player__WEBPACK_IMPORTED_MODULE_3__["default"].tick.call(this, { map, particles, sound, targets });
  }

  draw(drawer) {
    if (this.mode === MODES.PLACE_BUILDING && this.drawPlaceBuilding) {
      this.drawPlaceBuilding(drawer);
    }

    this.moveFeedback.forEach((mf) => {
      if (mf.time % 10 >= 5) return;
      drawer.ellipse({
        ellipse: [mf.x, mf.y, 23, 13, 0, 0, 2 * Math.PI],
        strokeColor: "#4AC",
        strokeWidth: 5,
      });
    });

    _Player__WEBPACK_IMPORTED_MODULE_3__["default"].draw.call(this, drawer);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (HumanPlayer);


/***/ }),

/***/ "./src/Keyboard.js":
/*!*************************!*\
  !*** ./src/Keyboard.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Keyboard {
  constructor() {
    document.addEventListener("keyup", (event) => this.onKeyup(event));
    document.addEventListener("keydown", (event) => this.onKeydown(event));

    this._pressed = {};

    this.SPACE = { keyboard: [32], controller: [0, 1, 5, 7] };
    this.LEFT = { keyboard: [37], controller: [14], dir: "l" };
    this.UP = { keyboard: [38], controller: [12, 2, 3] };
    this.RIGHT = { keyboard: [39], controller: [15], dir: "r" };
    this.DOWN = { keyboard: [40], controller: [13] };
  }

  isDownControllerStick(dir) {
    if (!navigator.getGamepads()[0]) return false;
    const axes = navigator.getGamepads()[0].axes;

    return {
      l: axes[0] < 0,
      r: axes[0] > 0,
    }[dir];
  }

  isDownController(keyCode) {
    if (!navigator.getGamepads()[0]) return false;

    return navigator
      .getGamepads()[0]
      .buttons.reduce((acc, b, i) => (b.pressed ? acc.concat([i]) : acc), [])
      .some((b) => keyCode.includes(b));
  }

  isDownKeyboard(keyCode) {
    return keyCode.some((key) => this._pressed[key]);
  }

  isDown(keyCode) {
    return (
      this.isDownControllerStick(keyCode.dir) ||
      this.isDownKeyboard(keyCode.keyboard) ||
      this.isDownController(keyCode.controller) ||
      false
    );
  }

  onKeydown(event) {
    this._pressed[event.keyCode] = true;
  }

  onKeyup(event) {
    delete this._pressed[event.keyCode];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Keyboard);


/***/ }),

/***/ "./src/Level.js":
/*!**********************!*\
  !*** ./src/Level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Level {
  constructor() {
    this.defeat = false;
    this.victory = false;
  }

  tick({ humanPlayer, cpuPlayer }) {
    if (cpuPlayer.entities().length === 0) {
      this.victory = true;
    }
    if (humanPlayer.entities().length === 0) {
      this.defeat = true;
    }
  }

  draw(drawer) {
    const MESSAGE_WIDTH = 1000;
    const MESSAGE_HEIGHT = 200;
    const MESSAGE_Y_OFFSET = -100;
    if (this.victory) {
      drawer.rect({
        adjusted: false,
        rect: [
          (drawer.width - MESSAGE_WIDTH) / 2,
          (drawer.height - MESSAGE_HEIGHT) / 2 + MESSAGE_Y_OFFSET,
          MESSAGE_WIDTH,
          MESSAGE_HEIGHT,
        ],
        fillColor: "#111",
      });
      drawer.text({
        fillColor: "#EEE",
        text: "VICTORY!",
        x: (drawer.width - MESSAGE_WIDTH) / 2 + 140,
        y: (drawer.height - MESSAGE_HEIGHT) / 2 + 48 + MESSAGE_Y_OFFSET,
        size: 20,
      });
    }
    if (this.defeat) {
      drawer.rect({
        adjusted: false,
        rect: [
          (drawer.width - MESSAGE_WIDTH) / 2,
          (drawer.height - MESSAGE_HEIGHT) / 2 + MESSAGE_Y_OFFSET,
          MESSAGE_WIDTH,
          MESSAGE_HEIGHT,
        ],
        fillColor: "#111",
      });
      drawer.text({
        fillColor: "#EEE",
        text: "DEFEAT!",
        x: (drawer.width - MESSAGE_WIDTH) / 2 + 235,
        y: (drawer.height - MESSAGE_HEIGHT) / 2 + 48 + MESSAGE_Y_OFFSET,
        size: 20,
      });
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Level);


/***/ }),

/***/ "./src/Map.js":
/*!********************!*\
  !*** ./src/Map.js ***!
  \********************/
/*! exports provided: TILE_TYPE, TILES, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TILE_TYPE", function() { return TILE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TILES", function() { return TILES; });
const level = {
  levelData:
    "////////4Af/4AAPwAD+AAAHgAD+AAADgAAAAAADgAAAAAABgAAAAAABwAAAAAABwAA8AAABwAD/gAAD4AD/gAAD/A//wAAD////4AAB//////gB//////gB//////gB/////+AB///wAAAB//4AAAAB/gAAAAAB8AAAAAAB4AAAAAAB4AAAAAABwAAAAAABwAAAAAAHgAAAAAAfgAAAAAH/gAAAAD//gAAAAP//gAAAA///gAAAB///gAAAD///gAAAH///gAAAH///gAAAH///gAAAH/8HwAAAP+ADwAAAP4ABwAAADgABwAAAAAABwAAAAAABwAAAAAAB4AAAAAAB8AAAAAAB/8AAAAAB//gAAAAD//4AAAAf////////",
  mines: [
    [4, 2],
    [38, 2],
    [43, 37],
    [11, 31],
  ],
  humanBases: [[4, 6]],
  cpuBases: [
    [38, 6],
    [38, 37],
    [12, 26],
  ],
  cpuShades: [
    [43, 40],
    [42, 3],
    [42, 5],
    [43, 42],
    [14, 31],
    [16, 31],
    [18, 31],
    [41, 41],
    [41, 43],
  ],
  cpuGoblins: [
    [35, 42],
    [35, 44],
    [33, 44],
    [33, 42],
    [33, 40],
    [35, 40],
    [31, 44],
    [31, 42],
    [31, 40],
  ],
  humanShades: [[7, 3]],
  humanGoblins: [[9, 3]],
};

const decode = (encoded, numRows = 48) => {
  const decoded = atob(encoded);
  const pad = (n) => "00000000".substr(n.length) + n;
  const chars = decoded
    .split("")
    .map((c) => pad(c.charCodeAt(0).toString(2)))
    .join("");
  const re = new RegExp(`.{1,${numRows}}`, "g");
  const rows = chars.match(re).map((r) => Array.from(r).map((c) => Number(c)));
  return rows;
};

const TILE_TYPE = { NORMAL: "NORMAL", HOLE: "HOLE", MINE: "MINE" };
const TILES = [TILE_TYPE.NORMAL, TILE_TYPE.HOLE, TILE_TYPE.MINE];

class Map {
  constructor() {
    this.loadLevel(level);
  }

  loadLevel(level) {
    this.grid = decode(level.levelData, level.rows);
    this.mines = level.mines;
    this.humanBases = level.humanBases;
    this.humanShades = level.humanShades;
    this.humanGoblins = level.humanGoblins;
    this.cpuBases = level.cpuBases;
    this.cpuShades = level.cpuShades;
    this.cpuGoblins = level.cpuGoblins;
    this.height = this.grid.length;
    this.width = this.grid[0].length;
  }

  tick() {}

  coordsToTile(x, y) {
    return [Math.floor(x / Map.tileSize), Math.floor(y / Map.tileSize)];
  }

  tileToCoords(x, y, middle = true) {
    return [
      x * Map.tileSize + (middle ? Map.tileSize / 2 : 0),
      y * Map.tileSize + (middle ? Map.tileSize / 2 : 0),
    ];
  }

  draw(drawer) {
    this.grid.forEach((row, y) => {
      let normalColor = !!(y % 2);
      row.forEach((cell, x) => {
        normalColor = !normalColor;
        const tileType = TILES[cell];

        const debug = false;
        const debugColor = normalColor ? "#ddd" : "#e6e6e6";
        const opacity = (((x ** 3 + y ** 2) % (3 * 16)) + 12 * 16).toString(16);
        const color = debug ? debugColor : "#202028" + opacity;
        if (tileType !== TILE_TYPE.HOLE) {
          drawer.rect({
            fillColor: color,
            rect: [
              x * Map.tileSizeX,
              y * Map.tileSizeY,
              Map.tileSizeX,
              Map.tileSizeY,
            ],
          });
        }
      });
    });
  }
}

Map.mapAdjust = (x, y) => [
  (x * Map.tileSizeX) / Map.tileSize,
  (y * Map.tileSizeY) / Map.tileSize,
];

Map.size = 80 * 48;
Map.tileSize = 80;
Map.tileSizeX = 80;
Map.tileSizeY = 80;

/* harmony default export */ __webpack_exports__["default"] = (Map);


/***/ }),

/***/ "./src/Mine.js":
/*!*********************!*\
  !*** ./src/Mine.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Mine {
  constructor(x, y) {
    this.resources = 10000;
    this.x = x;
    this.y = y;
    this.size = 80 * 2;
    this.inFog = 0;
  }

  tick() {}

  draw(drawer) {
    drawer.rect({
      fillColor: "#338",
      rect: [this.x, this.y + this.size / 2, this.size, this.size / 2],
    });
    drawer.ellipse({
      fillColor: "#338",
      ellipse: [
        this.x + this.size / 2,
        this.y + this.size / 2,
        this.size / 2,
        this.size / 2,
        0,
        0,
        2 * Math.PI,
      ],
    });

    const DOOR_SIZE = 50;
    drawer.rect({
      fillColor: "#111",
      rect: [
        this.x + this.size / 2 - DOOR_SIZE / 2,
        this.y + this.size - DOOR_SIZE / 2,
        DOOR_SIZE,
        DOOR_SIZE / 2,
      ],
    });
    drawer.ellipse({
      fillColor: "#111",
      ellipse: [
        this.x + this.size / 2,
        this.y + this.size - DOOR_SIZE / 2,
        DOOR_SIZE / 2,
        DOOR_SIZE / 2,
        0,
        0,
        2 * Math.PI,
      ],
    });

    // hitbox?
    const hitbox = false;
    if (hitbox) {
      drawer.rect({
        fillColor: "#caa",
        rect: [this.x, this.y, this.size, this.size],
      });
    }

    if (!this.inFog) {
      drawer.miniMap({
        x: this.x,
        y: this.y,
        color: "#69c",
        size: Math.ceil(this.size / 20),
      });
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Mine);


/***/ }),

/***/ "./src/MineCollection.js":
/*!*******************************!*\
  !*** ./src/MineCollection.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map */ "./src/Map.js");
/* harmony import */ var _Mine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mine */ "./src/Mine.js");



class MineCollection {
  constructor({ map }) {
    this.mines = [];
    map.mines.forEach(([x, y]) => {
      this.mines.push(new _Mine__WEBPACK_IMPORTED_MODULE_1__["default"](x * _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize, y * _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize));
    });
  }

  tick() {
    this.mines.forEach((mine) => {
      mine.tick();
    });
  }

  draw(drawer) {
    this.mines.forEach((mine) => {
      mine.draw(drawer);
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (MineCollection);


/***/ }),

/***/ "./src/MiniMap.js":
/*!************************!*\
  !*** ./src/MiniMap.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HUD__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HUD */ "./src/HUD.js");
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Map */ "./src/Map.js");



const minimapSize = 250;

class MiniMap {
  constructor() {}

  draw(drawer) {
    drawer.rect({
      adjusted: false,
      fillColor: "#666",
      rect: [
        0,
        drawer.height - minimapSize - _HUD__WEBPACK_IMPORTED_MODULE_0__["default"].HUD_PADDING * 2,
        minimapSize + _HUD__WEBPACK_IMPORTED_MODULE_0__["default"].HUD_PADDING * 2,
        minimapSize + _HUD__WEBPACK_IMPORTED_MODULE_0__["default"].HUD_PADDING * 2,
      ],
    });
    drawer.rect({
      adjusted: false,
      fillColor: "#111",
      rect: [
        _HUD__WEBPACK_IMPORTED_MODULE_0__["default"].HUD_PADDING,
        drawer.height - minimapSize - _HUD__WEBPACK_IMPORTED_MODULE_0__["default"].HUD_PADDING,
        minimapSize,
        minimapSize,
      ],
    });

    const x =
      (drawer.camera.position_x / _Map__WEBPACK_IMPORTED_MODULE_1__["default"].size) * minimapSize + _HUD__WEBPACK_IMPORTED_MODULE_0__["default"].HUD_PADDING;
    const y =
      drawer.height -
      minimapSize +
      (drawer.camera.position_y / ((_Map__WEBPACK_IMPORTED_MODULE_1__["default"].tileSizeY / _Map__WEBPACK_IMPORTED_MODULE_1__["default"].tileSize) * _Map__WEBPACK_IMPORTED_MODULE_1__["default"].size)) *
        minimapSize -
      _HUD__WEBPACK_IMPORTED_MODULE_0__["default"].HUD_PADDING;
    drawer.rect({
      adjusted: false,
      strokeColor: "#fff",
      rect: [
        x,
        y,
        (drawer.width / _Map__WEBPACK_IMPORTED_MODULE_1__["default"].size) * minimapSize,
        (drawer.height / ((_Map__WEBPACK_IMPORTED_MODULE_1__["default"].tileSizeY / _Map__WEBPACK_IMPORTED_MODULE_1__["default"].tileSize) * _Map__WEBPACK_IMPORTED_MODULE_1__["default"].size)) *
          minimapSize,
      ],
    });

    drawer.renderMiniMap();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (MiniMap);


/***/ }),

/***/ "./src/Mouse.js":
/*!**********************!*\
  !*** ./src/Mouse.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const DRAG_THRESHOLD = 2;

class Mouse {
  constructor() {
    let canvas = document.querySelector("canvas");
    this.canvas = canvas;
    this.canvas.addEventListener("click", (event) => this.click(event));
    this.canvas.addEventListener("mousedown", (event) => this.mousedown(event));
    this.canvas.addEventListener("mouseup", (event) => this.mouseup(event));
    this.canvas.addEventListener("mousemove", (event) => this.mousemove(event));
    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.rightClick(event);
    });
    this.clickCoords = [null, null];
    this.rightClickCoords = [null, null];
    this.mouseLocation = [null, null];
    this.mouseScreenLocation = [500, 500];

    // dragging
    this.dragging = false;
    this.prevDragging = false;
    this.releaseDrag = null;
    this.startDragLocation = [null, null];
  }

  tick({ camera }) {
    this.camera = camera;

    this.releaseDrag = null;
    if (this.prevDragging && !this.dragging) {
      if (
        Math.abs(this.startDragLocation[0] - this.mouseLocation[0]) >
          DRAG_THRESHOLD ||
        Math.abs(this.startDragLocation[1] - this.mouseLocation[1]) >
          DRAG_THRESHOLD
      ) {
        this.releaseDrag = this.startDragLocation.concat(this.mouseLocation);
        this.startDragLocation = [null, null];
      }
    }
    this.prevDragging = this.dragging;

    this.clickTarget = this.clickCoords;
    this.clicked = this.clickTarget[0] || this.clickTarget[1];
    this.rightClickTarget = this.rightClickCoords;
    this.rightClicked = this.rightClickTarget[0] || this.rightClickTarget[1];
    this.clickCoords = this.rightClickCoords = [null, null];
  }

  click({ clientX, clientY }) {
    this.clickCoords = [clientX + this.camera.x, clientY + this.camera.y];
  }

  mousedown({ clientX, clientY, which }) {
    if (which === 1) {
      this.startDragLocation = [
        clientX + this.camera.x,
        clientY + this.camera.y,
      ];
      this.dragging = true;
    }
  }

  mouseup() {
    this.dragging = false;
  }

  mousemove({ clientX, clientY }) {
    if (this.camera) {
      this.mouseLocation = [clientX + this.camera.x, clientY + this.camera.y];
      this.mouseScreenLocation = [clientX, clientY];
    }
  }

  rightClick({ clientX, clientY }) {
    this.rightClickCoords = [clientX + this.camera.x, clientY + this.camera.y];
  }

  draw(drawer) {
    if (this.dragging) {
      drawer.rect({
        rect: [
          this.startDragLocation[0],
          this.startDragLocation[1],
          this.mouseLocation[0] - this.startDragLocation[0],
          this.mouseLocation[1] - this.startDragLocation[1],
        ],
        strokeColor: "#369",
      });
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Mouse);


/***/ }),

/***/ "./src/Particle.js":
/*!*************************!*\
  !*** ./src/Particle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _particleTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particleTypes */ "./src/particleTypes.js");


class Particle {
  constructor(type, x, y, dx, dy, color) {
    const template = _particleTypes__WEBPACK_IMPORTED_MODULE_0__["default"][type];

    this.type = type;
    this.startingY = y;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.stuck = false;
    this.invisible = false;
    this.grav = 0.6;
    this.particleDraw = template.draw;
  }

  stick({ map }) {
    const [x, y] = map.coordsToTile(this.x, this.y);
    const tile = map.grid[y][x];
    if (tile) this.invisible = true;
    this.stuck = true;
  }

  tick({ map }) {
    if (this.stuck) return;
    this.x += this.dx;
    this.dy += this.grav;
    this.y += this.dy;

    if (this.y - Math.random() * 10 > this.startingY) this.stick({ map });
  }

  draw(drawer) {
    if (this.invisible) return;
    this.particleDraw.call(this, drawer);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Particle);


/***/ }),

/***/ "./src/ParticleCollection.js":
/*!***********************************!*\
  !*** ./src/ParticleCollection.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const MAX_PARTICLES = 5000;

class ParticleCollection {
  constructor() {
    this.particles = [];
  }

  add(particle) {
    this.particles.push(particle);
  }

  tick({ map }) {
    if (this.particles.length > MAX_PARTICLES) {
      this.particles = this.particles.slice(
        this.particles.length - MAX_PARTICLES
      );
    }
    this.particles.forEach((particle) => particle.tick({ map }));
  }

  draw(drawer) {
    this.particles.forEach((particle) => particle.draw(drawer));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ParticleCollection);


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Building__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Building */ "./src/Building.js");
/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Unit */ "./src/Unit.js");
/* harmony import */ var _buildingTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buildingTypes */ "./src/buildingTypes.js");
/* harmony import */ var _unitTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./unitTypes */ "./src/unitTypes.js");





class Player {
  constructor() {
    this.resources = 500;

    this.units = [];

    this.buildings = [];
  }

  addUnit({ type, x, y }) {
    const unitType = _unitTypes__WEBPACK_IMPORTED_MODULE_3__["default"][type];
    const colors = unitType.colors(this.color);
    const newUnit = new _Unit__WEBPACK_IMPORTED_MODULE_1__["default"](x, y, {
      ...unitType,
      colors,
      miniMapColor: this.miniMapColor,
    });
    this.units.push(newUnit);
  }

  addBuilding({ type, x, y, built = true, unit = null }) {
    const building = _buildingTypes__WEBPACK_IMPORTED_MODULE_2__["default"][type];
    const newBuilding = new _Building__WEBPACK_IMPORTED_MODULE_0__["default"](
      x,
      y,
      building,
      this.color,
      built,
      unit,
      this.miniMapColor
    );
    this.buildings.push(newBuilding);
    return newBuilding;
  }

  cancelBuilding(building) {
    building.builder.buildingTarget = null;
    building.builder.state = _Unit__WEBPACK_IMPORTED_MODULE_1__["STATES"].IDLE;
    this.buildings = this.buildings.filter((b) => b !== building);
    this.resources += building.cost;
  }

  placeBuildingForConstruction({ building, x, y, map, unit }) {
    const b = this.addBuilding({ type: building, x, y, built: false, unit });
    this.resources -= b.cost;
    unit.buildBuilding({ building: b });
  }

  entities() {
    return this.units.concat(this.buildings);
  }

  static tick({ map, particles, sound, targets }) {
    this.units.forEach((u) =>
      u.tick({ particles, map, player: this, sound, targets })
    );
    this.units = this.units.reduce((units, unit) => {
      if (unit.health <= 0) {
        unit.explode({ particles, sound });
        if (this.selected && this.selected.includes(unit)) {
          this.selected = this.selected.filter((u) => u !== unit);
        }
      } else {
        units.push(unit);
      }
      return units;
    }, []);
    this.buildings.forEach((b) => b.tick({ player: this }));
    this.buildings = this.buildings.reduce((buildings, building) => {
      if (building.health <= 0) {
        building.explode({ particles, sound });
        if (this.selected && this.selected.includes(building)) {
          this.selected = this.selected.filter((u) => u !== building);
        }
      } else {
        buildings.push(building);
      }
      return buildings;
    }, []);
  }

  static draw(drawer) {
    this.buildings.forEach((b) => b.draw(drawer));
    this.units.forEach((u) => u.draw(drawer));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);


/***/ }),

/***/ "./src/Sound.js":
/*!**********************!*\
  !*** ./src/Sound.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sound; });
/* harmony import */ var zzfx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zzfx */ "./node_modules/zzfx/ZzFX.js");


// prettier-ignore
let sounds = {
  "death": [2.45,,608,.02,.09,.38,2,1.24,.6,,,,,.3,,.4,.03,.51,.05],
  "gun": [0.4,0,0,,,0,4,0,500,,,,,,,.1,,0,.15],
  "jump": [,,131,.02,.02,.08,,1.49,2.3,,,,,,,,,.9,.1],
  "message": [2,0,1740,,.06,.29,,.77,,,,,,,,,,.76,.07,.06],
  "minigun": [0.6,0,0,,,0,4,0,1e8,,,,,,,.04,,0,.08],
  "pickup": [,,548,.08,.36,.47,1,1.79,,,236,.03,.08,,,,,.83],
  "shotgun": [0.8,,300,,,.9,4,.5,,,,,,10,74,.2,,2],
  "sniper": [0.8,,300,,,1.2,4,.5,,,,,,10,74,.1,,2],
  "thrown": [1,0,0,,,0,4,0,1e8,,,,,,,.055,,0,.3],

  "click": [0.5,,555,.01,.02,.01,3,.11,,98,-816,.01,.02,,,,,.43,,.02],
};

class Sound {
  constructor() {
    this.volume = 1;
  }

  play(sound, volume) {
    const newSound = [...sounds[sound]];
    if (volume) newSound[0] *= volume * this.volume;
    Object(zzfx__WEBPACK_IMPORTED_MODULE_0__["zzfx"])(...newSound);
  }

  setGlobalVolume(volume) {
    this.volume = volume;
  }
}


/***/ }),

/***/ "./src/Sprites.js":
/*!************************!*\
  !*** ./src/Sprites.js ***!
  \************************/
/*! exports provided: humanoid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanoid", function() { return humanoid; });
const humanoid = (x, y, facing, colors, options = {}) => {
  let { skin, eyes, body } = colors;
  let parts = [];

  if (options.blink) {
    eyes = "#0000";
  }

  let upper = [
    [skin, [0, 0, 5, 3]], // head
    [eyes, [1, 1, 1, 1]], // eye left
    [eyes, [4, 1, 1, 1]], // eye right
  ];
  parts = parts.concat(upper);

  let lower = [
    [body, [0, 4, 3, 1]], // body
    [skin, [0, 4, 1, 1]], // left arm
    [skin, [3, 4, 1, 1]], // right arm
  ];

  if (!options.bodyless) {
    parts = parts.concat(lower);
  }

  if (options.horns)
    parts = parts.concat([
      [skin, [0, -1, 1, 1]], // horn left
      [skin, [4, -1, 1, 1]], // horn right
    ]);

  if (options.antenna)
    parts = parts.concat([
      [skin, [1, -1, 1, 1]], // antenna left
      [skin, [0, -2, 1, 1]], // antenna left
      [skin, [3, -1, 1, 1]], // antenna right
      [skin, [4, -2, 1, 1]], // antenna right
      [eyes, [2, 1, 1, 1]], // eye leftmiddle
      [eyes, [3, 1, 1, 1]], // eye rightmiddle
    ]);

  const mult = options.size || 8;
  // prettier-ignore
  parts = parts.map(([c, r]) => ({
    c,
    r: [
      facing === 1 ? x + (r[0] * mult) : 5 * mult - ((r[0] + r[2]) * mult) + x,
      r[1] * mult + y,
      r[2] * mult,
      r[3] * mult
    ],
  }));

  return parts;
};


/***/ }),

/***/ "./src/Unit.js":
/*!*********************!*\
  !*** ./src/Unit.js ***!
  \*********************/
/*! exports provided: STATES, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATES", function() { return STATES; });
/* harmony import */ var _AStar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AStar */ "./src/AStar.js");
/* harmony import */ var _HUD__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HUD */ "./src/HUD.js");
/* harmony import */ var _Sprites__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sprites */ "./src/Sprites.js");
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Particle */ "./src/Particle.js");
/* harmony import */ var _buildingTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./buildingTypes */ "./src/buildingTypes.js");
/* harmony import */ var _unitTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./unitTypes */ "./src/unitTypes.js");
/* harmony import */ var _collision__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./collision */ "./src/collision.js");
/* harmony import */ var _distance__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./distance */ "./src/distance.js");









const STATES = {
  IDLE: 0,
  MOVING: 1,
  ATTACKING: 2,
  MINING: 3,
  RETURNING_RESOURCE: 4,
  BUILD_BUILDING: 5,
};

const MENU_STATES = {
  INITIAL: 0,
  BUILDING: 1,
  PLACE_BUILDING: 2,
};

class Unit {
  constructor(x, y, unitType) {
    Object.entries(unitType).forEach(([key, value]) => {
      this[key] = value;
    });

    this.x = x;
    this.y = y;
    this.pathY = y;
    this.dx = 0;
    this.dy = 0;
    this.maxHealth = this.health;
    this.lifespan = 0;
    this.selected = false;
    this.path = [];
    this.facing = 1;
    this.type = "unit";
    this.bounce = 0;
    this.bounceTime = 0;
    this.blink = 0;
    this.target = null;
    this.attackSelected = 0;
    this.recalculateTarget = 0;
    this.state = STATES.IDLE;
    this.menuState = MENU_STATES.INITIAL;
    this.inFog = 0;

    // worker things
    this.carryingResource = false;
    this.miningTarget = null;
    this.baseTarget = null;
    this.buildingTarget = null;

    this.cooldownTime = 0;
    this.firingTime = 0;
  }

  attacked() {
    this.attackSelected = 30;
  }

  setPath(target, map) {
    const [targetX, targetY] = target;
    if (this.flying) {
      this.path = [target];
      return true;
    }

    const [startX, startY] = map.coordsToTile(this.x, this.pathY);
    const [endX, endY] = map.coordsToTile(targetX, targetY);

    const finder = new _AStar__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const grid = new _AStar__WEBPACK_IMPORTED_MODULE_0__["Grid"](map.grid);
    const p = finder.findPath(startX, startY, endX, endY, grid);

    if (p.length === 0) return false;
    const smoothPath = Object(_AStar__WEBPACK_IMPORTED_MODULE_0__["smoothenPath"])(grid, p);

    const path = smoothPath
      .map(([x, y]) => map.tileToCoords(x, y))
      .slice(1, -1)
      .concat([target]);

    this.path = path;

    return true;
  }

  setTarget(enemy, map) {
    this.target = enemy;
    this.state = STATES.ATTACKING;
    this.recalculateTarget = 15;
    this.target.attacked();

    const distanceFromTarget = Object(_distance__WEBPACK_IMPORTED_MODULE_7__["distance"])(this, this.target);
    const targetInRange = distanceFromTarget <= this.range;
    if (!targetInRange) {
      this.setPath([this.target.x, this.target.y], map);
    }
  }

  setMining(mine) {
    this.path = [];
    this.miningTarget = mine;
    this.state = STATES.MINING;
  }

  buildBuilding({ building }) {
    this.buildingTarget = building;
    this.state = STATES.BUILD_BUILDING;
  }

  calculateSpeed() {
    let [targetX, targetY] = this.path[0];
    let d = Object(_distance__WEBPACK_IMPORTED_MODULE_7__["distance"])({ x: this.x, y: this.pathY }, { x: targetX, y: targetY });

    // if close enough to destination, remove waypoint
    if (d > this.speed) {
      this.dx = this.speed * ((targetX - this.x) / Math.abs(d));
      this.dy = this.speed * ((targetY - this.pathY) / Math.abs(d));
    } else {
      this.path.shift();
    }
  }

  takeDamage(amount, { particles, d }) {
    this.health -= amount;
    for (let i = 0; i < amount; i++) {
      particles.add(
        new _Particle__WEBPACK_IMPORTED_MODULE_3__["default"](
          "blood",
          this.x,
          this.y + this.size / 2,
          Math.random() * 6 - 3 + d.dx * 4,
          Math.random() * -10 - 5 + d.dy * 4,
          this.bloodColor
        )
      );
    }
    return this.health <= 0;
  }

  explode({ particles, sound }) {
    sound.play("death");
    for (let i = 0; i < 100; i++) {
      particles.add(
        new _Particle__WEBPACK_IMPORTED_MODULE_3__["default"](
          "blood",
          this.x,
          this.y,
          Math.random() * 10 - 5,
          Math.random() * -12 - 6,
          this.bloodColor
        )
      );
    }
    for (let i = 0; i < 5; i++) {
      particles.add(
        new _Particle__WEBPACK_IMPORTED_MODULE_3__["default"](
          "chunk",
          this.x,
          this.y,
          Math.random() * 6 - 3,
          Math.random() * -6 - 6,
          "red"
        )
      );
    }
  }

  returnResource(player, map, baseTarget = null) {
    this.path = [];
    let base = baseTarget;
    if (!base) {
      const bases = player.buildings.filter((b) => b.name === "base");
      if (bases.length) {
        bases.sort((a, b) => Object(_distance__WEBPACK_IMPORTED_MODULE_7__["distance"])(this, a) - Object(_distance__WEBPACK_IMPORTED_MODULE_7__["distance"])(this, b));
        base = bases[0];
      }
    }
    if (base) {
      this.baseTarget = base;
      this.setPath([base.x + base.sizeX / 2, base.y + base.sizeY / 2], map);
      this.state = STATES.RETURNING_RESOURCE;
    }
  }

  move() {
    if (this.path.length) {
      this.calculateSpeed();
      this.facing = this.dx > 0 ? 1 : 0;
    } else {
      this.dx = 0;
      this.dy = 0;
      if (this.state === STATES.MOVING) this.state = STATES.IDLE;
    }
    this.x += this.dx;
    this.pathY += this.dy;
  }

  tick({ map, particles, player, sound, targets }) {
    this.lifespan += 1;

    // blink
    if (Math.random() < 0.005) {
      this.blink = 10;
    }
    if (this.blink > 0) {
      this.blink -= 1;
    }

    if (this.state === STATES.IDLE && Math.random() < 0.001) {
      this.facing = this.facing ? 0 : 1;
    }

    // bounce
    if (this.bouncy) {
      const BOUNCE_HEIGHT = 12;
      const BOUNCE_DURATION = 12;
      const shouldMoveBounce =
        (this.state === STATES.MOVING || this.state === STATES.ATTACKING) &&
        this.bounceTime === 0;
      const shouldIdleBounce =
        this.state === STATES.IDLE && Math.random() < 0.01;
      if (shouldMoveBounce || shouldIdleBounce) {
        this.bounceTime = BOUNCE_DURATION;
      }
      if (this.bounceTime > 0) {
        this.bounceTime -= 1;
        const a =
          BOUNCE_DURATION * (Math.sqrt(BOUNCE_HEIGHT) / (BOUNCE_HEIGHT * 2));
        this.bounce =
          -Math.pow(this.bounceTime / a - Math.sqrt(BOUNCE_HEIGHT), 2) +
          BOUNCE_HEIGHT;
      }
    }

    // building
    if (this.state === STATES.BUILD_BUILDING) {
      if (this.path.length === 0) {
        this.setPath(
          [
            this.buildingTarget.x + this.buildingTarget.sizeX / 2,
            this.buildingTarget.y + this.buildingTarget.sizeY / 2,
          ],
          map
        );
      }
      if (Object(_collision__WEBPACK_IMPORTED_MODULE_6__["boxCollision"])(this.hitbox(), this.buildingTarget)) {
        this.buildingTarget.buildingProgress -= 1;
        if (this.buildingTarget.buildingProgress <= 0) {
          this.buildingTarget.built = true;
          this.state = STATES.IDLE;
          this.menuState = MENU_STATES.INITIAL;
        }
      }
    }

    // mining
    if (this.state === STATES.MINING) {
      if (!this.carryingResource && this.path.length === 0) {
        this.setPath(
          [
            this.miningTarget.x + this.miningTarget.size / 2,
            this.miningTarget.y + this.miningTarget.size / 2,
          ],
          map
        );
      } else if (this.carryingResource) {
        this.returnResource(player, map);
      }
      if (Object(_collision__WEBPACK_IMPORTED_MODULE_6__["boxCollision"])(this.hitbox(), this.miningTarget)) {
        this.carryingResource = true;
        this.returnResource(player, map);
      }
    }
    if (this.state === STATES.RETURNING_RESOURCE) {
      if (
        Object(_collision__WEBPACK_IMPORTED_MODULE_6__["boxCollision"])(this.hitbox(), this.baseTarget) &&
        this.carryingResource
      ) {
        player.resources += 10;
        this.carryingResource = false;
        this.setPath(
          [
            this.miningTarget.x + this.miningTarget.size / 2,
            this.miningTarget.y + this.miningTarget.size / 2,
          ],
          map
        );
        this.state = STATES.MINING;
      }
    }

    // find targets while idle
    if (this.aggro && this.state === STATES.IDLE) {
      const [nearTarget] = targets.filter(
        (entity) => Object(_distance__WEBPACK_IMPORTED_MODULE_7__["distance"])(this, entity) <= this.range
      );
      if (nearTarget) {
        this.setTarget(nearTarget, map);
      }
    }

    // attacking
    if (this.target && this.target.health <= 0) {
      this.target = null;
      this.state = STATES.IDLE;
      this.path = [];
    }
    if (this.firingTime > 0) this.firingTime -= 1;
    if (this.cooldownTime > 0) this.cooldownTime -= 1;
    if (this.state === STATES.ATTACKING) {
      const distanceFromTarget = Object(_distance__WEBPACK_IMPORTED_MODULE_7__["distance"])(this, this.target);
      const targetInRange = distanceFromTarget <= this.range;

      this.recalculateTarget -= 1;
      if (this.recalculateTarget < 0 && !targetInRange) {
        this.setPath([this.target.x, this.target.y], map);
        this.recalculateTarget = 15;
      }

      if (targetInRange && this.cooldownTime === 0) {
        sound.play(this.attackSound);
        this.cooldownTime = this.cooldownTotalTime;
        this.firingTime = this.firingTotalTime;
        this.path = [];

        const d = Object(_distance__WEBPACK_IMPORTED_MODULE_7__["distance"])(this, this.target);
        const dx = (this.target.x - this.x) / d;
        const dy = (this.target.y - this.pathY) / d;
        this.target.takeDamage(this.damage, {
          particles,
          d: { dx, dy },
        });
      }
    }

    if (this.firingTime === 0) {
      this.move();
    }
    this.y = this.pathY - this.bounce;

    if (this.attackSelected > 0) this.attackSelected -= 1;
  }

  actions({ player }) {
    const output = Array(9).fill({});

    const cancel = {
      name: "cancel",
      cost: 0,
      actionable: () => true,
      drawIcon: _HUD__WEBPACK_IMPORTED_MODULE_1__["default"].cancelIcon,
      execute: () => {
        this.menuState = MENU_STATES.INITIAL;
        player.cancelPlaceBuilding();
        if (this.buildingTarget) {
          player.cancelBuilding(this.buildingTarget);
        }
        this.state = STATES.IDLE;
      },
    };

    const buildBuilding = (building) => ({
      name: `build ${building["name"]}`,
      cost: building["cost"],
      actionable: function () {
        return this.cost <= player.resources;
      },
      drawIcon: (drawer, x, y) => {},
      execute: () => {
        player.placeBuildingMode({ unit: this, building: building["name"] });
        this.menuState = MENU_STATES.PLACE_BUILDING;
      },
    });

    if (this.state === MENU_STATES.BUILD_BUILDING) {
      output[5] = cancel;
    } else if (this.menuState === MENU_STATES.BUILDING) {
      output[0] = buildBuilding(_buildingTypes__WEBPACK_IMPORTED_MODULE_4__["default"]["base"]);
      output[1] = buildBuilding(_buildingTypes__WEBPACK_IMPORTED_MODULE_4__["default"]["barracks"]);
      output[5] = cancel;
    } else if (this.menuState === MENU_STATES.PLACE_BUILDING) {
      output[5] = cancel;
    } else {
      output[0] = {
        name: "move",
        cost: 0,
        actionable: () => true,
        drawIcon: (drawer, x, y) => {
          drawer.ellipse({
            adjusted: false,
            ellipse: [x + 30, y + 30, 23, 23, 0, 0, 2 * Math.PI],
            strokeColor: "#0F0",
            strokeWidth: 5,
          });
          drawer.triangle({
            adjusted: false,
            x: x + 30,
            y: y + 22,
            fillColor: "#0F0",
            rotation: Math.PI * 0.75,
            size: 15,
          });
          drawer.rect({
            adjusted: false,
            rect: [x + 14, y + 26, 25, 7],
            fillColor: "#0F0",
          });
        },
        execute: () => {
          console.log("move");
        },
      };
      if (this.builder) {
        output[3] = {
          name: "build",
          cost: 0,
          actionable: () => true,
          drawIcon: (drawer, x, y) => {
            drawer.triangle({
              adjusted: false,
              x: x + 17,
              y: y + 18,
              fillColor: "#0F0",
              rotation: Math.PI * 0.25,
              size: 26,
            });
            drawer.rect({
              adjusted: false,
              rect: [x + 18, y + 25, 24, 20],
              fillColor: "#0F0",
            });
            drawer.rect({
              adjusted: false,
              rect: [x + 26, y + 37, 7, 8],
              fillColor: "#111",
            });
          },
          execute: () => {
            this.menuState = MENU_STATES.BUILDING;
          },
        };
      }
    }
    return output;
  }

  hudDrawIcon(drawer, x, y, name) {
    const options = _unitTypes__WEBPACK_IMPORTED_MODULE_5__["default"][name];
    Unit.hudDrawIcon(drawer, x, y, { ...options, bodyless: this.bodyless });
  }

  hudDraw(drawer, x, y, name) {
    const options = _unitTypes__WEBPACK_IMPORTED_MODULE_5__["default"][name];
    const colors = {
      skin: "#0f0",
      eyes: "#666",
      body: "#666",
    };
    Object(_Sprites__WEBPACK_IMPORTED_MODULE_2__["humanoid"])(x, y, 1, colors, { ...options, size: 12 }).forEach(({ c, r }) =>
      drawer.rect({
        adjusted: false,
        fillColor: c,
        rect: r,
      })
    );
  }

  hitbox() {
    const x = this.x - this.size / 2;
    const y = this.y - this.size / 2;
    return { x, y, size: this.size };
  }

  draw(drawer) {
    const x = this.x - this.size / 2;
    const y = this.y - this.size / 2;

    const drawRing = (color) => {
      drawer.ellipse({
        ellipse: [
          x + this.size / 2,
          y + this.size,
          (this.size + 15) / 2,
          this.size / 3,
          0,
          0,
          2 * Math.PI,
        ],
        strokeColor: color,
        strokeWidth: 5,
      });
    };
    if (this.selected) drawRing("#4AC");
    if (this.attackSelected > 0 && this.attackSelected % 10 > 5)
      drawRing("#A00");

    Object(_Sprites__WEBPACK_IMPORTED_MODULE_2__["humanoid"])(x, y, this.facing, this.colors, {
      blink: this.blink > 0,
      bodyless: this.bodyless,
      horns: this.horns,
      antenna: this.antenna,
      size: this.size / 5,
    }).forEach(({ c, r }) =>
      drawer.rect({
        fillColor: c,
        rect: r,
      })
    );

    if (this.carryingResource) {
      drawer.draw(() => {
        drawer.rect({
          fillColor: "#39ca",
          rect: [x + (this.facing ? 5 : -35) + this.size / 2, y + 10, 30, 30],
          rotation: Math.PI * -0.05,
          size: 30,
        });
      });
    }

    if (this.firingTotalTime - this.firingTime < 5) {
      // prettier-ignore
      [
        [(this.facing === 1 ? 8 : -1), 3, 1, 1],
        [(this.facing === 1 ? 7 : 0), 4, 2, 3],
      ].forEach(([sx, sy, dx, dy]) =>
        drawer.rect({
          fillColor: "yellow",
          rect: [x + sx * 6, y + sy * 6, dx * 6, dy * 6],
        })
      );

      // prettier-ignore
      [
        [(this.facing === 1 ? 8 : -1), 4, 2, 2],
        [(this.facing === 1 ? 10 : -3), 4, 1, 1],
      ].forEach(([sx, sy, dx, dy]) =>
        drawer.rect({
          fillColor: "white",
          rect: [x + sx * 6, y + sy * 6, dx * 6, dy * 6],
        })
      );
    }

    const hitbox = false;
    if (hitbox) {
      const hb = this.hitbox();
      drawer.rect({
        fillColor: "#c668",
        rect: [hb.x, hb.y, hb.size, hb.size],
      });
    }

    if (!this.inFog) {
      drawer.miniMap({
        x: x,
        y: y,
        color: this.miniMapColor,
        size: Math.ceil(this.size / 20),
      });
    }
  }
}

Unit.hudDrawIcon = (drawer, x, y, options) => {
  const colors = {
    skin: "#0f0",
    eyes: "#666",
    body: "#666",
  };
  Object(_Sprites__WEBPACK_IMPORTED_MODULE_2__["humanoid"])(x + 14, y + 18, 1, colors, { ...options, size: 6 }).forEach(
    ({ c, r }) =>
      drawer.rect({
        adjusted: false,
        fillColor: c,
        rect: r,
      })
  );
};

/* harmony default export */ __webpack_exports__["default"] = (Unit);


/***/ }),

/***/ "./src/buildingTypes.js":
/*!******************************!*\
  !*** ./src/buildingTypes.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map */ "./src/Map.js");
/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Unit */ "./src/Unit.js");
/* harmony import */ var _unitTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unitTypes */ "./src/unitTypes.js");




const buildUnit = (type, building, player) => {
  const { name, cost, buildTime } = _unitTypes__WEBPACK_IMPORTED_MODULE_2__["default"][type];
  return {
    name: `build ${name}`,
    cost: cost,
    time: buildTime,
    actionable: function () {
      return this.cost <= player.resources;
    },
    execute: function ({ player }) {
      if (building.tasks.length < 5 && player.resources >= this.cost) {
        player.resources -= this.cost;
        building.queueTask(this, { player });
        return true;
      }
      return false;
    },
    complete: ({ player }) => {
      player.addUnit({
        type,
        x: building.x + building.sizeX + 10,
        y: building.y + building.sizeY + 10,
      });
    },
    drawIcon: (drawer, x, y) => {
      const options = _unitTypes__WEBPACK_IMPORTED_MODULE_2__["default"][name];
      _Unit__WEBPACK_IMPORTED_MODULE_1__["default"].hudDrawIcon(drawer, x, y, options);
    },
  };
};

const drawBuilding = (
  drawer,
  x,
  y,
  width,
  height,
  color,
  opacity = "F",
  accessory
) => {
  drawer.rect({
    fillColor: "#544" + opacity,
    rect: [x, y + _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize, width, height],
  });

  drawer.ellipse({
    ellipse: [
      x + width / 2,
      y + height + _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize,
      width / 2,
      height / 4,
      0,
      0,
      2 * Math.PI,
    ],
    fillColor: "#544" + opacity,
  });

  drawer.ellipse({
    ellipse: [
      x + width / 2,
      y + _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize,
      width / 2,
      height / 4,
      0,
      0,
      2 * Math.PI,
    ],
    fillColor: "#655" + opacity,
  });

  if (accessory === "flag") {
    const FLAGPOLE_WIDTH = 10;
    const FLAGPOLE_HEIGHT = 100;
    drawer.rect({
      fillColor: "#666" + opacity,
      rect: [
        x + width / 2 - FLAGPOLE_WIDTH / 2,
        y - FLAGPOLE_HEIGHT + _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize,
        FLAGPOLE_WIDTH,
        FLAGPOLE_HEIGHT,
      ],
    });
    drawer.rect({
      fillColor: color + opacity,
      rect: [
        x + width / 2 + FLAGPOLE_WIDTH / 2,
        y - FLAGPOLE_HEIGHT + _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize,
        60,
        40,
      ],
    });
  }

  if (accessory === "shield") {
    const sx = 70;
    const sy = 150;
    drawer.ellipse({
      ellipse: [x + sx, y + sy, 100, 100, 0, 0, Math.PI / 3],
      fillColor: color + opacity,
    });
    drawer.ellipse({
      ellipse: [
        x + sx + 100,
        y + sy,
        100,
        100,
        0,
        (2 * Math.PI) / 3,
        (3 * Math.PI) / 3,
      ],
      fillColor: color + opacity,
    });
    drawer.lines({
      lines: [
        [x + sx, y + sy],
        [x + sx + 100, y + sy],
        [x + sx + 50, y + sy + (100 * 3 ** (1 / 2)) / 2],
      ],
      fillColor: color + opacity,
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = ({
  base: {
    name: "base",
    health: 50,
    buildTime: 600,
    cost: 400,
    sizeX: _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize * 3,
    sizeY: _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize * 3,
    actions: ({ building, output, player }) => {
      output[0] = buildUnit("shade", building, player);
    },
    drawBuilding: (...args) => drawBuilding(...args, "flag"),
  },
  barracks: {
    name: "barracks",
    health: 50,
    buildTime: 300,
    cost: 150,
    sizeX: _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize * 3,
    sizeY: _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize * 3,
    actions: ({ building, output, player }) => {
      output[0] = buildUnit("goblin", building, player);
      output[1] = buildUnit("brute", building, player);
      output[2] = buildUnit("speeder", building, player);
    },
    drawBuilding: (...args) => drawBuilding(...args, "shield"),
  },
});


/***/ }),

/***/ "./src/collision.js":
/*!**************************!*\
  !*** ./src/collision.js ***!
  \**************************/
/*! exports provided: boxCollision, pointCollision */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boxCollision", function() { return boxCollision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointCollision", function() { return pointCollision; });
const boxCollision = (rect1, rect2) =>
  rect1.x < rect2.x + (rect2.size || rect2.sizeX) &&
  rect1.x + (rect1.size || rect1.sizeX) > rect2.x &&
  rect1.y < rect2.y + (rect2.size || rect2.sizeY) &&
  (rect1.size || rect1.sizeY) + rect1.y > rect2.y;

const pointCollision = (rect, point) =>
  point.x >= rect.x &&
  point.x < rect.x + (rect.size || rect.sizeX) &&
  point.y >= rect.y &&
  point.y < rect.y + (rect.size || rect.sizeY);


/***/ }),

/***/ "./src/distance.js":
/*!*************************!*\
  !*** ./src/distance.js ***!
  \*************************/
/*! exports provided: distance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
const distance = (source, dest) => {
  const dx = Math.abs(source.x - dest.x);
  const dy = Math.abs(source.y - dest.y);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Background__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Background */ "./src/Background.js");
/* harmony import */ var _CPUPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CPUPlayer */ "./src/CPUPlayer.js");
/* harmony import */ var _Drawer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Drawer */ "./src/Drawer.js");
/* harmony import */ var _FogOfWar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FogOfWar */ "./src/FogOfWar.js");
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Keyboard */ "./src/Keyboard.js");
/* harmony import */ var _HUD__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HUD */ "./src/HUD.js");
/* harmony import */ var _HumanPlayer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HumanPlayer */ "./src/HumanPlayer.js");
/* harmony import */ var _Level__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Level */ "./src/Level.js");
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Map */ "./src/Map.js");
/* harmony import */ var _MineCollection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MineCollection */ "./src/MineCollection.js");
/* harmony import */ var _MiniMap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./MiniMap */ "./src/MiniMap.js");
/* harmony import */ var _Mouse__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Mouse */ "./src/Mouse.js");
/* harmony import */ var _ParticleCollection__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ParticleCollection */ "./src/ParticleCollection.js");
/* harmony import */ var _Sound__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Sound */ "./src/Sound.js");















let fps = 60,
  interval = 1000 / fps,
  lastTime = 0,
  delta = 0;

window.onload = () => {
  let drawer = new _Drawer__WEBPACK_IMPORTED_MODULE_2__["default"]();

  let background = new _Background__WEBPACK_IMPORTED_MODULE_0__["default"]({
    cw: drawer.canvas.width,
    ch: drawer.canvas.height,
  });
  let keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_4__["default"]();
  let mouse = new _Mouse__WEBPACK_IMPORTED_MODULE_11__["default"]();
  let sound = new _Sound__WEBPACK_IMPORTED_MODULE_13__["default"]();

  let fogOfWar = new _FogOfWar__WEBPACK_IMPORTED_MODULE_3__["default"]();
  let hud = new _HUD__WEBPACK_IMPORTED_MODULE_5__["default"]();
  let level = new _Level__WEBPACK_IMPORTED_MODULE_7__["default"]();
  let map = new _Map__WEBPACK_IMPORTED_MODULE_8__["default"]();
  let mines = new _MineCollection__WEBPACK_IMPORTED_MODULE_9__["default"]({ map });
  let miniMap = new _MiniMap__WEBPACK_IMPORTED_MODULE_10__["default"]();
  let humanPlayer = new _HumanPlayer__WEBPACK_IMPORTED_MODULE_6__["default"]({ map });
  let cpuPlayer = new _CPUPlayer__WEBPACK_IMPORTED_MODULE_1__["default"]({ map });
  let particles = new _ParticleCollection__WEBPACK_IMPORTED_MODULE_12__["default"]();

  let gameLoop = (currentTime) => {
    window.requestAnimationFrame(gameLoop);
    if (currentTime - lastTime) {
      tick();
      drawer.clearBackground();
      drawer.clearMiniMap();
      drawObjects().map((object) => object.draw(drawer));
      lastTime = currentTime - (delta % interval);
    }
  };

  let tick = () => {
    const { camera } = drawer;
    level.tick({ cpuPlayer, humanPlayer });
    camera.tick({ keyboard, mouse });
    mouse.tick({ camera });
    cpuPlayer.tick({
      map,
      mines,
      particles,
      sound,
      targets: humanPlayer.entities(),
    });
    humanPlayer.tick({
      camera,
      cpuPlayer,
      drawer,
      map,
      mines,
      mouse,
      particles,
      sound,
      targets: cpuPlayer.entities(),
    });
    mines.tick();
    hud.tick({ camera, drawer, map, mouse, player: humanPlayer, sound });
    particles.tick({ map });
    fogOfWar.tick({ humanPlayer, cpuPlayer, mines, map });
  };

  let drawObjects = () => [
    background,
    map,
    particles,
    mines,
    cpuPlayer,
    humanPlayer,
    mouse,
    fogOfWar,
    hud,
    miniMap,
    level,
  ];

  gameLoop();
};


/***/ }),

/***/ "./src/particleTypes.js":
/*!******************************!*\
  !*** ./src/particleTypes.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  blood: {
    draw: function (drawer) {
      drawer.rect({
        fillColor: this.color,
        rect: [this.x, this.y, 5, 5],
      });
    },
  },
  chunk: {
    draw: function (drawer) {
      const glistenColor = "#FF77A8";
      drawer.rect({
        fillColor: this.color,
        rect: [this.x, this.y - 10, 10, 15],
      });

      [
        [1, 2],
        [2, 3],
      ].forEach(([x, y]) => {
        drawer.rect({
          fillColor: this.color,
          rect: [this.x + (x - 2) * 5, this.y + (y - 2) * 5, 5, 5],
        });
      });

      [
        [2, 0],
        [1, 1],
        [0, 2],
        [1, 3],
      ].forEach(([x, y]) => {
        drawer.rect({
          fillColor: glistenColor,
          rect: [this.x + (x - 2) * 5, this.y + (y - 2) * 5, 5, 5],
        });
      });
    },
  },
  bit: {
    draw: function (drawer) {
      drawer.rect({
        fillColor: this.color,
        rect: [this.x, this.y, 20, 20],
      });
    },
  },
});


/***/ }),

/***/ "./src/unitTypes.js":
/*!**************************!*\
  !*** ./src/unitTypes.js ***!
  \**************************/
/*! exports provided: shadeColors, goblinColors, bruteColors, speederColors, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shadeColors", function() { return shadeColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "goblinColors", function() { return goblinColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bruteColors", function() { return bruteColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "speederColors", function() { return speederColors; });
const makeColors = ([skin, eyes, body]) => ({ skin, eyes, body });

// prettier-ignore
const shadeColors = (color) => makeColors(["#999", color, color]);
// prettier-ignore
const goblinColors = (color) => makeColors(["#50c878", color, color]);
// prettier-ignore
const bruteColors = (color) => makeColors(["#c80", color, color]);
// prettier-ignore
const speederColors = (color) => makeColors(["#cff", color, color]);

const defaultUnit = {
  name: "goblin",
  health: 50,
  damage: 10,
  size: 8 * 5,
  cost: 100,
  buildTime: 5 * 30,
  bloodColor: "#A00",
  aggro: true,
  colors: goblinColors,
  speed: 5,
  bodyless: false,
  horns: true,
  antenna: false,
  bouncy: true,
  attackSound: "gun",
  canMine: false,
  flying: false,
  builder: false,

  range: 300,
  cooldownTotalTime: 90,
  firingTotalTime: 60,
};

// prettier-ignore
/* harmony default export */ __webpack_exports__["default"] = ({
  "shade": {
    ...defaultUnit,
    name: "shade",
    damage: 1,
    aggro: false,
    colors: shadeColors,
    speed: 3,
    bodyless: true,
    bouncy: false,
    attackSound: "minigun",
    canMine: true,
    flying: true,
    builder: true,

    range: 50,
    cooldownTotalTime: 10,
    firingTotalTime: 10,
  },
  "goblin": {
    ...defaultUnit,
  },
  "brute": {
    ...defaultUnit,
    name: "brute",
    health: 100,
    damage: 15,
    size: 8 * 10,
    cost: 200,
    buildTime: 10 * 30,
    colors: bruteColors,
    speed: 3,

    range: 100,
  },
  "speeder": {
    ...defaultUnit,
    name: "speeder",
    health: 150,
    damage: 5,
    cost: 200,
    horns: false,
    antenna: true,
    buildTime: 10 * 30,
    colors: speederColors,
    speed: 8,

    range: 50,
  }
});


/***/ })

/******/ });
//# sourceMappingURL=main.js.map