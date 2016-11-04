const Mural = (function(_render, Filtro, LoginUsuario, TiposCartao){
    "use strict"
    let cartoes = pegaCartoesUsuario()
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto})

    cartoes.forEach(preparaCartao)
    render()

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

    function preparaCartao(cartao){
        cartao.on("mudanca.**", render)
        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("mudanca.conteudo", () => {
            const imagens = Cartao.pegaImagens(cartao)
            cacheiaImagens(imagens)
        })
        cartao.on("remocao", ()=>{
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao),1)
            salvaCartoes()
            render()
        })
        cacheiaImagens(Cartao.pegaImagens(cartao))
    }

    function salvaCartoes (){
        localStorage.setItem(LoginUsuario.usuario(), JSON.stringify(
            cartoes.map(cartao => ({conteudo: cartao.conteudo, tipo: Object.keys(TiposCartao).map(key => TiposCartao[key]).indexOf(cartao.tipo)}))
        ))
    }

    function cacheiaImagens(imagens){
        if(imagens){
            imagens
                .map(img => new Request(img, {mode: 'no-cors'}))
                .forEach(request => {
                    fetch(request).then(response => caches.open("ceep-images").then(function(cache){
                        return cache.put(request, response)
                    }))
                })
        }
    }

    LoginUsuario.on("login", ()=>{
        cartoes = pegaCartoesUsuario()
        cartoes.forEach(preparaCartao)
        render()
    })

    LoginUsuario.on("logout", ()=> {
        cartoes = []
        render()
    })

    function adiciona(cartao){
        if(LoginUsuario.logado()){
            cartoes.push(cartao)
            preparaCartao(cartao)
            salvaCartoes()
            render()
            return true
        } else {
            alert("Você não está logado")
            return false
        }
    }

    Filtro.on("filtrado", render)

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro, LoginUsuario, TiposCartao)

