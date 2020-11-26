import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import NavbarComponent from './NavbarComponent'
import DriverComponent from './driver/DriverComponent'
import MultistepComponent from './vehicle/MultistepComponent'
import MemoStepComponent from './memo/MemoStepComponent'
import DueComponent from './due/DueComponent'
import DashboardComponent from './dashboard/DashboardComponent'
import ProfileComponent from './profile/ProfileComponent'

function MainComponent(props) {
    return (
        <div>
            <Router >
                <NavbarComponent setloggedIn = { props.setloggedIn } />
                <Switch>
                    <Route exact path='/' component = { ProfileComponent } ></Route>
                    <Route path='/dashboard' component = { DashboardComponent } ></Route>
                    <Route path='/viewdrivers' component = { DriverComponent } ></Route>
                    <Route path='/viewvehicle' component = { MultistepComponent } ></Route>
                    <Route path='/memo' component = { MemoStepComponent } ></Route>
                    <Route path='/dueOption' component = { DueComponent } ></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default MainComponent