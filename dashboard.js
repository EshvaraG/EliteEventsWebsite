import { auth } from "./firebase.js";

import {

signOut,

onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";

}

});

document.getElementById("logoutBtn").onclick=()=>{

signOut(auth);

};