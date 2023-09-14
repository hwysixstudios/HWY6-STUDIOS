// Get references to the dropdown elements
const dropdownButton = document.getElementById("dropdown-button");
const dropdownContent = document.getElementById("dropdown-content");
const currentBrand = document.getElementById("selected-option");

// Add a click event listener to the dropdown button
dropdownButton.addEventListener("click", function () {
  // Toggle the visibility of the dropdown content
  dropdownContent.style.display = 'block';
  // console.log(selectedOption.textContent)
});

// Add click event listeners to the dropdown items
const dropdownItems = dropdownContent.querySelectorAll("li");


const handleDropdown = (event) => {

  dropdownContent.style.display = 'none';
  const originalChoice = currentBrand.dataset.id;

  const li = document.createElement('li');
  li.innerHTML = `<a href="#">${originalChoice}</a>`
  dropdownContent.appendChild(li);
  li.addEventListener('click', handleDropdown)

  event.currentTarget.remove();

  switch (event.originalTarget.innerHTML) {
    case 'Norsu':
      currentBrand.src = './assets/images/NORSU.png'
      currentBrand.dataset.id = 'Norsu'
      break;
    case 'Sequoiah':
      currentBrand.src = './assets/images/SEQUOIAH.png'
      currentBrand.dataset.id = 'Sequoiah'
      break;
    case 'FRNDSnFOES':
      currentBrand.src = './assets/images/FNF-Logo.png'
      currentBrand.dataset.id = 'FRNDSnFOES'
      break;
  }
}

dropdownItems.forEach(function (item) {
  item.addEventListener("click", handleDropdown);
});

// Close the dropdown when clicking outside of it
window.addEventListener("click", function (event) {
  if (!event.target.matches("#dropdown-button")) {
    dropdownContent.classList.remove("show");
  }
});
