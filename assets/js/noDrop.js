const mainSiteImg = document.querySelector("#background_ctn img");
const projectCategories = document.querySelectorAll(".catChoice");



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




// Close the dropdown when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target.matches("#dropdown-button")) {
    console.log("Dropdown not clicked!");
    ddContent.style.display = 'none';
  }
});


projectCategories.forEach(function (item) {
  item.addEventListener('click', setSelectedCategory);
})

