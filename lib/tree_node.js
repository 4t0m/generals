class TreeNode {
  constructor(cell) {
    this.cell = [];
    this.children = [];
    this.parent = null;
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

  dfSearch(targetCell, callback) {
    if (!callback && targetCell) {
      callback = (cell) => cell.id === targetCell.id;
    }

    if (callback(this)) {
      return this;
    }

    this.children.forEach(child => {
      let result = child.dfSearch(null, callback);
      if (typeof myVar !== 'undefined') {
        return result;
      }
    });

    return undefined;
  }
}

export default TreeNode;
