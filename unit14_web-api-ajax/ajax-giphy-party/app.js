console.log("Let's get this party started!");

const form = document.querySelector("#search-form");

const searchText = document.querySelector("#search-text");
const btnRemove = document.querySelector("#remove-img");

const imgContainer = document.querySelector("#imgs");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    searchGiphy(searchText.value);
    e.target.reset();
})


btnRemove.addEventListener("click", function(e) {
    const currDiv = document.querySelector("#imgs");
    currDiv.innerHTML = "";
})


async function searchGiphy(text) {
    let res = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${text}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
    let randIdx = Math.floor(Math.random() * res.data.data.length);

    let imgLink = res.data.data[randIdx].images.original.url;
    generageGif(imgLink);
}


function generageGif(imgLink) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('img-container');

    const image = document.createElement('img');
    image.setAttribute('src', imgLink);
    image.classList.add('img-size');

    newDiv.append(image);

    imgContainer.append(newDiv);
}