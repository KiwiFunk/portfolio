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


//Folio Gallery

document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('click', function () {
        const isExpanded = this.classList.contains('expanded');

        // Reset all boxes and headers
        document.querySelectorAll('.project-box').forEach(b => {
            b.classList.remove('expanded', 'shrink');
            const header = b.querySelector('.project-header');
            header.style.opacity = '1';
            header.style.visibility = 'visible';
            header.classList.remove('hidden');
        });

        // Hide headers immediately
        document.querySelectorAll('.project-header').forEach(header => {
            header.style.opacity = '0';
        });

        setTimeout(() => {
            // Hide headers completely after transition
            document.querySelectorAll('.project-header').forEach(header => {
                header.classList.add('hidden');
            });

            if (!isExpanded) {
                this.classList.add('expanded');
                document.querySelectorAll('.project-box').forEach(b => {
                    if (!b.classList.contains('expanded')) b.classList.add('shrink');
                });
            } else {
                this.style.backgroundImage = this.getAttribute('data-main-image');
            }
        }, 300); // Delay matches CSS transition duration

        if (isExpanded) {
            setTimeout(() => {
                document.querySelectorAll('.project-box').forEach(b => {
                    const header = b.querySelector('.project-header');
                    header.classList.remove('hidden');
                    setTimeout(() => {
                        header.style.opacity = '1';
                        header.style.visibility = 'visible';
                    }, 10); // Short delay to trigger the transition
                });
            }, 300); // Delay to match the total transition duration
        }
    });
});

document.querySelectorAll('.thumbnails img').forEach(thumb => {
    thumb.addEventListener('click', function (event) {
        event.stopPropagation();
        const mainContainer = this.closest('.project-box');
        mainContainer.style.backgroundImage = `url(${this.getAttribute('src')})`;
    });
});


