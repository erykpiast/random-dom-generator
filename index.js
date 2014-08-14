module.exports = (function() {

    function _random(min, max) {
        return Math.round(min + (Math.random() * (max - min)));
    }
    
    function _createNode(tag, attrs) {
        var node = document.createElement(tag);
        
        for(var attrName in attrs) {
            if(attrs.hasOwnProperty(attrName)) {
                node.setAttribute(attrName, attrs[attrName]);
            }
        }
            
        return node;
    }
    
    function _createArray(len) {
        return ((len * 10) - 1).toString(10).split('');
    }
    
    
    function randomDOM(root, amount, maxDepth, maxPerLevel, maxAttrs, tags, attrs) {
        if(amount > Math.pow(maxPerLevel, maxDepth)) {
            throw 'it is not possible to create ' + amount + ' nodes with ' + maxDepth + ' depth and ' + maxPerLevel + ' nodes per level';
        }
        
        var current = root;
        var currentDepth = 0;
        var goDeeper;
        var tag;
        var currentAttrs;
        var tagsLen = tags.length;
        var attrsNames = Object.keys(attrs);
        var attrsLen = attrsNames.length;

        function _drawAttrs() {
            var attrIndex = _random(0, attrsLen - 1);
            var attrsValues = attrs[attrsNames[attrIndex]];
            
            currentAttrs[attrsNames[attrIndex]] = attrsValues[_random(0, attrsValues.length - 1)];
        }
        
        while(amount) {
            tag = tags[_random(0, tagsLen - 1)];
            currentAttrs = { };
            _createArray(Math.ceil(_random(0, maxAttrs))).forEach(_drawAttrs);
            
            goDeeper = _random(0, maxDepth) > currentDepth;
            
            if(goDeeper || !currentDepth) {
                currentDepth++;
                
                if(current.children.length < maxPerLevel) {
                    current.appendChild(current = _createNode(tag, currentAttrs));    
                } else {
                    current = current.children[_random(0, current.children.length - 1)];
                    
                    continue;
                }
            } else {
                if(current.parentNode.children.length < maxPerLevel) {
                    current.parentNode.appendChild(current = _createNode(tag, currentAttrs));
                } else if(currentDepth) {
                    current = current.parentNode;
                    
                    currentDepth--;
                    
                    continue;
                } else {
                    current = current.children[_random(0, current.children.length - 1)];
                    
                    currentDepth++;
                    
                    continue;
                }
            }
            
            amount--;
        }
        
        return root;
    }
    

    return randomDOM;

})();
