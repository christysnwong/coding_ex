// Question 1

// let cardPromise = axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1');

// cardPromise
//     .then(resp => console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit))
//     .catch(err => console.log(err));

// Question 2

// 1st SOLN
// function dealCard(deck_id) {
//     return new Promise((resolve, reject) => {
//         resp = axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
//         resolve(resp)
//     });
// }

// dealCard("new")
//     .then(resp => {
//         console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit);
//         return dealCard(resp.data.deck_id);
//     })
//     .then(resp => {
//         console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit);
//     })    
//     .catch(err => console.log(err))

// 2nd SOLN

// axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=1`)
//     .then( resp => {
//         let deck_id = resp.data.deck_id;
//         console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit);
//         return axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
//     })
//     .then( resp => {
//         console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit);
//     })
//     .catch(err => console.log(err))


// Question 3

// 1st SOLN

// let deck_id = "";

// axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     .then(resp => deck_id = resp.data.deck_id)
//     .catch(err => console.log(err));

// function dealCard() {
//     return new Promise((resolve, reject) => {
//         axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
//             .then(resp => {
//                 console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit);
            
//                 $("#cards").append(`<p>${resp.data.cards[0].value} of ${resp.data.cards[0].suit}</p>`)
//                 $("#remain").text(`Cards Remaining: ${resp.data.remaining}`)

//                 if (resp.data.remaining === 0) {
//                     $('button').remove();
//                 }
                
//                 resolve()
//             })
//             .catch(err => console.log(err));
            
//     })
// }

// $('button').on('click', dealCard)

// 2nd SOLN

axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(resp => deck_id = resp.data.deck_id)
    .catch(err => console.log(err));

function dealCard() {
    axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then(resp => {
            console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit);
        
            $("#cards").append(`<p>${resp.data.cards[0].value} of ${resp.data.cards[0].suit}</p>`)
            $("#remain").text(`Cards Remaining: ${resp.data.remaining}`)

            if (resp.data.remaining === 0) {
                $('button').remove();
            }
            
        })
        .catch(err => console.log(err));

}

$('button').on('click', dealCard)