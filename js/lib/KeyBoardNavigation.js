let KeyBoardNavigation = function(keyMap){
    let specialKeysSort = (()=>{
        let specialKeys = ["Shift", "Control", "Alt", "Meta"]
        return (a, b) => {
            return (specialKeys.indexOf(b)+1) - (specialKeys.indexOf(a)+1)
        }
    })()

    keyMap = Object.keys(keyMap).reduce((newKeyMap, keyName)=>{
        let mappedFunction = keyMap[keyName]
        let keys = keyName.split("+")
        if(keys.length > 1){
            keyName = keys
                        .sort(specialKeysSort)
                        .join("+")
        }
        newKeyMap[keyName] = mappedFunction
        return newKeyMap
    },{})

    return function(){
        let index = []
        let currentIndexPosition = -1

        let iterator = Object.create({}, {
            "next": {
                configurable: false
                ,value: function(){
                    currentIndexPosition++
                    return index[Math.abs(currentIndexPosition)%index.length]
                }
            }
            ,"previous": {
                configurable: false
                ,value: function(){
                    currentIndexPosition = (currentIndexPosition + (index.length - 1)) % index.length
                    return index[Math.abs(currentIndexPosition)%index.length]
                }
            }
            ,"current": {
                configurable: false
                ,value: function(){
                    return index[currentIndexPosition]
                }
            }
        })

        return Object.create({}, {
            "push": {
                configurable: false
                ,value: function(element){
                    index.push(element)
                }
            }
            ,"init": {
                configurable: false
                ,value: function(){
                    currentIndexPosition = -1
                    return iterator.next()
                }
            }
            ,"navigate": {
                configurable: false
                ,value: function(keyboardEvent){
                    if(keyboardEvent.defaultPrevented){
                        return null
                    }

                    let {shiftKey: Shift, ctrlKey: Control, altKey: Alt, metaKey: Meta } = keyboardEvent
                    let specialKeys = {Shift, Control, Alt, Meta}

                    let specialKeysPressed = Object.keys(specialKeys)
                                            .filter(keyIdentifier => {
                                                return specialKeys[keyIdentifier]
                                            })
                                            .sort(specialKeysSort)
                                            .join("+")

                    let key = keyboardEvent.key
                    let navigate = keyMap[specialKeysPressed ? [specialKeysPressed,key].join("+") : key]
                    return !!navigate && navigate(iterator)
                }
            }
        })
    }
}