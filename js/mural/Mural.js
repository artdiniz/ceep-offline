const Mural = (function(_render, Filtro, LoginUsuario, TiposCartao){
    "use strict"
    let cartoes = []

    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto})
    Filtro.on("filtrado", render)

    pegaCartoesUsuario().forEach(adiciona)

    Filtro.on("filtrado", render)

    function pegaCartoesUsuario(){
        if(LoginUsuario.logado()){
            let cartoesLocal = JSON.parse(localStorage.getItem(LoginUsuario.usuario()))
            if(cartoesLocal){
                return cartoesLocal.map(
                    cartaoLocal => new Cartao(cartaoLocal.conteudo, Object.keys(TiposCartao).map(key => TiposCartao[key])[cartaoLocal.tipo])
                )
            }
        }
        return []
    }

    function salvaCartoes (){
        localStorage.setItem(LoginUsuario.usuario(), JSON.stringify(
            cartoes.map(cartao => ({conteudo: cartao.conteudo, tipo: Object.keys(TiposCartao).map(key => TiposCartao[key]).indexOf(cartao.tipo)}))
        ))
    }

    LoginUsuario.on("login", ()=>{
        pegaCartoesUsuario().forEach(adiciona)
        render()
    })

    LoginUsuario.on("logout", ()=> {
        cartoes = []
        render()
    })

    function adiciona(cartao){
        if(LoginUsuario.logado()){
            cartoes.push(cartao)
            cartao.on("mudanca.**", render)
            cartao.on("mudanca.**", salvaCartoes)
            cartao.on("remocao", ()=>{
                cartoes = cartoes.slice(0)
                cartoes.splice(cartoes.indexOf(cartao),1)
                salvaCartoes()
                render()
            })
            salvaCartoes()
            render()
            return true
        } else {
            alert("Você não está logado")
            return false
        }
    }

    return Object.seal({
        adiciona
    })


})(Mural_render, Filtro, LoginUsuario, TiposCartao)

