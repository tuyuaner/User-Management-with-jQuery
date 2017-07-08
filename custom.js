// inputs:
// var username = document.getElementById('username');
// var password = document.getElementById('password');
// var firstname = document.getElementById('firstname');
// var lastname = document.getElementById('lastname');
// var email = document.getElementById('email');
// var male = document.getElementById('male');
// var female = document.getElementById('female');
// var loc = document.getElementById('location');
var username = $('#username');
var password = $('#password');
var firstname = $('#firstname');
var lastname = $('#lastname');
var email = $('#email');
var male = $('#male');
var female = $('#female');
var loc = $('#location');

// button submit
var submit = $('#submit');

var currentUserData = {}

var flag;
// onclick event
submit.click(function(){

  flag = validationInputs(true);

  if (flag){
    increaseClickCount();
    console.log("flag");
    saveData(currentUserData);
    clearTable();
    showData();
  };
});
function removeErrorMessage(i){
  //
  // $(".error_message").remove();

    $("#error_"+i).remove();

  // if ( $('.row')[i].next().classList && $('.row')[i].next().classList.value.includes('error_message')){
  //   $('.row')[i].nextSibling.remove();
  // }; .next().hasClass("error_message")
};
function addErrorMessage(i, message){
  console.log("add error message");
  removeErrorMessage(i);
  // var div = $('div');
  // var text = document.createTextNode(message);
  // div.classList.add("error_message");
  // div.classList.add("col-2");
  // div.appendChild(text);
  // document.getElementsByClassName('row')[i].insertAdjacentElement("afterend",div);
  var html = "<div class = 'col-2 error_message' id = 'error_"+i+"''>"+ message +"</div>";
  $(html).insertAfter($(".row")[i]);
};

// if validate returns true elsewise returns false
function validationInputs(flag){
  console.log("validationInputs");
  console.log(username.val());
  if (username.val().length == 0 || username.val().trim() === ""){
    addErrorMessage(0,"Please enter a user name");
    flag = false;
  }else{
    removeErrorMessage(0);
    currentUserData["username"] =  username.value;
  };

  if (password.val().length == 0 || password.val().trim() === ""){
    addErrorMessage(1,"Please enter a password");
    flag = false;
  }else{
    removeErrorMessage(1);
    currentUserData["password"] = password.val()
  };
  if (firstname.val().length == 0 || firstname.val().trim() === ""){
    addErrorMessage(2,"please enter your first name");
    flag = false;
  }else{
    removeErrorMessage(2);
    currentUserData["firstname"] = firstname.val();
  };
  if (lastname.val().length == 0 || lastname.val().trim() === ""){
    addErrorMessage(3,"please enter your last name");
    flag = false;
  }else{
    removeErrorMessage(3);
    currentUserData["lastname"] = lastname.val();
  };
  if (email.val().length == 0 || email.val().trim() === ""){
    addErrorMessage(4,"please enter your Email")
    flag = false;
  }else{
    removeErrorMessage(4);
    currentUserData["email"] = email.val();
  };
  if (!male[0].checked && !female[0].checked){
    addErrorMessage(5,"please enter your gender")
    flag = false;
  }else{
    removeErrorMessage(5);
    if (male.checked){
      currentUserData["gender"] = "Male";
    }else{
      currentUserData["gender"] = "Female";
    }
  };
  if (loc.val().length == 0 || loc.val().trim() === ""){
    addErrorMessage(6,"please enter your location")
    flag = false;
  }else{
    removeErrorMessage(6);
    currentUserData["location"] = loc.val();
  };
  return flag;
}

// save data to localStorage:
function saveData(currentData){

  if (!localStorage["users"]){
    localStorage["users"] = [];
    localStorage["users"] += ( "{" + "\"" +localStorage.clickcount+ "\"" + ":"+ JSON.stringify(currentData) + "}");
  }else{
    localStorage["users"] = localStorage["users"].slice(0,localStorage["users"].length - 1) + ( ","+ "\"" +localStorage.clickcount+ "\"" +  ":"+  JSON.stringify(currentData)) + "}";
  };
};

// table:
var table = $("#dataTable");

showData();
function showData(){
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    if (localStorage["users"] && localStorage["users"].length >= 1){
      table.show();
      var users = JSON.parse(localStorage["users"]);
      for (key in users){
        var user = users[key];
        var tr = "<tr>";
        for (key in user){
            var td = "<td>";
            td += user[key];
            td += "</td>";
            tr += td;
        }
        tr += "</tr>"
        table.append(tr);
      }

      // for (var i = 0; i < Number(localStorage.clickcount); i ++){
      //   var user = JSON.parse(localStorage[i + 1]);
      //   var tr = document.createElement('tr');
      //
      //   for (key in user){
      //
      //     var td = document.createElement("td");
      //     td.appendChild(document.createTextNode(user[key]));
      //     tr.appendChild(td);
      //   }
      //   table.appendChild(tr);
      // }
    }
    else{
      table.hide();
    }
  } else {
    // Sorry! No Web Storage support..
  };
};

function clearTable(){
  var tr = $("tr");
  for (var i = 1; i < tr.length; i++){
    tr[i].html("");
  };
};

function countOfDataSaving(){
  if (localStorage.clickcount) {
    return localStorage.clickcount;
  } else {
      localStorage.clickcount = 1;
  };
  return localStorage.clickcount;
};

function increaseClickCount(){
  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
  } else {
      localStorage.clickcount = 1;
  };
  return localStorage.clickcount;
};
