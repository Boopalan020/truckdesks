import { ENABLE_NEXT_BUTTON, SAVE_VEHICLE_INFO } from './VehicleTypes'

export const toggleNextButton = () => {
    return {
        type : ENABLE_NEXT_BUTTON
    }
}

export const saveVehicleData = (vehicledata) => {
    return {
        type : SAVE_VEHICLE_INFO,
        payload : vehicledata
    }
}
