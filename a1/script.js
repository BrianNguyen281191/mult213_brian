const apiKey = 'N3LSf286QyvR4YjJF1kn5MDinX4SJLi7';  

let currentQuery = '';  
let currentOffset = 0;  
const resultsPerPage = 10;


document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchQuery').value;
    if (query) {
        currentQuery = query;
        currentOffset = 0; 
        fetchGIFs(currentQuery, currentOffset);
    }
});


function fetchGIFs(query, offset) {
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=${resultsPerPage}&offset=${offset}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error fetching data:', error));
}


function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.data.length === 0) {
        resultsDiv.innerHTML = '<p>No GIFs found. Try another search.</p>';
    } else {
        
        data.data.forEach(item => {
            const gifUrl = item.images.original.url;
            const gifElement = document.createElement('div');
            gifElement.classList.add('result-item');
            gifElement.innerHTML = `<img src="${gifUrl}" alt="GIF" />`;
            resultsDiv.appendChild(gifElement);
        });

    
        document.getElementById('previousButton').style.display = currentOffset > 0 ? 'inline-block' : 'none';
        document.getElementById('nextButton').style.display = data.data.length === resultsPerPage ? 'inline-block' : 'none';
        document.getElementById('backToHomeButton').style.display = 'inline-block';
    }
}


document.getElementById('previousButton').addEventListener('click', function() {
    if (currentOffset > 0) {
        currentOffset -= resultsPerPage;
        fetchGIFs(currentQuery, currentOffset);
    }
});

document.getElementById('nextButton').addEventListener('click', function() {
    currentOffset += resultsPerPage;
    fetchGIFs(currentQuery, currentOffset);
});

document.getElementById('backToHomeButton').addEventListener('click', function() {
    resetPage();
});

function resetPage() {
    document.getElementById('searchQuery').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('previousButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('backToHomeButton').style.display = 'none';
}

document.getElementById('results').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('searchQuery').value;
        if (query) {
            currentQuery = query;
            currentOffset = 0; 
            fetchGIFs(currentQuery, currentOffset);
        }
    }
});
