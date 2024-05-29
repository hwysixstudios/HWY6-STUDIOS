// Utility function to handle the progress bar animation
function animateProgressBar(elem) {
  let width = 1;
  return new Promise((resolve, reject) => {
    const id = setInterval(() => {
      if (width >= 100) {
        clearInterval(id);
        resolve();
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }, 10);
  });
}

// Function to disable body scroll
function disableBodyScroll() {
  document.body.style.overflow = 'hidden';
}

// Function to enable body scroll
function enableBodyScroll() {
  document.body.style.overflow = 'auto';
}

// Function to hide the loader
function hideLoader(loaderId) {
  const loader = document.getElementById(loaderId);
  if (loader) {
    loader.style.display = 'none';
  }
}

// Function to show the main page content
function showMainContent(mainPageClass) {
  const mainPage = document.getElementsByClassName(mainPageClass)[0];
  if (mainPage) {
    mainPage.style.opacity = '1';
  }
}

// Main loader function
async function startLoader() {
  disableBodyScroll();

  try {
    await animateProgressBar(document.getElementById("progressbar").firstElementChild);
    // Assuming the document's readyState is checked elsewhere or automatically managed
    hideLoader('loader');
    showMainContent('main_page');
    enableBodyScroll();
  } catch (error) {
    console.error('Loader animation failed:', error);
    // Handle error case, e.g., retry or notify the user
  }
}

// Start the loader process
startLoader();