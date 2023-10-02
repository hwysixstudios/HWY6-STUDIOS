// Get references to the dropdown elements
const dropdownButton = document.getElementById("dropdown-button");
const dropdownContent = document.getElementById("dropdown-content");
const currentBrand = document.getElementById("selected-option");
const projectCategories = document.querySelectorAll(".catChoice");
const mainImgContainer = document.querySelector(".img-container");
const mainVideoContainer = document.querySelector(".video-container")
const mainSiteImg = document.querySelector("#main-img");

// Add a click event listener to the dropdown button
dropdownButton.addEventListener("click", function () {
  // Toggle the visibility of the dropdown content
  dropdownContent.style.display = 'block';
});

// Add click event listeners to the dropdown items
const dropdownItems = dropdownContent.querySelectorAll("li");


const handleDropdown = (event) => {
  // Hide the Dropdown.
  dropdownContent.style.display = 'none';
  // sets the current dropdown ID to a const.
  const originalChoice = currentBrand.dataset.id;

  // Adds the current choice as a dropdown item
  const li = document.createElement('li');
  li.innerHTML = `<a href="#">${originalChoice}</a>`;
  dropdownContent.appendChild(li);
  li.addEventListener('click', handleDropdown);

  // Removes the clicked target from the dropdown list.
  event.currentTarget.remove();

  // Change the dropdown item to the new logo of the selected brand.
  setLogo(event.target.innerHTML);
}


const GetLastChoice = () => {
  // Get lastChoice from Local Storage
  const lastChoice = localStorage.getItem('lastChoice');
  // Get all children of the dropdown.
  const listChildren = dropdownContent.children;
  // Loop through the dropdown, and remove any children that match the lastChoice.
  for (let i = 0; i < listChildren.length; i++) {
    lastChoice === listChildren[i].innerText ? listChildren[i].remove() : null;
  }

  // Make FRNDSnFOES a choice if FRNDSnFOES isn't in localStorage
  if (lastChoice != 'FRNDSnFOES') {
    const originalChoice = currentBrand.dataset.id;
    const li = document.createElement('li');
    li.innerHTML = `<a href="#">${originalChoice}</a>`;
    dropdownContent.appendChild(li);
    li.addEventListener('click', handleDropdown);
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
      mainSiteImg.src = './assets/images/ig-pre2.jpg';
      mainSiteImg.style.height = '100%';
      currentBrand.dataset.id = 'Sequoiah';
      localStorage.setItem('lastChoice', 'Sequoiah');
      break;
    case 'FRNDSnFOES':
      currentBrand.src = './assets/images/FNF-Logo.png';
      mainSiteImg.src = './assets/images/stolenartifactss.png';
      mainSiteImg.style.height = '100%';
      currentBrand.dataset.id = 'FRNDSnFOES';
      localStorage.setItem('lastChoice', 'FRNDSnFOES');
      break;
  }
}

const setSelectedCategory = (event) => {
  for (let i = 0; i < projectCategories.length; i++) {
    const selected = projectCategories[i];
    selected.classList.remove('highlighted');
    selected.classList.add('unselected');
    event.target.classList.add('highlighted');
  }
}



// On window load, run the GetLastChoice function.
window.onload = GetLastChoice();

// Event Listeners for dropdown and category selection.
dropdownItems.forEach(function (item) {
  item.addEventListener("click", handleDropdown);
});

projectCategories.forEach(function (item) {
  item.addEventListener('click', setSelectedCategory);
})

// Close the dropdown when clicking outside of it
window.addEventListener("click", function (event) {
  if (!event.target.matches("#dropdown-button")) {
    dropdownContent.classList.remove("show");
  }
});
