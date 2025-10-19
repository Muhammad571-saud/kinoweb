// Store movies in localStorage
let movies = JSON.parse(localStorage.getItem('movies')) || {};

// Admin modal elements
const adminModal = document.getElementById('admin-modal');
const adminBtn = document.getElementById('admin-btn');
const closeBtn = document.querySelector('.close');
const loginBtn = document.getElementById('login-btn');
const adminPassword = document.getElementById('admin-password');
const adminContent = document.getElementById('admin-content');

// Upload form elements
const videoFile = document.getElementById('video-file');
const movieName = document.getElementById('movie-name');
const movieCode = document.getElementById('movie-code');
const movieTypeSelect = document.getElementById('movie-type-select');
const publishBtn = document.getElementById('publish-btn');

// Search elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const movieDisplay = document.getElementById('movie-display');
const movieTitle = document.getElementById('movie-title');
const movieType = document.getElementById('movie-type');
const movieVideo = document.getElementById('movie-video');

// Open admin modal
adminBtn.onclick = function() {
    adminModal.style.display = 'block';
}

// Close modal
closeBtn.onclick = function() {
    adminModal.style.display = 'none';
    adminContent.style.display = 'none';
    adminPassword.value = '';
}

// Login to admin panel
loginBtn.onclick = function() {
    if (adminPassword.value === 'kinoyoq') {
        adminContent.style.display = 'block';
        adminPassword.style.display = 'none';
        loginBtn.style.display = 'none';
    } else {
        alert('Incorrect password');
    }
}

// Publish movie
publishBtn.onclick = function() {
    const file = videoFile.files[0];
    const name = movieName.value.trim();
    const code = movieCode.value.trim();
    const type = movieTypeSelect.value;

    if (!file || !name || !code) {
        alert('Please fill all fields and select a video file');
        return;
    }

    // Create object URL for the video
    const videoUrl = URL.createObjectURL(file);

    // Store movie data
    movies[code] = {
        name: name,
        type: type,
        videoUrl: videoUrl
    };

    // Save to localStorage
    localStorage.setItem('movies', JSON.stringify(movies));

    alert('Movie published successfully!');

    // Clear form
    videoFile.value = '';
    movieName.value = '';
    movieCode.value = '';
    movieTypeSelect.value = 'movie';
}

// Search movie
searchBtn.onclick = function() {
    const code = searchInput.value.trim();
    if (!code) {
        alert('Please enter a movie code');
        return;
    }

    const movie = movies[code];
    if (movie) {
        movieTitle.textContent = movie.name;
        movieType.textContent = movie.type === 'movie' ? 'Movie' : 'Cartoon';
        movieVideo.src = movie.videoUrl;
        movieDisplay.style.display = 'block';
    } else {
        alert('Movie not found');
        movieDisplay.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == adminModal) {
        adminModal.style.display = 'none';
        adminContent.style.display = 'none';
        adminPassword.value = '';
    }
}