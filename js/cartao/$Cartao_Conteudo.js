const $Cartao_Conteudo = (function(){
    "use strict"
    let $Cartao_Conteudo = function(cartao, state){
        let $conteudo = $("<p>")
                        .addClass("cartao-conteudo")
                        .html(cartao.conteudo)
                        .on("keydown", _quebraLinhaComBR)
                        .on("blur", function(){
                            state({editavel: false})
                            cartao.conteudo = $conteudo.html()
                        })

        return $conteudo
    }

    function _quebraLinhaComBR(event){
        if(event.keyCode == 13) {
            event.preventDefault()
            document.execCommand("insertHtml", false, "<br><br>")
        }
    }
    return $Cartao_Conteudo
})()