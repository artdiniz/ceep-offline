(function($, Mural){
	"use strict"
	$("#pegaInfo").click(function(){
		$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes", function(res){
				console.log(res)
				res.instrucoes.forEach(function(instrucao){
					Mural.adiciona(new Cartao(instrucao.conteudo, instrucao.cor))
				})
		})
	})
})(jQuery, Mural)
