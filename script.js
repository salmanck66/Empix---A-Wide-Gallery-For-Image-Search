const accessKey = '4C36tbw9Ts6Qo9Gi8iHfkHTN9yaA1XsMgW-UUyZSLlk';
const searchData = document.querySelector('form');
const inputEl = document.getElementById('search-bar');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more-btn');

let inputData = '';
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }
    if (results.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No pictures found. Please try another search.';
        searchResults.appendChild(noResultsMessage);
        showMore.style.display = "none"; // Hide the 'Show More' button
        return;
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('result-item');
        const a_link = document.createElement('a');
        a_link.href = result.links.html;
        a_link.target = '_blank';
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(a_link);
        a_link.appendChild(image);
        searchResults.appendChild(imageWrapper); // Corrected this line
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

searchData.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
