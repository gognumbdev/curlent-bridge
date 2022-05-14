import {CONNECT, DISCONNECT,TOKENBALANCE} from "../actionTypes"

// Initial user state
export const InitailUserState = {
    userAddress:"",
    tokenBalance:{}
}

const userReducer = (state = InitailUserState,{type,payload}) => {
    switch(type) {
        case CONNECT : 
            return {
                userAddress:payload.userAddress
            }
        case DISCONNECT:
            return payload
        case TOKENBALANCE:
            return {
                ...state,
                tokenBalance:payload
            }
        default :
            return state
    }
}

export default userReducer;
