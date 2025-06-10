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

        // Preload images
        await preloadImages(PROJECT_CARDS);

    } catch (error) {
        console.error('Error loading project data:', error);
    }
}

//PRELOADING CONTENT
function preloadImages(cards) {
    const imagePromises = cards.map(card => {
        // If there is only a single image, convert it to an array for consistency
        const images = Array.isArray(card.image) ? card.image : [card.image];

        // Create an image loading promise for each image
        return images.map(imageSrc => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = imageSrc;         // Set image source
                img.onload = resolve;       // Resolve when image is loaded
                img.onerror = reject;       // Reject if there's an error loading
            });
        });
    });

    // Flatten the array of promises (since we have multiple images per card)
    return Promise.all(imagePromises.flat());
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
    // Window Resize Event
    window.addEventListener('resize', () => {
        updateTimelineHeight();
        calculateCardsPerPage();
    });

    // Filter Buttons
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
    // Populate page-info span with current page and total pages
    const pageInfo = document.getElementById('page-info');
    pageInfo.textContent = `${currentPage} of ${totalPages}`;

    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // Toggle disabled class based on current page
    prevButton.classList.toggle('disabled', currentPage === 1);
    nextButton.classList.toggle('disabled', currentPage === totalPages);

}

function populateCards() {
    const CARD_CONTAINER = document.getElementById('project-cards');
    CARD_CONTAINER.innerHTML = '';

    const cardsToDisplay = filteredCards.slice(
        (currentPage - 1) * cardsPerPage, 
        currentPage * cardsPerPage
    );

    cardsToDisplay.forEach(projectData => {
        // Create new ProjectCard component
        const projectCard = new ProjectCard(projectData);
        const cardElement = projectCard.create();
        
        // Append to container
        CARD_CONTAINER.appendChild(cardElement);
    });
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
    if (selectedFilters.includes(filter)) selectedFilters = selectedFilters.filter(item => item !== filter);
    else selectedFilters.push(filter);

    // Update the filteredCards array with the selected filters
    filteredCards = PROJECT_CARDS.filter(card => {
        return selectedFilters.every(filter => card.categories.includes(filter));
    });

    currentPage = 1;                    // Reset to the first page after filtering

    calcTotalPages();                   // Recalculate total pages
    populateCards();                    // Repopulate the cards
}

function calculateCardsPerPage() {
    //Use to calculate total no of cards to display with pagination. desktop is 2x3, tablet is 3x2, mobile is 3x1 (rows x columns)

    const card = document.querySelector('.project-card');
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
            cardsPerPage = 6;
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