import { ENABLE_NEXT_BUTTON, SAVE_VEHICLE_INFO } from './VehicleTypes';

const initialstate = {
    enablenext : true,
    vehicleDatas : {}
}

const vehicleReducer = (state = initialstate, action) => {
    switch(action.type)
    {
        case  ENABLE_NEXT_BUTTON :
            return {
                ...state,
                enablenext : false
            }
        case SAVE_VEHICLE_INFO :
            return {
                vehicleDatas : action.payload
            }
        default :
            return state
    }
}

export default vehicleReducer;