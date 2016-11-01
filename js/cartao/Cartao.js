const Cartao = (function(_render, EventEmitter, TiposCartao){
    "use strict"

    const autoIncrement = (function(){
        let id = 0
        return function(){
            return id++
        }
    })()

    const globalProps = {
        tipos: TiposCartao
    }

    function Cartao(conteudo, tipo = globalProps.tipos.padrao){

        const render = _render(globalProps)
        function renderAfter(fn){
            return function(){
                fn.apply(this, arguments)
                render(props, state, handlers)
            }
        }

        const props = Object.freeze({
            id: autoIncrement()
        })

        let state

        function setState({conteudo = state.conteudo, tipo = state.tipo, navegavel, editavel, deletado = state.deletado, focado}){
            const imageURL = conteudo.match(/\!\[(.+?)\]\((.+?)\)/) && conteudo.match(/\!\[(.+?)\]\((.+?)\)/)[2]
            if(imageURL){
                fetch(new Request(imageURL, {mode: 'no-cors'})).then(function(response){
                    caches.open("ceep-v1").then(function(cache){
                        return cache.put(imageURL, response)
                    }).then(function(){
                        console.log("cacheei")
                    })
                })
            }
            navegavel = !!navegavel
            editavel = !!editavel
            deletado = !!deletado
            focado = !!focado
            state = Object.freeze({conteudo, tipo, navegavel, editavel, deletado, focado})
        }

        setState({
            conteudo
            ,tipo
            ,deletado: false
            ,editavel: false
            ,navegavel: false
            ,focado: false
        })

        const handlers = {
            "onNavegacaoInicia": renderAfter(() => {
                setState({navegavel: true, editavel: false, focado: false})
            })
            ,"onNavegacaoTermina": renderAfter(() => {
                if(state.navegavel){
                    setState({navegavel: false, editavel: false, focado: true})
                } else {
                    setState({navegavel: false, editavel: false, focado: false})
                }
            })
            ,"onMudancaDeTipo": renderAfter((tipo) => {
                setState({tipo: tipo, navegavel: true, editavel: false, focado: false})
                cartao.emit("mudanca.tipo")
            })
            ,"onEdicaoCompleta": renderAfter((conteudo) => {
                setState({conteudo: conteudo, navegavel: true, editavel: false, focado: false})
                cartao.emit("mudanca.conteudo")
            })
            ,"onDeleta": renderAfter(() => {
                setState({navegavel: false, editavel: false, deletado: true, focado: false})
                cartao.emit("remocao")
            })
            ,"onAtivaEdicao": renderAfter(() => {
                setState({navegavel: true, editavel: true, focado: false})
            })
        }

        const cartao = Object.create(new EventEmitter({wildcard: true}), {
           "id": {
               value: props.id
               ,enumerable: true
           }
           ,"conteudo": {
               get: () => state.conteudo
               ,enumerable: true
           }
           ,"tipo": {
               get: () => state.tipo
               ,enumerable: true
           }
           ,"node": {
               value: render(props, state, handlers)
           }
        })

        return cartao
    }

    return Cartao
})(Cartao_render, EventEmitter2, TiposCartao)