// Initialize parameters
let movieCollection = [];
let movieId = 0;

// Setting the state of "sorting"
let isSortedByName = false;
let isSortedByRating = false;

// Add event listners
$("#new-movie-form").on("submit", doSubmit);

// Define class for movie entries
class Entry {
    constructor(id, name, rating) {
        this.id = id;
        this.name = name;
        this.rating = rating;
    }
}

// Extract from local storage if applicable
const savedMovieList = localStorage.getItem('userList'); 
const userList = savedMovieList === null ? [] : JSON.parse(savedMovieList); 

if (userList !== []) {
    movieCollection = userList;
    makeMovieEntry();        
}

// Test w/ mock data
// movieCollection = generateMockData(10);
// makeMovieEntry();

// function generateMockData(num) {
//     const result = [];

//     const movieName = ["Speed", "Pearl Harbour", "Avengers", "Venom", "Spider Man", "Total Recall", "Source Code", "Shang Chi", "Doctor Strange", "Free Guy", "Red Notice", "Interstellar", "Dune", "Black Widdow", "2012", "Armageddon", "Independence Day", "Matrix", "Inception", "No Time to Die"];

//     for (let i = 0; i < num; i++) {
//         const name = movieName[Math.floor(Math.random() * movieName.length)];
//         const rating = Math.floor(Math.random() * 5 + 6);
//         const obj = new Entry(movieId, name, rating);
//         movieId++;

//         result.push(obj);
//     }

//     return result;
// }


// Submit a movie entry
function doSubmit(e) {
    e.preventDefault();

    const movieName = $("#movie-name").val();
    const movieRating = $("#movie-rating").val();

    // create a new movie entry
    let movie = new Entry(movieId, movieName, movieRating);
    movieCollection.push(movie);
    movieId++;
    
    // add movie entry to the table
    makeMovieEntry();

    // clear the form
    $("input").val("");

    // changing the state of "sorting"
    isSortedByName = false;
    isSortedByRating = false;

    // save to local storage
    localStorage.setItem('userList', JSON.stringify(movieCollection));

}

// Remove a movie entry
function remove(e) {
    const entry = e.target.closest("tr");
    const entryId = +entry.getAttribute("data-id");
    const arrayIdx = movieCollection.findIndex( obj => obj.id === entryId );
    
    // update movie collection array and movie list
    movieCollection.splice(arrayIdx, 1);
    makeMovieEntry();

    // update local storage
    localStorage.setItem('userList', JSON.stringify(movieCollection));
}


// Make a movie entry
function makeMovieEntry() {

    let trStr = "";
    $("tbody").html("");

    for (let entry of movieCollection) {
        trStr += 
        `<tr data-id=${entry.id}>
            <td class="col-7">${entry.name}</td>
            <td class="col-3">${entry.rating}</td>
            <td class="col-2"><div class="btn btn-sm btn-danger remove"><i class="fa fa-trash"></i></div></td>
        </tr>`;
    }

    $("tbody").html(trStr);
    $(".remove").on("click", remove);
    
}

// Sort movie entries
$(".sort-btn").on("click", function(){
    const key = $(this).parent().data("key");

    if ($(this).parent().data("key") === "rating") {
        if(isSortedByRating) {
            movieCollection.reverse();
        } else {
            movieCollection.sort((entry1, entry2) => { 
                return entry1[key] - entry2[key] 
            });

            isSortedByRating = true;

        }
    }

    if ($(this).parent().data("key") === "name") {
        if(isSortedByName) {
            movieCollection.reverse();
        } else {
            movieCollection.sort((entry1, entry2) => { 
                if (entry1[key] < entry2[key]) {
                    return -1;
                } else if (entry1[key] > entry2[key]) {
                    return 1;
                } else {
                    return 0;
                }
             });

            isSortedByName = true;

        }
    }
    
    makeMovieEntry();
});



  