const Mural_render = (function($){
    "use strict"
    const $mural = $(".mural")
    let currentCartoes = [];

    return function render({cartoes, filtro = (() => true)}){
        const cartoesVisiveis = currentCartoes.filter(cartao => !cartao.getState().deletado)
        const cartoesDeletados = currentCartoes.filter(cartao => cartao.getState().deletado)
        currentCartoes = cartoes

        cartoesDeletados.forEach(cartao => {
            const $cartao = cartao.node
            $cartao.addClass("cartao--some")
            setTimeout(function(){
                $cartao.detach()
            }, 400)
        })

        cartoesVisiveis
        .forEach(cartao => {
            const $cartao = cartao.node
            $cartao.detach()
            $cartao.removeClass("cartao--some")
        })

        cartoesVisiveis
        .filter(filtro)
        .forEach(cartao => {
            const $cartao = cartao.node
            $cartao.appendTo($mural)
        })
    }
})(jQuery)