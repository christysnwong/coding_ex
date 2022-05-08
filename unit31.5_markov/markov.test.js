const { MarkovMachine } = require("./markov");

describe("test markov", function() {
    test('return text string', function() {
        let m = new MarkovMachine("a b c");
        let result = m.makeText(10);
        let possAns = ["a b c", "b c", "c"];
        
        expect(possAns.indexOf(result)).toBeGreaterThanOrEqual(0)

    })


});