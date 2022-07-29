import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import * as fbauth from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

const firebaseConfig =  {
  apiKey: "AIzaSyBETRXg9Q1oHqCI-BYTLUFJZxwEBS20ABM",
  authDomain: "aschutz-project.firebaseapp.com",
  databaseURL: "https://aschutz-project-default-rtdb.firebaseio.com",
  projectId: "aschutz-project",
  storageBucket: "aschutz-project.appspot.com",
  messagingSenderId: "318672503653",
  appId: "1:318672503653:web:d08caca6cbdcad2b68178c",
  measurementId: "G-YN7MDBFJ0X"
};

const app = initializeApp(firebaseConfig);
let db = rtdb.getDatabase(app);
let auth = fbauth.getAuth(app);

let renderUser = function(userObj){
  $("#app").html(JSON.stringify(userObj));
  $("#app").append(`<button type="button" id="logout">Logout</button>`);
  $("#logout").on("click", ()=>{
    fbauth.signOut(auth);
  })
}

fbauth.onAuthStateChanged(auth, user => {
      if (!!user){
        $("#login").hide();
        $("#app").show();
        renderUser(user);
      } else {
        $("#login").show();
        $("#app").hide();
      }
});


$("#register").on("click", ()=>{
  let email = $("#regemail").val();
  let p1 = $("#regpass1").val();
  let p2 = $("#regpass2").val();
  if (p1 != p2){
    alert("Passwords don't match");
    return;
  }
  fbauth.createUserWithEmailAndPassword(auth, email, p1).then(somedata=>{
    //let uid = somedata.user.uid;
    //let userRoleRef = rtdb.ref(db, `/users/${uid}/roles/user`);
    //rtdb.set(userRoleRef, true);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
});


$("#login").on("click", ()=>{
  let email = $("#logemail").val();
  let pwd = $("#logpass").val();
  fbauth.signInWithEmailAndPassword(auth, email, pwd).then(
    somedata=>{
      console.log(somedata);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});
