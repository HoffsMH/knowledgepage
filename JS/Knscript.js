$( document ).ready(function() {

  //make console a little more verbose about what im trying to 
  //do to figure stuff out
  debug = false;

  //global array of categories
  var $kncategories = []



  //===============================================
  //Front page clear
  //===============================================
  $("#Knpagebtn").click(function() {

    Knclearfront();
  });
  

  //=============================================
  //kn page basic functions
  //=============================================

  //errorline output
  //still working out how to use closures see persistenttimer()
  
  function knerrorline (errorstr) {

    var errordiv = "#knerrorline"
    var texthidestring = 
    "$('" + errordiv + "').animate(" +
      "{opacity: 0},"+
      " 1000," + 
      " function()" +
      "{$('"+ errordiv + "').text('')"+
      ";$('"+ errordiv + "').css('opacity', 1);"+
      "}"+
      ");"
    $(errordiv).text(errorstr);

    mytimer(texthidestring, 4000);

    console.log(errorstr);
  };

  //================================================
  //my attempt at creating a persistent timer
  //I looked up how to do closure on the web and im not even sure this is right
  //================================================
  function persistenttimer (num) {
    var a  = setTimeout("console.log('Shouldn't be seeing this text ever)", num);
    clearTimeout(a);
    return function (string, num) {
      clearTimeout(a);
      a  = setTimeout(string, num);
    }
  }
  // this has to be called out here to make it available to 
  //all namespaces
  var mytimer = persistenttimer(4000);

  
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

  //=========================================
  //general button event handlers
  //=========================================

  $("#knnewcategorysubmit").click(function () {knnewcategorysubmit();})
  //event handler for adding a list item
  $("body").on("click", ".knaddli", function () {Knadditem($(this))})


  //event handler for removing a list item
  $("body").on("click", ".knminusbtn", function () {Knremoveitem($(this))})

  //pressing enter while title textfield is active will simulate click to + button
  $("body").on("keypress", ".knnewest", function (event) {

    if (event.keyCode == 13) { $(this).next(".knaddli").click();}
  })

  //pressing enter while link textfield is active will simulate click to + button
  $("body").on("keypress", ".knnewestlink", function (event) {

    if (event.keyCode == 13) { $(this).prevAll(".knaddli").click();}
  })

  function knnewcategorysubmit () {

      //get the text from the textbox

      var textsubmitted = $("#knnewcategory").val()
      $("#knnewcategory").val("")
      console.log(textsubmitted)

      


      //check to see if the category already exist
      if ( $("#" + textsubmitted).length != 0) {
       knerrorline("That category already exist")

      //check to see its not null  
    } else if (textsubmitted == "") {
      knerrorline("No Category name.")




    } else {
      $kncategories[textsubmitted] = new Kncategory(textsubmitted);

      
      

    }
  };
  
  
  
  function  Knadditem ($this) {
    console.log($this.parents(".kncatshell").attr("id"));
    var key = $this.parents(".kncatshell").attr("id");

    var listring = $this.prevAll(".knnewest").val();
    var lilinkstring = $this.nextAll(".knnewestlink").val();
    console.log(listring);
    console.log(lilinkstring);
    








    //this is actually where we call the
    // categories privileged method : Knulfunc
    //  We can't call this method effectively without alot of information
    // So although ideally I'd like to have just the call to this function inside
    //the binding of the event handler its cleaner to just make a wrapper function for it
    $kncategories[key].Knulfunc("+", listring, lilinkstring);

    //clear textboxes for next input
    $this.prevAll(".knnewest").val("");
    $this.nextAll(".knnewestlink").val("");
    //give focus back to the title
    $this.prev(".knnewest").focus();


  }

  function Knremoveitem ($this) {
    //console.log($this.parents(".kncatshell").attr("id"));
    var key = $this.parents(".kncatshell").attr("id");

    var listring = $this.prev().find(".knliitem").text();
    console.log(listring);


    $kncategories[key].Knulfunc("-", listring)
  }



  //=============================================
  //kn page basic classes
  //=============================================



  // ====================================================
  // This is the category class  each category takes up
  // a bootstrap pannel
  // ====================================================

  function Kncategory(name) {
    this.name = name;
    var catname = "kncategory"+ name
    
    var panelid = name +"panel"
    var panelheadingid = name +"panelheading"
    var panelbodyid = name +"panelbody"

    var defaultsize = "col-md-4"

    this.Knulfunc = function(func, plaintext, link) {
      func = (typeof func === "undefined") ? false : func;
      if (!func) { 
        $knulfuncstring = $("<ul>")
        .addClass(catname)
        .append($("<li>")
          .addClass(catname + " kninputli")
          .append($("<input>")
            .attr("type","text")
            .attr("placeholder","title")
            .addClass("knnewest", catname))
          .append($("<div>" )
            .addClass("btn btn-default kncatlibtn knaddli " + catname)
            .append("+"))
          // .append($("<div>")
          //   .attr("id", "knrmli")
          //   .addClass("btn btn-default kncatlibtn")
          //   .append("-"))
          .append($("<div>")
            .attr("id", "knnestli")
            .addClass("btn btn-default kncatlibtn")
            .append("sublist"))
          .append($("<input>")
            .attr("type", "text")
            .attr("placeholder","link")
            .addClass("knnewestlink", catname)));

        return $knulfuncstring;
      }

      switch (func) {
        case "+":
          KnPlus();
          break;
        case "-" :
          KnMinus();
          break;
      }
      
      //========================================
      // child functions for the Knulfunc master functions 
      // Don't want anything else touching these functions
      //========================================
      function KnPlus() {
        //keep forgetting received these as parameters from ancestor function
        //Knulfunc
        plaintext = (typeof plaintext === "string") ? plaintext : false;
        link = (typeof link === "string") ? link : false;

        if (!plaintext) {
          knerrorline("Please provide a name.");
        } else {
          
          var $newlistitem = $("<li>");
          $newlistitem.addClass("kn"+plaintext+"rm")
          
          var $newlistitemdiv = $("<div>")
          $newlistitemdiv.addClass("knlicontent")
          
          if (!link) {
            
            $newlistitemdiv.append($("<div>")
              .addClass("knliitem " + catname + " " + plaintext)
              .append(plaintext));
          } else {
            
            var $newlistitemlink = $("<a>")
            $newlistitemlink
              .addClass("knliitem " + catname + " " + plaintext)
              .attr("href" , link)
              .append(plaintext);
            $newlistitemdiv
              .append($newlistitemlink);


          }
          //here we append the date string
          var plusdate = new Date();
          $newlistitemdiv
            .append($("<div>")
              .addClass("knlidate " + plusdate.toLocaleDateString() )
              .append(plusdate.toLocaleDateString()))

          //lets try placing our - button after the li element
          
          

          $newlistitem
            .append($newlistitemdiv)
            .append($("<div>")
              .addClass("knminusbtn btn btn-default kncatlibtn " + catname)
              .append("-"))
              




          

          
          
          $("." + catname + " .kninputli").before($newlistitem)
        }

      } //--function KnPlus

      //function for removing an element
      function KnMinus () {
        console.log("we are in KnMinus");
        $(".kn"+plaintext+"rm").remove()


      }



    } //--function Knulfunc


    //have to figure out how to do this dryer
    // maybe just insert the first part of the category then continue 
    //to add pieces until its complete
    //also need to check if the category exist
    $('#kncatbegin').prepend(function () {

      //add the base element panel 
      var $insert = new $("<div></div>")
      .addClass(defaultsize + " " +  catname + " kncatshell")
      .attr("id", name)
      .append($('<div>')
        .addClass("panel panel-default", catname)
        .attr("id", panelid)   
        .append($('<div>')
          .addClass("panel-heading", catname)
          .attr("id", panelheadingid)
          .append(name))
        .append($('<div>')
          .addClass("panel-body", catname)
          .attr("id", panelbodyid)
          )
        )
      //return it to the after function
      return $insert

    });
    //call the function to add the initial ul and blank li element to the category panel
    $("div#"+panelbodyid).append(this.Knulfunc());


    

    //fill out the category
    //how often am I going to be editing jquery objects before they are added to the DOM?

  };










  



  console.log( "ready!" );

});









