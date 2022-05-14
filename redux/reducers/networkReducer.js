import {SWITCHCHAIN} from "../actionTypes"

// Initial user state
export const InitailUserState = {
    userAddress:""
}

const networkReducer = (state = InitailUserState,{type,payload}) => {
    switch(type) {
        case SWITCHCHAIN : 
            return {
                sourceChain:payload.sourceChain,
                destinationChain:payload.destinationChain,
            }
        default :
            return state
    }
}

export default networkReducer;

// {
//     username: payload.username,
//     walletAddress: payload.walletAddress,
//     balance:payload.balance,
//     network:payload.network,
//     profileImage: payload.profileImage,
//     description: payload.description,
//     socialNetworks: payload.socialNetworks,
// }