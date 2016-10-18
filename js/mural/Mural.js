const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = []
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto})
    render()
    Filtro.on("filtrado", render)

    function adiciona(cartao){
        if(logado){
            cartoes.push(cartao)
            cartao.on("mudanca.**", render)
            render()
            return true
        } else {
            alert("Você não está logado")
        }

    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
