import { auth, db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

window.saveOfficialScore = async function(officialScore, selectedChapter){

  const user = auth.currentUser;
  if(!user){
    alert("Login required");
    return;
  }

  await addDoc(collection(db,"quizResults"),{
    uid:user.uid,
    chapter:selectedChapter,
    officialScore:officialScore,
    date:Date.now()
  });

  const userRef = doc(db,"users",user.uid);
  const snap = await getDoc(userRef);
  const oldTotal = snap.data().totalScore || 0;

  await updateDoc(userRef,{
    totalScore: oldTotal + officialScore
  });

  alert("Score Saved");
}

window.loadMainLeaderboard = async function(){

  const q = query(
    collection(db,"users"),
    orderBy("totalScore","desc"),
    limit(20)
  );

  const snapshot = await getDocs(q);

  let html="<h3>Main Leaderboard</h3>";
  let rank=1;

  snapshot.forEach(doc=>{
    const d=doc.data();
    html+=`<p>#${rank} ${d.firstName} ${d.lastName} - ${d.totalScore}</p>`;
    rank++;
  });

  leaderboard.innerHTML=html;
}
