const App = () => (
  <div>
    <Tweet
      username="u1"
      name="user1"
      date={new Date().toDateString()}
      msg="msg1"
    />
    <Tweet
      username="u2"
      name="user2"
      date={new Date().toDateString()}
      msg="msg2"
    />
    <Tweet
      username="u3"
      name="user3"
      date={new Date().toDateString()}
      msg="msg3"
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));