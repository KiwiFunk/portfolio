// DOM Content Load
document.addEventListener('DOMContentLoaded', function() {

    handleNavToggle();              // Close burger menu on link click
    populateCards();                // Populate project cards
    updateTimelineHeight();         // Calculate timeline height on page load

    //Recalculate timeline length on window resize
    window.addEventListener('resize', updateTimelineHeight);

    //Event listener for filters 
    document.getElementById('filters').addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            const filter = e.target.getAttribute('data-filter');
            filterCards(filter);
            e.target.classList.toggle('selected-filter');
        }
    });
    
});

function handleNavToggle() {
    // Add listener to each list item, close burger menu on link click
    const navLinks = document.querySelectorAll('nav ul li a');
    const navToggle = document.getElementById('nav-toggle');

    // Add listener to each list item
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.checked = false; 
        });
    });
}

function updateTimelineHeight() {
    //If there is more than one job, calculate distance from first to last entry. Else set to 0px
    const timeline = document.querySelector('.timeline');
    const firstJob = timeline.querySelector('.job:first-child');
    const lastJob = timeline.querySelector('.job:last-child');
    
    if (firstJob && lastJob) {
        const timelineHeight = lastJob.offsetTop - firstJob.offsetTop;
        timeline.style.setProperty('--timeline-height', `${timelineHeight}px`);
    }
    else {
        timeline.style.setProperty('--timeline-height', '0px');
    }
}

const PROJECT_CARDS = [
    {
        title: 'RG35XX+',
        description: 'A product render created in Blender.',
        skills: 'Blender',
        image: 'assets/images/RG35XX.jpg',
        link: 'https://www.artstation.com/artwork/YBmmNq',
        catagories: ['3D']
    },
    {
        title: 'LCD-2',
        description: 'Game-ready asset recreating the Audeze LCD-2\'s.',
        skills: '3DS Max || Substance Painter || Toolbag',
        image: ['assets/images/LCD2.jpg', 'assets/images/LCD2alt.jpg'],
        link: 'https://www.artstation.com/artwork/n0OddK',
        catagories: ['3D', 'GameDev']
    },
    {
        title: 'Raptor Rider',
        description: 'Fully rigged game-ready character and mount rendered in UE5.',
        skills: 'Maya || ZBrush || Unreal Engine',
        image: 'assets/images/CharacterDino.jpg',
        link: 'https://www.artstation.com/artwork/lDlVPY',
        catagories: ['3D', 'GameDev']
    },
    {
        title: 'Space Invaders',
        description: 'A collaborative hackathon project recreating Space Invaders.',
        skills: 'HTML || CSS || JavaScript || FL Studio',
        image: 'assets/images/SpaceInvaders.png',
        link: 'https://github.com/KiwiFunk/space-invaders',
        catagories: ['Programming', 'GameDev']
    },
    {
        title: 'Snake',
        description: 'Creating Snake using PyGame as a learning project.',
        skills: 'Python || PyGame || Adobe Illustrator',
        image: 'assets/images/Snake.png',
        link: 'https://github.com/KiwiFunk/snake-game',
        catagories: ['Programming', 'GameDev']
    },
    {
        title: 'TypeRacer',
        description: 'A clone of MonkeyType created as a personal project to practice JavaScript.',
        skills: 'HTML || CSS || JavaScript',
        image: 'assets/images/TypeRacercrop.png',
        link: 'https://github.com/KiwiFunk/type-racer',
        catagories: ['Programming']
    }
];

function populateCards(cards = PROJECT_CARDS) {
    // Get the card container, Append a new card for every object in the array
    const CARD_CONTAINER = document.getElementById('project-cards');
    CARD_CONTAINER.innerHTML = ''; // Clear previous cards

    for (const card of cards) {

        let newCard = document.createElement('div');

        newCard.classList.add('card');
        newCard.innerHTML = `
            <a href="${card.link}" target="_blank" rel="noopener noreferrer" aria-label="${card.title} project (opens in new tab)">
                <img src="${displayImages(card.image)}" alt="${card.title}">
                <div class="card-content">
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                </div>
                <hr>
                <span class="card-skills">${card.skills}</span>
            </a>
        `;
        CARD_CONTAINER.appendChild(newCard);
    }
};

function displayImages(images) {
    // Check to see if single image, or multiple images for image key. Planned to expand to multiple images per card.
    return Array.isArray(images) ? images[0] : images;
}

let selectedFilters = [];

function filterCards(filter) {

    const unfilteredCardsArray = PROJECT_CARDS;
    let filteredCardObjects = [];
    
    //Update selectedFilters array
    if (selectedFilters.includes(filter)) selectedFilters = selectedFilters.filter(item => item !== filter);
    else selectedFilters.push(filter);

    //Populate filteredCardObjects array with cards that match all selected filters
    filteredCardObjects = unfilteredCardsArray.filter(card => {
        return selectedFilters.every(filter => card.catagories.includes(filter));
    });
    
    populateCards(filteredCardObjects);
}


