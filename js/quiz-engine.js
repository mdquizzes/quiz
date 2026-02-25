function finishQuiz(){

  quiz.innerHTML="";

  result.innerHTML=`
    <div class="result-card">
      <h2>Score: ${practiceScore}</h2>
      <h3 id="totalPoints">Total Points Earned (4/-1): Updating...</h3>
      <button onclick="loadMainLeaderboard()">
        Main Leaderboard
      </button>
    </div>
  `;

  // 🔥 AUTO SAVE CALL
  if(typeof saveOfficialScore === "function"){
    saveOfficialScore(officialScore, selectedChapter);
  }

}
