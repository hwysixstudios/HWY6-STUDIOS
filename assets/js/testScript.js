var i = 0;

function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("progressbar").firstElementChild;
    console.log(elem);
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
} 

move();

// document.onreadystatechange = function () {
//   // page fully load
//   if (document.readyState == "complete") {
//     // hide loader after 2 seconds
//     setTimeout(function(){ 
//       document.getElementById('loader').style.display = 'none';
//     }, 2000);
//   }
// }