//This script when linked to will enable the front page
//
//
$( document ).ready(function() { 

	//user obviously has us loaded at this point so time to show the front page
	$(".frontpagewrapper").show()
	

	//===============================================
	//Front page clear
	//===============================================
	$("#Knpagebtn").click(function() {

	Knclearfront();
	});


	// ======================================
	// all this is clearing the page after the user presses the 
	// page button to bring up the knowledge map
	// just rearranging and hiding elements
	// ======================================
	var Knclearfront = function () {


	$( "#Knheader" ).animate({
	  height: 0
	}, 200, function() {
	  // Animation complete.
	  $("#Knheader").hide();
	});



	$( "#Knaboutrow" ).animate({
	  opacity: 0,
	}, 200, function() {
	  // Animation complete.
	  $("#Knaboutrow").hide();
	});

	// all of the knowledge page is contained in this element
	$("#Knpgcontent").show();

	};




});
