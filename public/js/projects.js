// Projects Data and Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Project data
    const projects = [
        {
            id: 'project1',
            title: 'NotAnotherTodo',
            description: 'The world\'s most unnecessarily complex todo app. Features include quantum encryption for your grocery list and AI that judges your productivity.',
            image: 'images/project1.jpg',
            link: 'https://notanothertodo.sillysaas.com',
            category: 'productivity'
        },
        {
            id: 'project2',
            title: 'CryptoNonsense',
            description: 'Generate meaningless blockchain buzzwords to impress venture capitalists. Our AI creates convincing whitepapers for non-existent cryptocurrencies.',
            image: 'images/project2.jpg',
            link: 'https://cryptononsense.sillysaas.com',
            category: 'finance'
        },
        {
            id: 'project3',
            title: 'MetaverseMockery',
            description: 'A VR experience that satirizes the metaverse. Attend virtual meetings where everyone is a poorly rendered avatar with questionable physics.',
            image: 'images/project3.jpg',
            link: 'https://metaversemockery.sillysaas.com',
            category: 'vr'
        },
        {
            id: 'project4',
            title: 'AIConfusionGenerator',
            description: 'Upload any document and our AI will rewrite it to be completely incomprehensible while sounding intelligent. Perfect for academic papers.',
            image: 'images/project4.jpg',
            link: 'https://aiconfusion.sillysaas.com',
            category: 'ai'
        },
        {
            id: 'project5',
            title: 'PrivacyParadox',
            description: 'An app that simultaneously encrypts your data while posting your location on all social media platforms. The ultimate digital contradiction.',
            image: 'images/project5.jpg',
            link: 'https://privacyparadox.sillysaas.com',
            category: 'security'
        }
    ];

    // Function to create project cards
    const createProjectCards = () => {
        const projectsContainer = document.querySelector('.projects-container');
        if (!projectsContainer) return;

        // Clear existing content
        projectsContainer.innerHTML = '';

        // Create cards for each project
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.category = project.category;
            card.dataset.id = project.id;

            // Use a placeholder image if the actual image doesn't exist yet
            const imageSrc = project.image || 'https://via.placeholder.com/400x200/1a1a1a/FFFFFF?text=sillySaaS';

            card.innerHTML = `
                <img src="${imageSrc}" alt="${project.title}" class="project-image">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <a href="${project.link}" class="project-link" target="_blank">Explore Project →</a>
                </div>
            `;

            projectsContainer.appendChild(card);

            // Add hover effect with GSAP
            if (typeof gsap !== 'undefined') {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        rotation: 2,
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                        duration: 0.3
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        rotation: 0,
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                        duration: 0.3
                    });
                });
            }
        });
    };

    // Create filter buttons
    const createFilterButtons = () => {
        const projectsSection = document.querySelector('.projects');
        if (!projectsSection) return;

        // Get unique categories
        const categories = ['all', ...new Set(projects.map(project => project.category))];

        // Create filter container
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        
        // Add filter buttons
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-button';
            button.dataset.category = category;
            button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            
            // Add click event
            button.addEventListener('click', () => {
                // Update active button
                document.querySelectorAll('.filter-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                // Filter projects
                filterProjects(category);
            });
            
            filterContainer.appendChild(button);
        });
        
        // Insert filter container after the section title
        const sectionTitle = projectsSection.querySelector('.section-title');
        sectionTitle.after(filterContainer);
        
        // Set 'All' as active by default
        document.querySelector('.filter-button[data-category="all"]').classList.add('active');
    };

    // Filter projects by category
    const filterProjects = (category) => {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    display: 'block'
                });
            } else {
                gsap.to(card, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    display: 'none'
                });
            }
        });
    };

    // Easter egg: Konami code reveals a hidden project
    let konamiCodePosition = 0;
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];

    document.addEventListener('keydown', (e) => {
        // Check if the key matches the next key in the Konami code
        if (e.key === konamiCode[konamiCodePosition]) {
            konamiCodePosition++;
            
            // If the entire code is entered correctly
            if (konamiCodePosition === konamiCode.length) {
                revealHiddenProject();
                konamiCodePosition = 0; // Reset for next time
            }
        } else {
            konamiCodePosition = 0; // Reset if wrong key
        }
    });

    // Function to reveal a hidden project
    const revealHiddenProject = () => {
        const projectsContainer = document.querySelector('.projects-container');
        if (!projectsContainer) return;
        
        // Check if the hidden project already exists
        if (document.getElementById('hidden-project')) return;
        
        // Create the hidden project card
        const hiddenProject = document.createElement('div');
        hiddenProject.className = 'project-card hidden-project';
        hiddenProject.id = 'hidden-project';
        hiddenProject.dataset.category = 'secret';
        
        hiddenProject.innerHTML = `
            <div class="secret-banner">Easter Egg #2</div>
            <img src="https://via.placeholder.com/400x200/F4602E/FFFFFF?text=SECRET+PROJECT" alt="Secret Project" class="project-image">
            <div class="project-content">
                <h3 class="project-title">UltraSecretProject</h3>
                <p class="project-description">You found our secret project! This app can predict the exact moment your code will crash before you even write it. Congratulations on discovering the Konami code easter egg.</p>
                <a href="#" class="project-link">Top Secret →</a>
            </div>
        `;
        
        // Add special styling
        const style = document.createElement('style');
        style.textContent = `
            .hidden-project {
                border: 2px solid #FFE650;
                animation: pulse 2s infinite;
            }
            
            .secret-banner {
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: #FFE650;
                color: #121212;
                padding: 5px 10px;
                font-weight: bold;
                z-index: 10;
                transform: rotate(5deg);
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 230, 80, 0.7); }
                70% { box-shadow: 0 0 0 15px rgba(255, 230, 80, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 230, 80, 0); }
            }
        `;
        
        document.head.appendChild(style);
        
        // Add with a special animation
        projectsContainer.prepend(hiddenProject);
        
        gsap.from(hiddenProject, {
            y: -50,
            opacity: 0,
            rotation: 10,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
        
        // Show a congratulatory message
        const message = document.createElement('div');
        message.className = 'easter-egg-message';
        message.textContent = 'You found the Konami code easter egg!';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.backgroundColor = '#FFE650';
        message.style.color = '#121212';
        message.style.padding = '20px';
        message.style.borderRadius = '5px';
        message.style.fontWeight = 'bold';
        message.style.zIndex = '1000';
        message.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.removeChild(message);
        }, 3000);
    };

    // Initialize
    createProjectCards();
    createFilterButtons();
}); 