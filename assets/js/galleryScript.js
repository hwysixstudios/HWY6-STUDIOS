$(window).on('beforeunload', function () {
  $(window).scrollTop(0);
});

// Function to update the gallery based on the selected item ID
function updateGallery(itemId) {
  fetch(`./assets/data/${itemId}.json`)
    .then(response => response.json())
    .then(data => {
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

      // Create and append new gallery_img_ctn elements for sub-images
      data.subImages.forEach((url, index) => {
        const galleryImgCtn = document.createElement('div');
        galleryImgCtn.className = 'gallery_img_ctn';
        galleryImgCtn.id = 'gallery_img_ctn_' + (index + 1);

        const img = document.createElement('img');
        img.className = 'sub_img hidden';
        img.src = url;

        galleryImgCtn.appendChild(img);
        galleryContainer.appendChild(galleryImgCtn);

        // Add Intersection Observer to each image
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.disconnect();
            }
          });
        }, { threshold: 0.2 }); // Adjust threshold as needed

        observer.observe(img);

      });
    })
    .catch(error => console.error('Error loading gallery data:', error));
}

function getQueryParams() {
  const params = {};
  window.location.search.substring(1).split("&").forEach(function (part) {
    const item = part.split("=");
    params[item[0]] = decodeURIComponent(item[1]);
  });
  return params;
}

window.onload = function () {
  const params = getQueryParams();
  const dataId = params['id']; // Retrieve the data-id from the query parameters
  console.log(dataId)
  if (dataId) {
    updateGallery(dataId); // Call updateGallery with the retrieved data-id
  }
};



var speed = 'slow';

$('html, body').hide();

$(document).ready(function () {
  $('html, body').fadeIn(speed, function () {
    $('a[href], button[href]').click(function (event) {
      var url = $(this).attr('href');
      if (url.indexOf('#') == 0 || url.indexOf('javascript:') == 0) return;
      event.preventDefault();
      $('html, body').fadeOut(speed, function () {
        window.location = url;
      });
    });
  });
});