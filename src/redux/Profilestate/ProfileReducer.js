import { PROFILE_STATE } from './ProfileTypes'

const initialstate = {
    googleId : '',
    FamilyName : '',
    emailid : '',
    originalName : '',
    name : '',
    imgUrl : ''
}

const profileReducer = (state = initialstate, action) => {
    switch(action.type)
    {
        case  PROFILE_STATE :
            // console.log(action.payload)
            return {
                ...state,
                emailid : action.payload.email,
                googleId : action.payload.googleId,
                FamilyName : action.payload.familyName,
                imgUrl : action.payload.imageUrl,
                name : action.payload.name,
                originalName : action.payload.givenName
            }            
        default :
            return state
    }
}

export default profileReducer;