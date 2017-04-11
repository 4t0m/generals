class TreeNode {
  constructor(cell) {
    this.cell = [];
    this.children = [];
    this.parent = null;
    this.directionFromParent = null;
  }


  setParent(parent) {
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

	addChild(child) {
		child.setParent(this);
	}

	removeChild(child) {
		if (child && this.children.includes(child)) {
			child.setParent(null);
		}
	}

	addToChildren(newChild) {
		this.children.push(newChild);
	}

	removeFromChildren(childToRemove) {
		this.children = this.children.filter(childNode => childNode !== childToRemove);
	}

  bfSearch(targetCell, callback) {
    if (!callback && targetCell) {
      callback = (cell) => cell.id === targetCell.id;
    }

    let nodes = [this];

    while (nodes.length !== 0) {
      let currentNode = nodes.shift();

      if (callback(currentNode)) {
        return currentNode;
      }

      nodes.concat(currentNode.children);
    }
  }

  orientFromParent() {
    // returns the direction you would have to move, starting from parent, to reach own cell
    let ownCoords = this.cell.id.split('-').map(char => parseInt(char));
    let parentCoords = this.parent.cell.id.split('-').map(char => parseInt(char));

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
}

export default TreeNode;
