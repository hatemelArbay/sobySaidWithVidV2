document.querySelectorAll(".wrapper").forEach((carouselWrapper) => {
    const carousel = carouselWrapper.querySelector(".carousel");
    const firstImg = carousel.querySelectorAll("img")[0];
    const arrowIcons = carouselWrapper.querySelectorAll(".wrapper i");
    let autoSlideInterval; // Define the auto-slide interval variable
  
    let isDragStart = false,
      isDragging = false,
      prevPageX,
      prevScrollLeft,
      positionDiff;
  
    const showHideIcons = () => {
      arrowIcons[0].style.display = "block";
      let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
      arrowIcons[1].style.display =
        carousel.scrollLeft == scrollWidth ? "none" : "block";
    };
  
    showHideIcons();
  
    arrowIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  
        if (icon.id == "left") {
          carousel.scrollLeft -= firstImgWidth;
          if (carousel.scrollLeft < 0) {
            carousel.scrollLeft = maxScrollLeft;
          }
        } else {
          carousel.scrollLeft += firstImgWidth;
  
          if (carousel.scrollLeft > maxScrollLeft) {
            carousel.scrollLeft = 0;
          }
        }
  
        setTimeout(() => showHideIcons(), 60);
      });
    });
  
    const autoSlide = () => {
      if (isElementInViewport(carousel)) {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += firstImgWidth;
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  
        if (carousel.scrollLeft > maxScrollLeft) {
          carousel.scrollLeft = 0;
        }
  
        showHideIcons();
      }
    };
  
    const dragStart = (e) => {
      isDragStart = true;
      prevPageX = e.pageX || e.touches[0].pageX;
      prevScrollLeft = carousel.scrollLeft;
    };
  
    const dragging = (e) => {
      if (!isDragStart) return;
      e.preventDefault();
      isDragging = true;
      carousel.classList.add("dragging");
      positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
      carousel.scrollLeft = prevScrollLeft - positionDiff;
      showHideIcons();
    };
  
    const dragStop = () => {
      isDragStart = false;
      carousel.classList.remove("dragging");
  
      if (!isDragging) return;
      isDragging = false;
      autoSlide();
    };
  
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);
  
    document.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);
  
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("touchend", dragStop);
  
    // Intersection Observer to track if the carousel is in the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start auto-slide and save the interval ID when in the viewport
          autoSlideInterval = setInterval(autoSlide, 3000);
        } else {
          // Stop auto-slide and clear the interval when not in the viewport
          clearInterval(autoSlideInterval);
        }
      });
    });
  
    observer.observe(carousel);
  });
  
  // Helper function to check if an element is in the viewport
  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  