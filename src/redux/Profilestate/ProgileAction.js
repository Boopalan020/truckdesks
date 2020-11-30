import { PROFILE_STATE } from './ProfileTypes'

export const profileaction = (data) => {
    return {
        type : PROFILE_STATE,
        payload : data
    }
}

