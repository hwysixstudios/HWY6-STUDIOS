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



// This script runs when gallery.html loads and updates the images based on the stored data-id
window.onload = function() {

  // Get the data-id from local storage
  const selectedCardId = localStorage.getItem('selectedCardId');

  getLogo();
  changeTitle(selectedCardId);
  changeImgs(selectedCardId);


};


function changeImgs (cardID){

  // Get the data-id from local storage

  // Define an object with the content for each card
  const cardContent = {
    'NORSU-GIRLS': {
      type: 'image',
      main: 'https://drive.google.com/thumbnail?id=1SFPDddjphg7Kw2EEvhluIi2PHBpQUfRn&sz=h1920',
      subImages: [
        'https://drive.google.com/thumbnail?id=1SHFCklTY83XwBj18OaUMltsOXFlKqTTI&sz=w1080',
        'https://drive.google.com/thumbnail?id=1DNjusFYOX697FCRmIBDURB3Eczr4hvA2&sz=w1080',
        'https://drive.google.com/thumbnail?id=1uuELA3uvPN8cQ2HDNvtDxrqCySVMzgbT&sz=w1080',
        'https://drive.google.com/thumbnail?id=11odI1_-rMPUXAqJOiER7jWKBq3M9NOxd&sz=w1080',
        'https://drive.google.com/thumbnail?id=1I3QGqBLL2az1kO9VZ3o9-puyvh4Nrile&sz=w1080',
        'https://drive.google.com/thumbnail?id=1YMgCsdHKM_u_uG7mlPjzC-386W8meRiS&sz=w1080',
        'https://drive.google.com/thumbnail?id=1kjlea3gjYpntxRefbKS0PEjEEY7IBjNW&sz=w1080',
        'https://drive.google.com/thumbnail?id=1WiobwRtPHEpmpIe4-8wA8S8gSOpxJYKv&sz=w1080',
        'https://drive.google.com/thumbnail?id=1iCVFpA4Lhf14bqSKwlZSAu7ASxdIlHVK&sz=w1080',
        'https://drive.google.com/thumbnail?id=1ZeN1oGe7_5eOFct0qX7ZC-Juj6WHZ2X-&sz=w1080',
        'https://drive.google.com/thumbnail?id=1TLi_emZ2YssYgfVNSRruc0VHQhWjpSEF&sz=w1080',
      ]
    },
    'SEDDY': {
      type: 'video',
      main: 'https://www.youtube.com/embed/3B9KaLEPXbU',
      subImages: [
        // 'https://drive.google.com/uc?export=view&id=IMAGE_ID_3',
        // 'https://drive.google.com/uc?export=view&id=IMAGE_ID_4'
      ]
    },
    // ... other card IDs and their corresponding content
  };

  const content = cardContent[cardID];

  if (content) {
    // Clear existing gallery content
    const galleryContainer = document.getElementById('gallery-container'); // Make sure you have this container in your HTML
    galleryContainer.innerHTML = '';

    // Create and append new gallery_img_ctn elements
    content.subImages.forEach((url, index) => {
      const galleryImgCtn = document.createElement('div');
      galleryImgCtn.className = 'gallery_img_ctn';
      galleryImgCtn.id = 'gallery_img_ctn_' + (index + 1);

      const img = document.createElement('img');
      img.className = 'sub_img';
      img.src = url;

      galleryImgCtn.appendChild(img);
      galleryContainer.appendChild(galleryImgCtn);
    });

    // Update the main image or video
    if (content.type === 'image') {

      const mainImg = document.getElementById('main-img');

      mainImg.src = content.main;
      mainImg.style.display = 'block';
    } else if (content.type === 'video') {
      
      // Update the video player source and display it
      const videoPlayer = document.getElementById('video-player');

      videoPlayer.src = content.main;
      videoPlayer.style.display = 'block';
      // Hide the main image
      const mainImg = document.getElementById('main-img');
      mainImg.style.display = 'none';
    }
  }
}



function changeTitle (cardID) {
  const titles = {
    'NORSU-GIRLS': '"Pretty Girls Wear Norsu"',
    'SEDDY': '"David Ruffin"',
  }

  const gTitle = document.getElementById('gallery_title');

  if (titles[cardID]) {
    gTitle.textContent = titles[cardID];
  }
}

function getLogo () {
    // Get the data-id from local storage
    const logo = localStorage.getItem('logo').split('-')[0];
    console.log(logo);
  
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