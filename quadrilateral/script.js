const pts=[
{x:150,y:100},
{x:450,y:120},
{x:500,y:350},
{x:180,y:380}
];

const svg=document.getElementById("svg");
const poly=document.getElementById("quad");

const circles=[
document.getElementById("A"),
document.getElementById("B"),
document.getElementById("C"),
document.getElementById("D")
];

let drag=-1;

function dist(a,b){

return Math.hypot(a.x-b.x,a.y-b.y);

}

function dot(a,b,c){

const ab={x:a.x-b.x,y:a.y-b.y};
const cb={x:c.x-b.x,y:c.y-b.y};

const cos=(ab.x*cb.x+ab.y*cb.y)/(Math.hypot(ab.x,ab.y)*Math.hypot(cb.x,cb.y));

return Math.acos(cos)*180/Math.PI;

}

function update(){

poly.setAttribute("points",
pts.map(p=>`${p.x},${p.y}`).join(" "));

circles.forEach((c,i)=>{
c.setAttribute("cx",pts[i].x);
c.setAttribute("cy",pts[i].y);
});

document.getElementById("d1").setAttribute("x1",pts[0].x);
document.getElementById("d1").setAttribute("y1",pts[0].y);
document.getElementById("d1").setAttribute("x2",pts[2].x);
document.getElementById("d1").setAttribute("y2",pts[2].y);

document.getElementById("d2").setAttribute("x1",pts[1].x);
document.getElementById("d2").setAttribute("y1",pts[1].y);
document.getElementById("d2").setAttribute("x2",pts[3].x);
document.getElementById("d2").setAttribute("y2",pts[3].y);

const s=[
dist(pts[0],pts[1]),
dist(pts[1],pts[2]),
dist(pts[2],pts[3]),
dist(pts[3],pts[0])
];

document.getElementById("sides").innerHTML=
`
AB = ${s[0].toFixed(1)}<br>
BC = ${s[1].toFixed(1)}<br>
CD = ${s[2].toFixed(1)}<br>
DA = ${s[3].toFixed(1)}
`;

const a=[
dot(pts[3],pts[0],pts[1]),
dot(pts[0],pts[1],pts[2]),
dot(pts[1],pts[2],pts[3]),
dot(pts[2],pts[3],pts[0])
];

document.getElementById("angles").innerHTML=
`
A = ${a[0].toFixed(1)}°<br>
B = ${a[1].toFixed(1)}°<br>
C = ${a[2].toFixed(1)}°<br>
D = ${a[3].toFixed(1)}°
`;

const eq=(x,y)=>Math.abs(x-y)<5;

let type="General Quadrilateral";

if(eq(s[0],s[1])&&eq(s[1],s[2])&&eq(s[2],s[3])){

if(a.every(x=>eq(x,90)))
type="Square";
else
type="Rhombus";

}

document.getElementById("type").innerHTML=
`<h2>${type}</h2>`;

}

circles.forEach((c,i)=>{

c.addEventListener("mousedown",()=>drag=i);

});

svg.addEventListener("mousemove",(e)=>{

if(drag==-1)return;

const r=svg.getBoundingClientRect();

pts[drag].x=e.clientX-r.left;
pts[drag].y=e.clientY-r.top;

update();

});

window.addEventListener("mouseup",()=>drag=-1);

update();
