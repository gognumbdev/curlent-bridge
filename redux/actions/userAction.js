import {CONNECT,DISCONNECT,TOKENBALANCE} from '../actionTypes.js'
import { InitailUserState } from '../reducers/userReducer.js';

// CONNECT: Set User Data we get from wallets
export const connectUserToDapp = (userData) => async (dispatch) =>{
    try {
        dispatch({
            type: CONNECT,
            payload: {
                userAddress: userData.userAddress,
            }
        })    
    } catch (error) {
        console.log(error);
    }    
}

// DISCONNECT: Set User Data we get from wallets
export const disconnectUserFromDapp = () => async (dispatch) =>{
    try {
        dispatch({
            type: DISCONNECT,
            payload:InitailUserState
        })    
    } catch (error) {
        console.log(error);
    }    
}

// TOKENBALANCE: Set User Data we get from wallets
export const updateTokenBalance = (newTokenBalance) => async (dispatch) =>{

    try {
        dispatch({
            type: TOKENBALANCE,
            payload:newTokenBalance
        })    
    } catch (error) {
        console.log(error);
    }    
}
