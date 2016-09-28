const LoginUsuario = (function(_render){

    let logado = JSON.parse(localStorage.getItem("logado")) || false
    let usuario = localStorage.getItem("usuario") || ""

    _render({
        logado: logado
        ,usuario: usuario
        ,validacao: function(usuarioDigitado){
            return usuarioDigitado.match(/@/)
        }
        ,onLogin: function(novoUsuario){
            logado = true
            localStorage.setItem("logado", true)
            localStorage.setItem("usuario", novoUsuario) 
        }
        ,onLogout: function(){
            logado =  false
            localStorage.setItem("logado", false)
            localStorage.removeItem("usuario")
        }
    })

    return {
        logado: () => logado
    }

})(LoginUsuario_render)