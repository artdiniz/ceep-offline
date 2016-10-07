const CartaoConteudo_render = (function($){
    "use strict"

    function _quebraLinhaComBR(event){
        if(event.keyCode == 13) {
            event.preventDefault()
            document.execCommand("insertHtml", false, "<br><br>")
        }
    }

    return function(globalProps){
        let $conteudo = $("<p>")
                          .addClass("cartao-conteudo")

        return function(props = {}, state = {}, handlers = {}){
            $conteudo
                .html(props.conteudo)
                .attr("contenteditable", state.editavel)
                .off()
                .on("keydown", _quebraLinhaComBR)
                .on("keydown", function(event){
                    if(event.key === "Escape"){
                        $(this).trigger("edicaoCompleta")
                        return false;
                    }
                })
                .on("blur", function(){
                    $(this).trigger("edicaoCompleta")
                })
                .on("edicaoCompleta", function(){
                    handlers.onEdicaoCompleta($conteudo.html())
                })

            if(state.editavel){
                $conteudo.focus()
            }
            return $conteudo
        }
    }
})(jQuery)