$( document ).ready(function() {
    console.log( "ready!" );

    $( "#Knpagebtn" ).click(function() {

      Knclearfront();
    });

    

    var $myclass = new Kncategory("Blacksmithing");
    console.log($myclass.name);

});

// ====================================================
// This is the category class  each category takes up
// a bootstrap pannel
// ====================================================
function Kncategory(name) {
  this.name = name;
  catname = "kncategory"+ name;
  
  panelid = name +"panel";
  panelheadingid = name +"panelheading";
  panelbodyid = name +"panelbody"


    //have to figure out how to do this dryer
    // maybe just insert the first part of the category then continue 
    //to add pieces until its complete
    //also need to check if the category exist
    $('#knpgheader').after(function () {
       
      //add the base element panel 
      var $insert = new $("<div class='col-md-4 "+ catname +" id="+ name +"'></div>");
      
      //fill out the category
      $($insert).append("<div class='panel panel-default "+ catname +" id="+ panelid+"'></div>");
      // $().append("<div class='panel-heading "+ catname +" id=" +panelheadingid+"'>"+name+"</div>");
      // $('#'+ panelheadingid).after("<div class='panel-body "+ catname +"id="+panelbodyid+">tempytemp</div>");



       //add edit and delete buttons
       
       //label it with its name and date

       // initialize it with an unordered list



       //return it to the after function
       return $insert

    });
  


  

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





