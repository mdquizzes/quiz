const quizData_part1 = [

{
question: "What is the SI unit of electric current?",
answers: [
{ text: "Ampere", correct: true },
{ text: "Volt", correct: false },
{ text: "Ohm", correct: false },
{ text: "Watt", correct: false }
],
solution: "SI unit of electric current is Ampere."
},

{
question: "Electric current is defined as:",
answers: [
{ text: "Flow of charge per unit time", correct: true },
{ text: "Energy flow", correct: false },
{ text: "Voltage flow", correct: false },
{ text: "Resistance", correct: false }
],
solution: "I = Q/t defines current."
},

{
question: "Charge of electron is:",
answers: [
{ text: "1.6 × 10^-19 C", correct: true },
{ text: "1.6 × 10^19 C", correct: false },
{ text: "1 C", correct: false },
{ text: "10^-6 C", correct: false }
],
solution: "Charge of one electron is 1.6 × 10^-19 C."
},

{
question: "Potential difference unit is:",
answers: [
{ text: "Volt", correct: true },
{ text: "Ampere", correct: false },
{ text: "Ohm", correct: false },
{ text: "Joule", correct: false }
],
solution: "Potential difference is measured in volts."
},

{
question: "Ohm’s Law formula:",
answers: [
{ text: "V = IR", correct: true },
{ text: "P = VI", correct: false },
{ text: "I = V²", correct: false },
{ text: "R = VI", correct: false }
],
solution: "Ohm’s law states V = IR."
},

{
question: "Resistance unit:",
answers: [
{ text: "Ohm", correct: true },
{ text: "Volt", correct: false },
{ text: "Ampere", correct: false },
{ text: "Watt", correct: false }
],
solution: "Unit of resistance is ohm."
},

{
question: "Resistivity depends on:",
answers: [
{ text: "Material", correct: true },
{ text: "Length", correct: false },
{ text: "Area", correct: false },
{ text: "Shape", correct: false }
],
solution: "Resistivity is property of material."
},

{
question: "Resistance is directly proportional to:",
answers: [
{ text: "Length", correct: true },
{ text: "Area", correct: false },
{ text: "Voltage", correct: false },
{ text: "Current", correct: false }
],
solution: "R ∝ L."
},

{
question: "Resistance is inversely proportional to:",
answers: [
{ text: "Area", correct: true },
{ text: "Length", correct: false },
{ text: "Voltage", correct: false },
{ text: "Time", correct: false }
],
solution: "R ∝ 1/A."
},

{
question: "Good conductor example:",
answers: [
{ text: "Copper", correct: true },
{ text: "Rubber", correct: false },
{ text: "Plastic", correct: false },
{ text: "Wood", correct: false }
],
solution: "Copper is a good conductor."
},

// NUMERICALS

{
question: "Find current if 20C flows in 4s.",
answers: [
{ text: "5 A", correct: true },
{ text: "4 A", correct: false },
{ text: "10 A", correct: false },
{ text: "2 A", correct: false }
],
solution: "I = Q/t = 20/4 = 5A."
},

{
question: "Find resistance if V=12V, I=3A.",
answers: [
{ text: "4 Ω", correct: true },
{ text: "3 Ω", correct: false },
{ text: "6 Ω", correct: false },
{ text: "12 Ω", correct: false }
],
solution: "R = V/I = 12/3 = 4Ω."
},

{
question: "Two resistors 3Ω and 2Ω in series:",
answers: [
{ text: "5 Ω", correct: true },
{ text: "1 Ω", correct: false },
{ text: "6 Ω", correct: false },
{ text: "2 Ω", correct: false }
],
solution: "Series sum = 5Ω."
},

{
question: "Parallel of 2Ω and 2Ω:",
answers: [
{ text: "1 Ω", correct: true },
{ text: "4 Ω", correct: false },
{ text: "2 Ω", correct: false },
{ text: "0.5 Ω", correct: false }
],
solution: "Equal resistors → R/2."
},

{
question: "Power formula:",
answers: [
{ text: "P = VI", correct: true },
{ text: "V = IR", correct: false },
{ text: "R = VI", correct: false },
{ text: "I = V²", correct: false }
],
solution: "Power = VI."
},

{
question: "Unit of electrical energy:",
answers: [
{ text: "kWh", correct: true },
{ text: "Volt", correct: false },
{ text: "Ohm", correct: false },
{ text: "Ampere", correct: false }
],
solution: "Energy unit is kWh."
},

// ASSERTION

{
question: "Assertion: Series circuit current same. Reason: Same path.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Series → same current path."
},

{
question: "Assertion: Parallel voltage same. Reason: Same nodes.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Parallel → same voltage."
},

// CONCEPTUAL

{
question: "Why tungsten in bulb?",
answers: [
{ text: "High melting point", correct: true },
{ text: "Low resistance", correct: false },
{ text: "Cheap", correct: false },
{ text: "Light metal", correct: false }
],
solution: "Tungsten resists high heat."
},

{
question: "Heating effect law:",
answers: [
{ text: "I²Rt", correct: true },
{ text: "V=IR", correct: false },
{ text: "P=VI", correct: false },
{ text: "R=V/I", correct: false }
],
solution: "Joule’s law."
}

];
const quizData_part2 = [

{
question: "What is the SI unit of electric charge?",
answers: [
{ text: "Coulomb", correct: true },
{ text: "Ampere", correct: false },
{ text: "Volt", correct: false },
{ text: "Ohm", correct: false }
],
solution: "SI unit of electric charge is Coulomb (C)."
},

{
question: "1 Volt is equal to:",
answers: [
{ text: "1 Joule/Coulomb", correct: true },
{ text: "1 Coulomb/Joule", correct: false },
{ text: "1 Watt/Ampere", correct: false },
{ text: "1 Ampere/Volt", correct: false }
],
solution: "V = W/Q → 1V = 1J/C."
},

{
question: "Instrument used to measure current:",
answers: [
{ text: "Ammeter", correct: true },
{ text: "Voltmeter", correct: false },
{ text: "Thermometer", correct: false },
{ text: "Barometer", correct: false }
],
solution: "Ammeter measures current."
},

{
question: "Ammeter is connected in:",
answers: [
{ text: "Series", correct: true },
{ text: "Parallel", correct: false },
{ text: "Both", correct: false },
{ text: "None", correct: false }
],
solution: "Ammeter is connected in series."
},

{
question: "Voltmeter is connected in:",
answers: [
{ text: "Parallel", correct: true },
{ text: "Series", correct: false },
{ text: "Both", correct: false },
{ text: "None", correct: false }
],
solution: "Voltmeter is connected in parallel."
},

{
question: "If resistance doubles, current becomes:",
answers: [
{ text: "Half", correct: true },
{ text: "Double", correct: false },
{ text: "Same", correct: false },
{ text: "Zero", correct: false }
],
solution: "I ∝ 1/R."
},

{
question: "If voltage doubles, current becomes:",
answers: [
{ text: "Double", correct: true },
{ text: "Half", correct: false },
{ text: "Same", correct: false },
{ text: "Zero", correct: false }
],
solution: "I ∝ V."
},

{
question: "Which has highest resistivity?",
answers: [
{ text: "Rubber", correct: true },
{ text: "Copper", correct: false },
{ text: "Aluminium", correct: false },
{ text: "Silver", correct: false }
],
solution: "Rubber is an insulator."
},

{
question: "Drift velocity depends on:",
answers: [
{ text: "Electric field", correct: true },
{ text: "Color", correct: false },
{ text: "Mass only", correct: false },
{ text: "Time", correct: false }
],
solution: "Drift velocity ∝ electric field."
},

{
question: "Graph of V vs I is:",
answers: [
{ text: "Straight line", correct: true },
{ text: "Circle", correct: false },
{ text: "Curve", correct: false },
{ text: "Parabola", correct: false }
],
solution: "Ohm’s law gives linear graph."
},

// NUMERICALS

{
question: "Find voltage if I=2A, R=5Ω.",
answers: [
{ text: "10 V", correct: true },
{ text: "5 V", correct: false },
{ text: "2 V", correct: false },
{ text: "20 V", correct: false }
],
solution: "V = IR = 2×5 = 10V."
},

{
question: "Find power if V=10V, I=3A.",
answers: [
{ text: "30 W", correct: true },
{ text: "13 W", correct: false },
{ text: "3 W", correct: false },
{ text: "100 W", correct: false }
],
solution: "P = VI = 30W."
},

{
question: "Find heat if I=2A, R=5Ω, t=10s.",
answers: [
{ text: "200 J", correct: true },
{ text: "100 J", correct: false },
{ text: "50 J", correct: false },
{ text: "20 J", correct: false }
],
solution: "H = I²Rt = 4×5×10 = 200J."
},

{
question: "Equivalent resistance of 1Ω, 2Ω, 3Ω in series:",
answers: [
{ text: "6 Ω", correct: true },
{ text: "3 Ω", correct: false },
{ text: "2 Ω", correct: false },
{ text: "1 Ω", correct: false }
],
solution: "Series sum = 6Ω."
},

{
question: "Parallel of 3Ω and 6Ω:",
answers: [
{ text: "2 Ω", correct: true },
{ text: "9 Ω", correct: false },
{ text: "3 Ω", correct: false },
{ text: "6 Ω", correct: false }
],
solution: "1/R = 1/3 + 1/6 → R=2Ω."
},

{
question: "Find current if P=20W, V=10V.",
answers: [
{ text: "2 A", correct: true },
{ text: "10 A", correct: false },
{ text: "5 A", correct: false },
{ text: "1 A", correct: false }
],
solution: "I = P/V = 20/10 = 2A."
},

// ASSERTION

{
question: "Assertion: Resistance increases with temperature. Reason: Collisions increase.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Temperature ↑ → collisions ↑ → resistance ↑."
},

{
question: "Assertion: Parallel circuit safer. Reason: Independent paths.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Parallel allows independent operation."
},

// HOTS

{
question: "Why fuse has low melting point?",
answers: [
{ text: "To break circuit quickly", correct: true },
{ text: "To increase current", correct: false },
{ text: "To store energy", correct: false },
{ text: "To reduce voltage", correct: false }
],
solution: "Fuse melts to protect circuit."
},

{
question: "Why thick wires have low resistance?",
answers: [
{ text: "Larger area", correct: true },
{ text: "Short length", correct: false },
{ text: "High voltage", correct: false },
{ text: "Low current", correct: false }
],
solution: "R ∝ 1/A."
}

];
const quizData_part3 = [

{
question: "A wire of resistance 10Ω is stretched to double its length. New resistance becomes:",
answers: [
{ text: "40 Ω", correct: true },
{ text: "20 Ω", correct: false },
{ text: "10 Ω", correct: false },
{ text: "5 Ω", correct: false }
],
solution: "R ∝ L² (since area halves), so 4× increase → 40Ω."
},

{
question: "If area of cross-section doubles, resistance becomes:",
answers: [
{ text: "Half", correct: true },
{ text: "Double", correct: false },
{ text: "Same", correct: false },
{ text: "Zero", correct: false }
],
solution: "R ∝ 1/A."
},

{
question: "Two wires of same material and length, one thick and one thin. Which has more resistance?",
answers: [
{ text: "Thin wire", correct: true },
{ text: "Thick wire", correct: false },
{ text: "Both same", correct: false },
{ text: "Cannot say", correct: false }
],
solution: "Smaller area → higher resistance."
},

{
question: "Equivalent resistance of three 6Ω resistors in parallel:",
answers: [
{ text: "2 Ω", correct: true },
{ text: "6 Ω", correct: false },
{ text: "3 Ω", correct: false },
{ text: "1 Ω", correct: false }
],
solution: "R = 6/3 = 2Ω."
},

{
question: "Equivalent resistance of three 6Ω resistors in series:",
answers: [
{ text: "18 Ω", correct: true },
{ text: "6 Ω", correct: false },
{ text: "3 Ω", correct: false },
{ text: "12 Ω", correct: false }
],
solution: "Series sum = 18Ω."
},

{
question: "A 100W bulb operates at 220V. Current drawn is:",
answers: [
{ text: "0.45 A", correct: true },
{ text: "2 A", correct: false },
{ text: "1 A", correct: false },
{ text: "0.1 A", correct: false }
],
solution: "I = P/V = 100/220 ≈ 0.45A."
},

{
question: "Electric energy consumed is given by:",
answers: [
{ text: "P × t", correct: true },
{ text: "V × I", correct: false },
{ text: "I²R", correct: false },
{ text: "V/R", correct: false }
],
solution: "Energy = Power × time."
},

{
question: "1 kWh is equal to:",
answers: [
{ text: "3.6 × 10^6 J", correct: true },
{ text: "1000 J", correct: false },
{ text: "3600 J", correct: false },
{ text: "10^3 J", correct: false }
],
solution: "Standard conversion."
},

{
question: "A device consumes 1000W for 2 hours. Energy used:",
answers: [
{ text: "2 kWh", correct: true },
{ text: "1000 kWh", correct: false },
{ text: "500 kWh", correct: false },
{ text: "1 kWh", correct: false }
],
solution: "Energy = 1kW × 2h = 2kWh."
},

{
question: "Filament of bulb is made thin to:",
answers: [
{ text: "Increase resistance", correct: true },
{ text: "Decrease resistance", correct: false },
{ text: "Increase voltage", correct: false },
{ text: "Decrease current", correct: false }
],
solution: "Thin wire → high resistance → heat."
},

// CASE BASED

{
question: "Two resistors R1=4Ω and R2=6Ω connected in parallel. Total resistance is:",
answers: [
{ text: "2.4 Ω", correct: true },
{ text: "10 Ω", correct: false },
{ text: "5 Ω", correct: false },
{ text: "3 Ω", correct: false }
],
solution: "1/R = 1/4 + 1/6 = 5/12 → R = 2.4Ω."
},

{
question: "In above circuit, total resistance is less than:",
answers: [
{ text: "Smallest resistor", correct: true },
{ text: "Largest resistor", correct: false },
{ text: "Sum", correct: false },
{ text: "Average", correct: false }
],
solution: "Parallel always less than smallest."
},

{
question: "Why series combination not used in homes?",
answers: [
{ text: "Same current, failure affects all", correct: true },
{ text: "High voltage", correct: false },
{ text: "Low current", correct: false },
{ text: "Cheap", correct: false }
],
solution: "Series causes total failure."
},

{
question: "Why parallel preferred in homes?",
answers: [
{ text: "Same voltage across devices", correct: true },
{ text: "Same current", correct: false },
{ text: "Less resistance", correct: false },
{ text: "More heat", correct: false }
],
solution: "Each gets full voltage."
},

// ASSERTION REASON

{
question: "Assertion: Metals have low resistivity. Reason: Free electrons present.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Free electrons allow easy flow."
},

{
question: "Assertion: Insulators resist current. Reason: No free electrons.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Insulators lack free electrons."
},

// HOTS

{
question: "If two bulbs of 60W and 100W connected in parallel, which glows brighter?",
answers: [
{ text: "100W bulb", correct: true },
{ text: "60W bulb", correct: false },
{ text: "Both same", correct: false },
{ text: "None", correct: false }
],
solution: "Higher power → brighter."
},

{
question: "If same bulbs connected in series, which glows brighter?",
answers: [
{ text: "60W bulb", correct: true },
{ text: "100W bulb", correct: false },
{ text: "Both same", correct: false },
{ text: "None", correct: false }
],
solution: "Lower power bulb has higher resistance → brighter in series."
},

{
question: "Why electric heater uses nichrome wire?",
answers: [
{ text: "High resistivity and melting point", correct: true },
{ text: "Low resistance", correct: false },
{ text: "Cheap", correct: false },
{ text: "Soft metal", correct: false }
],
solution: "Nichrome produces heat efficiently."
},

{
question: "What happens if fuse wire is replaced with copper wire?",
answers: [
{ text: "No protection, dangerous", correct: true },
{ text: "Better protection", correct: false },
{ text: "Less current", correct: false },
{ text: "Circuit stops", correct: false }
],
solution: "Copper won't melt easily."
}

];
const quizData_part4 = [

{
question: "What does 1 Ohm represent?",
answers: [
{ text: "Resistance when 1V produces 1A", correct: true },
{ text: "1 Coulomb charge", correct: false },
{ text: "1 Watt power", correct: false },
{ text: "1 Joule energy", correct: false }
],
solution: "1Ω = V/I when V=1V and I=1A."
},

{
question: "Which quantity remains same in series circuit?",
answers: [
{ text: "Current", correct: true },
{ text: "Voltage", correct: false },
{ text: "Resistance", correct: false },
{ text: "Power", correct: false }
],
solution: "Same current flows in series."
},

{
question: "Which quantity remains same in parallel circuit?",
answers: [
{ text: "Voltage", correct: true },
{ text: "Current", correct: false },
{ text: "Resistance", correct: false },
{ text: "Power", correct: false }
],
solution: "Voltage is same across parallel branches."
},

{
question: "If current is zero, circuit is:",
answers: [
{ text: "Open", correct: true },
{ text: "Closed", correct: false },
{ text: "Short", correct: false },
{ text: "Parallel", correct: false }
],
solution: "No current → open circuit."
},

{
question: "Which material is used in fuse?",
answers: [
{ text: "Tin-lead alloy", correct: true },
{ text: "Copper", correct: false },
{ text: "Iron", correct: false },
{ text: "Aluminium", correct: false }
],
solution: "Fuse needs low melting point alloy."
},

{
question: "Short circuit occurs due to:",
answers: [
{ text: "Direct contact of live and neutral", correct: true },
{ text: "High resistance", correct: false },
{ text: "Low voltage", correct: false },
{ text: "Low current", correct: false }
],
solution: "Short circuit causes sudden high current."
},

{
question: "Commercial unit of electrical energy:",
answers: [
{ text: "kWh", correct: true },
{ text: "Joule", correct: false },
{ text: "Watt", correct: false },
{ text: "Volt", correct: false }
],
solution: "Electricity bill uses kWh."
},

{
question: "1 unit of electricity equals:",
answers: [
{ text: "1 kWh", correct: true },
{ text: "1000 J", correct: false },
{ text: "3600 J", correct: false },
{ text: "1 W", correct: false }
],
solution: "1 unit = 1 kWh."
},

{
question: "Resistance of conductor increases with:",
answers: [
{ text: "Temperature", correct: true },
{ text: "Area", correct: false },
{ text: "Voltage", correct: false },
{ text: "Current", correct: false }
],
solution: "Temperature increases resistance."
},

{
question: "Which has lowest resistivity?",
answers: [
{ text: "Silver", correct: true },
{ text: "Copper", correct: false },
{ text: "Iron", correct: false },
{ text: "Nichrome", correct: false }
],
solution: "Silver is best conductor."
},

// NUMERICALS

{
question: "Find power if V=220V and I=2A.",
answers: [
{ text: "440 W", correct: true },
{ text: "220 W", correct: false },
{ text: "110 W", correct: false },
{ text: "660 W", correct: false }
],
solution: "P = VI = 220×2 = 440W."
},

{
question: "Find energy for 100W bulb used 10 hours.",
answers: [
{ text: "1 kWh", correct: true },
{ text: "10 kWh", correct: false },
{ text: "100 kWh", correct: false },
{ text: "0.1 kWh", correct: false }
],
solution: "100W = 0.1kW → 0.1×10 = 1kWh."
},

{
question: "Find current if P=440W and V=220V.",
answers: [
{ text: "2 A", correct: true },
{ text: "1 A", correct: false },
{ text: "4 A", correct: false },
{ text: "0.5 A", correct: false }
],
solution: "I = P/V = 440/220 = 2A."
},

{
question: "Find resistance if P=100W, V=10V.",
answers: [
{ text: "1 Ω", correct: true },
{ text: "10 Ω", correct: false },
{ text: "100 Ω", correct: false },
{ text: "0.1 Ω", correct: false }
],
solution: "R = V²/P = 100/100 = 1Ω."
},

{
question: "Two resistors 5Ω and 5Ω in parallel:",
answers: [
{ text: "2.5 Ω", correct: true },
{ text: "10 Ω", correct: false },
{ text: "5 Ω", correct: false },
{ text: "1 Ω", correct: false }
],
solution: "Equal resistors → R/2."
},

{
question: "Three resistors 2Ω each in series:",
answers: [
{ text: "6 Ω", correct: true },
{ text: "2 Ω", correct: false },
{ text: "3 Ω", correct: false },
{ text: "1 Ω", correct: false }
],
solution: "Series sum = 6Ω."
},

// ASSERTION

{
question: "Assertion: Power increases with current. Reason: P = VI.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Power depends on current."
},

{
question: "Assertion: Energy depends on time. Reason: E = Pt.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Energy increases with time."
},

// HOTS

{
question: "Why are domestic circuits parallel?",
answers: [
{ text: "Independent operation", correct: true },
{ text: "Less resistance", correct: false },
{ text: "More current", correct: false },
{ text: "More heat", correct: false }
],
solution: "Devices work independently."
},

{
question: "Why high power appliances need thick wires?",
answers: [
{ text: "To reduce heating", correct: true },
{ text: "To increase resistance", correct: false },
{ text: "To reduce voltage", correct: false },
{ text: "To increase power", correct: false }
],
solution: "Thicker wire → lower resistance → less heat."
}

];
const quizData_part5 = [

{
question: "The slope of V-I graph gives:",
answers: [
{ text: "Resistance", correct: true },
{ text: "Current", correct: false },
{ text: "Voltage", correct: false },
{ text: "Power", correct: false }
],
solution: "Slope = V/I = Resistance."
},

{
question: "If V-I graph is steeper, resistance is:",
answers: [
{ text: "High", correct: true },
{ text: "Low", correct: false },
{ text: "Zero", correct: false },
{ text: "Infinite", correct: false }
],
solution: "Steeper slope → higher resistance."
},

{
question: "Which device converts electrical energy into heat?",
answers: [
{ text: "Electric heater", correct: true },
{ text: "Motor", correct: false },
{ text: "Generator", correct: false },
{ text: "Battery", correct: false }
],
solution: "Heater uses heating effect."
},

{
question: "Which device converts electrical energy into mechanical energy?",
answers: [
{ text: "Electric motor", correct: true },
{ text: "Bulb", correct: false },
{ text: "Heater", correct: false },
{ text: "Resistor", correct: false }
],
solution: "Motor converts to mechanical energy."
},

{
question: "If resistance is zero, conductor is:",
answers: [
{ text: "Superconductor", correct: true },
{ text: "Insulator", correct: false },
{ text: "Semiconductor", correct: false },
{ text: "Normal conductor", correct: false }
],
solution: "Zero resistance → superconductivity."
},

{
question: "Which wire is safest for high current?",
answers: [
{ text: "Thick copper wire", correct: true },
{ text: "Thin copper wire", correct: false },
{ text: "Thin aluminium wire", correct: false },
{ text: "Plastic wire", correct: false }
],
solution: "Thicker → less resistance."
},

{
question: "Electric fuse works on:",
answers: [
{ text: "Heating effect", correct: true },
{ text: "Magnetic effect", correct: false },
{ text: "Chemical effect", correct: false },
{ text: "Optical effect", correct: false }
],
solution: "Fuse melts due to heat."
},

{
question: "Which has higher resistance?",
answers: [
{ text: "Long thin wire", correct: true },
{ text: "Short thick wire", correct: false },
{ text: "Short thin wire", correct: false },
{ text: "Thick long wire", correct: false }
],
solution: "R ∝ L and inversely ∝ A."
},

{
question: "Electric power is maximum when:",
answers: [
{ text: "Current is high", correct: true },
{ text: "Voltage is zero", correct: false },
{ text: "Resistance is zero", correct: false },
{ text: "Time is zero", correct: false }
],
solution: "P = VI."
},

{
question: "Resistance of ideal conductor is:",
answers: [
{ text: "Zero", correct: true },
{ text: "Infinite", correct: false },
{ text: "1 Ohm", correct: false },
{ text: "Very high", correct: false }
],
solution: "Ideal conductor → zero resistance."
},

// NUMERICALS

{
question: "Find energy if P=500W, t=2h.",
answers: [
{ text: "1 kWh", correct: true },
{ text: "500 kWh", correct: false },
{ text: "2 kWh", correct: false },
{ text: "0.5 kWh", correct: false }
],
solution: "0.5kW × 2h = 1kWh."
},

{
question: "Find current if R=10Ω, V=20V.",
answers: [
{ text: "2 A", correct: true },
{ text: "10 A", correct: false },
{ text: "5 A", correct: false },
{ text: "1 A", correct: false }
],
solution: "I = V/R = 20/10 = 2A."
},

{
question: "Find voltage if P=60W, I=2A.",
answers: [
{ text: "30 V", correct: true },
{ text: "120 V", correct: false },
{ text: "60 V", correct: false },
{ text: "2 V", correct: false }
],
solution: "V = P/I = 60/2 = 30V."
},

{
question: "Find resistance if I=2A, V=6V.",
answers: [
{ text: "3 Ω", correct: true },
{ text: "12 Ω", correct: false },
{ text: "2 Ω", correct: false },
{ text: "6 Ω", correct: false }
],
solution: "R = V/I = 6/2 = 3Ω."
},

{
question: "Find heat if I=3A, R=2Ω, t=5s.",
answers: [
{ text: "90 J", correct: true },
{ text: "30 J", correct: false },
{ text: "60 J", correct: false },
{ text: "45 J", correct: false }
],
solution: "H = I²Rt = 9×2×5 = 90J."
},

{
question: "Equivalent resistance of 4Ω, 4Ω in parallel:",
answers: [
{ text: "2 Ω", correct: true },
{ text: "8 Ω", correct: false },
{ text: "4 Ω", correct: false },
{ text: "1 Ω", correct: false }
],
solution: "Equal resistors → R/2."
},

// ASSERTION

{
question: "Assertion: Current produces heat. Reason: Moving electrons collide.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Collisions cause heat."
},

{
question: "Assertion: Resistance decreases with temperature in metals. Reason: Collisions reduce.",
answers: [
{ text: "Both wrong", correct: true },
{ text: "Both correct", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "In metals, resistance increases."
},

// HOTS

{
question: "Why does bulb glow dim when voltage is low?",
answers: [
{ text: "Less current flows", correct: true },
{ text: "More resistance", correct: false },
{ text: "More power", correct: false },
{ text: "More heat", correct: false }
],
solution: "Low voltage → low current → dim light."
},

{
question: "Why are heating devices high resistance?",
answers: [
{ text: "To produce more heat", correct: true },
{ text: "To reduce current", correct: false },
{ text: "To reduce voltage", correct: false },
{ text: "To save energy", correct: false }
],
solution: "Heat ∝ R."
}

];
const quizData_part6 = [

{
question: "If two resistors R and 2R are connected in series, equivalent resistance is:",
answers: [
{ text: "3R", correct: true },
{ text: "2R", correct: false },
{ text: "R/2", correct: false },
{ text: "R", correct: false }
],
solution: "Series: R + 2R = 3R."
},

{
question: "If two resistors R and 2R are connected in parallel, equivalent resistance is:",
answers: [
{ text: "2R/3", correct: true },
{ text: "3R", correct: false },
{ text: "R/2", correct: false },
{ text: "R", correct: false }
],
solution: "1/Re = 1/R + 1/2R → Re = 2R/3."
},

{
question: "Which device prevents excessive current?",
answers: [
{ text: "Fuse", correct: true },
{ text: "Switch", correct: false },
{ text: "Battery", correct: false },
{ text: "Resistor", correct: false }
],
solution: "Fuse protects circuit."
},

{
question: "Unit of electric power in SI:",
answers: [
{ text: "Watt", correct: true },
{ text: "Volt", correct: false },
{ text: "Ohm", correct: false },
{ text: "Ampere", correct: false }
],
solution: "Power unit is watt."
},

{
question: "Which material is best conductor?",
answers: [
{ text: "Silver", correct: true },
{ text: "Iron", correct: false },
{ text: "Nichrome", correct: false },
{ text: "Wood", correct: false }
],
solution: "Silver has lowest resistivity."
},

{
question: "If voltage is constant, increasing resistance causes:",
answers: [
{ text: "Decrease in current", correct: true },
{ text: "Increase in current", correct: false },
{ text: "No change", correct: false },
{ text: "Infinite current", correct: false }
],
solution: "I = V/R."
},

{
question: "Which law explains heating effect?",
answers: [
{ text: "Joule’s law", correct: true },
{ text: "Ohm’s law", correct: false },
{ text: "Newton’s law", correct: false },
{ text: "Faraday’s law", correct: false }
],
solution: "H = I²Rt."
},

{
question: "Electric bulb works on:",
answers: [
{ text: "Heating effect", correct: true },
{ text: "Magnetic effect", correct: false },
{ text: "Chemical effect", correct: false },
{ text: "Mechanical effect", correct: false }
],
solution: "Filament glows due to heat."
},

{
question: "Which has maximum resistance?",
answers: [
{ text: "Thin long wire", correct: true },
{ text: "Short thick wire", correct: false },
{ text: "Thick long wire", correct: false },
{ text: "Short thin wire", correct: false }
],
solution: "R ∝ L and inversely ∝ A."
},

{
question: "Current in a conductor depends on:",
answers: [
{ text: "Voltage and resistance", correct: true },
{ text: "Mass", correct: false },
{ text: "Color", correct: false },
{ text: "Shape only", correct: false }
],
solution: "I = V/R."
},

// NUMERICALS

{
question: "Find current if V=24V, R=6Ω.",
answers: [
{ text: "4 A", correct: true },
{ text: "6 A", correct: false },
{ text: "2 A", correct: false },
{ text: "12 A", correct: false }
],
solution: "I = V/R = 24/6 = 4A."
},

{
question: "Find power if I=5A, R=2Ω.",
answers: [
{ text: "50 W", correct: true },
{ text: "10 W", correct: false },
{ text: "25 W", correct: false },
{ text: "100 W", correct: false }
],
solution: "P = I²R = 25×2 = 50W."
},

{
question: "Find voltage if P=100W, I=5A.",
answers: [
{ text: "20 V", correct: true },
{ text: "500 V", correct: false },
{ text: "5 V", correct: false },
{ text: "10 V", correct: false }
],
solution: "V = P/I = 100/5 = 20V."
},

{
question: "Equivalent resistance of 10Ω and 20Ω in parallel:",
answers: [
{ text: "6.67 Ω", correct: true },
{ text: "30 Ω", correct: false },
{ text: "10 Ω", correct: false },
{ text: "20 Ω", correct: false }
],
solution: "1/R = 1/10 + 1/20 = 3/20 → R = 20/3."
},

{
question: "Equivalent resistance of 10Ω and 20Ω in series:",
answers: [
{ text: "30 Ω", correct: true },
{ text: "10 Ω", correct: false },
{ text: "20 Ω", correct: false },
{ text: "15 Ω", correct: false }
],
solution: "Series sum = 30Ω."
},

{
question: "Find energy if P=200W, t=5h.",
answers: [
{ text: "1 kWh", correct: true },
{ text: "1000 kWh", correct: false },
{ text: "5 kWh", correct: false },
{ text: "0.5 kWh", correct: false }
],
solution: "0.2kW × 5h = 1kWh."
},

// ASSERTION

{
question: "Assertion: Conductors allow current easily. Reason: They have free electrons.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Free electrons allow flow."
},

{
question: "Assertion: Power depends on resistance only. Reason: P = I²R.",
answers: [
{ text: "Both wrong", correct: true },
{ text: "Both correct", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Power depends on V, I also."
},

// HOTS

{
question: "Why series circuit used in decorative lights?",
answers: [
{ text: "Same current through all bulbs", correct: true },
{ text: "Same voltage", correct: false },
{ text: "Less resistance", correct: false },
{ text: "More power", correct: false }
],
solution: "Series ensures equal current."
},

{
question: "Why parallel circuit is expensive?",
answers: [
{ text: "More wiring required", correct: true },
{ text: "Less current", correct: false },
{ text: "Less voltage", correct: false },
{ text: "Less safety", correct: false }
],
solution: "Parallel uses more wires."
}

];
const quizData_part7 = [

{
question: "Define potential difference between two points.",
answers: [
{ text: "Work done per unit charge", correct: true },
{ text: "Charge per unit time", correct: false },
{ text: "Energy per unit current", correct: false },
{ text: "Power per unit charge", correct: false }
],
solution: "V = W/Q."
},

{
question: "What happens to resistance if length is halved?",
answers: [
{ text: "Becomes half", correct: true },
{ text: "Becomes double", correct: false },
{ text: "Remains same", correct: false },
{ text: "Becomes zero", correct: false }
],
solution: "R ∝ L."
},

{
question: "What happens if cross-sectional area is halved?",
answers: [
{ text: "Resistance doubles", correct: true },
{ text: "Resistance halves", correct: false },
{ text: "No change", correct: false },
{ text: "Zero resistance", correct: false }
],
solution: "R ∝ 1/A."
},

{
question: "Which statement is correct for Ohm’s law?",
answers: [
{ text: "V/I = constant at constant temperature", correct: true },
{ text: "V × I = constant", correct: false },
{ text: "V/I = variable always", correct: false },
{ text: "R = V × I", correct: false }
],
solution: "Ohm’s law holds at constant temperature."
},

{
question: "What is the resistance of a conductor with zero resistivity?",
answers: [
{ text: "Zero", correct: true },
{ text: "Infinite", correct: false },
{ text: "1 Ω", correct: false },
{ text: "Very high", correct: false }
],
solution: "Zero resistivity → zero resistance."
},

{
question: "Why are heating elements made of alloys?",
answers: [
{ text: "High resistivity and melting point", correct: true },
{ text: "Low resistance", correct: false },
{ text: "Cheap", correct: false },
{ text: "Light weight", correct: false }
],
solution: "Alloys produce more heat."
},

{
question: "Which combination gives minimum resistance?",
answers: [
{ text: "Parallel", correct: true },
{ text: "Series", correct: false },
{ text: "Mixed", correct: false },
{ text: "None", correct: false }
],
solution: "Parallel reduces resistance."
},

{
question: "Which combination gives maximum resistance?",
answers: [
{ text: "Series", correct: true },
{ text: "Parallel", correct: false },
{ text: "Mixed", correct: false },
{ text: "None", correct: false }
],
solution: "Series increases resistance."
},

{
question: "If two identical resistors are connected in parallel, resistance becomes:",
answers: [
{ text: "Half", correct: true },
{ text: "Double", correct: false },
{ text: "Same", correct: false },
{ text: "Zero", correct: false }
],
solution: "R/2 for identical resistors."
},

{
question: "If two identical resistors are connected in series, resistance becomes:",
answers: [
{ text: "Double", correct: true },
{ text: "Half", correct: false },
{ text: "Same", correct: false },
{ text: "Zero", correct: false }
],
solution: "R + R = 2R."
},

// NUMERICALS (CBSE STYLE)

{
question: "Find resistance if V=6V and I=2A.",
answers: [
{ text: "3 Ω", correct: true },
{ text: "12 Ω", correct: false },
{ text: "2 Ω", correct: false },
{ text: "6 Ω", correct: false }
],
solution: "R = V/I = 6/2 = 3Ω."
},

{
question: "Find current if R=4Ω and V=8V.",
answers: [
{ text: "2 A", correct: true },
{ text: "4 A", correct: false },
{ text: "8 A", correct: false },
{ text: "1 A", correct: false }
],
solution: "I = V/R = 8/4 = 2A."
},

{
question: "Find power if V=12V and I=3A.",
answers: [
{ text: "36 W", correct: true },
{ text: "15 W", correct: false },
{ text: "9 W", correct: false },
{ text: "4 W", correct: false }
],
solution: "P = VI = 36W."
},

{
question: "Find energy used by 60W bulb in 5 hours.",
answers: [
{ text: "0.3 kWh", correct: true },
{ text: "3 kWh", correct: false },
{ text: "60 kWh", correct: false },
{ text: "5 kWh", correct: false }
],
solution: "0.06kW × 5h = 0.3kWh."
},

{
question: "Equivalent resistance of 8Ω and 8Ω in parallel:",
answers: [
{ text: "4 Ω", correct: true },
{ text: "16 Ω", correct: false },
{ text: "8 Ω", correct: false },
{ text: "2 Ω", correct: false }
],
solution: "R/2 = 4Ω."
},

{
question: "Equivalent resistance of 8Ω and 8Ω in series:",
answers: [
{ text: "16 Ω", correct: true },
{ text: "8 Ω", correct: false },
{ text: "4 Ω", correct: false },
{ text: "2 Ω", correct: false }
],
solution: "Sum = 16Ω."
},

// ASSERTION REASON (CBSE PATTERN)

{
question: "Assertion: Current flows only in closed circuit. Reason: Path must be complete.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Closed path required."
},

{
question: "Assertion: Fuse is connected in parallel. Reason: It protects circuit.",
answers: [
{ text: "Both wrong", correct: true },
{ text: "Both correct", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Fuse is connected in series."
},

// HOTS (BOARD LEVEL)

{
question: "Why does a bulb glow brighter when voltage increases?",
answers: [
{ text: "More current flows", correct: true },
{ text: "Resistance decreases", correct: false },
{ text: "Less heat produced", correct: false },
{ text: "Voltage has no effect", correct: false }
],
solution: "Higher voltage → more current → more power."
},

{
question: "Why should high power devices not be connected in series?",
answers: [
{ text: "Unequal voltage distribution", correct: true },
{ text: "Same voltage", correct: false },
{ text: "Low current", correct: false },
{ text: "No heat", correct: false }
],
solution: "Series divides voltage."
}

];
const quizData_part8 = [

{
question: "A current of 0.5A flows through a conductor for 10s. Charge passed is:",
answers: [
{ text: "5 C", correct: true },
{ text: "10 C", correct: false },
{ text: "0.05 C", correct: false },
{ text: "50 C", correct: false }
],
solution: "Q = It = 0.5 × 10 = 5C."
},

{
question: "Find resistance if 2A current flows under 10V.",
answers: [
{ text: "5 Ω", correct: true },
{ text: "20 Ω", correct: false },
{ text: "2 Ω", correct: false },
{ text: "10 Ω", correct: false }
],
solution: "R = V/I = 10/2 = 5Ω."
},

{
question: "Find power if resistance is 5Ω and current is 2A.",
answers: [
{ text: "20 W", correct: true },
{ text: "10 W", correct: false },
{ text: "5 W", correct: false },
{ text: "25 W", correct: false }
],
solution: "P = I²R = 4×5 = 20W."
},

{
question: "Find voltage if resistance 4Ω and current 3A.",
answers: [
{ text: "12 V", correct: true },
{ text: "7 V", correct: false },
{ text: "1 V", correct: false },
{ text: "4 V", correct: false }
],
solution: "V = IR = 12V."
},

// CASE STUDY 1

{
question: "Case: Two resistors 10Ω and 20Ω connected in series. Total resistance:",
answers: [
{ text: "30 Ω", correct: true },
{ text: "10 Ω", correct: false },
{ text: "20 Ω", correct: false },
{ text: "5 Ω", correct: false }
],
solution: "Series → sum."
},

{
question: "Case: Same resistors in parallel. Equivalent resistance:",
answers: [
{ text: "6.67 Ω", correct: true },
{ text: "30 Ω", correct: false },
{ text: "15 Ω", correct: false },
{ text: "10 Ω", correct: false }
],
solution: "1/R = 1/10 + 1/20."
},

{
question: "Case: Which combination gives more current?",
answers: [
{ text: "Parallel", correct: true },
{ text: "Series", correct: false },
{ text: "Both same", correct: false },
{ text: "None", correct: false }
],
solution: "Lower resistance → more current."
},

// CASE STUDY 2

{
question: "Case: A bulb rated 100W, 220V. Current drawn:",
answers: [
{ text: "0.45 A", correct: true },
{ text: "2 A", correct: false },
{ text: "1 A", correct: false },
{ text: "0.1 A", correct: false }
],
solution: "I = P/V."
},

{
question: "Case: Resistance of bulb:",
answers: [
{ text: "484 Ω", correct: true },
{ text: "220 Ω", correct: false },
{ text: "100 Ω", correct: false },
{ text: "50 Ω", correct: false }
],
solution: "R = V²/P = 220²/100."
},

{
question: "Case: If voltage increases, brightness:",
answers: [
{ text: "Increases", correct: true },
{ text: "Decreases", correct: false },
{ text: "Same", correct: false },
{ text: "Zero", correct: false }
],
solution: "More power → brighter."
},

// ASSERTION

{
question: "Assertion: Electric energy = VIt. Reason: Energy depends on voltage, current, time.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Formula is correct."
},

{
question: "Assertion: Resistance depends on temperature. Reason: Atomic vibrations change.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Temperature affects collisions."
},

// COMPETENCY BASED

{
question: "Which wire is best for transmission lines?",
answers: [
{ text: "Aluminium", correct: true },
{ text: "Copper", correct: false },
{ text: "Iron", correct: false },
{ text: "Nichrome", correct: false }
],
solution: "Aluminium is light and economical."
},

{
question: "Why are switches connected in series?",
answers: [
{ text: "To control current flow", correct: true },
{ text: "To increase voltage", correct: false },
{ text: "To reduce resistance", correct: false },
{ text: "To store energy", correct: false }
],
solution: "Switch breaks circuit."
},

{
question: "Why do birds not get shock on wires?",
answers: [
{ text: "No potential difference", correct: true },
{ text: "High resistance", correct: false },
{ text: "Low current", correct: false },
{ text: "Insulated body", correct: false }
],
solution: "Same potential on both feet."
},

{
question: "What happens if live wire touches earth wire?",
answers: [
{ text: "Short circuit", correct: true },
{ text: "Open circuit", correct: false },
{ text: "No effect", correct: false },
{ text: "Voltage drop", correct: false }
],
solution: "Direct path causes high current."
},

{
question: "Why are electric poles earthed?",
answers: [
{ text: "Safety from leakage current", correct: true },
{ text: "Increase voltage", correct: false },
{ text: "Decrease current", correct: false },
{ text: "Save energy", correct: false }
],
solution: "Earthing protects users."
},

{
question: "Which device measures electrical energy consumption?",
answers: [
{ text: "Electric meter", correct: true },
{ text: "Ammeter", correct: false },
{ text: "Voltmeter", correct: false },
{ text: "Galvanometer", correct: false }
],
solution: "Energy meter measures kWh."
},

{
question: "Why is earth wire thicker?",
answers: [
{ text: "To carry large current safely", correct: true },
{ text: "To increase resistance", correct: false },
{ text: "To reduce voltage", correct: false },
{ text: "To save cost", correct: false }
],
solution: "Thick wire handles fault current."
}

];
const quizData_part9 = [

{
question: "Three resistors 2Ω, 3Ω, 6Ω in parallel. Equivalent resistance:",
answers: [
{ text: "1 Ω", correct: true },
{ text: "11 Ω", correct: false },
{ text: "2 Ω", correct: false },
{ text: "3 Ω", correct: false }
],
solution: "1/R = 1/2 + 1/3 + 1/6 = 1 → R=1Ω."
},

{
question: "A wire has resistance R. If length becomes 3 times, new resistance:",
answers: [
{ text: "3R", correct: true },
{ text: "9R", correct: false },
{ text: "R/3", correct: false },
{ text: "R", correct: false }
],
solution: "R ∝ L."
},

{
question: "If length is doubled and area doubled, resistance becomes:",
answers: [
{ text: "Same", correct: true },
{ text: "Double", correct: false },
{ text: "Half", correct: false },
{ text: "Zero", correct: false }
],
solution: "R ∝ L/A → no change."
},

{
question: "Power dissipated in resistor is maximum when:",
answers: [
{ text: "Current is maximum", correct: true },
{ text: "Resistance is zero", correct: false },
{ text: "Voltage is zero", correct: false },
{ text: "Time is zero", correct: false }
],
solution: "P = I²R."
},

{
question: "If current is halved, power becomes:",
answers: [
{ text: "One-fourth", correct: true },
{ text: "Half", correct: false },
{ text: "Double", correct: false },
{ text: "Same", correct: false }
],
solution: "P ∝ I²."
},

{
question: "Two bulbs 100W and 100W connected in parallel consume:",
answers: [
{ text: "200W", correct: true },
{ text: "100W", correct: false },
{ text: "50W", correct: false },
{ text: "0W", correct: false }
],
solution: "Power adds in parallel."
},

{
question: "Two bulbs 100W and 100W in series consume:",
answers: [
{ text: "Less than 200W", correct: true },
{ text: "200W", correct: false },
{ text: "100W", correct: false },
{ text: "More than 200W", correct: false }
],
solution: "Voltage divides → less power."
},

{
question: "If resistance increases, power (at constant V):",
answers: [
{ text: "Decreases", correct: true },
{ text: "Increases", correct: false },
{ text: "Same", correct: false },
{ text: "Zero", correct: false }
],
solution: "P = V²/R."
},

{
question: "If resistance increases, power (at constant I):",
answers: [
{ text: "Increases", correct: true },
{ text: "Decreases", correct: false },
{ text: "Same", correct: false },
{ text: "Zero", correct: false }
],
solution: "P = I²R."
},

{
question: "Energy consumed depends on:",
answers: [
{ text: "Power and time", correct: true },
{ text: "Voltage only", correct: false },
{ text: "Current only", correct: false },
{ text: "Resistance only", correct: false }
],
solution: "E = Pt."
},

// NUMERICALS

{
question: "Find resistance if V=220V, P=110W.",
answers: [
{ text: "440 Ω", correct: true },
{ text: "220 Ω", correct: false },
{ text: "110 Ω", correct: false },
{ text: "2 Ω", correct: false }
],
solution: "R = V²/P = 220²/110 = 440Ω."
},

{
question: "Find current if P=60W, R=15Ω.",
answers: [
{ text: "2 A", correct: true },
{ text: "4 A", correct: false },
{ text: "1 A", correct: false },
{ text: "3 A", correct: false }
],
solution: "I = √(P/R) = √(60/15)=2A."
},

{
question: "Find power if V=12V, R=6Ω.",
answers: [
{ text: "24 W", correct: true },
{ text: "72 W", correct: false },
{ text: "6 W", correct: false },
{ text: "12 W", correct: false }
],
solution: "P = V²/R = 144/6=24W."
},

{
question: "Equivalent resistance of 5Ω, 10Ω, 20Ω in parallel:",
answers: [
{ text: "2.86 Ω", correct: true },
{ text: "35 Ω", correct: false },
{ text: "10 Ω", correct: false },
{ text: "5 Ω", correct: false }
],
solution: "1/R = 1/5+1/10+1/20 = 7/20 → R≈2.86Ω."
},

{
question: "Equivalent resistance of 5Ω, 10Ω, 20Ω in series:",
answers: [
{ text: "35 Ω", correct: true },
{ text: "20 Ω", correct: false },
{ text: "10 Ω", correct: false },
{ text: "5 Ω", correct: false }
],
solution: "Sum = 35Ω."
},

{
question: "Find heat if I=4A, R=5Ω, t=2s.",
answers: [
{ text: "160 J", correct: true },
{ text: "40 J", correct: false },
{ text: "80 J", correct: false },
{ text: "20 J", correct: false }
],
solution: "H = I²Rt = 16×5×2 =160J."
},

// ASSERTION

{
question: "Assertion: Resistance depends on material. Reason: Resistivity varies.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Material determines resistivity."
},

{
question: "Assertion: Parallel circuits reduce current. Reason: Resistance increases.",
answers: [
{ text: "Both wrong", correct: true },
{ text: "Both correct", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Parallel increases current, reduces resistance."
},

// HOTS

{
question: "Why electric iron consumes high power?",
answers: [
{ text: "High current and resistance", correct: true },
{ text: "Low current", correct: false },
{ text: "Low voltage", correct: false },
{ text: "No resistance", correct: false }
],
solution: "High heat needed."
},

{
question: "Why fuse rating should match appliance?",
answers: [
{ text: "To avoid damage", correct: true },
{ text: "To increase power", correct: false },
{ text: "To reduce voltage", correct: false },
{ text: "To increase resistance", correct: false }
],
solution: "Correct rating ensures safety."
}

];
const quizData_part9 = [

{
question: "Three resistors 2Ω, 3Ω, 6Ω in parallel. Equivalent resistance:",
answers: [
{ text: "1 Ω", correct: true },
{ text: "11 Ω", correct: false },
{ text: "2 Ω", correct: false },
{ text: "3 Ω", correct: false }
],
solution: "1/R = 1/2 + 1/3 + 1/6 = 1 → R=1Ω."
},

{
question: "A wire has resistance R. If length becomes 3 times, new resistance:",
answers: [
{ text: "3R", correct: true },
{ text: "9R", correct: false },
{ text: "R/3", correct: false },
{ text: "R", correct: false }
],
solution: "R ∝ L."
},

{
question: "If length is doubled and area doubled, resistance becomes:",
answers: [
{ text: "Same", correct: true },
{ text: "Double", correct: false },
{ text: "Half", correct: false },
{ text: "Zero", correct: false }
],
solution: "R ∝ L/A → no change."
},

{
question: "Power dissipated in resistor is maximum when:",
answers: [
{ text: "Current is maximum", correct: true },
{ text: "Resistance is zero", correct: false },
{ text: "Voltage is zero", correct: false },
{ text: "Time is zero", correct: false }
],
solution: "P = I²R."
},

{
question: "If current is halved, power becomes:",
answers: [
{ text: "One-fourth", correct: true },
{ text: "Half", correct: false },
{ text: "Double", correct: false },
{ text: "Same", correct: false }
],
solution: "P ∝ I²."
},

{
question: "Two bulbs 100W and 100W connected in parallel consume:",
answers: [
{ text: "200W", correct: true },
{ text: "100W", correct: false },
{ text: "50W", correct: false },
{ text: "0W", correct: false }
],
solution: "Power adds in parallel."
},

{
question: "Two bulbs 100W and 100W in series consume:",
answers: [
{ text: "Less than 200W", correct: true },
{ text: "200W", correct: false },
{ text: "100W", correct: false },
{ text: "More than 200W", correct: false }
],
solution: "Voltage divides → less power."
},

{
question: "If resistance increases, power (at constant V):",
answers: [
{ text: "Decreases", correct: true },
{ text: "Increases", correct: false },
{ text: "Same", correct: false },
{ text: "Zero", correct: false }
],
solution: "P = V²/R."
},

{
question: "If resistance increases, power (at constant I):",
answers: [
{ text: "Increases", correct: true },
{ text: "Decreases", correct: false },
{ text: "Same", correct: false },
{ text: "Zero", correct: false }
],
solution: "P = I²R."
},

{
question: "Energy consumed depends on:",
answers: [
{ text: "Power and time", correct: true },
{ text: "Voltage only", correct: false },
{ text: "Current only", correct: false },
{ text: "Resistance only", correct: false }
],
solution: "E = Pt."
},

// NUMERICALS

{
question: "Find resistance if V=220V, P=110W.",
answers: [
{ text: "440 Ω", correct: true },
{ text: "220 Ω", correct: false },
{ text: "110 Ω", correct: false },
{ text: "2 Ω", correct: false }
],
solution: "R = V²/P = 220²/110 = 440Ω."
},

{
question: "Find current if P=60W, R=15Ω.",
answers: [
{ text: "2 A", correct: true },
{ text: "4 A", correct: false },
{ text: "1 A", correct: false },
{ text: "3 A", correct: false }
],
solution: "I = √(P/R) = √(60/15)=2A."
},

{
question: "Find power if V=12V, R=6Ω.",
answers: [
{ text: "24 W", correct: true },
{ text: "72 W", correct: false },
{ text: "6 W", correct: false },
{ text: "12 W", correct: false }
],
solution: "P = V²/R = 144/6=24W."
},

{
question: "Equivalent resistance of 5Ω, 10Ω, 20Ω in parallel:",
answers: [
{ text: "2.86 Ω", correct: true },
{ text: "35 Ω", correct: false },
{ text: "10 Ω", correct: false },
{ text: "5 Ω", correct: false }
],
solution: "1/R = 1/5+1/10+1/20 = 7/20 → R≈2.86Ω."
},

{
question: "Equivalent resistance of 5Ω, 10Ω, 20Ω in series:",
answers: [
{ text: "35 Ω", correct: true },
{ text: "20 Ω", correct: false },
{ text: "10 Ω", correct: false },
{ text: "5 Ω", correct: false }
],
solution: "Sum = 35Ω."
},

{
question: "Find heat if I=4A, R=5Ω, t=2s.",
answers: [
{ text: "160 J", correct: true },
{ text: "40 J", correct: false },
{ text: "80 J", correct: false },
{ text: "20 J", correct: false }
],
solution: "H = I²Rt = 16×5×2 =160J."
},

// ASSERTION

{
question: "Assertion: Resistance depends on material. Reason: Resistivity varies.",
answers: [
{ text: "Both correct", correct: true },
{ text: "Both wrong", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Material determines resistivity."
},

{
question: "Assertion: Parallel circuits reduce current. Reason: Resistance increases.",
answers: [
{ text: "Both wrong", correct: true },
{ text: "Both correct", correct: false },
{ text: "Only assertion", correct: false },
{ text: "Only reason", correct: false }
],
solution: "Parallel increases current, reduces resistance."
},

// HOTS

{
question: "Why electric iron consumes high power?",
answers: [
{ text: "High current and resistance", correct: true },
{ text: "Low current", correct: false },
{ text: "Low voltage", correct: false },
{ text: "No resistance", correct: false }
],
solution: "High heat needed."
},

{
question: "Why fuse rating should match appliance?",
answers: [
{ text: "To avoid damage", correct: true },
{ text: "To increase power", correct: false },
{ text: "To reduce voltage", correct: false },
{ text: "To increase resistance", correct: false }
],
solution: "Correct rating ensures safety."
}

];
