$(document).ready(function(){

	var database = firebase.database();
	var ticketRef = database.ref('TicketSystem/Ticket');
	var user;
	var tickets;
	var ticketID;
	var customer;
	var contactInfo;
	var employeeID;
	var shortDescription;
	var description;
	var location;
	var scope;
	var impact;
	var status;
	var severity;
	var openDate;
	var closeDate;
	var resolution;

	ticketRef.once("value", function(data){

		tickets = data.val();
		//console.log(tickets);

		//Populates Edit Form
		$('#editButton').click(function(){

			$('#editModal').modal('show');

			ticketID = $('.focus').attr('id');
			//childKey = need to grab childKey where ticketID

			$.each(tickets, function(i, item){

				if(tickets[i].ticketID == ticketID){

					$('#ticketID').html("<h3>Ticket ID: " + tickets[i].ticketID + "</h3>");
					$('#customerName').val(tickets[i].customer);
					$('#shortDescription').val(tickets[i].shortDescription);
					$('#employeeID').val(tickets[i].employeeID);
					$('#openDate').val(tickets[i].openDate.slice(0,15));
					$('#closeDate').val(tickets[i].closeDate.slice(0,15));
					$('#status').val(tickets[i].status);
					$('#contactInfo').val(tickets[i].contactInfo);
					$('#location').val(tickets[i].location);
					$('#scope').val(tickets[i].scope);
					$('#impact').val(tickets[i].impact);
					$('#description').val(tickets[i].description);

				}
			});
		});

		//Modal Close
		$('#closeBtn1').click(function(){
			console.log("clicked");
			$('#editModal').modal('hide');
		});

		//Modal Close 
		$('#closeBtn2').click(function(){
			console.log("clicked");
			$('#editModal').modal('hide');
		});

		//Delete Ticket
		$('#deleteButton').click(function(){

			ticketID = $('.focus').attr('id');

			//Loop cycles through child keys of tickets and matches ticket id
			for (var key in tickets){

				if(tickets[key].ticketID == ticketID){
					alert("Ticked Deleted");
					ticketRef.child(key).remove();
					$('.focus').remove();
				}
			}
		});

		//Update Ticket
		$('#ticketSubmit').click(function(e){
			e.preventDefault();

			customer = $('#customerName').val();
			contactInfo = $('#contactInfo').val();
			employeeID = $('#employeeID').val();
			shortDescription = $('#shortDescription').val();
			description = $('#description').val();
			location = $('#location').val();
			scope = $('#scope').val();
			impact = $('#impact').val();
			status = $('#status').val();
			severity = +scope + +impact;
			openDate = $('#openDate').val();
			closeDate = $('#closeDate').val();
			resolution = $('#resolution').val();

			for (var key in tickets){

				if(tickets[key].ticketID == ticketID){

					database.ref('TicketSystem/Ticket/' + key).set({
						ticketID : ticketID,
						customer : customer,
						contactInfo : contactInfo,
						employeeID : employeeID,
						shortDescription : shortDescription,
						description : description,
						location : location,
						scope : scope,
						impact : impact,
						status : status,
						severity : severity,
						openDate : openDate,  
						closeDate : closeDate,
						resolution : resolution
					});

					alert("Ticket Updated");
					window.location.reload();
				}
			}
		});

		//Resolve Ticket
		$('#ticketResolve').click(function(e){
			e.preventDefault();

			resolution = $('#resolution').val();

			if(resolution == ""){

				alert("Resolution notes are empty");

			} else {

				customer = $('#customerName').val();
				contactInfo = $('#contactInfo').val();
				employeeID = $('#employeeID').val();
				shortDescription = $('#shortDescription').val();
				description = $('#description').val();
				location = $('#location').val();
				scope = $('#scope').val();
				impact = $('#impact').val();
				status = "closed"
				severity = +scope + +impact;
				openDate = $('#openDate').val();
				closeDate = Date();

				for (var key in tickets){

					if(tickets[key].ticketID == ticketID){

						database.ref('TicketSystem/Ticket/' + key).set({
							ticketID : ticketID,
							customer : customer,
							contactInfo : contactInfo,
						    employeeID : employeeID,
						    shortDescription : shortDescription,
						    description : description,
						    location : location,
						    scope : scope,
						    impact : impact,
						    status : status,
						    severity : severity,
						    openDate : openDate,  
						    closeDate : closeDate,
						    resolution : resolution
					    });

					    alert("Ticket Resolved");
					    window.location.reload();
				    }
			    }
			}
		});
	});
});