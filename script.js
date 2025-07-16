// loading animations


window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");

    // Add delay (e.g., 1.5 seconds) before starting fade out
    setTimeout(() => {
      preloader.style.opacity = '0'; // Start fade-out
      preloader.style.transition = 'opacity 0.8s ease'; // Smooth transition

      // Optional: fully remove from DOM after fade-out completes
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 200); // Match this to your transition duration
    }, 500); // Delay before fade-out starts
  });


document.getElementById('trackOrderStartBtn').addEventListener('click', function() {
  document.getElementById('trackOrderDetails').classList.remove('hidden-track-order');
});







