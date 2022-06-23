 const App = () => (
  <div>
    <Person name="Paul" age={19} hobbies={["reading", "eating", "singing"]} />
    <Person name="Cecilia" age={8} hobbies={["playing games", "sleeping"]} />
    <Person name="Jason L" age={25} hobbies={["dancing", "drinking", "skiing"]} />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));