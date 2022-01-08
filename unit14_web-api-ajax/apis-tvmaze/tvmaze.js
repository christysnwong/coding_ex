/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.

  const results = [];

  let res = await axios.get("http://api.tvmaze.com/search/shows", {
    params: {
      q: query      
    }
  });

  for (let obj of res.data) {

    results.push({
      id: obj.show.id,
      name: obj.show.name,
      summary: obj.show.summary? obj.show.summary : "No Summary",
      image: obj.show.image? obj.show.image.medium : "default.png"
    })

  }

  return results;

}


/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <img class="card-img-top" src=${show.image}>
             <p class="card-text">${show.summary}</p>
             <div class="btn btn-sm btn-success getEpi">Episodes</button>
           </div>
         </div>
       </div>
      `);


    $showsList.append($item);
  }


  // // method 1
  // $(".getEpi").on("click", function(e) {
  //   const idKey = $(e.target).closest(".card").data("showId");
  
  //   getEpisodes(idKey);
    
  // })

  // method 2
  // $(".getEpi").on("click", async function(e) {
  //   const idKey = $(e.target).closest(".card").data("showId");
  
  //   let episodes = await getEpisodes(idKey);
  
  //   populateEpisodes(episodes);
  
  // })


}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  // $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
  $("#episodes-list").empty();


});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  const results = [];

  let res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);

  // TODO: return array-of-episode-info, as described in docstring above

  for (let obj of res.data) {

    results.push({
      id: obj.id,
      name: obj.name,
      season: obj.season,
      number: obj.number
    })
  
  }

  // method 1
  // populateEpisodes(results);

  // method 2 & 3
  return results;

}

function populateEpisodes(episodes) {
  $("#episodes-list").empty();

  for (let episode of episodes) {
    $("#episodes-list").append(`<li>${episode.name} (season ${episode.season}, number ${episode.number})</li>`);
  }
  
}


// method 3
$("#shows-list").on("click", ".getEpi", async function(e) {
  const idKey = $(e.target).closest(".card").data("showId");

  let episodes = await getEpisodes(idKey);

  populateEpisodes(episodes);

})
