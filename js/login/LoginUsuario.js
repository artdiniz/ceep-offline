const LoginUsuario = (function(EventEmitter){
    let logado = !!localStorage.getItem("logado")
    let usuario = localStorage.getItem("nomeUsuario")

    let emitter = new EventEmitter();

    LoginUsuario_render({
        logado: logado
        ,usuario: usuario
        ,onLogin: (novoUsuario) =>{
            logado = true
            localStorage.setItem("logado", true)
            usuario =  novoUsuario
            localStorage.setItem("nomeUsuario", novoUsuario)
            emitter.emit("login")
        }
        ,onLogout: () => {
            logado = false
            localStorage.removeItem("logado")
            usuario =  null
            localStorage.removeItem("nomeUsuario")
            emitter.emit("logout")
        }
    })

    return Object.create(emitter, {
        logado: {
            value: () => logado
        }
        ,usuario: {
            value: () => usuario
        }
    })

})(EventEmitter2)

