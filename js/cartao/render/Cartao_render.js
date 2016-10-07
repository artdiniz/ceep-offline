const Cartao_render = (function($, CartaoOpcoes_render, CartaoConteudo_render, helpers){
    return function (globalProps){
        const $cartao = $("<div>")

        const opcoes_render = CartaoOpcoes_render(globalProps)
        const coteudo_render = CartaoConteudo_render(globalProps)

        const $opcoes = opcoes_render()
        const $conteudo = coteudo_render()

        $cartao
            .append($opcoes)
            .append($conteudo)

        return function(props = {}, state = {}, handlers = {}){
            opcoes_render(props, state, handlers)
            coteudo_render(props, state, handlers)

            $cartao
                .removeClass("cartao--textoPequeno cartao--textoGrande cartao--textoMedio")
                .addClass(helpers.decideTipoCartao(props.conteudo))
                .addClass("cartao")
                .css("background-color", props.tipo.cor)
                .removeClass("cartao--keyboardNavigationEnabled")
                .attr("tabindex", !state.navegavel ? 0 : -1)

            if(state.navegavel){
                $cartao.addClass("cartao--keyboardNavigationEnabled")
                if(!helpers.cartaoEstaNaTela($cartao)){
                    $cartao[0].scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }
            }

            if(state.focado){
                $cartao.focus()
            } else {
                $cartao.blur()
            }

            $cartao
                .off()
                .on("keydown", function(event){
                    if((event.key === "Enter" || event.key === " ") && !state.editavel){
                        if(!event.isDefaultPrevented()){
                            event.preventDefault()
                            $(this).trigger("navegacaoInicia")
                        }
                    } else if(event.key === "Escape"){
                        $(this).trigger("navegacaoTermina")
                    }
                })
                .on("click", function(event){
                    if(!state.navegavel){
                        $(this).trigger("navegacaoInicia")
                    }
                })
                .on("mouseleave", function(){
                    if(!state.editavel){
                        $(this).trigger("navegacaoTermina")
                    }
                })
                .on("navegacaoInicia", function(){
                    handlers.onNavegacaoInicia()
                })
                .on("navegacaoTermina", function(){
                    handlers.onNavegacaoTermina()
                })

            return $cartao
        }
    }
})(jQuery, CartaoOpcoes_render, CartaoConteudo_render, Cartao_renderHelpers)