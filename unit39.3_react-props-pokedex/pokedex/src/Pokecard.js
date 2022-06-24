import "./Pokecard.css"

const Pokecard = ({ id, name, type, exp }) => (
  <div className="Pokecard">
    <h2 className="Pokecard-title">{name}</h2>
    <img
      className="Pokecard-img"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      alt={`#${id}-${name}`}
    />
    <div className="Pokecard-content">Type: {type}</div>
    <div className="Pokecard-content">EXP: {exp}</div>
  </div>
);

export default Pokecard;