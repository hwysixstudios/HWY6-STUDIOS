
// Function to load and parse the JSON data
async function loadGalleryData(itemId) {
  try {
    const response = await fetch(`./assets/data/${itemId}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading gallery data:', error);
    return null;
  }
}

// Function to update the gallery view
function updateGalleryView(data) {
  // Use the data to update the gallery
  const gTitle = document.getElementById('gallery_title');
  gTitle.textContent = data.title;

  const logoImg = document.getElementById('logo');
  const logoCtn = document.getElementById('logo_ctn');
  logoImg.src = data.logo;
  logoCtn.style.width = data.logoWidth;
  logoCtn.style.height = data.logoHeight;

  // Update main image or video
  const mainImg = document.getElementById('main-img');
  const imgContainer = document.getElementById('main_img_ctn');
  const videoPlayer = document.getElementById('video-player');
  const videoContainer = document.getElementById('video-container');

  const gParagraphContainer = document.getElementById('gallery_paragraph_container');
  const gProdHeader = document.getElementById('prod_id');

  if (data.galleryInfo) {
    data.galleryInfo.forEach(info => {
      const gParagraph = document.createElement('p');
      const gLink = document.createElement('a');
      gProdHeader.style.opacity = '1';
      gLink.textContent = info.text;
      gLink.href = info.link;
      gLink.classList.add('gallery_paragraph');
      gParagraph.appendChild(gLink);
      gParagraphContainer.appendChild(gParagraph);
    });
  }


  const gCastContainer = document.getElementById('gallery_cast_container');
  const gCastHeader = document.getElementById('cast_id');

  if (data.galleryCast) {
    data.galleryCast.forEach(info => {
      const gParagraph = document.createElement('p');
      const gLink = document.createElement('a');
      gCastHeader.style.opacity = '1'
      gLink.textContent = info.text;
      gLink.href = info.link;
      gLink.classList.add('gallery_paragraph');
      gParagraph.appendChild(gLink);
      gCastContainer.appendChild(gParagraph);
    });
  }


  if (data.type === 'image') {
    mainImg.src = data.mainImage;
    mainImg.style.display = 'block';
    videoContainer.style.display = 'none';
  } else if (data.type === 'video') {
    videoPlayer.src = data.mainImage;
    videoContainer.style.display = 'block';
    imgContainer.style.display = 'none';
  }

  // Clear existing gallery content
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.innerHTML = '';

  data.subImages.forEach((url, index) => {
    const galleryImgCtn = document.createElement('div');
    galleryImgCtn.className = 'gallery_img_ctn';

    galleryImgCtn.dataset.fancybox = "gallery";
    galleryImgCtn.dataset.src = url;

    const img = document.createElement('img');
    img.className = 'sub_img';
    img.src = url;

    images.push(url);


    // Attach the click event listener to the image
    // img.addEventListener('click', function () {
    //   showImageViewer(index);
    // });

    galleryImgCtn.appendChild(img);
    galleryContainer.appendChild(galleryImgCtn);
  });
  updateCollage();

  new Carousel(document.getElementById("mainCollage"), {
    // Your custom options
    Dots: false,
    Thumbs: {
      type: "modern",
    },
  }, { Thumbs });
}


function updateCollage() {
  const mainCollage = document.getElementById('mainCollage');
  mainCollage.innerHTML = ''; // Clear the collage

  // Assuming images is an array of your image URLs
  const newImage = images; // Example images

  for (let i = 0; i < newImage.length; i++) {
    const img = document.createElement('img');
    const div = document.createElement('div');

    // img.src = newImage[i];
    img.dataset.lazySrc = newImage[i];
    div.dataset.thumbSrc = newImage[i];

    div.classList.add('f-carousel__slide');

    div.appendChild(img);
    mainCollage.appendChild(div);
  }
}


// Function to set up the intersection observer for the gallery images
function intersectionObserver() {
  const galleryImages = document.querySelectorAll('.gallery_img_ctn img');
  galleryImages.forEach(img => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(img);
  });
}

function controlsVisibility() {
  const galleryControls = document.getElementById('gallery_controls');
  const galleryImages = document.querySelectorAll('.gallery_img_ctn');
  galleryControls.style.display = galleryImages.length > 0 ? 'block' : 'none';
}

async function initializeGallery() {
  const params = getQueryParams();
  const dataId = params['id'];
  if (dataId) {
    const data = await loadGalleryData(dataId);
    if (!data) return;

    updateGalleryView(data);
    intersectionObserver();
    controlsVisibility();
  }
}


function galleryView() {
  const galleryContainer = document.getElementById('gallery-container');
  const isGridViewActive = document.querySelector('#gallery_icons .fa-grip-vertical').classList.contains('active');
  const isSingleViewActive = document.querySelector('#gallery_icons .fa-square').classList.contains('active');

  if (isGridViewActive) {
    galleryContainer.classList.remove('single-view');
    galleryContainer.classList.add('grid-view');
  } else if (isSingleViewActive) {
    galleryContainer.classList.remove('grid-view');
    galleryContainer.classList.add('single-view');
  }
}


window.onload = function () {
  initializeGallery();
  setupEventListeners();
};

function setupEventListeners() {
  document.querySelectorAll('#gallery_icons span i').forEach(icon => {
    icon.addEventListener('click', function () {
      document.querySelectorAll('#gallery_icons span i').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      galleryView();
    });
  });
}


// Helper function to get query parameters
function getQueryParams() {
  const params = {};
  window.location.search.substring(1).split("&").forEach(function (part) {
    const item = part.split("=");
    params[item[0]] = decodeURIComponent(item[1]);
  });
  return params;
}

let images = [];
let currentIndex = 0;

const viewer = document.getElementById('collageView');

// Show the viewer with the selected image
function showImageViewer(index) {
  currentIndex = index;

  // viewer.classList.remove('gone');
}

// Close the viewer
viewer.addEventListener('click', function (e) {
  if (e.target === viewer) {
    viewer.classList.add('gone');
  }
});

Fancybox.bind('[data-fancybox="gallery"]', {});   
