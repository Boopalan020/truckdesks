import { createStore } from 'redux'
import navReducer from './NavbarState/NavReducer'

const store = createStore(navReducer)

export default store;