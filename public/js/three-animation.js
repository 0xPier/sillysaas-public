// Three.js Animation for Hero Section
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page with the hero canvas
    const heroCanvasContainer = document.getElementById('hero-canvas-container');
    if (!heroCanvasContainer) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 1.0;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    heroCanvasContainer.appendChild(renderer.domElement);
    
    // Create a group to hold our objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Position the group higher on the page (above the text)
    group.position.y = 3.7;
    
    // Create a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    
    // Create materials with different colors for each face
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x6269CD }), // Indigo
        new THREE.MeshBasicMaterial({ color: 0xF4602E }), // Flamingo
        new THREE.MeshBasicMaterial({ color: 0xFFE650 }), // Yellow
        new THREE.MeshBasicMaterial({ color: 0x6269CD }), // Indigo
        new THREE.MeshBasicMaterial({ color: 0xF4602E }), // Flamingo
        new THREE.MeshBasicMaterial({ color: 0xFFE650 })  // Yellow
    ];
    
    // Create the cube with materials
    const cube = new THREE.Mesh(geometry, materials);
    group.add(cube);
    
    // Create wireframe for the cube
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.3
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube.add(wireframe);
    
    // Add some particles around the cube
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        // Random positions in a sphere around the cube
        posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.5
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particlesMesh);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Easter egg: Clicking on the cube makes it glitch
    let isGlitching = false;
    let glitchTimeout;
    
    renderer.domElement.addEventListener('click', (event) => {
        // Convert mouse position to normalized device coordinates
        const rect = renderer.domElement.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Raycasting to check if cube was clicked
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x, y }, camera);
        
        const intersects = raycaster.intersectObjects([cube], true);
        
        if (intersects.length > 0) {
            // Start glitching effect
            isGlitching = true;
            
            // Stop glitching after 2 seconds
            clearTimeout(glitchTimeout);
            glitchTimeout = setTimeout(() => {
                isGlitching = false;
            }, 2000);
            
            // Show hidden message
            const messages = [
                "You found easter egg #1!",
                "Disruption is just a fancy word for breaking stuff.",
                "This cube contains the secrets of the universe... or just more JavaScript."
            ];
            
            // Create a hidden message that appears and fades
            const message = document.createElement('div');
            message.textContent = messages[Math.floor(Math.random() * messages.length)];
            message.style.position = 'absolute';
            message.style.top = `${event.clientY}px`;
            message.style.left = `${event.clientX}px`;
            message.style.transform = 'translate(-50%, -50%)';
            message.style.color = '#FFE650';
            message.style.fontFamily = 'Space Mono, monospace';
            message.style.fontWeight = 'bold';
            message.style.padding = '10px';
            message.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            message.style.borderRadius = '5px';
            message.style.zIndex = '1000';
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.3s ease';
            
            document.body.appendChild(message);
            
            // Fade in
            setTimeout(() => {
                message.style.opacity = '1';
            }, 10);
            
            // Fade out and remove
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 300);
            }, 3000);
        }
    });
    
    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate the cube
        if (isGlitching) {
            // Glitching effect: random rotation and position changes
            cube.rotation.x += (Math.random() - 0.5) * 0.2;
            cube.rotation.y += (Math.random() - 0.5) * 0.2;
            cube.rotation.z += (Math.random() - 0.5) * 0.2;
            
            cube.position.x = (Math.random() - 0.5) * 0.1;
            cube.position.y = (Math.random() - 0.5) * 0.1;
            
            // Randomly change colors during glitch
            materials.forEach(material => {
                if (Math.random() > 0.9) {
                    const colors = [0x6269CD, 0xF4602E, 0xFFE650, 0xFFFFFF];
                    material.color.setHex(colors[Math.floor(Math.random() * colors.length)]);
                }
            });
        } else {
            // Normal smooth rotation
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.01;
            
            // Reset position
            cube.position.x = 0;
            cube.position.y = 0;
        }
        
        // Make the cube respond to mouse movement
        group.rotation.x += (mouseY * 0.01 - group.rotation.x) * 0.1;
        group.rotation.y += (mouseX * 0.01 - group.rotation.y) * 0.1;
        
        // Rotate particles
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    };
    
    animate();
}); 