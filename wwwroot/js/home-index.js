/*Code to loop between main page divs. First, we select all divs that contain
    'rotate' in their id, then we loop between setting their display value
     to ''none' and 'block'*/
rotateDivs = document.querySelectorAll('[id ^= "rotate"]');
rotateDivs.forEach(element => {
    element.style.display = "none";
});
var divIndex = 0;
setInterval(cycle, 10000);
rotateDivs[divIndex].style.display = "block";
function cycle(){
    rotateDivs[divIndex].style.display = "none";
    divIndex = (divIndex == rotateDivs.length - 1)? 0: divIndex + 1;
    rotateDivs[divIndex].style.display = "block";
}