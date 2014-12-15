$( document ).ready(function() {
    console.log( "ready!" );


});
// ======================================
// all this is clearing the page after the user presses the 
// page button to bring up the knowledge map
// just rearranging and hiding alot of elements
// ======================================
$( "#Knpagebtn" ).click(function() {
  $( "#Knheader" ).animate({
    height: 0
  }, 200, function() {
    // Animation complete.
  });
});



$( "#Knpagebtn" ).click(function() {
  $( "#Knshowme" ).animate({
    opacity: 0,
  }, 200, function() {
    // Animation complete.
    $("#Knshowme").hide()
  });
});

$( "#Knpagebtn" ).click(function() {
  $( "#Knabout" ).animate({
    opacity: 0,
  }, 200, function() {
    // Animation complete.
    $("#Knabout").hide()
  });
});



