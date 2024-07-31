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


const storage = getStorage();

export{storage,ref,uploadBytesResumable,getDownloadURL}