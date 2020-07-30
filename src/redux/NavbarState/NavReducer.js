import { DRAWER_STATE } from './NavbarTypes';

const initialstate = {
    navItems : [ 'Profile', 'Dashboard', 'Add Driver', 'Add vehicle', 'Memo', 'Logout' ]
}

const navReducer = (state = initialstate, action) => {
    switch(action.type)
    {
        case  DRAWER_STATE :
            return {
                ...state,
            }
        default :
            return state
    }
}

export default navReducer;