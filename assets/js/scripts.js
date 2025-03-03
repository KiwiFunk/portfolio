//GLOBAL VARIABLES

let PROJECT_CARDS = [];     //Project data from JSON file
let filteredCards = [];     //Filtered project cards

let selectedFilters = [];   //Array of currently selected filters

let currentPage = 1;        //Start on the first page
let totalPages = 1;         //Init totalPages
let cardsPerPage = 6;       //Default Value (We need to popualate cards for calculateCardsPerPage to work)


//Fetch project data from JSON file
async function fetchProjectData() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        PROJECT_CARDS = data;
        filteredCards = data;
    } catch (error) {
        console.error('Error loading project data:', error);
    }
}

//DOM CONTENT LOADED - must be async to wait for fetchProjectData to complete
document.addEventListener('DOMContentLoaded', async function() {
    try {
        
        await fetchProjectData();       // Wait for function to complete before continuing
        
        updateTimelineHeight();         // Calculate timeline height on page load
        handleNavToggle();              // Close burger menu on link click

        populateCards();                // Populate project cards (We need to add cards in order to perform calculations)
        calculateCardsPerPage();        // Calculate number of cards per page

        setupEventListeners();          // Event Listeners
        
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});

// EVENT LISTENERS
function setupEventListeners() {
    window.addEventListener('resize', () => {
        updateTimelineHeight();
        calculateCardsPerPage();
    });

    document.getElementById('filters').addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            const filter = e.target.getAttribute('data-filter');
            e.target.classList.toggle('selected-filter');
            filterCards(filter);
        }
    });

    // Pagination listeners
    document.getElementById('prev-page').addEventListener('click', function() {
        if (!this.classList.contains('disabled') && currentPage > 1) {
            currentPage--;
            populateCards();
            updatePaginationButtons();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        if (!this.classList.contains('disabled') && currentPage < totalPages) {
            currentPage++;
            populateCards();
            updatePaginationButtons();
        }
    });
}

//PAGINATION FUNCTIONS
function calcTotalPages() {
    //Calculate total pages based on number of cards and cards per page
    totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    updatePaginationButtons();
}

function updatePaginationButtons() {
    const pageInfo = document.getElementById('page-info');
    pageInfo.textContent = `${currentPage} of ${totalPages}`;

    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // Add/remove disabled class instead of disabled attribute
    prevButton.classList.toggle('disabled', currentPage === 1);
    nextButton.classList.toggle('disabled', currentPage === totalPages);
}

function populateCards() {
    // Get the card container, Append a new card for every object in the array

    const CARD_CONTAINER = document.getElementById('project-cards');
    CARD_CONTAINER.innerHTML = '';                  // Clear previous cards

    // Calculate which cards to display based on current page
    const startIdx = (currentPage - 1) * cardsPerPage;              //Page 1 = 0*6 which starts with index zero, page 2 = 1*6 which starts with index 6
    const endIdx = startIdx + cardsPerPage;
    const cardsToDisplay = filteredCards.slice(startIdx, endIdx);

    for (const card of cardsToDisplay) {

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

function filterCards(filter) {
    // Update the selectedFilters array
    if (selectedFilters.includes(filter)) {
        selectedFilters = selectedFilters.filter(item => item !== filter);
    } else {
        selectedFilters.push(filter);
    }

    // Filter the cards based on selectedFilters
    filteredCards = PROJECT_CARDS.filter(card => {
        return selectedFilters.every(filter => card.categories.includes(filter));
    });

    // Reset to the first page when filtering
    currentPage = 1;

    // Recalculate total pages and display the cards
    calcTotalPages();
    populateCards();
}


//Calculate the dimensions of a card
//get width of DOM
//Calculate how many cards are currently on screen in a row

//3 means desktop mode
//2 means tablet mode
//1 means mobile mode

//Use to calculate total no of cards to display with pagination. desktop is 2x3, tablet is 3x2, mobile is 3x1 (rows x columns)
function calculateCardsPerPage() {
    
    const card = document.querySelector('.card');
    const cardContainer = document.getElementById('project-cards');

    // If there's no cards in the DOM, we can't calculate
    if (!card) {
        console.log("ERROR: No cards available to calculate total cards.");
        return;
    }

    // Get the width of the card container and card
    const cardWidth = card.offsetWidth;
    const containerWidth = cardContainer.offsetWidth;

    // Calculate the number of cards that fit in the container for a single row
    const totalColumns = Math.floor(containerWidth / cardWidth);
    console.log(totalColumns);

    //Return total number of cards to display per page
    switch(totalColumns) {
        case 3:             //Desktop view
            cardsPerPage = 3;
            break;
        case 2:             //Tablet view
            cardsPerPage = 4;
            break;
        case 1:             //Mobile view
            cardsPerPage = 3;
            break;
        default:            //Default to desktop view
            cardsPerPage = 3;
            break;
    }

    // Recalculate total pages and display the cards
    calcTotalPages();
    populateCards();
}
