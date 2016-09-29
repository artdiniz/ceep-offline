const Mural = (function(){
    "use strict"

    let cartoes = []

    function adiciona(cartao){
        cartoes.push(cartao)
        cartao.colocaEm(".mural")
    }

    function filtraCartoes(filtro){
        let cartoesVisiveis = cartoes.filter(cartao => {
            return !cartao.getState().deleted
        })

        cartoesVisiveis.forEach(cartao => cartao.esconde())

        let cartoesFiltrados = cartoesVisiveis.filter(filtro)
        
        cartoesFiltrados.forEach(cartao => cartao.mostra())
    }

    return Object.seal({
        adiciona
        ,filtraCartoes
    })
})()
