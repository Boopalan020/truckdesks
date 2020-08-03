import { DRIVER_VIEW } from './DriverTypes'

const initialstate = {
    showview : true,
    showform : false
}

const driverReducer = (state = initialstate, action) => {
    switch(action.type)
    {
        case DRIVER_VIEW : 
            return {
                ...state,
                showform : !state.showform,
                showview : !state.showview
            }
        default :
            return state
    }
}

export default driverReducer