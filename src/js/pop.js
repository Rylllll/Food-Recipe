
function openPopup() {
    const popupContainer = document.getElementById("popupContainer");
    
    // Store the current scroll position before opening the popup
    storedScrollPosition = window.scrollY;
  
    popupContainer.classList.add("show-popup");
  }
  
  // JavaScript function to close the pop-up
  function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.classList.remove("show-popup");
  
    // Restore the scroll position after closing the popup
    window.scrollTo(0, storedScrollPosition);
  }