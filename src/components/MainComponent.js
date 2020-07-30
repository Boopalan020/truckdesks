import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarComponent from './NavbarComponent'

function MainComponent(props) {
    return (
        <div>
            <Router >
                <NavbarComponent/>
                <Switch>
                    <Route exact path='/profile' ></Route>
                    <Route exact path='/dashboard' ></Route>
                    <Route exact path='/viewdrivers' ></Route>
                    <Route exact path='/viewvehicle' ></Route>
                    <Route exact path='/memo' ></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default MainComponent
