class TreeNode {
  constructor() {

  }

  dfSearch(target, callback) {
    if (!callback && target) {
      callback = (cell) => cell === target;
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
