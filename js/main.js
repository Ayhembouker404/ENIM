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

    // Set up the scroll listener
    setupScrollListener();
    
    // ======== NEW: Set up the next button ========
    setupNextButton();

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

/**
 * ======== NEW FUNCTION ========
 * Sets up the click listener for the 'next' button
 * to scroll smoothly to the schedule.
 */
function setupNextButton() {
  const nextBtn = document.getElementById('scroll-next-btn');
  const scroller = document.getElementById('scroll-container');
  const schedulePage = document.getElementById('page-2');

  if (!nextBtn || !scroller || !schedulePage) {
    console.error("Next button, scroller, or schedule page not found!");
    return;
  }
  
  // Add the click event
  nextBtn.addEventListener('click', () => {
    // Scroll the main scroller container to the top of page 2
    scroller.scrollTo({
      top: schedulePage.offsetTop,
      behavior: 'smooth'
    });
  });
}
