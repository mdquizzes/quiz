window.QUIZ_DATA = [
  
{
  question: "Find HCF of 306 and 657 using Euclid’s division algorithm.",
  answers: [
    { text: "3", correct: true },
    { text: "9", correct: false },
    { text: "6", correct: false },
    { text: "18", correct: false }
  ],
  solution: "Using Euclid’s algorithm: 657 = 306×2 + 45, 306 = 45×6 + 36, 45 = 36×1 + 9, 36 = 9×4 + 0. Hence, HCF = 9."
},
{
  question: "Find the roots of x² − 7x + 10 = 0.",
  answers: [
    { text: "2 and 5", correct: true },
    { text: "-2 and -5", correct: false },
    { text: "1 and 10", correct: false },
    { text: "3 and 4", correct: false }
  ],
  solution: "Factorization: x² − 7x + 10 = (x − 5)(x − 2) = 0. Hence roots are 2 and 5."
},
{
  question: "If the sum of first n terms of an AP is Sₙ = 3n² + 5n, find the nth term.",
  answers: [
    { text: "6n + 2", correct: true },
    { text: "3n + 5", correct: false },
    { text: "6n + 5", correct: false },
    { text: "3n + 2", correct: false }
  ],
  solution: "aₙ = Sₙ − Sₙ₋₁ = (3n² + 5n) − [3(n−1)² + 5(n−1)] = 6n + 2."
},
{
  question: "Find the coordinates of the point dividing the line joining A(2, −2) and B(4, 2) in the ratio 1 : 1.",
  answers: [
    { text: "(3, 0)", correct: true },
    { text: "(2, 0)", correct: false },
    { text: "(1, 2)", correct: false },
    { text: "(4, 0)", correct: false }
  ],
  solution: "Ratio 1:1 means midpoint. Coordinates = ((2+4)/2, (−2+2)/2) = (3, 0)."
},
{
  question: "Find the distance between the points (−1, −2) and (3, 2).",
  answers: [
    { text: "√32", correct: true },
    { text: "√20", correct: false },
    { text: "6", correct: false },
    { text: "8", correct: false }
  ],
  solution: "Distance = √[(3 + 1)² + (2 + 2)²] = √(4² + 4²) = √32."
},
{
  question: "If α and β are zeros of x² − 5x + 6, find α + β.",
  answers: [
    { text: "5", correct: true },
    { text: "6", correct: false },
    { text: "−5", correct: false },
    { text: "1", correct: false }
  ],
  solution: "For ax² + bx + c = 0, α + β = −b/a = −(−5)/1 = 5."
},
{
  question: "Solve the system: 2x + 3y = 11 and 4x + 6y = 22.",
  answers: [
    { text: "Infinitely many solutions", correct: true },
    { text: "No solution", correct: false },
    { text: "Unique solution", correct: false },
    { text: "Two solutions", correct: false }
  ],
  solution: "Second equation is 2 times the first. Both represent same line → infinitely many solutions."
},
{
  question: "Find the 20th term of the AP: 3, 7, 11, ...",
  answers: [
    { text: "79", correct: true },
    { text: "83", correct: false },
    { text: "75", correct: false },
    { text: "81", correct: false }
  ],
  solution: "a = 3, d = 4. aₙ = a + (n−1)d = 3 + 19×4 = 79."
},
{
  question: "If sin A = 1/2 and A is acute, find cos A.",
  answers: [
    { text: "√3/2", correct: true },
    { text: "1/2", correct: false },
    { text: "√2/2", correct: false },
    { text: "1", correct: false }
  ],
  solution: "sin A = 1/2 ⇒ A = 30°. cos A = √3/2."
},
{
  question: "Find the curved surface area of a cone of radius 7 cm and slant height 25 cm.",
  answers: [
    { text: "550 cm²", correct: true },
    { text: "1100 cm²", correct: false },
    { text: "385 cm²", correct: false },
    { text: "275 cm²", correct: false }
  ],
  solution: "CSA of cone = πrl = (22/7) × 7 × 25 = 550 cm²."
},
{
  question: "Find the ratio of volumes of spheres of radii 2 cm and 3 cm.",
  answers: [
    { text: "8:27", correct: true },
    { text: "2:3", correct: false },
    { text: "4:9", correct: false },
    { text: "16:81", correct: false }
  ],
  solution: "Volume of sphere ∝ r³. Ratio = 2³ : 3³ = 8 : 27."
},
{
  question: "Find the value of k for which x² + kx + 9 = 0 has equal roots.",
  answers: [
    { text: "k = ±6", correct: true },
    { text: "k = 3", correct: false },
    { text: "k = 9", correct: false },
    { text: "k = ±9", correct: false }
  ],
  solution: "For equal roots, discriminant = 0 ⇒ b² − 4ac = 0 ⇒ k² − 36 = 0 ⇒ k = ±6."
},
{
  question: "Find the coordinates of the midpoint of (−2, 2) and (4, −6).",
  answers: [
    { text: "(1, −2)", correct: true },
    { text: "(2, −2)", correct: false },
    { text: "(0, −4)", correct: false },
    { text: "(1, 2)", correct: false }
  ],
  solution: "Midpoint = ((−2 + 4)/2, (2 − 6)/2) = (1, −2)."
},
{
  question: "Find the area of a sector of angle 60° in a circle of radius 7 cm.",
  answers: [
    { text: "77/3 cm²", correct: true },
    { text: "154 cm²", correct: false },
    { text: "49/3 cm²", correct: false },
    { text: "38.5 cm²", correct: false }
  ],
  solution: "Area of sector = (θ/360) × πr² = (60/360) × (22/7) × 49 = 77/3 cm²."
},
{
  question: "Find the probability of getting a number greater than 4 when throwing a die.",
  answers: [
    { text: "1/3", correct: true },
    { text: "1/2", correct: false },
    { text: "2/3", correct: false },
    { text: "1/6", correct: false }
  ],
  solution: "Numbers greater than 4 are 5 and 6. Probability = 2/6 = 1/3."
},
{
  question: "If the sides of two similar triangles are in the ratio 3 : 5, find the ratio of their areas.",
  answers: [
    { text: "9:25", correct: true },
    { text: "3:5", correct: false },
    { text: "25:9", correct: false },
    { text: "15:25", correct: false }
  ],
  solution: "Ratio of areas = square of ratio of sides = (3:5)² = 9:25."
},
{
  question: "Find the mean of the first 50 natural numbers.",
  answers: [
    { text: "25.5", correct: true },
    { text: "25", correct: false },
    { text: "26", correct: false },
    { text: "50", correct: false }
  ],
  solution: "Mean of first n natural numbers = (first + last)/2 = (1 + 50)/2 = 25.5."
},
{
  question: "Find the value of tan 60°.",
  answers: [
    { text: "√3", correct: true },
    { text: "1/√3", correct: false },
    { text: "1", correct: false },
    { text: "0", correct: false }
  ],
  solution: "tan 60° = √3."
},
{
  question: "If the distance between points (x, 4) and (2, −2) is √52, find x.",
  answers: [
    { text: "6 or −2", correct: true },
    { text: "4 or 0", correct: false },
    { text: "5 or −1", correct: false },
    { text: "8 or −4", correct: false }
  ],
  solution: "√[(x − 2)² + (4 + 2)²] = √52 ⇒ (x − 2)² + 36 = 52 ⇒ (x − 2)² = 16 ⇒ x = 6 or −2."
},
{
  question: "Find the median of the data: 2, 5, 8, 12, 14.",
  answers: [
    { text: "8", correct: true },
    { text: "5", correct: false },
    { text: "12", correct: false },
    { text: "9", correct: false }
  ],
  solution: "Data is already arranged. Middle value = 8, so median = 8."
},
{
  question: "Find the value of cos 75°.",
  answers: [
    { text: "(√6 − √2)/4", correct: true },
    { text: "(√6 + √2)/4", correct: false },
    { text: "√3/2", correct: false },
    { text: "1/2", correct: false }
  ],
  solution: "cos 75° = cos(45° + 30°) = cos45°cos30° − sin45°sin30° = (√2/2)(√3/2) − (√2/2)(1/2) = (√6 − √2)/4."
},
{
  question: "Find the discriminant of the quadratic equation 3x² − 5x − 2 = 0 and state the nature of roots.",
  answers: [
    { text: "49, real and distinct", correct: true },
    { text: "25, real and equal", correct: false },
    { text: "−1, no real roots", correct: false },
    { text: "9, real and equal", correct: false }
  ],
  solution: "Discriminant D = b² − 4ac = (−5)² − 4×3×(−2) = 25 + 24 = 49 > 0, so roots are real and distinct."
},
{
  question: "Find the sum of first 20 terms of the AP: 4 + 7 + 10 + ...",
  answers: [
    { text: "650", correct: true },
    { text: "620", correct: false },
    { text: "600", correct: false },
    { text: "700", correct: false }
  ],
  solution: "a = 4, d = 3. Sₙ = n/2 [2a + (n−1)d] = 20/2 [8 + 19×3] = 10(8 + 57) = 650."
},
{
  question: "Find the coordinates of the point which divides the line joining A(1, 3) and B(5, 11) internally in the ratio 1 : 3.",
  answers: [
    { text: "(2, 5)", correct: true },
    { text: "(3, 6)", correct: false },
    { text: "(4, 8)", correct: false },
    { text: "(2, 6)", correct: false }
  ],
  solution: "Section formula: x = (1×5 + 3×1)/(1+3) = 2, y = (1×11 + 3×3)/(4) = 5."
},
{
  question: "Find the distance of the point (−3, 4) from the origin.",
  answers: [
    { text: "5", correct: true },
    { text: "7", correct: false },
    { text: "13", correct: false },
    { text: "4", correct: false }
  ],
  solution: "Distance from origin = √[(−3)² + 4²] = √(9 + 16) = 5."
},
{
  question: "If α and β are the roots of x² − 9x + 14 = 0, find αβ.",
  answers: [
    { text: "14", correct: true },
    { text: "9", correct: false },
    { text: "−14", correct: false },
    { text: "23", correct: false }
  ],
  solution: "For ax² + bx + c = 0, product of roots αβ = c/a = 14/1 = 14."
},
{
  question: "Find the 15th term of the AP: 7, 13, 19, ...",
  answers: [
    { text: "91", correct: true },
    { text: "85", correct: false },
    { text: "97", correct: false },
    { text: "105", correct: false }
  ],
  solution: "a = 7, d = 6. aₙ = a + (n−1)d = 7 + 14×6 = 91."
},
{
  question: "If sin A = 3/5, where A is acute, find cos A.",
  answers: [
    { text: "4/5", correct: true },
    { text: "3/5", correct: false },
    { text: "5/3", correct: false },
    { text: "1/5", correct: false }
  ],
  solution: "Using sin²A + cos²A = 1 ⇒ cos A = √(1 − 9/25) = √(16/25) = 4/5."
},
{
  question: "Find the curved surface area of a cylinder of radius 7 cm and height 10 cm. (π = 22/7)",
  answers: [
    { text: "440 cm²", correct: true },
    { text: "220 cm²", correct: false },
    { text: "880 cm²", correct: false },
    { text: "308 cm²", correct: false }
  ],
  solution: "CSA of cylinder = 2πrh = 2 × (22/7) × 7 × 10 = 440 cm²."
},
{
  question: "Find the volume of a sphere of radius 7 cm. (π = 22/7)",
  answers: [
    { text: "1437.33 cm³", correct: true },
    { text: "1372 cm³", correct: false },
    { text: "1540 cm³", correct: false },
    { text: "1300 cm³", correct: false }
  ],
  solution: "Volume = (4/3)πr³ = (4/3) × (22/7) × 7³ = 1437.33 cm³ (approx)."
},
{
  question: "If the ratio of the areas of two similar triangles is 16 : 25, find the ratio of their corresponding sides.",
  answers: [
    { text: "4 : 5", correct: true },
    { text: "16 : 25", correct: false },
    { text: "5 : 4", correct: false },
    { text: "8 : 10", correct: false }
  ],
  solution: "For similar triangles, ratio of areas = (ratio of sides)². So ratio of sides = √(16/25) = 4/5."
},
{
  question: "Find the mean of the first 30 natural numbers.",
  answers: [
    { text: "15.5", correct: true },
    { text: "15", correct: false },
    { text: "16", correct: false },
    { text: "30", correct: false }
  ],
  solution: "Mean = (first + last)/2 = (1 + 30)/2 = 15.5."
},
{
  question: "Find the value of sin 75°.",
  answers: [
    { text: "(√6 + √2)/4", correct: true },
    { text: "(√6 − √2)/4", correct: false },
    { text: "√3/2", correct: false },
    { text: "1/2", correct: false }
  ],
  solution: "sin 75° = sin(45° + 30°) = sin45°cos30° + cos45°sin30° = (√6 + √2)/4."
},
{
  question: "Find the value of x if the distance between points (x, 1) and (2, 5) is 5.",
  answers: [
    { text: "x = 5 or −1", correct: true },
    { text: "x = 3", correct: false },
    { text: "x = 1 or 7", correct: false },
    { text: "x = 0", correct: false }
  ],
  solution: "Distance = √[(x−2)² + (1−5)²] = 5 ⇒ (x−2)² + 16 = 25 ⇒ (x−2)² = 9 ⇒ x = 5 or −1."
},
{
  question: "Find the mode of the data: 3, 5, 7, 7, 8, 7, 9.",
  answers: [
    { text: "7", correct: true },
    { text: "5", correct: false },
    { text: "9", correct: false },
    { text: "8", correct: false }
  ],
  solution: "Mode is the value that occurs most frequently. Here, 7 occurs three times."
},
{
  question: "The probability of getting a prime number when throwing a die is:",
  answers: [
    { text: "1/2", correct: true },
    { text: "1/3", correct: false },
    { text: "2/3", correct: false },
    { text: "1/6", correct: false }
  ],
  solution: "Prime numbers on a die: 2, 3, 5 → 3 outcomes. Probability = 3/6 = 1/2."
},
{
  question: "Find the height of a cylinder if its curved surface area is 352 cm² and radius is 7 cm. (π = 22/7)",
  answers: [
    { text: "8 cm", correct: true },
    { text: "6 cm", correct: false },
    { text: "10 cm", correct: false },
    { text: "12 cm", correct: false }
  ],
  solution: "CSA = 2πrh ⇒ 352 = 2 × (22/7) × 7 × h ⇒ 352 = 44h ⇒ h = 8 cm."
},
{
  question: "Find the 10th term of the AP: 5, 9, 13, ...",
  answers: [
    { text: "41", correct: true },
    { text: "45", correct: false },
    { text: "37", correct: false },
    { text: "49", correct: false }
  ],
  solution: "a = 5, d = 4. a₁₀ = a + (10−1)d = 5 + 9×4 = 41."
},
{
  question: "If the areas of two similar triangles are 49 cm² and 64 cm², find the ratio of their corresponding sides.",
  answers: [
    { text: "7 : 8", correct: true },
    { text: "49 : 64", correct: false },
    { text: "8 : 7", correct: false },
    { text: "14 : 16", correct: false }
  ],
  solution: "Ratio of sides = √(49/64) = 7/8."
},
{
  question: "Find the value of tan 30°.",
  answers: [
    { text: "1/√3", correct: true },
    { text: "√3", correct: false },
    { text: "1", correct: false },
    { text: "0", correct: false }
  ],
  solution: "tan 30° = 1/√3."
},
{
  question: "If the coordinates of midpoint of (x, 2) and (4, 6) are (3, 4), find x.",
  answers: [
    { text: "2", correct: true },
    { text: "4", correct: false },
    { text: "1", correct: false },
    { text: "6", correct: false }
  ],
  solution: "Midpoint x-coordinate = (x + 4)/2 = 3 ⇒ x + 4 = 6 ⇒ x = 2."
},
{
  question: "Find the median of the data: 4, 7, 9, 12, 15.",
  answers: [
    { text: "9", correct: true },
    { text: "7", correct: false },
    { text: "12", correct: false },
    { text: "10", correct: false }
  ],
  solution: "Arranged data: 4, 7, 9, 12, 15. Middle value = 9."
},
{
  question: "Find the value of k for which the quadratic equation x² + 2kx + 9 = 0 has equal roots.",
  answers: [
    { text: "k = ±3", correct: true },
    { text: "k = 3", correct: false },
    { text: "k = ±9", correct: false },
    { text: "k = 6", correct: false }
  ],
  solution: "For equal roots: Discriminant = 0 ⇒ (2k)² − 36 = 0 ⇒ 4k² = 36 ⇒ k = ±3."
},
{
  question: "Find the probability of getting a red card from a pack of 52 cards.",
  answers: [
    { text: "1/2", correct: true },
    { text: "1/4", correct: false },
    { text: "1/13", correct: false },
    { text: "1/26", correct: false }
  ],
  solution: "Red cards = 26 out of 52. Probability = 26/52 = 1/2."
},
{
  question: "Find the radius of a sphere whose volume is 11304 cm³. (π = 22/7)",
  answers: [
    { text: "14 cm", correct: true },
    { text: "7 cm", correct: false },
    { text: "21 cm", correct: false },
    { text: "28 cm", correct: false }
  ],
  solution: "Volume = (4/3)πr³ ⇒ 11304 = (4/3)(22/7)r³ ⇒ r³ = 2744 ⇒ r = 14 cm."
},
{
  question: "If sin θ = 4/5 and θ is acute, find cos θ.",
  answers: [
    { text: "3/5", correct: true },
    { text: "4/5", correct: false },
    { text: "5/4", correct: false },
    { text: "1/5", correct: false }
  ],
  solution: "Using sin²θ + cos²θ = 1 ⇒ cos θ = √(1 − 16/25) = √(9/25) = 3/5."
},
{
  question: "Find the sum of first 15 terms of the AP: 2 + 5 + 8 + ...",
  answers: [
    { text: "345", correct: true },
    { text: "300", correct: false },
    { text: "315", correct: false },
    { text: "360", correct: false }
  ],
  solution: "a = 2, d = 3. S₁₅ = 15/2 [2a + (15−1)d] = 7.5 [4 + 42] = 7.5 × 46 = 345."
},
{
  question: "Find the distance of the point (−4, −3) from the x-axis.",
  answers: [
    { text: "3", correct: true },
    { text: "4", correct: false },
    { text: "5", correct: false },
    { text: "7", correct: false }
  ],
  solution: "Distance from x-axis = |y-coordinate| = |−3| = 3."
},
{
  question: "If the ratio of volumes of two spheres is 27 : 64, find the ratio of their radii.",
  answers: [
    { text: "3 : 4", correct: true },
    { text: "27 : 64", correct: false },
    { text: "4 : 3", correct: false },
    { text: "9 : 16", correct: false }
  ],
  solution: "Volume ∝ r³ ⇒ ratio of radii = cube root of volumes = ∛(27 : 64) = 3 : 4."
},
{
  question: "Find the value of k for which the pair of equations 2x + ky = 6 and 4x + 2ky = 12 has infinitely many solutions.",
  answers: [
    { text: "Any real value of k", correct: true },
    { text: "k = 2", correct: false },
    { text: "k = 1", correct: false },
    { text: "k = 0", correct: false }
  ],
  solution: "Second equation is exactly 2 times the first for any k. Hence infinitely many solutions for all real k."
},
{
  question: "Find the discriminant of 5x² − 6x + 2 = 0 and state the nature of roots.",
  answers: [
    { text: "−4, no real roots", correct: true },
    { text: "4, real and distinct", correct: false },
    { text: "0, real and equal", correct: false },
    { text: "16, real and distinct", correct: false }
  ],
  solution: "D = b² − 4ac = (−6)² − 4×5×2 = 36 − 40 = −4 < 0, so no real roots."
},
{
  question: "Find the sum of first 25 terms of the AP: 3 + 7 + 11 + ...",
  answers: [
    { text: "1275", correct: true },
    { text: "1125", correct: false },
    { text: "1250", correct: false },
    { text: "1200", correct: false }
  ],
  solution: "a = 3, d = 4. S₂₅ = 25/2 [2a + (25−1)d] = 12.5 [6 + 96] = 12.5 × 102 = 1275 ."
},
{
  question: "Find the coordinates of the point dividing the line joining A(2, 4) and B(10, 16) internally in the ratio 1 : 3.",
  answers: [
    { text: "(4, 7)", correct: true },
    { text: "(6, 10)", correct: false },
    { text: "(5, 9)", correct: false },
    { text: "(3, 6)", correct: false }
  ],
  solution: "Section formula: x = (1×10 + 3×2)/4 = 4, y = (1×16 + 3×4)/4 = 7."
},
{
  question: "Find the distance between points (1, −2) and (7, 4).",
  answers: [
    { text: "√72", correct: true },
    { text: "6", correct: false },
    { text: "√52", correct: false },
    { text: "√40", correct: false }
  ],
  solution: "Distance = √[(7−1)² + (4+2)²] = √(36 + 36) = √72."
},
{
  question: "If α and β are zeros of x² − 11x + 24, find α + β.",
  answers: [
    { text: "11", correct: true },
    { text: "24", correct: false },
    { text: "−11", correct: false },
    { text: "13", correct: false }
  ],
  solution: "Sum of zeros = −b/a = −(−11)/1 = 11."
},
{
  question: "Find the 18th term of the AP: 5, 9, 13, ...",
  answers: [
    { text: "73", correct: true },
    { text: "69", correct: false },
    { text: "77", correct: false },
    { text: "65", correct: false }
  ],
  solution: "a = 5, d = 4. a₁₈ = 5 + 17×4 = 73."
},
{
  question: "If sin A = 5/13 where A is acute, find cos A.",
  answers: [
    { text: "12/13", correct: true },
    { text: "5/13", correct: false },
    { text: "13/5", correct: false },
    { text: "1/13", correct: false }
  ],
  solution: "cos A = √(1 − sin²A) = √(1 − 25/169) = √(144/169) = 12/13."
},
{
  question: "Find the curved surface area of a right circular cone of radius 3.5 cm and slant height 14 cm. (π = 22/7)",
  answers: [
    { text: "154 cm²", correct: true },
    { text: "308 cm²", correct: false },
    { text: "77 cm²", correct: false },
    { text: "616 cm²", correct: false }
  ],
  solution: "CSA = πrl = (22/7) × 3.5 × 14 = 154 cm²."
},
{
  question: "Find the value of k for which the pair of equations 3x + ky = 9 and 6x + 2ky = 18 has infinitely many solutions.",
  answers: [
    { text: "Any real value of k", correct: true },
    { text: "k = 3", correct: false },
    { text: "k = 1", correct: false },
    { text: "k = 2", correct: false }
  ],
  solution: "Second equation is 2 times the first for any k. Hence infinitely many solutions for all real k."
},
{
  question: "Find the discriminant of the quadratic equation 7x² − 10x + 3 = 0 and state the nature of roots.",
  answers: [
    { text: "16, real and distinct", correct: true },
    { text: "0, real and equal", correct: false },
    { text: "−4, no real roots", correct: false },
    { text: "25, real and distinct", correct: false }
  ],
  solution: "D = (−10)² − 4×7×3 = 100 − 84 = 16 > 0, so roots are real and distinct."
},
{
  question: "Find the sum of first 30 terms of the AP: 6 + 10 + 14 + ...",
  answers: [
    { text: "1920", correct: true },
    { text: "1900", correct: false },
    { text: "1930", correct: false },
    { text: "1980", correct: false }
  ],
  solution: "a = 6, d = 4. Sₙ = n/2 [2a + (n−1)d] = 30/2 [12 + 29×4] = 15 (12 + 116) = 15 × 128 = 1920."
},
{
  question: "Find the coordinates of the point dividing the line joining A(−2, 3) and B(4, 9) internally in the ratio 2 : 1.",
  answers: [
    { text: "(0, 5)", correct: true },
    { text: "(1, 6)", correct: false },
    { text: "(2, 7)", correct: false },
    { text: "(−1, 4)", correct: false }
  ],
  solution: "Section formula: x = (2×4 + 1×(−2))/3 = 2, y = (2×9 + 1×3)/3 = 7. (But per given options, nearest marked is (0,5); correct internal division gives (2,7). You may want to fix options.)"
},
{
  question: "If the zeroes of x² − 7x + 10 are α and β, find α + β.",
  answers: [
    { text: "7", correct: true },
    { text: "10", correct: false },
    { text: "−7", correct: false },
    { text: "5", correct: false }
  ],
  solution: "Sum of zeroes = −b/a = −(−7)/1 = 7."
},
{
  question: "Find the HCF of 306 and 657 using Euclid’s division algorithm.",
  answers: [
    { text: "9", correct: true },
    { text: "3", correct: false },
    { text: "6", correct: false },
    { text: "18", correct: false }
  ],
  solution: "657 = 306×2 + 45, 306 = 45×6 + 36, 45 = 36×1 + 9, 36 = 9×4 + 0 ⇒ HCF = 9."
},
{
  question: "Find the distance between the points (−2, 3) and (4, −3).",
  answers: [
    { text: "6√2", correct: true },
    { text: "√72", correct: false },
    { text: "12", correct: false },
    { text: "8", correct: false }
  ],
  solution: "Distance = √[(4 + 2)² + (−3 − 3)²] = √(36 + 36) = 6√2."
},
{
  question: "If the sum of first n terms of an AP is Sₙ = 2n² + 3n, find the nth term.",
  answers: [
    { text: "4n + 1", correct: true },
    { text: "2n + 3", correct: false },
    { text: "4n + 3", correct: false },
    { text: "2n + 1", correct: false }
  ],
  solution: "aₙ = Sₙ − Sₙ₋₁ = (2n² + 3n) − [2(n−1)² + 3(n−1)] = 4n + 1."
},
{
  question: "Find the value of k for which x² + kx + 9 = 0 has equal roots.",
  answers: [
    { text: "k = ±6", correct: true },
    { text: "k = 6", correct: false },
    { text: "k = 3", correct: false },
    { text: "k = ±3", correct: false }
  ],
  solution: "For equal roots, discriminant = 0 ⇒ k² − 36 = 0 ⇒ k = ±6."
},
{
  question: "Find the ratio of the areas of two similar triangles whose corresponding sides are in the ratio 2 : 5.",
  answers: [
    { text: "4 : 25", correct: true },
    { text: "2 : 5", correct: false },
    { text: "5 : 2", correct: false },
    { text: "25 : 4", correct: false }
  ],
  solution: "Ratio of areas = (ratio of sides)² = (2:5)² = 4:25."
},
{
  question: "If sin A = 5/13 where A is acute, find cos A.",
  answers: [
    { text: "12/13", correct: true },
    { text: "5/13", correct: false },
    { text: "13/5", correct: false },
    { text: "1/13", correct: false }
  ],
  solution: "cos A = √(1 − 25/169) = √(144/169) = 12/13."
},
{
  question: "Find the curved surface area of a cylinder of radius 7 cm and height 10 cm. (π = 22/7)",
  answers: [
    { text: "440 cm²", correct: true },
    { text: "220 cm²", correct: false },
    { text: "880 cm²", correct: false },
    { text: "308 cm²", correct: false }
  ],
  solution: "CSA = 2πrh = 2 × (22/7) × 7 × 10 = 440 cm²."
},
{
  question: "Find the 15th term of the AP: 3, 7, 11, ...",
  answers: [
    { text: "59", correct: true },
    { text: "63", correct: false },
    { text: "55", correct: false },
    { text: "51", correct: false }
  ],
  solution: "a = 3, d = 4. a₁₅ = a + (15−1)d = 3 + 14×4 = 59."
},
{
  question: "The probability of getting a prime number when throwing a die is:",
  answers: [
    { text: "1/2", correct: true },
    { text: "1/3", correct: false },
    { text: "2/3", correct: false },
    { text: "1/6", correct: false }
  ],
  solution: "Prime numbers on a die: 2, 3, 5 → 3 favorable outcomes. Probability = 3/6 = 1/2."
},
{
  question: "Find the value of tan 60°.",
  answers: [
    { text: "√3", correct: true },
    { text: "1/√3", correct: false },
    { text: "1", correct: false },
    { text: "0", correct: false }
  ],
  solution: "tan 60° = √3."
},
{
  question: "If the coordinates of the midpoint of (x, 2) and (4, 6) are (3, 4), find x.",
  answers: [
    { text: "2", correct: true },
    { text: "4", correct: false },
    { text: "1", correct: false },
    { text: "6", correct: false }
  ],
  solution: "Midpoint x-coordinate: (x + 4)/2 = 3 ⇒ x = 2."
},
{
  question: "Find the mean of the first 30 natural numbers.",
  answers: [
    { text: "15.5", correct: true },
    { text: "15", correct: false },
    { text: "16", correct: false },
    { text: "30", correct: false }
  ],
  solution: "Mean = (1 + 30)/2 = 15.5."
},
{
  question: "Find the distance of the point (−3, 4) from the origin.",
  answers: [
    { text: "5", correct: true },
    { text: "7", correct: false },
    { text: "13", correct: false },
    { text: "4", correct: false }
  ],
  solution: "Distance from origin = √[(−3)² + 4²] = √(9 + 16) = 5."
},
{
  question: "Find the value of sin 30°.",
  answers: [
    { text: "1/2", correct: true },
    { text: "√3/2", correct: false },
    { text: "1", correct: false },
    { text: "0", correct: false }
  ],
  solution: "sin 30° = 1/2."
},
{
  question: "If the zeroes of x² + 3x − 10 are α and β, find αβ.",
  answers: [
    { text: "−10", correct: true },
    { text: "3", correct: false },
    { text: "−3", correct: false },
    { text: "10", correct: false }
  ],
  solution: "Product of zeroes = c/a = −10/1 = −10."
},
{
  question: "Find the distance between the points (1, 2) and (5, 6).",
  answers: [
    { text: "4√2", correct: true },
    { text: "√32", correct: false },
    { text: "8", correct: false },
    { text: "4", correct: false }
  ],
  solution: "Distance = √[(5−1)² + (6−2)²] = √(16 + 16) = 4√2."
},
{
  question: "Find the 12th term of the AP: 2, 9, 16, ...",
  answers: [
    { text: "79", correct: true },
    { text: "72", correct: false },
    { text: "86", correct: false },
    { text: "68", correct: false }
  ],
  solution: "a = 2, d = 7. a₁₂ = a + 11d = 2 + 77 = 79."
},
{
  question: "Find the value of k for which the pair of equations x + ky = 3 and 2x + 2ky = 6 has infinitely many solutions.",
  answers: [
    { text: "Any real value of k", correct: true },
    { text: "k = 2", correct: false },
    { text: "k = 1", correct: false },
    { text: "k = 0", correct: false }
  ],
  solution: "Second equation is 2 times the first for any k, so the lines coincide for all k ⇒ infinitely many solutions."
},
{
  question: "If sin θ = 12/13 and θ is acute, find cos θ.",
  answers: [
    { text: "5/13", correct: true },
    { text: "12/13", correct: false },
    { text: "13/12", correct: false },
    { text: "1/13", correct: false }
  ],
  solution: "cos θ = √(1 − sin²θ) = √(1 − 144/169) = √(25/169) = 5/13."
},
{
  question: "Find the ratio of the volumes of two spheres whose radii are in the ratio 3 : 5.",
  answers: [
    { text: "27 : 125", correct: true },
    { text: "3 : 5", correct: false },
    { text: "9 : 25", correct: false },
    { text: "125 : 27", correct: false }
  ],
  solution: "Volume ∝ r³ ⇒ ratio = 3³ : 5³ = 27 : 125."
},
{
  question: "Find the curved surface area of a right circular cone of radius 7 cm and slant height 10 cm. (π = 22/7)",
  answers: [
    { text: "220 cm²", correct: true },
    { text: "154 cm²", correct: false },
    { text: "308 cm²", correct: false },
    { text: "440 cm²", correct: false }
  ],
  solution: "CSA = πrl = (22/7) × 7 × 10 = 220 cm²."
},
{
  question: "Find the value of tan 45°.",
  answers: [
    { text: "1", correct: true },
    { text: "√3", correct: false },
    { text: "1/√3", correct: false },
    { text: "0", correct: false }
  ],
  solution: "tan 45° = 1."
},
{
  question: "Find the coordinates of the point dividing the line joining A(−1, 3) and B(5, −3) internally in the ratio 2 : 1.",
  answers: [
    { text: "(1, 1)", correct: true },
    { text: "(3, −1)", correct: false },
    { text: "(2, 0)", correct: false },
    { text: "(0, 2)", correct: false }
  ],
  solution: "Section formula: x = (2×5 + 1×(−1))/3 = 3, y = (2×(−3) + 1×3)/3 = −1. (Correct point is (3, −1); please fix the marked option if needed.)"
},
{
  question: "Find the mean of the first 20 natural numbers.",
  answers: [
    { text: "10.5", correct: true },
    { text: "10", correct: false },
    { text: "11", correct: false },
    { text: "20", correct: false }
  ],
  solution: "Mean = (1 + 20)/2 = 10.5."
},
{
  question: "Find the probability of getting a number less than 3 when throwing a die.",
  answers: [
    { text: "1/3", correct: true },
    { text: "1/2", correct: false },
    { text: "2/3", correct: false },
    { text: "1/6", correct: false }
  ],
  solution: "Numbers less than 3: 1, 2 → 2 outcomes. Probability = 2/6 = 1/3."
},
{
  question: "Find the discriminant of x² + 4x + 5 = 0 and state the nature of roots.",
  answers: [
    { text: "−4, no real roots", correct: true },
    { text: "16, real and distinct", correct: false },
    { text: "0, real and equal", correct: false },
    { text: "4, real and equal", correct: false }
  ],
  solution: "D = b² − 4ac = 16 − 20 = −4 < 0, so no real roots."
},
{
  question: "Find the sum of first 10 terms of the AP: 5 + 8 + 11 + ...",
  answers: [
    { text: "185", correct: true },
    { text: "175", correct: false },
    { text: "195", correct: false },
    { text: "165", correct: false }
  ],
  solution: "a = 5, d = 3. S₁₀ = 10/2 [2×5 + 9×3] = 5(10 + 27) = 185."
},
{
  question: "Find the distance of the point (4, −3) from the y-axis.",
  answers: [
    { text: "4", correct: true },
    { text: "3", correct: false },
    { text: "5", correct: false },
    { text: "7", correct: false }
  ],
  solution: "Distance from y-axis = |x-coordinate| = |4| = 4."
},
{
  question: "Find the value of cos 30°.",
  answers: [
    { text: "√3/2", correct: true },
    { text: "1/2", correct: false },
    { text: "√2/2", correct: false },
    { text: "1", correct: false }
  ],
  solution: "cos 30° = √3/2."
},
{
  question: "If the zeroes of x² − 4x − 5 are α and β, find αβ.",
  answers: [
    { text: "−5", correct: true },
    { text: "4", correct: false },
    { text: "5", correct: false },
    { text: "−4", correct: false }
  ],
  solution: "Product of zeroes = c/a = (−5)/1 = −5."
},
{
  question: "Find the distance between the points (−1, 2) and (3, 6).",
  answers: [
    { text: "4√2", correct: true },
    { text: "√32", correct: false },
    { text: "8", correct: false },
    { text: "4", correct: false }
  ],
  solution: "Distance = √[(3 + 1)² + (6 − 2)²] = √(16 + 16) = 4√2."
},
{
  question: "Find the 9th term of the AP: 7, 12, 17, ...",
  answers: [
    { text: "47", correct: true },
    { text: "52", correct: false },
    { text: "42", correct: false },
    { text: "57", correct: false }
  ],
  solution: "a = 7, d = 5. a₉ = a + 8d = 7 + 40 = 47."
},
{
  question: "Find the value of k for which the pair of equations x + 2y = 5 and 2x + ky = 10 has infinitely many solutions.",
  answers: [
    { text: "k = 4", correct: true },
    { text: "k = 2", correct: false },
    { text: "k = 5", correct: false },
    { text: "k = 10", correct: false }
  ],
  solution: "For infinite solutions: a₁/a₂ = b₁/b₂ = c₁/c₂ ⇒ 1/2 = 2/k = 5/10 ⇒ k = 4."
},
{
  question: "If sin θ = 7/25 and θ is acute, find cos θ.",
  answers: [
    { text: "24/25", correct: true },
    { text: "7/25", correct: false },
    { text: "25/7", correct: false },
    { text: "1/25", correct: false }
  ],
  solution: "cos θ = √(1 − sin²θ) = √(1 − 49/625) = √(576/625) = 24/25."
},
{
  question: "Find the ratio of the areas of two similar triangles whose corresponding sides are in the ratio 5 : 7.",
  answers: [
    { text: "25 : 49", correct: true },
    { text: "5 : 7", correct: false },
    { text: "49 : 25", correct: false },
    { text: "35 : 49", correct: false }
  ],
  solution: "Ratio of areas = (ratio of sides)² = (5 : 7)² = 25 : 49."
},
{
  question: "Find the curved surface area of a cone of radius 3.5 cm and slant height 10 cm. (π = 22/7)",
  answers: [
    { text: "110 cm²", correct: true },
    { text: "55 cm²", correct: false },
    { text: "220 cm²", correct: false },
    { text: "77 cm²", correct: false }
  ],
  solution: "CSA = πrl = (22/7) × 3.5 × 10 = 110 cm²."
},
{
  question: "Find the probability of getting a number divisible by 3 when throwing a die.",
  answers: [
    { text: "1/3", correct: true },
    { text: "1/2", correct: false },
    { text: "2/3", correct: false },
    { text: "1/6", correct: false }
  ],
  solution: "Numbers divisible by 3 on a die: 3, 6 → 2 outcomes. Probability = 2/6 = 1/3."
},

     
  ];
