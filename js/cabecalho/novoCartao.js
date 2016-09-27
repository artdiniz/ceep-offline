(function($, Mural, Cartao){
	"use strict"

	$(".novoCartao").submit(function(event){
		event.preventDefault()
		let $campoConteudo = $(".novoCartao-conteudo")
		let conteudo = $campoConteudo.val().trim()
		if(conteudo){
			let novoCartao = new Cartao(conteudo)
			if(Mural.adiciona(novoCartao)){
				$campoConteudo.val("")
			}
		}
	})

	let tagsPadrao = []

	$(".novoCartao").on("adicionaTagPadrao", function(event, tagsNovas){
		tagsPadrao = tagsNovas
	})

	$(".novoCartao-conteudo").on("focus", function(){
		let $campoConteudo = $(this)
		let tagsAntigas = _.extraiTags($campoConteudo.val())
		let tagsToRemoveRegex = $campoConteudo.val().split(/[\s\n]/).filter(function(palavra){
			return palavra && tagsAntigas.indexOf(palavra) >= 0
		}).join("|")
		let txt = $campoConteudo.val().replace(new RegExp(tagsToRemoveRegex,"g"), "").trim()
		let tags = tagsPadrao.reduce(function(txt,tag){
			return txt + "\n" + tag
		},"")
		$campoConteudo.val(tags && (txt + "\n" + tags))
	})
})(jQuery, Mural, Cartao)
