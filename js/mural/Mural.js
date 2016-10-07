const Mural = (function(_render, Filtro, LoginUsuario){
    "use strict"
    let cartoes = []
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto})
    render()
    Filtro.on("filtrado", render)

    function adiciona(cartao){
        if(LoginUsuario.logado){
            cartoes.push(cartao)
            cartao.on("mudanca.**", render)
            render()
            return true
        } else {
            return false
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro, LoginUsuario)
