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



$(window).scroll(function () {
  $('.sub_img').each(function () {
    var top_of_element = $(this).offset().top;
    var bottom_of_window = $(window).scrollTop() + $(window).height() - 100;

    if (bottom_of_window > top_of_element) {
      $(this).addClass('fade-in-move-up');
    }
  });
});

$(window).on('beforeunload', function () {
  $(window).scrollTop(0);
});


window.onload = function () {
  // Get the data-id from local storage
  const logo = localStorage.getItem('logo');

  // Use the data-id to determine which logo to display
  switch (logo) {
    case 'SEQUOIAH':
      // Change the logo source
      changeLogo('./assets/images/SEQUOIAH.png', '500px', '150px');
      break;
    case 'FRNDSNFOES':
      // Change the logo source
      changeLogo('./assets/images/FNF-Logo.png');
      break;
    case 'NORSU':
      // Change the logo source and size
      changeLogo('./assets/images/NORSU-LOGO.png', '300px', '200px');
      break;
    // Add more cases as needed for other logos
  }
}

function changeLogo(src, width, height) {
  const logo = document.getElementById('logo');
  const logoCtn = document.getElementById('logo_ctn');


  logo.src = src;

  // Get the computed styles of the logo
  const computedStyle = window.getComputedStyle(logoCtn);

  // If no width or height is provided, use the computed styles
  logoCtn.style.width = width || computedStyle.width;
  logoCtn.style.height = height || computedStyle.height;
}