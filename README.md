# sillySaaS Website

A MSCHF-inspired website for sillySaaS, a fictional collective creating satirical software applications.

## Features

- Responsive single-page design with smooth scrolling
- Interactive 3D elements using Three.js
- Project showcase with filtering functionality
- Chat widget that can be integrated with OpenAI API
- Multiple easter eggs hidden throughout the site

## Technologies Used

- HTML5, CSS3, JavaScript
- Three.js for 3D animations
- GSAP for advanced animations
- Font Awesome for icons
- Google Fonts (Space Mono, Playfair Display)

## Project Structure

```
sillySaaS/
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── projects.js
│   └── three-animation.js
├── images/
│   ├── logo.svg
│   └── projects/
└── index.html
```

## Easter Eggs

The website contains 3 hidden easter eggs:
1. Click on the 3D cube in the hero section
2. Enter the Konami code (↑ ↑ ↓ ↓ ← → ← → B A)
3. Click on the easter egg text in the footer

## OpenAI API Integration

The chat widget is prepared for OpenAI API integration. To connect it:

1. Replace the `simulateBotResponse` function in `main.js` with an actual API call
2. Add your API key securely
3. Customize the prompts and responses as needed

## Running the Website

Simply open the `index.html` file in a web browser to view the website locally.

## Credits

- Design inspired by MSCHF's website
- 3D animations powered by Three.js
- Icons by Font Awesome
- Fonts by Google Fonts

## License

This project is for demonstration purposes only. 