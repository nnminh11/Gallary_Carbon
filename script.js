document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    let totalImages = 3000;  // Total images to load
    let loadedImages = 1;     // Track loaded images
    let batchSize = 100;      // Number of images per batch

    // Function to create and append an image
    function createImage(index) {
        const img = document.createElement("img");
        img.src = `data/${index}.jpg`; // Change to correct path
        img.alt = `Image ${index}`;
        img.loading = "lazy"; // Enables lazy loading

        // Fade-in effect on load
        img.style.opacity = "0";
        img.onload = () => img.style.opacity = "1";
        return img;
    }

    // Function to load the next batch of images
    function loadImages() {
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < batchSize && loadedImages < totalImages; i++) {
            fragment.appendChild(createImage(loadedImages++));
        }
        gallery.appendChild(fragment);
    }

    // Load the first batch
    loadImages();

    // Infinite scrolling with Intersection Observer
    const observer = new IntersectionObserver(entries => {
        const lastImage = entries[0];
        if (lastImage.isIntersecting && loadedImages < totalImages) {
            observer.unobserve(lastImage.target); // Unobserve old last image
            loadImages(); // Load next batch
            setTimeout(() => {
                const newLastImg = gallery.lastElementChild;
                if (newLastImg) observer.observe(newLastImg);
            }, 500);
        }
    }, { rootMargin: "100px" });

    // Observe the last image
    setTimeout(() => {
        const lastImg = gallery.lastElementChild;
        if (lastImg) observer.observe(lastImg);
    }, 500);
});
