// Define your routes
const routes = {
  '/': function() {
    console.log('Home page');
    // Load home page content
  },
  '/gallery.html': function(params) {
    const id = params.get('id');
    console.log('Gallery page', id);
    // Load gallery page content based on id
    if (id) updateGallery(id); // Assuming updateGallery is your function to load gallery content
  }
  // Add more routes as needed
};

// Implement the router function
function router() {
  const currentLocation = window.location;
  const path = currentLocation.pathname;
  const searchParams = new URLSearchParams(currentLocation.search);

  if (routes[path]) {
    routes[path](searchParams);
  } else {
    console.log('404 Page Not Found');
  }
}

// Listen for URL changes
window.addEventListener('load', router);
window.addEventListener('popstate', router);

// Navigation helper function
function navigateTo(path) {
  history.pushState(null, null, path);
  router();
}