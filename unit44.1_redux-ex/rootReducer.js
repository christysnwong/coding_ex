const INITIAL_STATE = { mood: "ಠ_ಠ" };

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "HAPPY":
            return { ...state, mood: "മ◡മ", color: "lightgreen" };
        
        case "SAD":
            return { ...state, mood: "⊙︿⊙", color: "lightblue"};

        case "ANGRY":
            return { ...state, mood: "ಠ▃ಠ", color: "lightpink" };

        case "CONFUSED":
            return { ...state, mood: "⊙.☉", color: "yellow" };

        default:
            return state;

    }
}

