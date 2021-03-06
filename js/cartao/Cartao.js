const Cartao = (function(_render, EventEmitter){
    "use strict"

    const autoIncrement = (function(){
        let id = 0
        return function(){
            return id++
        }
    })()

    const globalProps = {
        tipos: {
             padrao: {nome: "Padrão", cor: "#EBEF40"}
            ,importante: {nome: "Importante", cor: "#F05450"}
            ,tarefa: {nome: "Tarefa", cor: "#92C4EC"}
            ,inspiracao: {nome: "Inspiração", cor: "#76EF40"}
        }
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
           }
           ,"conteudo": {
               get: () => state.conteudo
           }
           ,"tipo": {
               get: () => state.tipo
           }
           ,"node": {
               value: render(props, state, handlers)
           }
        })

        return cartao
    }

    return Cartao
})(Cartao_render, EventEmitter2)