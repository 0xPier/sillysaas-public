// Main JavaScript for sillySaaS website
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the glitch text effect
    initGlitchText();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize chat widget
    initChatWidget();
    
    // Initialize Easter Egg #3
    initEasterEgg3();
});

// Initialize glitch text effect
function initGlitchText() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;
    
    // Set the data-text attribute to match the text content
    glitchText.setAttribute('data-text', glitchText.textContent);
}

// Initialize smooth scrolling for anchor links
function initSmoothScroll() {
    // Get the CTA button
    const ctaButton = document.querySelector('.cta-button button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Scroll to projects section
            const projectsSection = document.querySelector('.projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Get all nav icons
    const navIcons = document.querySelectorAll('.nav-icon');
    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const tooltip = icon.getAttribute('data-tooltip');
            let targetSection;
            
            // Determine which section to scroll to based on tooltip
            switch (tooltip.toLowerCase()) {
                case 'about':
                    targetSection = document.querySelector('.about');
                    break;
                case 'projects':
                    targetSection = document.querySelector('.projects');
                    break;
                case 'contact':
                    targetSection = document.querySelector('.contact');
                    break;
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize chat widget
function initChatWidget() {
    const chatButton = document.querySelector('.chat-button');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    const sendMessage = document.querySelector('.send-message');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatButton || !chatContainer) return;
    
    // Toggle chat container visibility
    chatButton.addEventListener('click', () => {
        chatContainer.style.display = chatContainer.style.display === 'none' || chatContainer.style.display === '' ? 'flex' : 'none';
        
        // If opening the chat, focus the input
        if (chatContainer.style.display === 'flex' && chatInput) {
            chatInput.focus();
        }
    });
    
    // Close chat
    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatContainer.style.display = 'none';
        });
    }
    
    // Send message functionality
    if (sendMessage && chatInput && chatMessages) {
        // Function to send a message
        const sendChatMessage = () => {
            const message = chatInput.value.trim();
            if (message === '') return;
            
            // Add user message to chat
            addMessage(message, 'user');
            
            // Clear input
            chatInput.value = '';
            
            // Simulate bot response (in a real app, this would call the OpenAI API)
            setTimeout(() => {
                simulateBotResponse(message);
            }, 1000);
        };
        
        // Send button click
        sendMessage.addEventListener('click', sendChatMessage);
        
        // Enter key press
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Function to add a message to the chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const messagePara = document.createElement('p');
        messagePara.textContent = text;
        
        messageDiv.appendChild(messagePara);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to simulate bot response
    function simulateBotResponse(userMessage) {
        // Simple responses based on keywords
        const responses = [
            { keywords: ['hello', 'hi', 'hey'], response: 'Hello there! How can I help you today?' },
            { keywords: ['project', 'projects', 'app', 'apps'], response: 'Our projects are satirical takes on modern tech. Check out the Projects section to see them all!' },
            { keywords: ['about', 'who', 'what'], response: 'sillySaaS is a collective of developers and designers creating absurd but functional software. We\'re like MSCHF but for apps.' },
            { keywords: ['contact', 'email', 'reach'], response: 'You can reach us at hello@sillysaas.com or through our social media channels.' },
            { keywords: ['easter', 'egg', 'secret'], response: 'I can neither confirm nor deny the existence of easter eggs on this website... 👀' }
        ];
        
        // Check for keyword matches
        const userMessageLower = userMessage.toLowerCase();
        let botResponse = 'I\'m not sure how to respond to that. Try asking about our projects or contact information!';
        
        for (const item of responses) {
            if (item.keywords.some(keyword => userMessageLower.includes(keyword))) {
                botResponse = item.response;
                break;
            }
        }
        
        // Add bot response
        addMessage(botResponse, 'bot');
    }
}

// Initialize Easter Egg #3
function initEasterEgg3() {
    // Easter egg in footer
    const easterEggText = document.querySelector('.easter-egg');
    if (!easterEggText) return;
    
    easterEggText.addEventListener('click', () => {
        // Create a matrix-like effect on the entire page
        createMatrixEffect();
    });
}

// Create Matrix rain effect
function createMatrixEffect() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Characters to display
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$&+,:;=?@#|<>^*()%!';
    
    // Font size
    const fontSize = 14;
    
    // Calculate columns
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to store current y position for each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Message to display
    const message = 'YOU FOUND EASTER EGG #3';
    let messageShown = false;
    
    // Draw the matrix effect
    function draw() {
        // Semi-transparent black background to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text color and font
        ctx.fillStyle = '#FFE650';
        ctx.font = `${fontSize}px monospace`;
        
        // Loop through each column
        for (let i = 0; i < drops.length; i++) {
            // Get random character
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            // Draw character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Move drop down
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
        
        // Show message after 3 seconds
        if (!messageShown && animationFrameCount > 180) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 30, 400, 60);
            
            ctx.fillStyle = '#FFE650';
            ctx.font = 'bold 24px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(message, canvas.width / 2, canvas.height / 2);
            
            messageShown = true;
        }
    }
    
    // Animation frame count
    let animationFrameCount = 0;
    
    // Animation loop
    function animate() {
        draw();
        animationFrameCount++;
        
        // Stop after 10 seconds
        if (animationFrameCount < 600) {
            requestAnimationFrame(animate);
        } else {
            // Remove canvas after animation ends
            document.body.removeChild(canvas);
        }
    }
    
    // Start animation
    animate();
} 