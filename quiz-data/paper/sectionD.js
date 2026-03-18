window.SECTION_D = [

/* ================= LIGHT ================= */

{
question: "Case Study: A ray of light passes from air into glass and bends towards the normal. Explain why this happens and state the laws involved.",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "Light slows down in denser medium, so it bends towards normal. Laws: Snell’s law."
},

{
question: "Case Study: A student uses a concave mirror to observe image formation. The object is placed beyond the center of curvature. Describe the image formed.",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "Image is real, inverted and diminished, formed between F and C."
},

{
question: "Case Study: A convex lens is used to focus sunlight on a paper. Explain how the lens works in this situation.",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "Convex lens converges parallel rays to focus, producing heat."
},

{
question: "Case Study: A ray passes from glass to air and bends away from normal. Explain this behavior.",
chapter: "Light",
difficulty: "medium",
answers: [],
solution: "Light speeds up in rarer medium, so bends away from normal."
},

{
question: "Case Study: Why are convex mirrors used in vehicles for rear-view mirrors?",
chapter: "Light",
difficulty: "easy",
answers: [],
solution: "They provide wider field of view and erect image."
},

/* ================= ELECTRICITY ================= */

{
question: "Case Study: A student connects resistors in series. What happens to total resistance and current?",
chapter: "Electricity",
difficulty: "medium",
answers: [],
solution: "Total resistance increases, current decreases."
},

{
question: "Case Study: A wire gets heated when current flows. Explain the phenomenon.",
chapter: "Electricity",
difficulty: "medium",
answers: [],
solution: "Heating effect of current due to I²Rt."
},

{
question: "Case Study: Why are parallel connections used in homes?",
chapter: "Electricity",
difficulty: "easy",
answers: [],
solution: "To ensure equal voltage across appliances."
},

/* ================= LIFE PROCESSES ================= */

{
question: "Case Study: During running, breathing rate increases. Explain why.",
chapter: "Life Processes",
difficulty: "medium",
answers: [],
solution: "More oxygen is needed to release energy."
},

{
question: "Case Study: Plants wilt when not watered. Explain the reason.",
chapter: "Life Processes",
difficulty: "medium",
answers: [],
solution: "Loss of turgor pressure due to water deficiency."
},

{
question: "Case Study: Why is blood important for transport in humans?",
chapter: "Life Processes",
difficulty: "medium",
answers: [],
solution: "Carries oxygen, nutrients and wastes."
},

/* ================= CHEMICAL REACTIONS ================= */

{
question: "Case Study: Iron objects are painted to prevent rusting. Explain.",
chapter: "Chemical Reactions",
difficulty: "easy",
answers: [],
solution: "Prevents contact with air and moisture."
},

{
question: "Case Study: Food is stored in airtight containers. Why?",
chapter: "Chemical Reactions",
difficulty: "easy",
answers: [],
solution: "Prevents oxidation (rancidity)."
},

{
question: "Case Study: Why is galvanization used for iron?",
chapter: "Chemical Reactions",
difficulty: "medium",
answers: [],
solution: "Zinc coating prevents corrosion."
},

/* ================= CONTROL & COORDINATION ================= */

{
question: "Case Study: A person withdraws hand immediately after touching a hot object. Explain.",
chapter: "Control Coordination",
difficulty: "medium",
answers: [],
solution: "Reflex action controlled by spinal cord."
},

{
question: "Case Study: Why do plants bend towards light?",
chapter: "Control Coordination",
difficulty: "medium",
answers: [],
solution: "Due to auxin hormone."
},

/* ================= REPRODUCTION ================= */

{
question: "Case Study: Sexual reproduction leads to variation. Explain.",
chapter: "Reproduction",
difficulty: "medium",
answers: [],
solution: "Mixing of genes produces variation."
},

/* ================= HEREDITY ================= */

{
question: "Case Study: Children resemble their parents. Explain.",
chapter: "Heredity Evolution",
difficulty: "easy",
answers: [],
solution: "Traits are inherited through genes."
},

/* ===== AUTO EXTEND ===== */

...Array.from({length:80}, (_,i)=>{

let n = i+20;

return {
question: `Case Study ${n}: A student observes refraction through a glass slab. Explain the phenomenon and laws involved.`,
chapter: "Light",
difficulty: n%2===0 ? "medium" : "hard",
answers: [],
solution: "Refraction occurs due to change in speed; governed by Snell’s law."
};

}).flat()

];
