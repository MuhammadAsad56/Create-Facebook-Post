// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import {set, push, ref, getDatabase, onValue, remove  } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";



const firebaseConfig = {
  apiKey: "AIzaSyDuU0uxumzURzBYQO-DCIvZtxEd6kM4nv4",
  authDomain: "carshowroom-7cc02.firebaseapp.com",
  databaseURL: "https://carshowroom-7cc02-default-rtdb.firebaseio.com",
  projectId: "carshowroom-7cc02",
  storageBucket: "carshowroom-7cc02.appspot.com",
  messagingSenderId: "460362796760",
  appId: "1:460362796760:web:1360a57cfebea27d3e11ad",
  measurementId: "G-GZZ9KFSJWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase()
var id;

var postUrl = document.getElementById("postUrl")
var postName = document.getElementById("postName")
var description = document.getElementById("description")
var imgUrl = document.getElementById("imgUrl")

window.addData = function (){
    if (postUrl.value && postName.value && imgUrl.value){
        var obj = {
         postUrl : postUrl.value,
         postName : postName.value,
         description : description.value,
         imgUrl : imgUrl.value
        };
        obj.id = push(ref(db, "post")).key
        var reference = ref(db , `post/${obj.id}`);
        set(reference, obj)
       
      
        console.log(obj);
        postUrl.value = "", postName.value = "", description.value = "", imgUrl.value = ""
    }else{
        alert("please enter all required data")
    }
//    var reference = ref(db ,`task/`);
//    push(reference, obj)
};
var fbPost = document.getElementById("fbPost")

function getData(){
 const reference = ref(db, "post/");
 onValue(reference, function(postData){
   var allData = postData.val();
   var arr = Object.values(allData).reverse();
   for(var i = 0; i < arr.length; i++){
      var data = arr[i]
      id = data.id
      fbPost.innerHTML +=
      `<div class="gap">
      <div class="userImgUrl" style="margin-left: 9px;">
      <img src="${data.postUrl}" alt="">
      <button id="btn1" onclick="deletePost('${id}')" class="btn btn-primary">Delete</button>
      <div style="margin-left: 14px; margin-top:12px">
          <h6 style="margin-top:12px;">${data.postName}</h6>
         <p> ${moment().endOf('day').fromNow()}</p>
      </div>
    </div>  
    <div class="description" style="margin-left: 9px;">
        <p>${data.description.slice(0,60)}...</p>
    </div>
    <div class="postImgUrl">
        <img src="${data.imgUrl}" alt="">
    </div>  
    <div class="post-reaction">
    <div class="postReact">
        <span class="material-symbols-outlined">thumb_up</span>
        <h6>Like</h6>
    </div>
    <div class="postReact">
        <span class="material-symbols-outlined">comment</span>
        <h6>Comment</h6>
    </div>
    <div class="postReact">
        <span class="material-symbols-outlined">forward</span>
        <h6>Share</h6>
    </div>
 </div>
    </div>
      `
   }
 })
}
getData()

window.deletePost = function(id){
   var reference = ref(db , `post/${id}`);
   remove(reference)
 }


