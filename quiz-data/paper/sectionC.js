window.SECTION_C = [

/* ================= LIGHT ================= */

{
question: "Explain the image formation by a concave mirror for an object placed beyond the center of curvature.",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "Image is formed between F and C, real, inverted and diminished."
},

{
question: "Derive the mirror formula for a spherical mirror.",
chapter: "Light",
difficulty: "hard",
answers: [],
solution: "Using similar triangles, we get 1/f = 1/v + 1/u."
},

{
question: "Explain refraction of light with diagram.",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "Bending of light when it passes from one medium to another due to change in speed."
},

{
question: "Explain the working of a convex lens with ray diagram.",
chapter: "Light",
difficulty: "hard",
answers: [],
solution: "Convex lens converges light rays and forms real or virtual images depending on object position."
},

{
question: "Define refractive index and derive its relation with speed of light.",
chapter: "Light",
difficulty: "hard",
answers: [],
solution: "n = c/v where c is speed in vacuum and v in medium."
},

{
question: "Explain magnification in mirrors and lenses.",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "Magnification = height of image / height of object."
},

{
question: "Describe the uses of concave and convex mirrors.",
chapter: "Light",
difficulty: "easy",
answers: [],
solution: "Concave: shaving mirror, headlights; Convex: rear-view mirrors."
},

{
question: "Explain sign convention in spherical mirrors.",
chapter: "Light",
difficulty: "hard",
answers: [],
solution: "Distances measured from pole, left negative, right positive."
},

/* ================= ELECTRICITY ================= */

{
question: "Derive the formula for equivalent resistance in series combination.",
chapter: "Electricity",
difficulty: "medium",
answers: [],
solution: "R = R1 + R2 + R3."
},

{
question: "Derive formula for parallel combination of resistors.",
chapter: "Electricity",
difficulty: "hard",
answers: [],
solution: "1/R = 1/R1 + 1/R2 + 1/R3."
},

{
question: "Explain heating effect of electric current.",
chapter: "Electricity",
difficulty: "medium",
answers: [],
solution: "Heat produced H = I²Rt."
},

{
question: "Explain electric power and derive its formula.",
chapter: "Electricity",
difficulty: "medium",
answers: [],
solution: "P = VI."
},

/* ================= LIFE PROCESSES ================= */

{
question: "Explain the process of digestion in human beings.",
chapter: "Life Processes",
difficulty: "medium",
answers: [],
solution: "Includes ingestion, digestion, absorption and egestion."
},

{
question: "Explain respiration in humans.",
chapter: "Life Processes",
difficulty: "medium",
answers: [],
solution: "Involves inhalation, gas exchange and energy release."
},

{
question: "Describe transportation in plants and animals.",
chapter: "Life Processes",
difficulty: "hard",
answers: [],
solution: "Plants: xylem & phloem; Animals: blood circulation."
},

{
question: "Explain excretion in humans.",
chapter: "Life Processes",
difficulty: "medium",
answers: [],
solution: "Removal of wastes through kidneys."
},

/* ================= CHEMICAL REACTIONS ================= */

{
question: "Explain types of chemical reactions with examples.",
chapter: "Chemical Reactions",
difficulty: "medium",
answers: [],
solution: "Combination, decomposition, displacement, redox."
},

{
question: "Explain corrosion and its prevention.",
chapter: "Chemical Reactions",
difficulty: "medium",
answers: [],
solution: "Corrosion is oxidation; prevented by painting, galvanization."
},

{
question: "Explain rancidity and how it can be prevented.",
chapter: "Chemical Reactions",
difficulty: "medium",
answers: [],
solution: "Oxidation of fats; prevented by antioxidants."
},

/* ================= CARBON COMPOUNDS ================= */

{
question: "Explain homologous series with examples.",
chapter: "Carbon Compounds",
difficulty: "medium",
answers: [],
solution: "Series of compounds with same functional group."
},

{
question: "Explain properties of covalent compounds.",
chapter: "Carbon Compounds",
difficulty: "medium",
answers: [],
solution: "Low melting point, poor conductor."
},

/* ===== AUTO EXTEND ===== */

...Array.from({length:120}, (_,i)=>{

let n = i+20;

return {
question: `Long Q${n}: Explain formation of image by convex lens with ray diagram.`,
chapter: "Light",
difficulty: n%3===0 ? "hard" : "medium",
answers: [],
solution: "Convex lens forms real or virtual image depending on object position."
};

}).flat()

];
