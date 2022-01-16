// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]



let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const getCategories = 100;
    const NUM_CATEGORIES = 6;
     
    try {
        let res = await axios.get(`https://jservice.io/api/categories?count=${getCategories}`);
        let randomCategories = _.sampleSize(res.data, NUM_CATEGORIES);

        let categoryIds = randomCategories.map(category => category.id);

        return categoryIds;
        
    } catch(err) {
        alert("Oops there is an error!");
        console.log(err.message);
    }
    
}


/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    const NUM_QUESTIONS_PER_CAT = 5;

    try {
        const res = await axios.get(`https://jservice.io/api/category?id=${catId}`);

        let title = res.data.title;
        let clues = [];
        let randClues = [];

        if (!res.data.clues.every( currClue => currClue.question !== "")) {
            return null;
        }   

        if (res.data.clues.length > NUM_QUESTIONS_PER_CAT) {
            randClues = _.sampleSize(res.data.clues, NUM_QUESTIONS_PER_CAT);
        } else {
            randClues = res.data.clues;
        }
     
        clues = randClues.map( clue => ({
            question: clue.question,
            answer: clue.answer,
            showing: null

        }));
        
        return { title, clues };

    } catch (err) {
        alert("Oops there is an error!");
        console.log(err.message);
    }

}


/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function fillTable() {
    const NUM_QUESTIONS_PER_CAT = 5;
    let theadTd = "";
    let tbodyTr = "";
    let tbodyTd = "";
    let cat = 0;
    
    for (let y = 0; y < NUM_QUESTIONS_PER_CAT; y++) {
        cat = 0;

        for (let x = 0; x < categories.length; x++) {
            if (y === 0) {
                theadTd += `<td>${categories[x].title}</td>`;
            }
            tbodyTd += `<td data-cat=${cat} data-clue-num=${y}>?</td>`;
            cat++;
        }

        tbodyTr += `<tr>${tbodyTd}</tr>`;
        tbodyTd = "";

    }

    $("#cat").html(`<tr>${theadTd}</tr>`);
    $("#clue").html(tbodyTr);


}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {

    let cat = $(this).data("cat");
    let clueNum = $(this).data("clue-num");
    let showingProp = categories[cat].clues[clueNum].showing;

    if (showingProp === null) {
        categories[cat].clues[clueNum].showing = "question";
        $(this).html(categories[cat].clues[clueNum].question);
    } else if (showingProp === "question") {
        categories[cat].clues[clueNum].showing = "answer";
        $(this).html(categories[cat].clues[clueNum].answer);
    } else {
        return ;
    }

}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    $("#cat").empty();
    $("#clue").empty();

    $("#loader").show();
    $("#loader").addClass("lds-dual-ring");
    $("#start-game").text("Loading");
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $("#loader").hide();
    $("#loader").removeClass("lds-dual-ring");
    $("#start-game").text("Restart");
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    categories = [];
    showLoadingView();

    // get random category Ids
    let categoryIds = await getCategoryIds();

    // get categories based on Ids
    for (let currId of categoryIds) {
        let results = await getCategory(currId);

        // check and regenerate if there are invalid questions & entries
        if (results === null) {
            setupAndStart();  
            return;      
        } else {
            categories.push(results);
        }
    }

    // create HTML table
    fillTable();

    // hide loading spinner once the HTML table is generated
    hideLoadingView();
}

/** On click of start / restart button, set up game. */

// TODO
$("#start-game").on("click", _.debounce(function () {
    setupAndStart();  
}, 300));


/** On page load, add event handler for clicking clues */

// TODO

$(document).ready(function() {
    $("tbody").on("click", "td", handleClick);
  });