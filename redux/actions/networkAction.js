import {SWITCHCHAIN} from '../actionTypes.js'

// LOGIN: Set User Data we get from wallets
export const switchSelectedNetwork = (selectedNetowrk) => async (dispatch) =>{
    try {
        dispatch({
            type: SWITCHCHAIN,
            payload: {
                sourceChain: selectedNetowrk.sourceChain,
                destinationChain: selectedNetowrk.destinationChain,
            }
        })    
    } catch (error) {
        console.log(error);
    }    
}

