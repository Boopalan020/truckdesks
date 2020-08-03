import { createStore, combineReducers } from 'redux'

import navReducer from './NavbarState/NavReducer'
import DriverReducer from './DriverState/DriverReducer'

const rootReducer = combineReducers({
    navbar : navReducer,
    driver : DriverReducer
})

const store = createStore(rootReducer)

export default store;