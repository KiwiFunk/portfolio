class ProjectCard {
    constructor(project) {
        this.project = project;
        this.element = null;
        this.isMobile = window.matchMedia('(max-width: 768px)').matches;
    }

    // Create and return the card element
    create() {
        this.element = document.createElement('div');
        this.element.classList.add('project-card');
        
        this.element.innerHTML = `
            <div class="card-image-container">
                <img src="${this.getDisplayImage()}" 
                     alt="${this.project.title}" 
                     class="card-image">
                
                ${!this.isMobile ? `
                    <div class="card-overlay">
                        <div class="card-actions">
                            <a href="${this.project.link}" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               class="action-btn primary-btn"
                               aria-label="View ${this.project.title} project">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="m9 18 6-6-6-6"/>
                                </svg>
                                View Project
                            </a>
                            ${this.project.github ? `
                                <a href="${this.project.github}" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   class="action-btn secondary-btn"
                                   aria-label="View ${this.project.title} on GitHub">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    GitHub
                                </a>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
            </div>
            
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${this.project.title}</h3>
                    <div class="card-categories">
                        ${this.project.categories.map(category => 
                            `<span class="category-badge">${category}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <p class="card-description">${this.project.description}</p>
                
                <div class="card-skills">
                    ${this.getSkillTags()}
                </div>
                
                ${this.isMobile ? `
                    <div class="card-actions mobile-actions">
                        <a href="${this.project.link}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="action-btn primary-btn"
                           aria-label="View ${this.project.title} project">
                            View Project
                        </a>
                        ${this.project.github ? `
                            <a href="${this.project.github}" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               class="action-btn secondary-btn"
                               aria-label="View ${this.project.title} on GitHub">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </a>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
        `;

        this.addEventListeners();
        return this.element;
    }

    // Parse skills string and create individual tags
    getSkillTags() {
        const skills = this.project.skills.split(' || ');
        return skills.map(skill => 
            `<span class="skill-tag">${skill.trim()}</span>`
        ).join('');
    }

    // Handle single image or array of images
    getDisplayImage() {
        return Array.isArray(this.project.image) ? this.project.image[0] : this.project.image;
    }

    // Event Listeners for hover effects
    addEventListeners() {
        // Only add hover effects for desktop
        if (!this.isMobile) {
            const imageContainer = this.element.querySelector('.card-image-container');
            
            // VIDEO PREVIEW LOGIC
            if (this.project.video) {
                let videoElement = null;
                let loadTimeout;

                // attach listener to entire card
                this.element.addEventListener('mouseenter', () => {
                    // Small delay to prevent accidental loading while scrolling
                    loadTimeout = setTimeout(() => {
                        if (!videoElement) {
                            videoElement = document.createElement('video');
                            videoElement.src = this.project.video;
                            videoElement.muted = true;
                            videoElement.loop = true;
                            videoElement.playsInline = true;
                            videoElement.autoplay = true;
                            videoElement.classList.add('card-video'); // Add CSS class
                            
                            // Style to match the image
                            videoElement.style.position = 'absolute';
                            videoElement.style.top = '0';
                            videoElement.style.left = '0';
                            videoElement.style.width = '100%';
                            videoElement.style.height = '100%';
                            videoElement.style.objectFit = 'cover';
                            videoElement.style.zIndex = '0'; // Behind the overlay but above the image
                            
                            // Insert before the overlay
                            const overlay = this.element.querySelector('.card-overlay');
                            imageContainer.insertBefore(videoElement, overlay);
                        } else {
                            videoElement.play();
                        }
                    }, 200); 
                });

                this.element.addEventListener('mouseleave', () => {
                    clearTimeout(loadTimeout);
                    if (videoElement) {
                        videoElement.pause();
                        videoElement.remove(); // Remove from DOM to save resources
                        videoElement = null;
                    }
                });
            }
            // Image Cycling Logic (Fallback if no video)
            else if (Array.isArray(this.project.image) && this.project.image.length > 1) {
                let currentImageIndex = 0;
                let imageInterval;
                
                imageContainer.addEventListener('mouseenter', () => {
                    imageInterval = setInterval(() => {
                        // Use modulus to stop overflowing the image array
                        currentImageIndex = (currentImageIndex + 1) % this.project.image.length;
                        const img = this.element.querySelector('.card-image');
                        img.src = this.project.image[currentImageIndex];
                    }, 2000);
                });
                
                imageContainer.addEventListener('mouseleave', () => {
                    clearInterval(imageInterval);
                    currentImageIndex = 0;
                    const img = this.element.querySelector('.card-image');
                    img.src = this.project.image[0];
                });
            }
        }
    }
}