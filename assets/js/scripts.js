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


//Change image thumbnails depending on what is clicked

document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll('#thumbnails img');
    const heroImage = document.querySelector('#hero-image img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const newSrc = thumbnail.getAttribute('src');
            const newAlt = thumbnail.getAttribute('alt');
            heroImage.setAttribute('src', newSrc);
            heroImage.setAttribute('alt', newAlt);

            // Fade out the hero image before changing it
            heroImage.style.opacity = 0.5;
            setTimeout(() => {
                heroImage.setAttribute('src', newSrc);
                heroImage.setAttribute('alt', newAlt);
                heroImage.style.opacity = 1;
            }, 200);
        });
    });
});

document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('click', function () {
        const isExpanded = this.classList.contains('expanded');
        document.querySelectorAll('.project-box').forEach(b => {
            b.classList.remove('expanded', 'shrink');
        });

        if (!isExpanded) {
            this.classList.add('expanded');
            document.querySelectorAll('.project-box').forEach(b => {
                if (!b.classList.contains('expanded')) {
                    b.classList.add('shrink');
                }
            });
        }
    });
});
