const ddContent = document.querySelector("#dd_menu ul");
const ddBtn = document.querySelector("#brand_logo button");
const mainSiteImg = document.querySelector("#background_ctn img");
const projectCategories = document.querySelectorAll(".catChoice");
const dropdownItems = ddContent.querySelectorAll("li a");
const currentBrand = document.getElementById("selected-option");



// * START Loader Functionality 
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

// * END LOADER FUNCTIONALITY




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

const GetLastChoice = () => {
  // Get lastChoice from Local Storage
  const lastChoice = localStorage.getItem('lastChoice');
  // Get all children of the dropdown.
  const listChildren = ddContent.children;
  // Loop through the dropdown, and remove any children that match the lastChoice.
  for (let i = 0; i < listChildren.length; i++) {
    lastChoice === listChildren[i].innerText ? listChildren[i].remove() : null;
  }

  // Make FRNDSnFOES a choice if FRNDSnFOES isn't in localStorage
  if (lastChoice != 'FRNDSNFOES') {
    const originalChoice = currentBrand.dataset.id;
    createListItem(originalChoice);
  }
  // logic for handling the remembrance of the lastChoice. Sets the current selected brand to the last choice logged in LocalStorage.
  setLogo(lastChoice)
}


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
  const selectedCategory = event.target.innerText; // or event.target.textContent

  // Get all project cards
  const projectCards = document.querySelectorAll('.card_ctn');

  // Show or hide project cards based on the selected category
  projectCards.forEach(card => {
    const shouldDisplay = selectedCategory === 'PROJECTS'|| card.dataset.category === selectedCategory;
    const isContactCard = card.dataset.category === 'CONTACT US';

    card.style.display = shouldDisplay ? 'block' : 'none';

    if (isContactCard) {
      card.style.display = selectedCategory === 'CONTACT US' ? 'block' : 'none';
    } else {
      card.style.display = shouldDisplay ? 'block' : 'none';
    }
    if (shouldDisplay || (isContactCard && selectedCategory === 'CONTACT US')) {
      card.classList.add('slide-in'); // Add class for animation
    }
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

// On window load, run the GetLastChoice function.
window.onload = GetLastChoice();

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

