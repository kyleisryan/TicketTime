$(document).ready(function(){
	alert("this script is being called");
	$("registerButton").click(function(){
		//add ajax request for firebase here
		var database = firebase.database();
        var ref = database.ref('Employees');
        var firstName = $("inputFirstName").val();
        var lastName = $("inputLastName").val();
        var password = $("inputPassword").val();
        var passwordConfirm = $("confirmPassword").val();
        var employeeID = null; //need to get most recent id and add 1 to it
        if(password === passwordConfirm){
        	//submit shit to firebase
        } else {
        	alert("Passwords do not match");
        }
	});
});