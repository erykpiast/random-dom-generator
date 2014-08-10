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
    
    while(amount) {
        tag = tags[random(0, tagsLen - 1)];
        currentAttrs = { };
        createArray(Math.ceil(random(0, maxAttrs))).forEach(function(value, index) {
            var attrIndex = random(0, attrsLen - 1);
            var attrsValues = attrs[attrsNames[attrIndex]];
            
            currentAttrs[attrsNames[attrIndex]] = attrsValues[random(0, attrsValues.length - 1)];
        });
        
        goDeeper = random(0, maxDepth) > currentDepth;
        
        if(goDeeper || !currentDepth) {
            currentDepth++;
            
            if(current.children.length < maxPerLevel) {
                current.appendChild(current = createNode(tag, currentAttrs));    
            } else {
                current = current.children[random(0, current.children.length - 1)];
                
                continue;
            }
        } else {
            if(current.parentNode.children.length < maxPerLevel) {
                current.parentNode.appendChild(current = createNode(tag, currentAttrs));
            } else if(currentDepth) {
                current = current.parentNode;
                
                currentDepth--;
                
                continue;
            } else {
                current = current.children[random(0, current.children.length - 1)];
                
                currentDepth++;
                
                continue;
            }
        }
        
        amount--;
    }
    
    return root;
}
