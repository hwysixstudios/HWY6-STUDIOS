// Loader functionality 
let isMoving = false;

const move = () => {
  return new Promise((resolve, reject) => {
    if (!isMoving) {
      isMoving = true;
      const elem = document.getElementById("progressbar").firstElementChild;
      let width = 1;
      const id = setInterval(() => {
        if (width >= 100) {
          clearInterval(id);
          isMoving = false;
          resolve(); // Resolve the promise when the animation is done
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }, 10);
    } else {
      reject(new Error("Animation already in progress"));
    }
  });
}

// Disable scrolling
document.body.style.overflow = 'hidden';

// Delay the start of the move function by a certain number of milliseconds
setTimeout(async () => {
  await move();
  // Check if the document's readyState is complete after the move function is done animating
  if (document.readyState == "complete") {
    // hide loader after 2 seconds
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
      const mainPage = document.getElementsByClassName('main_page')[0];
      mainPage.style.opacity = '1';
      document.body.style.overflow = 'auto'; // Enable scrolling again
    }, 600);
  }
}, 900); // Replace 1000 with the number of milliseconds you want to delay