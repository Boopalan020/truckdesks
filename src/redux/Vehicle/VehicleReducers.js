import { ENABLE_NEXT_BUTTON } from './VehicleTypes';

const initialstate = {
    enablenext : true
}

const vehicleReducer = (state = initialstate, action) => {
    switch(action.type)
    {
        case  ENABLE_NEXT_BUTTON :
            return {
                ...state,
                enablenext : false
            }
        default :
            return state
    }
}

export default vehicleReducer;