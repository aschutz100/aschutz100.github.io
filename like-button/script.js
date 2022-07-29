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
import { getDatabase } from "https://cdn.skypack.dev/firebase/database";
let db = rtdb.getDatabase(app);

let likes = rtdb.ref(db, "/likes/numlikes");
let counter = 0;

var likebutton = document.querySelector('#likebutton');
likebutton.addEventListener('click', function() {
  decision.innerText = 'Liked';
  counter++
  document.querySelector("#likes").innerHTML = counter
});

var dislikebutton = document.querySelector('#dislikebutton');
dislikebutton.addEventListener('click', function() {
  decision.innerText = 'Disliked';
  counter--
  document.querySelector("#likes").innerHTML = counter
  //if (counter<=1){
//document.getElementById("dislikebutton").disabled = true;
  //}
});

function writeNewPost(uid, username, picture, title, body) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return update(ref(db), updates);
}


















let titleRef = rtdb.ref(db, "/likes/numlikes")
rtdb.onValue(titleRef, ss=>{
  $("#likes").text(JSON.stringify(ss))
  //console.log(ss)
  });

let updateLikesObject = function(message, counter){
  console.log(message, counter);
  let navAdviceObj = {
    messageID: message,
    numlikes: counter,
  };
  console.log(navAdviceObj);
  rtdb.child(likes, message.permalink).set(navAdviceObj);
  //callback will probably be needed
}
