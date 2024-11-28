const apiKey = 'aYhfakCNp5OliwAgwOvLpWjcVBq61y20';  

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchQuery').value;
    if (query) {
        fetchGIFs(query);
    }
});

function fetchGIFs(query) {
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=10`;

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
        return;
    }

    data.data.forEach(item => {
        const gifUrl = item.images.original.url;
        const gifElement = document.createElement('div');
        gifElement.classList.add('result-item');
        gifElement.innerHTML = `<img src="${gifUrl}" alt="GIF" />`;
        resultsDiv.appendChild(gifElement);
    });
}
