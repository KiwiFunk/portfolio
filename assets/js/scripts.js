// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    populateCards();
});

const PROJECT_CARDS = [
    {
        title: 'RG35XX+',
        description: 'This is the first project',
        skills: 'Blender',
        image: 'assets/images/alex-price-front.jpg',
        link: '#'
    },
    {
        title: 'LCD-2',
        description: 'This is the second project',
        skills: '3DS Max || Substance Painter || Marmoset Toolbag',
        image: 'assets/images/alex-price-close.jpg',
        link: '#'
    },
    {
        title: 'Raptor Warrior',
        description: 'This is the third project',
        skills: 'Maya || ZBrush || Unreal Engine',
        image: 'assets/images/DinoRiderMain.jpg',
        link: '#'
    }
];

function populateCards() {
    // Get the card container, Append a new card for every object in the array
    const CARD_CONTAINER = document.getElementById('project-cards');

    for (const card of PROJECT_CARDS) {
        let newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <img src="${card.image}" alt="${card.title}">
            <hr>
            <div class="card-content">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
                <span class="card-skills">${card.skills}</span>
            </div>
        `;

        CARD_CONTAINER.appendChild(newCard);
    }
};