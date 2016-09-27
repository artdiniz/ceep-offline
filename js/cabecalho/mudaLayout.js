(function($){
	"use strict"

	document.querySelector("#mudaLayout").addEventListener("click", function(){
		let mural = document.querySelector(".mural")

		mural.classList.toggle("muralLinha")

		if(mural.classList.contains("muralLinha")){
			this.textContent = "Blocos"
		} else {
			this.textContent = "Linhas"
		}
	})
})(jQuery)
