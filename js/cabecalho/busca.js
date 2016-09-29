const Busca = (function($, Mural, Tags){
	"use strict"

	let buscaTags = [];
	let buscaTxt = "";

	$("#busca").on("input", function(){
		buscaTags = Tags.extraiTags($(this).val())
		buscaTxt = $(this).val().split(" ").filter(function(palavra){
			return buscaTags.indexOf(palavra) < 0
		}).join(" ")

		let digitouTagEPalavra = buscaTags.length > 0 && buscaTxt.trim().length > 0
		let digitouApenasTag = buscaTags.length > 0 && buscaTxt.trim().length == 0
		let digitouApenasPalavra = buscaTags.length == 0 && buscaTxt.trim().length > 0

		Mural.filtraCartoes(cartao => {
			if(buscaTxt.length || buscaTags.length){
				let conteudo = cartao.conteudo.replace(/<br>/g, "\n")
				let temPalavrasDaBusca = conteudo.match(new RegExp(buscaTxt || null, "i"))
				let numeroDeTagsComMatch = Tags.extraiTags(conteudo).reduce(function(numeroDeTagsComMatch, tag){
					buscaTags.indexOf(tag) >= 0 && numeroDeTagsComMatch++
					return numeroDeTagsComMatch
				}, 0)
				let temTagsDaBusca = numeroDeTagsComMatch == buscaTags.length
				if(digitouTagEPalavra) {
					return temTagsDaBusca && temPalavrasDaBusca
				} else if(digitouApenasTag) {
					return temTagsDaBusca
				} else if(digitouApenasPalavra) {
					return temPalavrasDaBusca
				}
			} else{
				return true
			}
		})

	})

	return Object.seal({
		tags: () => buscaTags
		,texto: () => buscaTxt
	})
})(jQuery, Mural, Tags)
