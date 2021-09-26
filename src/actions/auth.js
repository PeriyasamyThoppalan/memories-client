import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

//Action Creators

export const signup=(formData,history)=> async(dispatch)=>{
try {
    //sign up user and navigatte to home page.Backend api call for signup.
    const {data}=await api.signUp(formData);
    //dispatch reducer
    dispatch({type:AUTH, data});
    
    history.push('/');
} catch (error) {
    console.log(error);
}
}

export const signin =(formData,history)=> async (dispatch)=>{
try {
    //login the user and navigate to home page. Backend api call for signin.
    const {data}=await api.signIn(formData);
    //dispatch reducer
    dispatch({type:AUTH, data});
    
    history.push('/');
    
} catch (error) {
    console.log(error);
}
};