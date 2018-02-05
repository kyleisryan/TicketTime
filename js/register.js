$(document).ready(function(){
	$('#registerButton').click(function(){
		var database = firebase.database();
		var empRef = database.ref('Employees');
		var firstName = $('#inputFirstName').val();
		var lastName = $('#inputLastName').val();
		var email = $('#inputEmail').val();
		var password = $('#inputPassword').val();
		var confirmPassword = $('#confirmPassword').val();
		var employeeID = "";

		if(firstName != "" && lastName != "" && email != ""
			&& password != "" && confirmPassword != ""){

			if(password.length > 7){

				if(password === confirmPassword){

					firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
						alert("Creating Account");
						var errorCode = error.code;
						var errorMessage = error.message;
						console.log(errorMessage);
						if (errorCode == 'auth/weak-password') {
						    alert('The password is too weak.');
						} else {
						    alert(errorMessage);
						}
					}).then(function(user){
						alert("Account Created");
						window.location = "index.html"
						}).catch(function(error){
						console.log(error);
					});

					
				} else {
					alert("Passwords do not match");
				}
			} else {
				alert("Password must be at least 8 characters");
			}
			//console.log(employeeID);
		} else {
			alert("Form Incomplete");
		}
	});
});