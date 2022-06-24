import "./Pokedex.css"
import Pokecard from "./Pokecard"
import pokemon from "./pokemon";



const Pokedex = ({items=pokemon}) => {
    return (
      <div className="Pokedex">
        <h1 className="Pokedex-title">Pokedex</h1>
        <div className="Pokedex-content">
          {items.map((i) => (
            <Pokecard
              key={i.id}
              id={i.id}
              name={i.name}
              type={i.type}
              exp={i.base_experience}
            />
          ))}
        </div>
      </div>
    );
}

export default Pokedex;