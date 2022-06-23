const App = () => (
    <div>
        <FirstCompoonent />
        <NamedComponent name="name"/>
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"));