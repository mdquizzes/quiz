window.SECTION_B = [

/* ================= LIGHT ================= */

{
question: "State the laws of reflection of light.",
chapter: "Light",
difficulty: "easy",
answers: [],
solution: "Angle of incidence = angle of reflection; incident ray, reflected ray and normal lie in same plane."
},

{
question: "Define focal length of a spherical mirror.",
chapter: "Light",
difficulty: "easy",
answers: [],
solution: "Distance between pole and focus is focal length."
},

{
question: "What is refractive index?",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "Ratio of speed of light in vacuum to speed in medium."
},

{
question: "State Snell’s law of refraction.",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "n = sin i / sin r."
},

{
question: "Define power of a lens.",
chapter: "Light",
difficulty: "easy",
answers: [],
solution: "P = 1/f (in meters). Unit is dioptre."
},

{
question: "Why does a ray of light bend when it passes from one medium to another?",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "Due to change in speed of light."
},

{
question: "Write mirror formula.",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "1/f = 1/v + 1/u."
},

{
question: "Write lens formula.",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "1/f = 1/v − 1/u."
},

{
question: "What is magnification?",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "Ratio of image height to object height."
},

{
question: "Why are convex mirrors used as rear-view mirrors?",
chapter: "Light",
difficulty: "easy",
answers: [],
solution: "They provide wider field of view."
},

/* ================= ELECTRICITY ================= */

{
question: "Define electric current.",
chapter: "Electricity",
difficulty: "easy",
answers: [],
solution: "Flow of electric charge. I = Q/t."
},

{
question: "State Ohm’s law.",
chapter: "Electricity",
difficulty: "easy",
answers: [],
solution: "V = IR."
},

{
question: "What is resistance?",
chapter: "Electricity",
difficulty: "easy",
answers: [],
solution: "Opposition to flow of current."
},

{
question: "Define electric power.",
chapter: "Electricity",
difficulty: "medium",
answers: [],
solution: "Rate of doing work. P = VI."
},

{
question: "Write formula for electrical energy.",
chapter: "Electricity",
difficulty: "medium",
answers: [],
solution: "E = VIt."
},

/* ================= LIFE PROCESSES ================= */

{
question: "Define nutrition.",
chapter: "Life Processes",
difficulty: "easy",
answers: [],
solution: "Process of obtaining food."
},

{
question: "What is respiration?",
chapter: "Life Processes",
difficulty: "easy",
answers: [],
solution: "Breakdown of food to release energy."
},

{
question: "What is transpiration?",
chapter: "Life Processes",
difficulty: "medium",
answers: [],
solution: "Loss of water from leaves."
},

{
question: "Define excretion.",
chapter: "Life Processes",
difficulty: "easy",
answers: [],
solution: "Removal of waste products."
},

{
question: "What is transportation in plants?",
chapter: "Life Processes",
difficulty: "medium",
answers: [],
solution: "Movement of water and food via xylem and phloem."
},

/* ================= CHEMICAL REACTIONS ================= */

{
question: "Define oxidation.",
chapter: "Chemical Reactions",
difficulty: "easy",
answers: [],
solution: "Loss of electrons."
},

{
question: "Define reduction.",
chapter: "Chemical Reactions",
difficulty: "easy",
answers: [],
solution: "Gain of electrons."
},

{
question: "What is corrosion?",
chapter: "Chemical Reactions",
difficulty: "easy",
answers: [],
solution: "Slow damage of metals."
},

{
question: "What is rancidity?",
chapter: "Chemical Reactions",
difficulty: "medium",
answers: [],
solution: "Oxidation of fats."
},

/* ===== AUTO EXTEND ===== */

...Array.from({length:150}, (_,i)=>{

let n = i+25;

return {
question: `Short Q${n}: Explain why light bends when entering glass from air.`,
chapter: "Light",
difficulty: n%3===0 ? "hard" : "medium",
answers: [],
solution: "Due to change in refractive index and speed."
};

}).flat()

];
