/**
 * Created by Saurabh Shukla on 14-Apr-2017.
 */

/**
 * Enum for BST child type
 * @type {{root: number, leftChild: number, rightChild: number}}
 */
var nodeTypeEnum = {
    root: 0,
    leftChild: 1,
    rightChild: 2
};

/**
 * Constructor for Basic BST
 * @param value
 * @param nodeType
 * @param parent
 * @returns {BasicBinarySearchTree}
 * @constructor
 */
var BasicBinarySearchTree = function (value, nodeType, parent) {
    if (isNaN(value)) {
        throw 'Please provide valid number for BST creation/insertion.';
    } else {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.nodeType = nodeType || nodeTypeEnum.root;

        return this;
    }
};

/**
 * Insert given value in Basic BST
 * @param value
 */
BasicBinarySearchTree.prototype.insert = function (value) {
    if (value <= this.value) {
        if (!this.left) {
            this.left = new BasicBinarySearchTree(value, nodeTypeEnum.leftChild, this.value);
        } else {
            this.left.insert(value);
        }
    } else if (value > this.value) {
        if (!this.right) {
            this.right = new BasicBinarySearchTree(value, nodeTypeEnum.rightChild, this.value);
        } else {
            this.right.insert(value);
        }
    }
};

/**
 * Search given value in Basic BST
 * @param value
 * @returns {boolean}
 */
BasicBinarySearchTree.prototype.search = function (value) {
    if (value === this.value) {
        return true;
    }
    if (value < this.value && this.left) {
        return this.left.search(value);
    }
    if (value > this.value && this.right) {
        return this.right.search(value);
    }
    return false;
};

/**
 * Traverse Basic BST an call the provided callback for each node value
 * @param callback
 * @param args
 */
BasicBinarySearchTree.prototype.traverse = function (callback, args) {
    callback.call(this, args);
    if (this.left) {
        this.left.traverse(callback, args);
    }
    if (this.right) {
        this.right.traverse(callback, args);
    }
};