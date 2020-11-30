import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import navReducer from './NavbarState/NavReducer'
import DriverReducer from './DriverState/DriverReducer'
import VehicleReducers from './Vehicle/VehicleReducers'
import profileReducer from './Profilestate/ProfileReducer'

const rootReducer = combineReducers({
    navbar : navReducer,
    driver : DriverReducer,
    vehicleinfo : VehicleReducers,
    profiledata : profileReducer
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(logger)
))

export default store;