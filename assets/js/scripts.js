// Triggering gradient change on H1 with mouse event on .linkbutton
document.querySelectorAll('.linkbutton').forEach(item => {
    item.addEventListener('mouseover', () => {
        const heading = document.querySelector('#page-heading .gradient-heading');
        heading.classList.add('hover-gradient-' + item.id);
    });
    item.addEventListener('mouseout', () => {
        const heading = document.querySelector('#page-heading .gradient-heading');
        heading.classList.remove('hover-gradient-git', 'hover-gradient-linkedin', 'hover-gradient-artstation');
    });
});

// Framework for setting length of percentage bars in HTML
document.addEventListener('DOMContentLoaded', function() {
    const bars = document.querySelectorAll('.percentage-bar');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--width', width + '%');
    });
})

window.addEventListener('scroll', function() {
    const landingPage = document.getElementById('landing-page');
    const scrollPosition = window.scrollY;
    const maxScroll = 400; // Adjust this value as needed

    // Calculate opacity based on scroll position
    const opacity = Math.max(0, 1 - scrollPosition / maxScroll);

    // Apply the opacity to the background color and box-shadow
    landingPage.style.backgroundColor = `rgba(238, 238, 238, ${opacity})`;
    landingPage.style.boxShadow = `0 100px 28px rgba(238, 238, 238, ${opacity})`;
});

/* OLD
document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll('#thumbnails img');
    const heroImage = document.querySelector('#hero-image img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const newSrc = thumbnail.getAttribute('src');
            const newAlt = thumbnail.getAttribute('alt');
            heroImage.setAttribute('src', newSrc);
            heroImage.setAttribute('alt', newAlt);
        });
    });
});
*/

/*
document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll('#thumbnails img');
    const heroImage = document.querySelector('#hero-image img');

    // Store the original hero image attributes
    let originalSrc = heroImage.getAttribute('src');
    let originalAlt = heroImage.getAttribute('alt');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const newSrc = thumbnail.getAttribute('src');
            const newAlt = thumbnail.getAttribute('alt');

            // Swap the hero image with the clicked thumbnail image
            thumbnail.setAttribute('src', originalSrc);
            thumbnail.setAttribute('alt', originalAlt);

            // Update the hero image to the new source
            heroImage.setAttribute('src', newSrc);
            heroImage.setAttribute('alt', newAlt);

            // Update the originalSrc and originalAlt with new values
            originalSrc = newSrc;
            originalAlt = newAlt;
        });
    });
});
*/

document.addEventListener("DOMContentLoaded", function() {
    const thumbnails = document.querySelectorAll('#thumbnails img');
    const heroImage = document.querySelector('#hero-image img');

    let originalSrc = heroImage.getAttribute('src');
    let originalAlt = heroImage.getAttribute('alt');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const newSrc = thumbnail.getAttribute('src');
            const newAlt = thumbnail.getAttribute('alt');

            // Swap the images
            thumbnail.setAttribute('src', originalSrc);
            thumbnail.setAttribute('alt', originalAlt);

            // Fade out the hero image before changing it
            heroImage.style.opacity = 0;
            setTimeout(() => {
                heroImage.setAttribute('src', newSrc);
                heroImage.setAttribute('alt', newAlt);
                heroImage.style.opacity = 1;
            }, 300);

            // Update the originalSrc and originalAlt with new values
            originalSrc = newSrc;
            originalAlt = newAlt;
        });
    });
});

