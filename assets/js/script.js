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
  const lastChoice = localStorage.getItem('lastChoice') || 'FRNDSNFOES'; // Default to 'FRNDSNFOES' if no last choice is stored
  setLogo(lastChoice); // Set the logo based on the last choice or default to 'FRNDSNFOES'

  // Check if 'FRNDSNFOES' is not the current choice
  if (lastChoice !== 'FRNDSNFOES') {
      // Remove the current choice from the list if it exists
      removeListItem(currentBrand.dataset.id);
      // Add 'FRNDSNFOES' to the list
      createListItem('FRNDSNFOES');
  }
};

// Function to remove a list item based on the brand
const removeListItem = (brand) => {
  const items = ddContent.querySelectorAll('li');
  items.forEach(item => {
      if (item.textContent === brand) {
          item.remove();
      }
  });
};

// Call initialSetup on window load
window.onload = function() {
  initialSetup();
};


const setLogo = (name) => {
  switch (name) {
    case 'Norsu':
      currentBrand.src = './assets/images/NORSU.png';
      mainSiteImg.src = './assets/images/New-Norsu-Header.png';
      mainSiteImg.style.height = '100%';
      mainSiteImg.style.width = '350%';
      currentBrand.dataset.id = 'Norsu';
      localStorage.setItem('lastChoice', 'Norsu');
      break;
    case 'Sequoiah':
      currentBrand.src = './assets/images/SEQUOIAH.png';
      mainSiteImg.src = './assets/images/zipup.JPG';
      mainSiteImg.style.height = '100%';
      mainSiteImg.style.width = '350%';
      currentBrand.dataset.id = 'Sequoiah';
      localStorage.setItem('lastChoice', 'Sequoiah');
      break;
    case 'FRNDSNFOES':
      currentBrand.src = './assets/images/FNF-Logo.png';
      mainSiteImg.src = './assets/images/royalty.jpg';
      mainSiteImg.style.height = '100%';
      mainSiteImg.style.width = '200%';
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

      // Set the display property of the card based on the selected category
      card.style.display = shouldDisplay ? 'block' : 'none';
  });

  // Hide the Typeform card if the selected category is not 'Contact'
  const typeformCard = document.querySelector('.card_ctn[data-category="CONTACT"]');
  const cardHolder = document.getElementById('card_holder');

  if (selectedCategory !== 'CONTACT') {
    typeformCard.style.display = 'none';
    
    cardHolder.classList.remove('contact-layout');
 } else {
    typeformCard.style.display = 'block';

    cardHolder.classList.add('contact-layout');
 }
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

const adjustBackgroundCtnHeight = () => {
  const viewportHeight = window.innerHeight;
  const backgroundCtn = document.getElementById('background_ctn');
  if (backgroundCtn) {
    backgroundCtn.style.height = `${viewportHeight}px`;
  }
}

// Adjust height on initial load
adjustBackgroundCtnHeight();
