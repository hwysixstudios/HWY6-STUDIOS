// Get references to the dropdown elements
const dropdownButton = document.getElementById("dropdown-button");
const dropdownContent = document.getElementById("dropdown-content");
const currentBrand = document.getElementById("selected-option");
const projectCategories = document.querySelectorAll(".catChoice");
const mainImgContainer = document.querySelector(".img-container");
const mainVideoContainer = document.querySelector(".video-container")
const mainSiteImg = document.querySelector("#main-img");
const contactFormTitle = document.querySelector(".signup_form").children[0];
const contactFormText = document.querySelector(".signup_form").children[2];

// Add a click event listener to the dropdown button
dropdownButton.addEventListener("click", function () {
  // Toggle the visibility of the dropdown content
  dropdownContent.style.display = 'block';
});

// Add click event listeners to the dropdown items
const dropdownItems = dropdownContent.querySelectorAll("li a");


const handleDropdown = (event) => {
  // Hide the Dropdown.
  dropdownContent.style.display = 'none';
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
  dropdownContent.appendChild(li);
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


// NEW 
const setSelectedCategory = (event) => {
  // Remove highlighting from all categories and add it to the selected one
  projectCategories.forEach(category => {
    category.classList.toggle('highlighted', category === event.target);
    category.classList.toggle('unselected', category !== event.target);
  });

  // Get the category from the clicked element
  const selectedCategory = event.target.innerText; // or event.target.textContent

  // Get all project cards
  const projectCards = document.querySelectorAll('.card');

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
  if (event.target.matches("#dropdown-button")) {
    console.log("Dropdown not clicked!");
    dropdownContent.style.display = 'none';
  }
});





// FORM HANDLER 


// Form Values 
const fullNameValue = $("#full_name_form");
const emailValue = $("#email_form");
const companyValue = $("#company_form");
const socialValue = $("#social_form");

const monthValue = $("#month");
const dayValue = $("#day");
const yearValue = $("#year");

const extraValue = $("#extra_form");
// Final Page Elements 
const fullNameElement = $("#full_name");
const emailElement = $("#email");
const companyElement = $("#company");
const socialElement = $("#social_media");

const dateElement = $(".final_date_form p");
const extraElement = $(".final_extra_form p");

// PAGE INDICATORS 
const $backButton = $("#back_btn");
const $nextButton = $("#next_btn");


let index = 1;
const $indicators = $("div.indicators ul li");
const $divs = [$(".contact_form"), $(".contact_options"),  $(".extra_notes"), $(".final_card")]; 

const handleIndicatorClick = function() {
  $indicators.off("click");
  index = $(this).index();
  setCurrentProject();

  fullNameElement.html(fullNameValue.val());
  emailElement.html(emailValue.val());
  companyElement.html(companyValue.val());
  socialElement.html(socialValue.val());
  dateElement.html(monthValue.val() + "/" + dayValue.val() + "/" + yearValue.val());
  extraElement.html(extraValue.val());
}

const updateSlideShow = (direction, position, diff) => {
  const leftStyle = index === 1 ? "0" : position + "px";
  const $current = $indicators.filter(".current");

  $current.css({
    left: direction === "left" ? leftStyle : $current.css("left"),
    width: Math.abs(diff) + 20 + "px"
  });

  setTimeout(() => {
    $current.css({
      left: direction === "right" ? leftStyle : $current.css("left"),
      width: "20px"
    });
    $indicators.on("click", handleIndicatorClick);
  }, 500);
}

const setCurrentProject = (isInitialRun = false) => {
  const totalIndicators = $indicators.length;
  index = index > totalIndicators - 1 ? 1 : index < 1 ? totalIndicators - 1 : index;
  const $currentItem = $indicators.eq(index);

  if (!$currentItem.hasClass("current")) {
    const parentLeft = $currentItem.parent().offset().left + 10;
    const position = $currentItem.offset().left - parentLeft;
    const diff = position - ($indicators.filter(".current").offset().left - parentLeft);
    const direction = diff < 0 ? "left" : "right";
    updateSlideShow(direction, position, diff);
  }

  const formTitles = ["Introduce yourself!", "What are we working on?","When are we working?", "Here's what we got..."];

  $divs.forEach(($div, i) => {
    if (i === index - 1) {
      $div.css("left", $div.width() * 4).show().animate({ left: '0' }, 200);
      contactFormTitle.innerText = formTitles[i];
      contactFormText.style.display = i === 0 ? 'block' : 'none';
    }
  });

  if (index === 1) {
    $backButton.hide();
  } else {
    $backButton.show();
  }


  if (index === 4) {
    $nextButton.html("SUBMIT");
  } else {
    $nextButton.html("NEXT");
  }

  if (!isInitialRun) {
    $divs.forEach(($div, i) => {
      if (i !== index - 1) {
        $div.hide();
      }
    });
  }
}

// console.log(fullNameValue, emailValue, companyValue, socialValue);
// console.log(fullNameElement, emailElement, companyElement, socialElement)


$indicators.on("click", handleIndicatorClick);
setCurrentProject(true);

$nextButton.on("click", (event) => {
  event.preventDefault();
  index++;
  setCurrentProject();

  fullNameElement.html(fullNameValue.val());
  emailElement.html(emailValue.val());
  companyElement.html(companyValue.val());
  socialElement.html(socialValue.val());

  dateElement.html(monthValue.val() + "/" + dayValue.val() + "/" + yearValue.val());
  extraElement.html(extraValue.val());
});

$backButton.on("click", (event) => {
  event.preventDefault();
  index--;
  setCurrentProject();
});


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





//FORM HANDLERS

document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', function() {
    this.classList.toggle('selected');
    
    // Find the option_final div with the same data-o-contacts as the innerText of the clicked button
    var matchingDiv = document.querySelector(`.option_final[data-o-contacts='${this.innerText}']`);
    
    // If a matching div is found, toggle the 'selected' class
    if (matchingDiv) {
      matchingDiv.classList.toggle('selected');
    }
  });
});

// Javascript method of moving the label up and turning it white for the EXTRA_NOTES DIV ONLY. It seems like the textarea element doesn't work properly with &:focus pseudo-class and the sibling selector.
document.querySelector('.text-field').addEventListener('focus', function() {
  this.parentElement.classList.add('focused');
});
document.querySelector('.text-field').addEventListener('blur', function() {
  if (this.value.trim() === '') {
    this.parentElement.classList.remove('focused');
  }
});

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
  });
});