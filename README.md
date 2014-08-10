random-html-generator
=====================

Random HTML generator. For testing. Or fun.

### Example of use ###

Code below...

```
randomDOM(document.querySelector('#random'), 1000, 10, 20, 4, [ 'div' ], {
    class: [ 'class1', 'class1 class2', 'class1 class2 class3' ],
    id: [ 'id1', 'id2', 'id3' ],
    title: [ 'title1', 'title2', 'title3' ],
    style: [ 'background-color: red', 'border-color: orange', 'outline-color: purple' ]
});

```
will produce 1000 DIV elements with maximum 10 levels depth and 20 nodes per level. Each will have at most 4 attributes with one of passed values (ex. id1, id2 or id3 for id attribute).

### Demo ###
http://jsbin.com/toxup/8
