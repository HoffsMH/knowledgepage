$( document ).ready(function() {

  
                
  //make console a little more verbose about what im trying to 
  //do to figure stuff out
  debug = true;

  


  function debugmsg (bugstring, ln) {
    if (debug) {
      console.log(bugstring + " " + ln)
    }
  }

  //global array of categories
  var $kncategories = []

  //global object
  // of category headers colors
  
  var knpanelhclrs = new clrobjectlist

  function clrobjectlist () {
    this.clrolength = 0;
    this.clrindex = [];
    this.clrlabel = [];
    this.add = function (label, hex) {
      this.clrindex[label] = this.clrolength
      this.clrlabel[this.clrolength] = label
      this.clrolength += 1;
      
      this[label] = hex;
    }
    this.randindex = function () {
      var max = this.clrolength
      var min = 0
      return Math.floor(Math.random() * (max - min) + min)  
    }
    
  }

  //============================================
  //panel heading color array
  //============================================
  knpanelhclrs.add("jsblue", "#0C72AD")
  knpanelhclrs.add("brightblue", "#052DA3")
  knpanelhclrs.add("rubyred", "#E0115F")
  knpanelhclrs.add("lightyellow", "#FFFF66")
  knpanelhclrs.add("purple", "#582A72")
  knpanelhclrs.add("green", "#91E100")
  knpanelhclrs.add("brightgreen", "#00B920")
  knpanelhclrs.add("deeporange", '#F27400')



  
  



  
  

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

    debugmsg(errorstr );
  };

  //================================================
  //my attempt at creating a persistent timer
  //I looked up how to do closure on the web and im not even sure this is right
  //================================================
  function persistenttimer (num) {
    var a  = setTimeout("debugmsg('Shouldn't be seeing this text ever', ln)", num);
    clearTimeout(a);
    return function (string, num) {
      clearTimeout(a);
      a  = setTimeout(string, num);
    }
  }
  // this has to be called out here to make it available to 
  //all namespaces
  var mytimer = persistenttimer(4000);

  
  

  //=========================================
  //general button event handlers
  //=========================================

  $("#knnewcategorysubmit").click(function () {knnewcategorysubmit();})

  //event handler for adding a list item
  $("body").on("click", ".knaddli", function () {Knadditem($(this))})


  //event handler for removing a list item
  $("body").on("click", ".knminusbtn", function () {Knremoveitem($(this))})


  //event handler for changing color up
  $("body").on("click", ".knmvclrup", function () {Knmvclr($(this));})

  //event handler for changing color up
  $("body").on("click", ".knmvclrdown", function () {Knmvclr($(this));})

  //event handler for changing panel position to the right
  $("body").on("click", ".knmvpanelright", function () {Knmvpanel($(this));})

  //event handler for changing panel position to the left
  $("body").on("click", ".knmvpanelleft", function () {Knmvpanel($(this));})

  

  

  //=======================================
  //button simulation
  //=======================================

  //pressing enter while title textfield is active will simulate click to + button
  $("body").on("keypress", ".knnewest", function (event) {

    if (event.keyCode == 13) { $(this).parent().next(".knaddli").click();}
  })

  //pressing enter while link textfield is active will simulate click to + button
  $("body").on("keypress", ".knnewestlink", function (event) {

    if (event.keyCode == 13) { $(this).parent().next(".knaddli").click();}
  })

  //pressing enter while create category textfield is active will simulate click to create button
  $("body").on("keypress", "#knnewcategory", function (event) {

    if (event.keyCode == 13) { $(this).nextAll("#knnewcategorysubmit").click();}
  })

  

  //=======================================
  //view mode and date filtering
  //========================================
  //user clicks on an option in change viewmode dropdown
  $("body").on("click", ".knviewmodeOpt", function () {Knchangemode($(this))})

  

  //user clicks on a tonow viewmode option
  $("body").on("click", ".kntonowOpt", function () {KntonowChange($(this))})

  function knnewcategorysubmit () {

      //get the text from the textbox

      var textsubmitted = $("#knnewcategory").val()
      $("#knnewcategory").val("")
      debugmsg(textsubmitted)

      


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
    debugmsg($this.parents(".kncatshell").attr("id"));
    var key = $this.parents(".kncatshell").attr("id");

    var listring = $this.prev().find(".knnewest").val();
    var lilinkstring = $this.prev().find(".knnewestlink").val();
    debugmsg(listring);

    //this is actually where we call the
    // categories method : Knulfunc
    //  We can't call this method effectively without alot of information
    // So although ideally I'd like to have just the call to this function inside
    //the binding of the event handler its cleaner to just make a wrapper function for it
    $kncategories[key].Knulfunc("+", listring, lilinkstring);

    //clear textboxes for next input
    $this.prev().find(".knnewest").val("");
    $this.prev().find(".knnewestlink").val("");
    //give focus back to the title
    $this.prev(".knnewest").focus();


  }

  function Knremoveitem ($this) {
    //debugmsg($this.parents(".kncatshell").attr("id"));
    var key = $this.parents(".kncatshell").attr("id");

    var listring = $this.prev().find(".knliitem").text();
    debugmsg(listring);


    $kncategories[key].Knulfunc("-", listring)
  }

  function Knchangemode ($this) {

    switch  ($this.children().attr("class")) {
      case "tonow" :
        //hide all other  view mode elements
        $(".knviewmodeNode").hide()
        //show to to now dropdown box
        $(".kntonow").show()
        break;
      case "incby":
        $(".knviewmodeNode").hide()
        $(".knincby").show()

    }

    $(".knviewmodetogglebtn").text($this.children().text())
  }

  

  function KntonowChange ($this) {
    
    var days = $this.children().attr("class");
    
    debugmsg("filtering anything that happened " + days + "  days ago");
    //first we make everything show up so previously filtered elements can come back
    $(".knli").show();

    //if the value given for days is -1 that means forever was selected
    //so we dont need to do anything else after we show everything
    if (days == "-1") {
      $(".kntonowtogglebtn").text($this.children().text())
      return

    }
    var $knlidateFilt = $(".knlidate").filter(function (index) {return knfilterdate(index)})

    debugmsg($knlidateFilt.parents(".knli").text())

    $knlidateFilt.parents(".knli").hide()

    

    function knfilterdate ($index) {
      
      
      //grab the text from our specific iteration's element
      var knlidatetext = $(".knlidate").eq($index).text();
      //make that text into a date object
      var knlidate = new Date(knlidatetext);
      var today = new Date();
      //get the cutoff date before which will render the element hidden
      var cutoff = new Date(today.setDate(today.getDate() - days ));



       if (knlidate < cutoff) {
        debugmsg("current elements date is less than (predating) today minus days")
        return true

       } else {
        debugmsg("current elements date is greater than (postdating) today minus 7 days" + day, thislines)
        return false
       }
      

    }



    $(".kntonowtogglebtn").text($this.children().text())
  }

  function Knmvclr ($this) {
    //find out if its move up or down
      

    if ($this.hasClass('knmvclrup')) {
      var inc = 1
    } else if ($this.hasClass('knmvclrdown')) {
      var inc = -1
    }

    var knpanelhdg = $this.parents('.panel-heading')
    var currentindex = knpanelhdg.children(".clrindex").text()
    var currentinc = parseInt(currentindex) + parseInt(inc);
    var currentmaxindex = knpanelhclrs.clrolength -1;
    var clrolength = knpanelhclrs.clrolength;

    //debugmsg(currentindex)
    var randclrindex = knpanelhclrs.randindex();

    //if we are on the last element and we are trying to increment up
    if ((currentindex == clrolength - 1) && (inc == 1) ) {
      knpanelhdg.css("background-color", knpanelhclrs[knpanelhclrs.clrlabel[0]])
      knpanelhdg.children(".clrindex").text("0")
      return;
    }
    //if we are on the first element and we are trying to increment down
    if ((currentindex == 0) && (inc == -1)) {

      knpanelhdg.css("background-color", knpanelhclrs[knpanelhclrs.clrlabel[currentmaxindex]])
      knpanelhdg.children(".clrindex").text(currentmaxindex) 
      return;          

    }

    knpanelhdg.children(".clrindex").text(currentinc)
    knpanelhdg.css("background-color", knpanelhclrs[knpanelhclrs.clrlabel[currentinc]])



  
    
  }
 
 function Knmvpanel ($this) {

  var catname = $this.parents('.kncatshell').attr("id")
  var kncat = $this.parents('.kncatshell')

  var kncatprev = kncat.prev('.kncatshell')
  var kncatnext = kncat.next('.kncatshell')
  debugmsg("the previous panels id: " +   kncatprev.attr("id"))

  if ($this.hasClass('knmvpanelright')) {
    var inc = -1
  } else if ($this.hasClass('knmvpanelleft')) {
    var inc = 1
  }
  //make sure we aren't trying to move left when we are at the end of
  //the categories

  
  
  if ((inc == 1) && (kncatnext.length == 0) ) {
    knerrorline("Can't move anymore in that direction")
    debugmsg("Can't move anymore in that direction")
    return;
  }
  if ((inc == -1) && (kncatprev.length == 0 )) {
    knerrorline("Can't move anymore in that direction")
    debugmsg("Can't move anymore in that direction")
    return; 
  }

  if ((inc == 1)) {
    knerrorline("Moving "+ catname +" right")
    kncatnext.after(kncat[0])
    return;
  }
  if ((inc == -1)) {
    knerrorline("Moving "+ catname +" left")
    kncatprev.before(kncat[0])
    return;
  }


  // ok at this point I need
  // should I figure out

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

    var defaultsize = "col-lg-3 col-md-4 col-sm-6 col-xs-12"

    this.Knulfunc = function(func, plaintext, link) {
      func = (typeof func === "undefined") ? false : func;
      

      //if no arguments are supplied
      if (!func) { 
        $knulfuncstring = $("<ul>")
        .addClass(catname)
        .append($("<li>")
          .addClass(catname + " kninputli")
          
          .append($("<div>")
            .addClass("kninputcontent " + catname)
          
            .append($("<input>")
              
              .attr("type","text")
              .attr("placeholder","title")
              .addClass("knnewest", catname))
            .append($("<input>")
              
              .attr("type", "text")
              .attr("placeholder","link")
              .addClass("knnewestlink", catname)))
          .append($("<div>" )
            
            .addClass("btn btn-default kncatlibtn knaddli " + catname)
            .append("+"))
          
          .append($("<div>")
            
            .attr("id", "knnestli")
            .addClass("btn btn-default kncatlibtn")
            .append("sublist"))
          );

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
          $newlistitem.addClass("kn"+plaintext+"rm knli")
          
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
          if (!debug) {
            $newlistitemdiv
              .append($("<div>")
                .addClass("knlidate " + plusdate.toLocaleDateString() )
                .append(plusdate.toLocaleDateString()))
          } else {
            var today = new Date()
            var debugdate  = new Date(today.setDate(today.getDate() - 180 ));

            $newlistitemdiv
              .append($("<div>")
                .addClass("knlidate " + debugdate.toLocaleDateString())
                .append(debugdate.toLocaleDateString()))

          }
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
        debugmsg("we are in KnMinus");
        $(".kn"+plaintext+"rm").remove()


      }



    } //--function Knulfunc


    //have to figure out how to do this dryer
    // maybe just insert the first part of the category then continue 
    //to add pieces until its complete
    //also need to check if the category exist
    $('#kncatbegin').prepend(function () {

      //get our random color ready to add
      var randclrindex = knpanelhclrs.randindex()
      var randclrlabel = knpanelhclrs.clrlabel[randclrindex]
      var randclrdiv = $('<div>')
        .addClass("clrindex")
        .css("display", "none")
        .text(randclrindex);
      var randclrhex = knpanelhclrs[randclrlabel]
      debugmsg("our random index" + randclrindex)
      debugmsg("our random hex: " + randclrhex)

      //add the base element panel 
      var $insert = new $("<div></div>")
      .addClass(defaultsize + " " +  catname + " kncatshell")
      .attr("id", name)
      .append($('<div>')
        .addClass("panel panel-default", catname)
        .attr("id", panelid)   
        .append($('<div>')
          .addClass("panel-heading", catname)
          .css("background-color" , randclrhex)
          .attr("id", panelheadingid)
          .append ($('<span>')
            .addClass('flex-center floatleft')
            .append(name))
          .append(randclrdiv)
          .append($('<span>')
            .addClass('kncolorupdown floatright flex-center')
            .append($('<div>')
              .addClass('glyphicon glyphicon-chevron-up knmvclrup panelhbtn btn'))
            .append($('<div>')
              .addClass('ctrllbl')
              .append("color"))
            .append($('<div>')
              .addClass('glyphicon glyphicon-chevron-down knmvclrdown btn panelhbtn')))
          .append($('<span>')
            .addClass('knpositionarrows floatright flex-center  ')
            .append($('<div>')
              .addClass('glyphicon glyphicon-chevron-up knmvpanelright btn panelhbtn'))
            .append($('<div>')
              .addClass('ctrllbl')
              .append("position"))
            .append($('<div>')
              .addClass('glyphicon glyphicon-chevron-down knmvpanelleft btn panelhbtn')))
          .append($('<span>')
            .addClass('knpositionarrows floatright flex-center  ')
            .append($('<div>')
              .addClass('glyphicon glyphicon-chevron-up knmvpanelright btn panelhbtn'))
            .append($('<div>')
              .addClass('ctrllbl')
              .append("size"))
            .append($('<div>')
              .addClass('glyphicon glyphicon-chevron-down knmvpanelleft btn panelhbtn'))))
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










  



  debugmsg( "ready!" );

});









