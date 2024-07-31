// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import {getFirestore ,collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getStorage,ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";


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
const db = getFirestore ();
const storage = getStorage();
var id;

let imgUrl = document.getElementById("imgUrl")
let postUrl = document.getElementById("postUrl")

let uploads = () => {
    return new Promise((resolve,reject)=>{
        let files = imgUrl.files[0]
        const randoNum = Math.random().toString().slice(2)
        const storageRef = ref(storage, `images/${randoNum}`);
        const uploadTask = uploadBytesResumable(storageRef, files);
        
        uploadTask.on('state_changed', 
          (snapshot) => {
        
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            reject(error.message)
            // Handle unsuccessful uploads
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL)
            });
          }
        );

    })
}
    let uploads_2 = () => {
        return new Promise((resolve,reject)=>{
            let file2 = postUrl.files[0]
            const randoNum = Math.random().toString().slice(2)
            const storageRef = ref(storage, `images/${randoNum}`);
            const uploadTask = uploadBytesResumable(storageRef, file2);
            
            uploadTask.on('state_changed', 
              (snapshot) => {
            
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              }, 
              (error) => {
                reject(error.message)
                // Handle unsuccessful uploads
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  resolve(downloadURL)
                });
              }
            );
    
        })
    }


var postName = document.getElementById("postName")
var description = document.getElementById("description")

window.addData = function (){
            var obj = {
             postName : postName.value,
             description : description.value,
            };
            uploads().then(res => {
                obj.imgUrl = res
                uploads_2().then(async res =>{
                    obj.postUrl = res
                    let reference = collection(db, "posts")
                    let result = await addDoc(reference, obj)
                    console.log(obj);
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            .catch(err=>console.log(err))
};
var fbPost = document.getElementById("fbPost")

let products = []
async function getData(){
    const reference = collection(db, "posts")
    let  result = await getDocs(reference)
    result.forEach(docs => {
        let dataobj = {
            id: docs.id,
            ...docs.data()
        }
    let {description, imgUrl, postName, postUrl, id} = dataobj
    console.log("posturl=> ",postUrl);
    console.log("imgurl=> ",imgUrl);

    fbPost.innerHTML +=
    `<div class="gap">
    <div class="userImgUrl" style="margin-left: 9px;">
    <img src="${postUrl}" alt="">
    <div style="margin-left: 14px; margin-top:12px">
        <h6 style="margin-top:12px;">${postName}</h6>
       <p> ${moment().fromNow()}</p>
    </div>
  </div>  
  <div class="description" style="margin-left: 9px;">
      <p>${description.slice(0,60)}...</p>
  </div>
  <div class="postImgUrl">
      <img src="${imgUrl}" alt="">
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
});
}
getData()



