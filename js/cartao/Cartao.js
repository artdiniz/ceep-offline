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
        function renderOnFinish(fn){
            return function(){
                fn.apply(this, arguments)
                render(props, state, handlers)
            }
        }

        let props = Object.freeze({
            id: autoIncrement()
            ,conteudo
            ,tipo
        })

        function setProp(name, value){
            const novoProps = {
                "conteudo": ((conteudo) => {
                    conteudo = conteudo
                                .replace(/\n/g, "<br>")
                                .replace(/\*\*([^\*][^\*]*)\*\*/g, "<b>$1</b>")
                                .replace(/\*([^\*]*)\*/g, "<em>$1</em>")
                    return conteudo
                })(name === "conteudo" && value || props.conteudo)
                ,"tipo": ((tipo) => {
                    return tipo
                })(name === "tipo" && value || props.tipo)
            }

            props = Object.freeze({id: props.id, conteudo: novoProps.conteudo, tipo: novoProps.tipo})
        }

        let state = Object.freeze({
            deletado: false
            ,editavel: false
            ,navegavel: false
            ,focado: false
        })

        function setState({navegavel, editavel, deletado, focado}){
            state = Object.freeze({navegavel, editavel, deletado, focado})
        }

        const handlers = {
            "onNavegacaoInicia": renderOnFinish(() => {
                setState({navegavel: true, editavel: false, deletado: state.deletado, focado: false})
            })
            ,"onNavegacaoTermina": renderOnFinish(() => {
                if(state.navegavel){
                    setState({navegavel: false, editavel: false, deletado: state.deletado, focado: true})
                } else {
                    setState({navegavel: false, editavel: false, deletado: state.deletado, focado: false})
                }
            })
            ,"onMudancaDeTipo": renderOnFinish((tipo) => {
                setProp("tipo", tipo)
                setState({navegavel: true, editavel: false, deletado: state.deletado, focado: false})
                cartao.emit("mudanca.props.tipo")
            })
            ,"onEdicaoCompleta": renderOnFinish((conteudo) => {
                setProp("conteudo", conteudo)
                setState({navegavel: true, editavel: false, deletado: state.deletado, focado: false})
                cartao.emit("mudanca.props.conteudo")
            })
            ,"onDeleta": renderOnFinish(() => {
                setState({navegavel: false, editavel: false, deletado: true, focado: false})
                cartao.emit("mudanca.state.deletado")
            })
            ,"onAtivaEdicao": renderOnFinish(() => {
                setState({navegavel: true, editavel: true, deletado: state.deletado, focado: false})
            })
        }

        const cartao = Object.create(new EventEmitter({wildcard: true}), {
           "id": {
               get: () => props.id
           }
           ,"conteudo": {
               get: () => props.conteudo
           }
           ,"tipo": {
               get: () => props.tipo
           }
           ,"node": {
               value: render(props, state, handlers)
           }
           ,"getState": {
               value: () => state
           }
        })

        return cartao
    }

    return Cartao
})(Cartao_render, EventEmitter2)