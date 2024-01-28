const ddContent = document.querySelector("#dd_menu ul");
const ddBtn = document.querySelector("#brand_logo button");
const mainSiteImg = document.querySelector("#background_ctn img");
const projectCategories = document.querySelectorAll(".catChoice");
const dropdownItems = ddContent.querySelectorAll("li a");
const currentBrand = document.getElementById("selected-option");
let userHasInteracted = false;

const handleDropdown = (event) => {

  // Hide the Dropdown.
  ddContent.style.display = 'none';

  // sets the current dropdown ID to a const.
  const originalChoice = currentBrand.dataset.id;

  // Adds the current choice as a dropdown item
  createListItem(originalChoice);

  // Removes the clicked target from the dropdown list.
  event.currentTarget.remove();

  // Change the dropdown item to the new logo of the selected brand.
  setLogo(event.target.innerHTML);

  setUserHasInteracted();
}

const setUserHasInteracted = () => {
  userHasInteracted = true;
}

const createListItem = (brand) => {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.innerHTML = brand;
  a.classList.add('font_aza');
  a.addEventListener('click', handleDropdown);

  li.appendChild(a);
  ddContent.appendChild(li);
}

const initialSetup = () => {
  const lastChoice = localStorage.getItem('lastChoice');
  if (lastChoice !== 'FRNDSNFOES' && userHasInteracted) {
      createListItem(currentBrand.dataset.id);
  }
  setLogo(lastChoice);
}

// Call initialSetup on window load
window.onload = function() {
  initialSetup();
};


const setLogo = (name) => {
  switch (name) {
    case 'Norsu':
      currentBrand.src = './assets/images/NORSU.png';
      mainSiteImg.src = './assets/images/NORSU_1.jpg';
      mainSiteImg.style.height = '170%';
      currentBrand.dataset.id = 'Norsu';
      localStorage.setItem('lastChoice', 'Norsu');
      break;
    case 'Sequoiah':
      currentBrand.src = './assets/images/SEQUOIAH.png';
      mainSiteImg.src = './assets/images/agthsb-sequoiah-tee.png';
      mainSiteImg.style.height = '100%';
      currentBrand.dataset.id = 'Sequoiah';
      localStorage.setItem('lastChoice', 'Sequoiah');
      break;
    case 'FRNDSNFOES':
      currentBrand.src = './assets/images/FNF-Logo.png';
      mainSiteImg.src = './assets/images/fnfwarshirt.jpg';
      mainSiteImg.style.height = '100%';
      currentBrand.dataset.id = 'FRNDSNFOES';
      localStorage.setItem('lastChoice', 'FRNDSNFOES');
      break;
  }
}


const setSelectedCategory = (event) => {
  // Remove highlighting from all categories and add it to the selected one
  projectCategories.forEach(category => {
      category.classList.toggle('highlighted', category === event.target);
      category.classList.toggle('unselected', category !== event.target);
  });

  // Get the category from the clicked element
  const selectedCategory = event.target.innerText;

  // Get all project cards
  const projectCards = document.querySelectorAll('.card_ctn');

  // Show or hide project cards based on the selected category
  projectCards.forEach(card => {
      // Split the data-category attribute into an array of categories
      const cardCategories = card.getAttribute('data-category').split(' ');

      // Check if the selectedCategory is one of the card's categories
      const shouldDisplay = cardCategories.includes(selectedCategory) || selectedCategory === 'PROJECTS';

      card.style.display = shouldDisplay ? 'block' : 'none';
  });
}

$('.card.proj').each(function() {
  $(this).on('click', function(event) {
    
    // Prevent the default link behavior
    event.preventDefault();

    // Get the data-id attribute
    const dataId = $(this).attr('data-id');
    
    // Store the data-id in local storage
    localStorage.setItem('logo', dataId);

    // Navigate to the gallery page
    window.location.href = $(this).attr('href');


    // Store the data-id in local storage
    localStorage.setItem('selectedCardId', dataId);
  });
});


// Close the dropdown when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target.matches("#dropdown-button")) {
    console.log("Dropdown not clicked!");
    dropdownContent.style.display = 'none';
  }
});

// Event Listeners for dropdown and category selection.
dropdownItems.forEach(function (item) {
  item.addEventListener("click", handleDropdown);
});

projectCategories.forEach(function (item) {
  item.addEventListener('click', setSelectedCategory);
})


ddBtn.addEventListener("click", function () {
  // Toggle the visibility of the dropdown content
  ddContent.style.display = 'block';
});

document.querySelectorAll('.card.proj').forEach(card => {
  card.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior
      const dataId = this.getAttribute('data-id'); // Get the data-id attribute
      window.location.href = `gallery.html?id=${dataId}`; // Navigate to the gallery page with data-id as a query parameter
  });
});

var speed = 'slow';

$('html, body').hide();

$(document).ready(function() {
    $('html, body').fadeIn(speed, function() {
        $('a[href], button[href]').click(function(event) {
            var url = $(this).attr('href');
            if (url.indexOf('#') == 0 || url.indexOf('javascript:') == 0) return;
            event.preventDefault();
            $('html, body').fadeOut(speed, function() {
                window.location = url;
            });
        });
    });
});