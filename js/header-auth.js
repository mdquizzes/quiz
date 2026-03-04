import { auth, db } from "./firebase-config.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


onAuthStateChanged(auth, async (user)=>{

const status=document.getElementById("userStatus")

if(!status) return

if(user){

const snap=await getDoc(doc(db,"users",user.uid))
const data=snap.data()

status.innerHTML =
"👤 "+data.firstName+
" <button onclick='logoutUser()'>Logout</button>"

}else{

status.innerHTML =
"<a href='login.html'>Login</a>"

}

})

window.logoutUser=function(){

signOut(auth).then(()=>location.reload())

}
