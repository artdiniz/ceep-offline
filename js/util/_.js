let _ = (function(){
    function extraiTags(text){
		return text.split(/[\s\n]/).reduce(function(tags, itemBusca){
            if(itemBusca.match(/^#/)){
            	tags.push(itemBusca.trim())
			}
            return tags
        }, [])
	}

    function isElementInViewport (el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0]
        }

        let rect = el.getBoundingClientRect()

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        )
    }

    return {
        extraiTags: extraiTags
        ,estaNaTela: isElementInViewport
    }
})()