import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarComponent from './NavbarComponent'
import DriverComponent from './DriverComponent'
import VehicleComponent from './vehicle/VehicleComponent';

function MainComponent(props) {
    return (
        <div>
            <Router >
                <NavbarComponent/>
                <Switch>
                    <Route exact path='/profile' ></Route>
                    <Route path='/dashboard' ></Route>
                    <Route path='/viewdrivers' component = { DriverComponent } ></Route>
                    <Route path='/viewvehicle' component = { VehicleComponent } ></Route>
                    <Route path='/memo' ></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default MainComponent
