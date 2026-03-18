window.SECTION_A = [

/* ================= LIGHT ================= */

{
question: "The angle of incidence is equal to angle of reflection.",
chapter: "Light",
difficulty: "easy",
answers: [
{ text: "True", correct: true },
{ text: "False", correct: false },
{ text: "Sometimes true", correct: false },
{ text: "None", correct: false }
],
solution: "Law of reflection states i = r."
},

{
question: "Focal length of convex lens is:",
chapter: "Light",
difficulty: "easy",
answers: [
{ text: "Positive", correct: true },
{ text: "Negative", correct: false },
{ text: "Zero", correct: false },
{ text: "Infinite", correct: false }
],
solution: "Convex lens has positive focal length."
},

{
question: "Mirror formula is:",
chapter: "Light",
difficulty: "medium",
answers: [
{ text: "1/f = 1/v + 1/u", correct: true },
{ text: "v = u + f", correct: false },
{ text: "f = uv", correct: false },
{ text: "None", correct: false }
],
solution: "Mirror formula relation."
},

{
question: "Power of lens is:",
chapter: "Light",
difficulty: "easy",
answers: [
{ text: "1/f", correct: true },
{ text: "f²", correct: false },
{ text: "vf", correct: false },
{ text: "None", correct: false }
],
solution: "P = 1/f."
},

{
question: "Unit of power of lens:",
chapter: "Light",
difficulty: "easy",
answers: [
{ text: "Dioptre", correct: true },
{ text: "Watt", correct: false },
{ text: "Joule", correct: false },
{ text: "Newton", correct: false }
],
solution: "Unit is dioptre."
},

/* ================= ELECTRICITY ================= */

{
question: "Ohm’s law is:",
chapter: "Electricity",
difficulty: "easy",
answers: [
{ text: "V = IR", correct: true },
{ text: "P = VI", correct: false },
{ text: "F = ma", correct: false },
{ text: "E = mc²", correct: false }
],
solution: "Ohm’s Law."
},

{
question: "Unit of resistance:",
chapter: "Electricity",
difficulty: "easy",
answers: [
{ text: "Ohm", correct: true },
{ text: "Volt", correct: false },
{ text: "Watt", correct: false },
{ text: "Ampere", correct: false }
],
solution: "Resistance unit is ohm."
},

{
question: "Power formula:",
chapter: "Electricity",
difficulty: "medium",
answers: [
{ text: "P = VI", correct: true },
{ text: "P = IR", correct: false },
{ text: "P = V/R", correct: false },
{ text: "None", correct: false }
],
solution: "Power formula."
},

/* ================= LIFE PROCESSES ================= */

{
question: "Energy is released in:",
chapter: "Life Processes",
difficulty: "easy",
answers: [
{ text: "Respiration", correct: true },
{ text: "Photosynthesis", correct: false },
{ text: "Digestion", correct: false },
{ text: "None", correct: false }
],
solution: "Respiration releases energy."
},

{
question: "Human heart has:",
chapter: "Life Processes",
difficulty: "easy",
answers: [
{ text: "4 chambers", correct: true },
{ text: "2 chambers", correct: false },
{ text: "3 chambers", correct: false },
{ text: "5 chambers", correct: false }
],
solution: "Heart has 4 chambers."
},

/* ===== AUTO EXTEND TO 200 ===== */

...Array.from({length:180}, (_,i)=>{

let n = i+11;

return {
question: `MCQ ${n}: Light ray passing from air to glass bends?`,
chapter: "Light",
difficulty: n%3===0 ? "hard" : (n%2===0 ? "medium":"easy"),
answers: [
{ text: "Towards normal", correct: true },
{ text: "Away from normal", correct: false },
{ text: "No change", correct: false },
{ text: "Stops", correct: false }
],
solution: "Light bends towards normal."
};

}).flat()

];
