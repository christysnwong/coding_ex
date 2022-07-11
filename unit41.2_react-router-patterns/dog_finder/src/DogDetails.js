import {useParams} from 'react-router-dom';
import {Redirect} from "react-router-dom"
import "./DogDetails.css";

const DogDetails = (props) => {
    const {name} = useParams();
    const dog = props.dogs.filter((dog) => dog.name.toLowerCase() === name)[0];

    if (!dog) {
        <Redirect to="/dogs" />
    }    

    return (
        <div className='DogDetails'>
            <h1>{dog.name}</h1>
            <img src={dog.src} alt={name} />
            <div>Age: {dog.age}</div>
            <div>
                <ul>
                    {dog.facts.map((fact, idx) => (
                        <li key={idx}>{fact}</li>
                    ))}
                </ul>            
            </div>
        </div>
    )
}

export default DogDetails;