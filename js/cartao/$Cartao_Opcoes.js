const $Cartao_Opcoes = (function(){
    "use strict"
    let Navigation = new KeyBoardNavigation({
        "Enter": iterator => null
        ," ": iterator => null
        ,"ArrowLeft": iterator => iterator.previous()
        ,"ArrowUp": iterator => iterator.previous()
        ,"ArrowRight": iterator => iterator.next()
        ,"ArrowDown": iterator => iterator.next()
        ,"Tab": iterator => iterator.next()
        ,"Shift+Tab": iterator => iterator.previous()
    })

    function $Cartao_Opcoes(cartao, state){
        let keyboardNavigation = new Navigation()

        let $opcoes = $("<div>")
                        .addClass("opcoesDoCartao")
                        .attr("tabindex", -1)

        let $botaoRemove = $("<button>")
                             .addClass("opcoesDoCartao-remove")
                             .addClass("opcoesDoCartao-opcao")
                             .attr("tabindex", -1)
                             .text("Remover")
                             .on("click", function (){
                                state({deleted: true})
                             })
        keyboardNavigation.push($botaoRemove)

        let $botaoEdita = $("<button>")
                             .addClass("opcoesDoCartao-edita")
                             .addClass("opcoesDoCartao-opcao")
                             .attr("tabindex", -1)
                             .text("Editar")
                             .click(function _ativaEdicao(){
                                state({editavel: true})
                             })
        keyboardNavigation.push($botaoEdita)

        let cores = [
             {nome: "Padrão", codigo:"#EBEF40"}
            ,{nome: "Importante", codigo:"#F05450"}
            ,{nome: "Tarefa", codigo:"#92C4EC"}
            ,{nome: "Inspiração", codigo:"#76EF40"}
        ]

        let $opcoesDeCor = cores.map(function(cor){
            let idInputCor = "cor" + cor.nome + "-cartao" + cartao.id

            let $inputCor = $("<input>")
                             .attr("type","radio")
                             .val(cor.codigo)
                             .attr("id", idInputCor)
                             .attr("name", "corDoCartao-" + cartao.id)
                             .addClass("opcoesDoCartao-radioCor")
                             .attr("checked", cor.codigo === cartao.cor)

            let $labelCor = $("<label>")
                             .css("color", cor.codigo)
                             .attr("for", idInputCor)
                             .attr("tabindex", -1)
                             .addClass("opcoesDoCartao-cor")
                             .addClass("opcoesDoCartao-opcao")
                             .text(cor.nome)

            keyboardNavigation.push($labelCor)

            let $frag = $(document.createDocumentFragment())

            return $frag
                     .append($inputCor)
                     .append($labelCor)
        })

        $opcoes.on("keydown", ".opcoesDoCartao-opcao", function(event){
            if(event.key === "Enter" || event.key === " "){
                $(this).trigger("click")
            }
        })

        $opcoes.on("change", ".opcoesDoCartao-radioCor", function(event){
            let cor = $(event.target)
            cartao.cor = cor.val()
        })

        $opcoes.on("focus", function(){
            keyboardNavigation.init()[0].focus()
        })

        $opcoes.on("keydown", ".opcoesDoCartao-opcao", function(event){
            let $opcao = keyboardNavigation.navigate(event)
            if($opcao !== false){
                event.preventDefault()
                event.stopPropagation()
                if($opcao !== null) {
                    $opcao.focus()
                }
            }
        })

        return $opcoes
                 .append($botaoRemove)
                 .append($botaoEdita)
                 .append($opcoesDeCor)
    }

    return $Cartao_Opcoes
})()
