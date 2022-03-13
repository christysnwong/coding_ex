// generate html for a cupcake

function generateCupcakeHTML(cupcake) {
    return `
      <div>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Cupcake Flavor: ${cupcake.flavor} / Size: ${cupcake.size} / Rating: ${cupcake.rating}
          <button id="delete-cupcake" class="btn-sm btn-danger" data-id="${cupcake.id}">X</button>
        </li>
        <img src="${cupcake.image}" class="img-thumbnail">
      </div>
    `;
}

// put cupcakes on page
  
async function showCupcakes() {
    const resp = await axios.get(`/api/cupcakes`);
  
    for (let cupcake of resp.data.cupcakes) {
      let newCupcake = generateCupcakeHTML(cupcake);
      $("#list-cupcakes").append(newCupcake);
    }
  }
  
// adding a new cupcakes

$("#cupcake-form").on("submit", addCupcake);

async function addCupcake(evt) {
    evt.preventDefault();
  
    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();
  
    const resp = await axios.post(`api/cupcakes`, {
      flavor,
      rating,
      size,
      image
    });
  
    let newCupcake = generateCupcakeHTML(resp.data.cupcake);
    $("#list-cupcakes").append(newCupcake);
    $("#cupcake-form").trigger("reset");
};

// deleting a cupcake

// $('#delete-cupcake').click(deleteCupcake);

$('#list-cupcakes').on("click", "#delete-cupcake", deleteCupcake);

async function deleteCupcake(evt) {

  const id = $(evt.target).data('id');

  await axios.delete(`/api/cupcakes/${id}`)
  $("#delete-cupcake").closest("div").remove()
  
  
}



showCupcakes();




