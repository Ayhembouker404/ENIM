onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = ('Welcome to FORUM ENIM 18.0').split('')
    const titleElement = document.getElementById('title');
    let index = 0;

    function appendTitle() {
      // Check if titleElement exists before adding content
      if (titleElement && index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 60); // 60ms delay
      }
    }
    
    // Start the typing animation
    appendTitle();

    // Set up the NEW scroll listener
    setupScrollListener();

    clearTimeout(c);
  }, 1000);
};

/**
 * Sets up a scroll event listener on the .scroll-content
 * to fade out the title page as the user scrolls.
 */
function setupScrollListener() {
  const scroller = document.getElementById('scroll-container');
  const titlePage = document.getElementById('page-1');

  if (!scroller || !titlePage) {
    console.error("Scroller or Title Page not found!");
    return;
  }

  // Listen for scroll events on our new container
  scroller.addEventListener('scroll', () => {
    
    // Get how far we've scrolled *inside* the container
    let scrollTop = scroller.scrollTop;
    
    // Get the height of the first page
    let pageHeight = titlePage.offsetHeight;

    // Calculate the fade. 
    // Opacity will be 0 after scrolling 50% of the first page.
    let fadePercent = scrollTop / (pageHeight / 2); 
    
    let opacity = 1 - fadePercent;
    
    // Clamp the opacity between 0 and 1
    if (opacity < 0) opacity = 0;
    if (opacity > 1) opacity = 1;

    // Apply the opacity to the title page
    titlePage.style.opacity = opacity;
  });
}