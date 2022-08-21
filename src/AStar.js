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
export function smoothenPath(grid, path) {
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
export function Grid(width_or_matrix, height, matrix) {
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

export default AStarFinder;
