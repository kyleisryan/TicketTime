$(document).ready(function(){
	firebase.auth().onAuthStateChanged(function(user){

		var loginPage = "file:///C:/Users/Kyle/ticketWebApp/login.html";
		var currentPage = window.location.href;

		if(user){

		} else {
			if(currentPage != loginPage){
				window.location.href = "login.html"
			}
		}
	});
});