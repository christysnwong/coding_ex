import React, {useState} from "react";
import Box from "./Box"
import NewBoxForm from "./NewBoxForm"


const BoxList = () => {
    const INITIAL_STATE = []

    const [boxes, setBoxes] = useState(INITIAL_STATE);
    const [boxCount, setBoxCount] = useState(1);

    const addBox = (newBox) => {

        setBoxes(boxes => [...boxes, {...newBox, id: boxCount}]);
        setBoxCount((boxCount) => boxCount + 1);
        
    }

    const removeBox = (id) => {
        setBoxes(boxes => boxes.filter(box => box.id !== id));
    }


    return (
      <div>
        <h3>Box List</h3>
        <NewBoxForm addBox={addBox} />
        <div>
            {boxes.map( ({id, width, height, bgColor}) => {
                return (
                  <Box
                    id={id}
                    key={id}
                    width={width}
                    height={height}
                    bgColor={bgColor}
                    removeBox={removeBox}
                  />
                );
            })}
        </div>
      </div>
    );
}

export default BoxList;