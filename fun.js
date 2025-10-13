// fun.js - Randomize font order on page load
document.addEventListener('DOMContentLoaded', function() {
    const fontsContainer = document.getElementById('fonts');
    const fontCards = Array.from(fontsContainer.children);
    
    // Fisher-Yates shuffle algorithm
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    // Shuffle the font cards
    const shuffledCards = shuffleArray(fontCards);
    
    // Clear the container and add shuffled cards back
    fontsContainer.innerHTML = '';
    shuffledCards.forEach(card => {
        fontsContainer.appendChild(card);
    });
});
