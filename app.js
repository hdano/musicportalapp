// Music Portal PWA - app.js

// Initialize the service worker for offline capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Fetching the music data
async function fetchMusicData() {
    try {
        const response = await fetch('https://api.example.com/music');
        const musicData = await response.json();
        // Process and display music data
        console.log(musicData);
    } catch (error) {
        console.error('Error fetching music data:', error);
    }
}

fetchMusicData();
