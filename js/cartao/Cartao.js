const Cartao = (function($, $Cartao_Opcoes, $Cartao_Conteudo){
    "use strict"

    const autoIncrement = (function(){
        let id = 0
        return function(){
            return id++
        }
    })()

    function Cartao(conteudo, cor){
        const props = Object.create({}, {
            "id": {
                value: autoIncrement()
                ,configurable: false
                ,writable: false
                ,enumerable: false
            }
            ,"conteudo": {
                configurable: false
                ,get: function(){
                    return conteudo
                }
                ,set: function(novoConteudo){
                   conteudo = novoConteudo
                                .replace(/\n/g, "<br>")
                                .replace(/\*\*([^\*][^\*]*)\*\*/g, "<b>$1</b>")
                                .replace(/\*([^\*]*)\*/g, "<em>$1</em>")

                    render()
                }
            }
            ,"cor": {
                configurable: false
                ,get: function(){
                    return cor
                }
                ,set: function(novaCor){
                    cor = novaCor
                    render()
                }
            }
        })

        const state = (() => {
            let state = Object.freeze({
                deleted: false
                ,editavel: false
                ,escondido: false
            })

            return function({deleted = state.deleted, editavel = state.editavel, escondido = state.escondido} = {}){
                if(arguments[0]){
                    deleted = !!deleted
                    editavel = !!editavel
                    escondido = !!escondido
                    state = Object.freeze({deleted, editavel, escondido})
                    render()
                }
                return state
            }
        })()

        const render = _render(props, state)

        const cartao = Object.create(props, {
            "getState": {
                value: function(){
                    return state()
                }
                ,configurable: false
                ,writable: false
                ,enumerable: false
            }
            ,"colocaEm": {
                value: function(seletor){
                    let $element = $(seletor)
                    if(seletor){
                        render().appendTo($element)
                    }
                }
                ,configurable: false
                ,writable: false
                ,enumerable: false
            }
            ,"mostra": {
                value: function(){
                    state({escondido: false})
                }
                ,configurable: false
                ,writable: false
                ,enumerable: false
            }
            ,"esconde": {
                value: function(){
                    state({escondido: true})
                }
                ,configurable: false
                ,writable: false
                ,enumerable: false
            }
        })

        return cartao
    }

    function _render(cartao, state){
        function _decideTipoCartao(conteudo){
            let numeroDeQuebrasDeLinha = conteudo.split("<br>").length
            let totalDeLetras = conteudo.replace(/<br>/g, " ").length

            let tamMaiorPalavra = conteudo.replace(/<br>/g, " ")
                                .split(" ")
                                .reduce(function(anterior, palavra){
                                    if(palavra.length > anterior.length) {
                                        return palavra
                                    }
                                    return anterior
                                }).length

            var tipoCartao

            if(tamMaiorPalavra < 9 && numeroDeQuebrasDeLinha < 5 && totalDeLetras < 55) {
                tipoCartao = "cartao--textoGrande"
            } else if(tamMaiorPalavra < 12 && numeroDeQuebrasDeLinha < 6 && totalDeLetras < 75) {
                tipoCartao = "cartao--textoMedio"
            } else {
                tipoCartao = "cartao--textoPequeno"
            }

            return tipoCartao
        }

        function cartaoEstaNaTela ($cartao) {
            if (typeof jQuery === "function" && $cartao instanceof jQuery) {
                $cartao = $cartao[0]
            }

            let rect = $cartao.getBoundingClientRect()

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
            )
        }

        let $cartao = $("<div>")
                        .attr("tabindex", 0)
                        .addClass("cartao")

        let $opcoes = new $Cartao_Opcoes(cartao, state)
                        .on("blur", function(event){
                            $(this).removeClass("cartao--keyboardNavigationEnabled")
                        })
        let $conteudo = new $Cartao_Conteudo(cartao, state)

        $cartao
            .append($opcoes)
            .append($conteudo)
            .on("keydown", function(event){
                if((event.key == "Enter" || event.key == " ") && !state().editavel){
                    if(!event.defaulatPrevented){
                        event.preventDefault()
                        $opcoes.focus()
                    }
                } else if(event.key === "Escape"){
                    $cartao
                      .focus()
                      .blur()
                }
            })
            .on("focusin", function(){
                $cartao.addClass("cartao--keyboardNavigationEnabled")
                if(!cartaoEstaNaTela($cartao)){
                    $cartao[0].scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }
            })
            .on("focusout", function(){
                $cartao.removeClass("cartao--keyboardNavigationEnabled")
            })

        return function(){
            if(state().deleted){
                $cartao.addClass("cartao--some")
                setTimeout(function(){
                    $cartao.detach()
                },400)
            }
            else {
                state().escondido && $cartao.hide() || $cartao.show()
                $cartao
                  .removeClass("cartao--textoPequeno cartao--textoGrande cartao--textoMedio")
                  .addClass(_decideTipoCartao(cartao.conteudo))
                  .css("background-color", cartao.cor)

                $conteudo.attr("contenteditable", state().editavel)
                if(state().editavel){
                    $conteudo.focus()
                }
            }
            return $cartao
        }
    }

    return Cartao
})(jQuery, $Cartao_Opcoes, $Cartao_Conteudo)