import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarComponent from './NavbarComponent'
import DriverComponent from './driver/DriverComponent'
import MultistepComponent from './vehicle/MultistepComponent';
import MemoStepComponent from './memo/MemoStepComponent';

function MainComponent(props) {
    return (
        <div>
            <Router >
                <NavbarComponent/>
                <Switch>
                    <Route exact path='/profile' ></Route>
                    <Route path='/dashboard' ></Route>
                    <Route path='/viewdrivers' component = { DriverComponent } ></Route>
                    <Route path='/viewvehicle' component = { MultistepComponent } ></Route>
                    <Route path='/memo' component = { MemoStepComponent } ></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default MainComponent