//evenlisteners

document.getElementById("button").addEventListener("click", loadUsers);
document.getElementById("button2").addEventListener("click", findUser);

//load git hub users
function loadUsers() {
  //empty if tehres something there beforehand
  document.getElementById("user").innerHTML = "";
  //create ajax object
  var xhr = new XMLHttpRequest();

  //specify what to get, here url
  xhr.open("GET", "https://api.github.com/users", true);

  //when loaded, do function
  xhr.onload = function () {
    //if everything ok
    if (this.status == 200) {
      //get parsed users
      var users = JSON.parse(this.responseText);

      var output = "";

      for (var i in users) {
        output +=
          '<div class="user">' +
          '<img src="' +
          users[i].avatar_url +
          '" width="100">' +
          "<ul>" +
          "<li> ID: " +
          users[i].id +
          "</li>" +
          "<li> Login: " +
          users[i].login +
          "</li>" +
          "</ul>" +
          "</div>";
      }
      document.getElementById("users").innerHTML = output;
    }
  };
  xhr.send();
}

//Function for gettignn user by name
function findUser() {
  //empty if there is users there already
  document.getElementById("users").innerHTML = "";

  //create ajax object
  var xhr = new XMLHttpRequest();

  //specify what to get, here url
  xhr.open("GET", "https://api.github.com/users", true);

  //when loaded, do function
  xhr.onload = function () {
    //if everything ok
    if (this.status == 200) {
      //get parsed users
      var user = JSON.parse(this.responseText);

      var output = "";
      var eisamoja = 0;
      var input = document.getElementById("input").value;

      //iterating through the users, if name is the same as taken as an input ....
      for (var i in user) {
        if (input == user[i].login) {
          output +=
            '<div class="user">' +
            '<img src="' +
            user[i].avatar_url +
            '" width="120">' +
            "<ul>" +
            "<li> ID: " +
            user[i].id +
            "</li>" +
            "<li> Login: " +
            user[i].login +
            "</li>" +
            "</ul>" +
            "</div>";
          //if there are no matches
        } else if (input != user[i].login) {
          //if not same +1 and if none same
          eisamoja = eisamoja + 1;
          if (eisamoja == user.length) {
            output = "No matches found. ";
          }
        }
      }
      //...show the found user
      document.getElementById("user").innerHTML = output;
      document.getElementById("input").value = "";
    }
  };
  xhr.send();
}

//if you wish to run the function when page is loaded
//window.onload = loadUsers;
