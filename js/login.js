$(document).ready(function(){
	$('#loginButton').click(function(){

		var database = firebase.database();
		const auth = firebase.auth();
		var empRef = database.ref('Employees');
		var email = $('#inputEmail').val();
		var password = $('#inputPassword').val();

		if(email == "" || password == ""){

			alert("Please fill in both fields");

		} else {

			const promise = auth.signInWithEmailAndPassword(email, password).catch(function(error){
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
				alert("Invalid email or password");
			});

			auth.onAuthStateChanged(firebaseUser => {

				if(firebaseUser) {
					window.location.href = "index.html";
				}

			});
			/*
			//The JSON way
			empRef.once('value').then(function(data){

				var employee = data.val();

				$.each(employee, function(i, item){
					if(employee[i].username === username
					&& employee[i].password === password){
						console.log("Authenticated");
						authenticated = true;
						return false;
					} else {
						console.log("Invalid Credentials");
					}
				});
				console.log(authenticated);
				if(authenticated === true){
					console.log("Page Loaded");
					window.location.href = "index.html";
				}
			});
			*/
		}
	});
});