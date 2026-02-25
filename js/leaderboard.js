window.saveOfficialScore = async function(officialScore, selectedChapter){

  const user = auth.currentUser;

  if(!user){
    // Guest user — no save
    document.getElementById("totalPoints").innerText =
      "Login to accumulate Total Points.";
    return;
  }

  try{

    // Save attempt
    await addDoc(collection(db,"quizResults"),{
      uid:user.uid,
      chapter:selectedChapter,
      officialScore:officialScore,
      date:Date.now()
    });

    const userRef = doc(db,"users",user.uid);
    const snap = await getDoc(userRef);
    const oldTotal = snap.data().totalScore || 0;

    const newTotal = oldTotal + officialScore;

    await updateDoc(userRef,{
      totalScore: newTotal
    });

    // 🔥 Update UI
    document.getElementById("totalPoints").innerText =
      "Total Points Earned (4/-1): " + newTotal;

  }
  catch(error){
    console.error(error);
    document.getElementById("totalPoints").innerText =
      "Error updating score.";
  }
};
