$( document ).ready(function() {
    console.log( "ready!" );

    $( "#Knpagebtn" ).click(function() {

      Knclearfront();
    });

    var blacksmithing = new Kncategory("blacksmithing")
    console.log(blacksmithing)
    

});

// ====================================================
// This is the category class  each category takes up
// a bootstrap pannel
// ====================================================
function Kncategory(name) {
  this.name = name;




};


var Knclearfront = function () {
// ======================================
// all this is clearing the page after the user presses the 
// page button to bring up the knowledge map
// just rearranging and hiding elements
// ======================================

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





