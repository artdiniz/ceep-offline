(function($, Mural){
	"use strict"

	$("#busca").on("input", function(){
		let buscaTags = _.extraiTags($(this).val())
		let buscaTxt = $(this).val().split(" ").filter(function(palavra){
			return buscaTags.indexOf(palavra) < 0
		}).join(" ")

		Mural.filtraCartoes({
			tags: buscaTags
			,texto: buscaTxt
		})
	})
})(jQuery, Mural)
