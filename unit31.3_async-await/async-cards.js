// Question 1

// THEN / CATCH METHOD

// let cardPromise = axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1');

// cardPromise
//     .then(resp => console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit))
//     .catch(err => console.log(err));

// ASYNC / AWAIT METHOD

// async function cardPromise() {
//     try {
//         let resp = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1');
//         let {suit , value} = resp.data.cards[0];
//         console.log(value + " of " + suit);
//     }
//     catch(err) {
//         console.log(err);
//     }

// }

// cardPromise();

// Question 2

// THEN / CATCH METHOD

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


// ASYNC / AWAIT METHOD

// async function cardPromise() {
//     try {
//         let resp = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1');
//         let deck_id = resp.data.deck_id;

//         console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit);

//         resp = await axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
//         console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit);

//     }
//     catch(err) {
//         console.log(err);
//     }

// }

// cardPromise();

// Question 3

// THEN / CATCH METHOD

// axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     .then(resp => deck_id = resp.data.deck_id)
//     .catch(err => console.log(err));

// function dealCard() {
//     axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
//         .then(resp => {
//             console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit);
        
//             $("#cards").append(`<p>${resp.data.cards[0].value} of ${resp.data.cards[0].suit}</p>`)
//             $("#remain").text(`Cards Remaining: ${resp.data.remaining}`)

//             if (resp.data.remaining === 0) {
//                 $('button').remove();
//             }
            
//         })
//         .catch(err => console.log(err));

// }

// $('button').on('click', dealCard)

// ASYNC / AWAIT METHOD

let deck_id = "";

async function getDeck() {
    try {
        let resp = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        deck_id = resp.data.deck_id;
    }
    catch (err) {
        console.log(err);
    }
    
}

async function dealCard() {
    try {
        let resp = await axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

        console.log(resp.data.cards[0].value + " of " + resp.data.cards[0].suit);

        $("#cards").append(`<p>${resp.data.cards[0].value} of ${resp.data.cards[0].suit}</p>`)
        $("#remain").text(`Cards Remaining: ${resp.data.remaining}`)

        if (resp.data.remaining === 0) {
            $('button').remove();
        }
    }
    catch (err) {
        console.log(err);
    }
    
}

$('button').on('click', dealCard)

getDeck();