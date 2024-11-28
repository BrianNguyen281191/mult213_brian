// Replace with your GIPHY API key
const apiKey = 'N3LSf286QyvR4YjJF1kn5MDinX4SJLi7';  

let currentQuery = '';  
let currentOffset = 0;  // Keeps track of the starting offset for the current page
const resultsPerPage = 10; // Number of results per page

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchQuery').value;
    if (query) {
        currentQuery = query;
        currentOffset = 0;  // Reset offset to 0 for a new search
        fetchGIFs(currentQuery, currentOffset);
    }
});

// Function to fetch GIFs from the GIPHY API
function fetchGIFs(query, offset) {
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=${resultsPerPage}&offset=${offset}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error fetching data:', error));
}

// Function to display the GIF results
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';  // Clear previous results

    // Display a message if no results are found
    if (data.data.length === 0) {
        resultsDiv.innerHTML = '<p>No GIFs found. Try another search.</p>';
    } else {
        // Display results
        data.data.forEach(item => {
            const gifUrl = item.images.original.url;
            const gifElement = document.createElement('div');
            gifElement.classList.add('result-item');
            gifElement.innerHTML = `<img src="${gifUrl}" alt="GIF" />`;
            resultsDiv.appendChild(gifElement);
        });

        // Show the pagination buttons
        document.getElementById('previousButton').style.display = currentOffset > 0 ? 'inline-block' : 'none';
        document.getElementById('nextButton').style.display = data.data.length === resultsPerPage ? 'inline-block' : 'none';
        document.getElementById('backToHomeButton').style.display = 'inline-block';
    }
}

// Go to the previous page of results
document.getElementById('previousButton').addEventListener('click', function() {
    currentOffset -= resultsPerPage;  // Decrease by the number of results per page
    fetchGIFs(currentQuery, currentOffset);
});

// Go to the next page of results
document.getElementById('nextButton').addEventListener('click', function() {
    currentOffset += resultsPerPage;  // Increase by the number of results per page
    fetchGIFs(currentQuery, currentOffset);
});

// Reset the page when 'Back to Home Page' is clicked
document.getElementById('backToHomeButton').addEventListener('click', function() {
    resetPage();  // Reset the page to start a new search
});

// Reset the page to the initial state
function resetPage() {
    document.getElementById('searchQuery').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('previousButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('backToHomeButton').style.display = 'none';
    document.querySelector('.search-section').style.display = 'block';
}