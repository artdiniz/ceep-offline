const Mural = (function(){

    let cartoes = []

    function adiciona(cartao){
        cartoes.push(cartao)
        cartao.colocaEm(".mural")
    }

    function filtraCartoes({texto, tags}){
        let digitouTagEPalavra = tags.length > 0 && texto.trim().length > 0
        let digitouApenasTag = tags.length > 0 && texto.trim().length == 0
        let digitouApenasPalavra = tags.length == 0 && texto.trim().length > 0

        let cartoesVisiveis = cartoes.filter(function(cartao){
            return !cartao.getState().deleted
        })

        if(texto.length || tags.length){
            cartoesVisiveis
              .forEach(cartao => cartao.esconde())

            cartoesVisiveis
              .filter(cartao => {
                  let conteudo = cartao.conteudo.replace(/<br>/g, "\n")
                  let temPalavrasDaBusca = conteudo.match(new RegExp(texto || null, "i"))
                  let numeroDeTagsComMatch = _.extraiTags(conteudo).reduce(function(numeroDeTagsComMatch, tag){
                      tags.indexOf(tag) >= 0 && numeroDeTagsComMatch++
                      return numeroDeTagsComMatch
                  }, 0)
                  let temTagsDaBusca = numeroDeTagsComMatch == tags.length
                  if(digitouTagEPalavra) {
                      return temTagsDaBusca && temPalavrasDaBusca
                  } else if(digitouApenasTag) {
                      return temTagsDaBusca
                  } else if(digitouApenasPalavra) {
                      return temPalavrasDaBusca
                  }
              })
              .forEach(cartao => cartao.mostra())
        } else{
            cartoesVisiveis
              .forEach(cartao => cartao.mostra())
        }
    }

    return Object.create({}, {
        adiciona: {
            configurable: false
            ,value: adiciona
        }
        ,filtraCartoes: {
            configurable: false
            ,value: filtraCartoes
        }
        ,getCartoes: {
            configurable: false
            ,value: () => cartoes.filter(cartao => !cartao.getState().deleted)
        }
    })
})()
