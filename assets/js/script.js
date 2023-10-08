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
  dropdownContent.style.display = 'none';
  let originalChoice = currentBrand.textContent;

  const li = document.createElement('li');
  li.innerHTML = `<a href="#">${originalChoice}</a>`
  dropdownContent.appendChild(li);
  li.addEventListener('click', handleDropdown)

  const newBrand = event.target.textContent
  event.currentTarget.remove();

  currentBrand.textContent = newBrand;
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

const numberOfMembers = 10; // Number of Members (change as needed)
const memeberList = document.getElementById();

for (let i = 1; <= numberOfMembers; i++){
  const memberDiv = document.createElement('div');
  memberDiv.classList.add('member');

  const memberImage = document.createElement
   memberImage.src = `path_to_member_photo_${i}.jpg`; // Replace with the actual path to member photos
  memberImage.alt = `Member ${i}`;

  const memberName = document.createElement('p');
  memberName.textContent = `Member ${i}`;

  memberDiv.appendChild(memberImage);
  memberDiv.appendChild(memberName);

  memberList.appendChild(memberDiv);
}
