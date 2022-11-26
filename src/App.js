import "./App.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Homepage/Home";


function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;

