import TreeNode from './tree_node';
import Command from './command';

class MoveTree {
  constructor(startingCell, board) {
    this.startingCell = startingCell;
    this.visitedCells = [startingCell];
    this.board = board;
    this.rootNode = new TreeNode(startingCell);

    this.buildMoveTree();
  }

  findPath(targetCell) {
    if (this.startingCell === targetCell) {
      return [];
    }

    let endNode = this.rootNode.bfSearch(targetCell);
    let path = this.pathFromEnd(endNode);
    let commands = [];
    let directionToChild;

    path.forEach(node => {
      if (directionToChild) {
        commands.push(new Command(node.cell, directionToChild));
      }
      directionToChild = node.directionFromParent;
    });
    return commands.reverse();
  }

  buildMoveTree() {
    let nodes = [this.rootNode];
    while (nodes.length !== 0) {
      let currentNode = nodes.shift();
      let newCells = this.newCells(currentNode);
      newCells.forEach(nextCell => {
        let nextNode = new TreeNode(nextCell);
        currentNode.addChild(nextNode);
        nodes.push(nextNode);
      });
    }
  }

  newCells(node) {
    let newCells = this.board.moveableCells(node.cell)
      .filter(candidateCell => !this.visitedCells.includes(candidateCell));

    this.visitedCells =  this.visitedCells.concat(newCells);
    return newCells;
  }

  pathFromEnd(endNode) {
    let nodes = [];
    let currentNode = endNode;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.parent;
    }

    return nodes;
  }

}

export default MoveTree;
