/**
 * Created by Saurabh Shukla on 14-Apr-2017.
 */

$(document).ready(function () {
    var bst = null;
    $('#insert').on('click', function (event) {
        var $txtValueToInsert = $('#txtValueToInsert'),
            valuesToInsert = $txtValueToInsert.val().split(',').map(function (val) {
                return parseInt(val.trim(), 10);
            });
        $txtValueToInsert.val('');
        if (valuesToInsert.length) {
            insertInBST(valuesToInsert);
        }
    });

    $('#search').on('click', function (event) {
        var $txtValueToSearch = $('#txtValueToSearch'),
            $searchResult = $('#searchResult'),
            valueToSearch = parseInt($txtValueToSearch.val(), 10),
            $searchResultText = $searchResult.html().length ? ($searchResult.html() + '<br />') : $searchResult.html();
        $txtValueToSearch.val('');

        if (!isNaN(valueToSearch)) {
            if (!bst) {
                $searchResult.html($searchResultText + 'BST is not created.');
            } else if (bst.search(valueToSearch)) {
                $searchResult.html($searchResultText + valueToSearch + ' is present in the BST.');
            } else {
                $searchResult.html($searchResultText + valueToSearch + ' is not present in the BST.');
            }
        }
    });

    var insertInBST = function (valuesToInsert) {
        var $insertResult = $('#insertResult');
        $insertResult.html('');
        $.each(valuesToInsert, function (index, valueToInsert) {
            if (!isNaN(valueToInsert)) {
                if (!bst) {
                    bst = new BasicBinarySearchTree(valueToInsert);
                } else {
                    bst.insert(valueToInsert);
                }
            }
        });
        console.log(bst);
        createBSTInHtml($insertResult);
    };

    var createBSTInHtml = function ($treeParentContainer) {
        var $tree = $('<div />', {
                class: 'tree'
            }),
            $ul = $('<ul/>', {
                class: 'root'
            });
        $ul.appendTo($tree);
        if (bst) {
            bst.traverse(function (args) {
                var node = this,
                    $li = $('<li />', {
                        class: node.nodeType === nodeTypeEnum.leftChild ?
                            'left-child' :
                            (node.nodeType === nodeTypeEnum.rightChild ? 'right-child' : 'root-node')
                    }),
                    $div = $('<div />', {
                        text: node.value
                    });
                $li.append($div);
                if (node.left || node.right) {
                    $('<ul />', {
                        class: node.value
                    }).appendTo($li);
                }
                args.find('ul.' + (node.parent || 'root')).append($li);
            }, $tree);
        }
        $tree.appendTo($treeParentContainer);
    };
});