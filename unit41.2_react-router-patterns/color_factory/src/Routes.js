import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Colors from "./Colors";
import ColorsForm from "./ColorsForm";
import ColorDetails from "./ColorDetails";

const Routes = () => {
  const [colors, setColors] = useState([]);

  const addColors = (newColor) => {
    setColors((colors) => ({...newColor, ...colors}));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/colors">
            <Colors colors={colors} />
          </Route>
          <Route exact path="/colors/new">
            <ColorsForm add={addColors} />
          </Route>
          <Route exact path="/colors/:color">
            <ColorDetails colors={colors} />
          </Route>
          <Redirect to="/colors" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;