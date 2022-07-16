import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

// localStorage.clear();

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };

    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
    this.toggleLock = this.toggleLock.bind(this);
    this.resetVotes = this.resetVotes.bind(this);

  }

  // at mount, get jokes

  componentDidMount() {
    if (this.state.jokes.length < this.props.numJokesToGet) {
      this.getJokes();
    }
  }

  componentDidUpdate() {
    if (this.state.jokes.length < this.props.numJokesToGet) {
      this.getJokes();
    }
  }


  // get jokes from API
  async getJokes() {
    try {
      let jokes = this.state.jokes;
      let seenJokes = new Set();
      let jokeVotes = JSON.parse(localStorage.getItem("jokeVotes") || "{}");
      
      
      
      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
      });
        let {status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          jokeVotes[jokeObj.id] = jokeVotes[jokeObj.id] || 0;
          jokes.push({ ...jokeObj, votes: jokeVotes[jokeObj.id], locked: false });
        } else {  
          console.error("duplicate found!");
        }
      }
      this.setState({ jokes });
      localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));
    } catch (e) {
      console.log(e);
    }
  }

  // get new jokes
  generateNewJokes() {
    this.setState(state => ({ jokes: state.jokes.filter(joke => joke.locked)}));
  }

  // reset vote counts
  resetVotes() {
    localStorage.setItem("jokeVotes", "{}");
    this.setState(state => ({
      jokes: state.jokes.map(joke => ({...joke, votes : 0}))
    }))
  }

  // keeps track of vote counts
  vote(id, delta) {
    let jokeVotes = JSON.parse(localStorage.getItem("jokeVotes"));
    jokeVotes[id] = (jokeVotes[id] || 0) + delta;
    localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));
    this.setState(state => ({
      jokes: state.jokes.map(joke => joke.id === id ? {...joke, votes: joke.votes + delta} : joke)

    }))

  }

  // locks the jokes
  toggleLock(id) {
    this.setState(state => ({
      jokes: state.jokes.map(joke => (joke.id === id ? { ...joke, locked: !joke.locked} : joke))
    }))
  }

  render() {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
    let allLocked = sortedJokes.filter(joke => joke.locked).length === this.props.numJokesToGet;
    
    return (
      <div className="JokeList">
        <button
          className="JokeList-getmore"
          onClick={this.generateNewJokes}
          disabled={allLocked}
        >
          Get New Jokes
        </button>
        <button className="JokeList-getmore" onClick={this.resetVotes}>
          Reset Vote Counts
        </button>

        {sortedJokes.map((j) => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={this.vote}
            locked={j.locked}
            toggleLock={this.toggleLock}
          />
        ))}

        {sortedJokes.length < this.props.numJokesToGet ? (
          <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
          </div>
        ) : null}
      </div>
    );

  }


}

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;
  
//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>
  
//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }

export default JokeList;
