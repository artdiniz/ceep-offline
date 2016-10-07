const LoginUsuario = (function(){

    let logado = !!localStorage.getItem("logado")
    let usuario = localStorage.getItem("usuario")

    LoginUsuario_render({
        logado: logado
        ,usuario: usuario
        ,onLogin: (novoUsuario) =>{
            logado = true
            localStorage.setItem("logado", true)
            usuario =  novoUsuario
            localStorage.setItem("usuario", novoUsuario)
        }
        ,onLogout: () => {
            logado = false
            localStorage.removeItem("logado")
            localStorage.removeItem("usuario")
        }
    })

    return {
        logado: () => logado
    }

})()