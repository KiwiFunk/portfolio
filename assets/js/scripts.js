// DOM Content Load
document.addEventListener('DOMContentLoaded', function() {

    populateCards();                // Populate project cards
    updateTimelineHeight();         // Calculate timeline height on page load

    //Recalculate timeline length on window resize
    window.addEventListener('resize', updateTimelineHeight);

});

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
        link: 'https://www.artstation.com/artwork/YBmmNq'
    },
    {
        title: 'LCD-2',
        description: 'Game-ready asset recreating the Audeze LCD-2\'s.',
        skills: '3DS Max || Substance Painter || Toolbag',
        image: ['assets/images/LCD2.jpg', 'assets/images/LCD2alt.jpg'],
        link: 'https://www.artstation.com/artwork/n0OddK'
    },
    {
        title: 'Raptor Rider',
        description: 'Fully rigged game-ready character and mount rendered in UE5.',
        skills: 'Maya || ZBrush || Unreal Engine',
        image: 'assets/images/CharacterDino.jpg',
        link: 'https://www.artstation.com/artwork/lDlVPY'
    },
    {
        title: 'Space Invaders',
        description: 'A collaborative hackathon project recreating Space Invaders.',
        skills: 'HTML || CSS || JavaScript || FL Studio',
        image: 'assets/images/SpaceInvaders.png',
        link: 'https://github.com/KiwiFunk/space-invaders'
    },
    {
        title: 'Snake',
        description: 'Creating Snake using PyGame as a learning project.',
        skills: 'Python || PyGame || Adobe Illustrator',
        image: 'assets/images/Snake.png',
        link: 'https://github.com/KiwiFunk/snake-game'
    },
    {
        title: 'TypeRacer',
        description: 'A clone of MonkeyType created as a personal project to practice JavaScript.',
        skills: 'HTML || CSS || JavaScript',
        image: 'assets/images/TypeRacercrop.png',
        link: 'https://github.com/KiwiFunk/type-racer'
    }
];

function populateCards() {
    // Get the card container, Append a new card for every object in the array
    const CARD_CONTAINER = document.getElementById('project-cards');

    for (const card of PROJECT_CARDS) {

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
    // Check to see if single image, or multiple images for image key
    return Array.isArray(images) ? images[0] : images;
}

