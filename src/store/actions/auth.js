import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionType';
import axios from 'axios';

export function auth(email, password, isLogin){
    return async dispatch => {
        let userData = {
            email, password, returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzGxqDdwYbBSU3S-uFwgLdNKE4ucjVBKc';
       
        if(isLogin){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzGxqDdwYbBSU3S-uFwgLdNKE4ucjVBKc"
        }
        let response = await axios.post(url, userData);
        
        let expirationDate = new Date(new Date().getTime() + response.data.expiresIn  * 1000);


        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(response.data.idToken));
        dispatch(autoLogout(response.data.expiresIn));
    }
} 

export function authSuccess(token){
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000)
    }
}

export function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return{
        type: AUTH_LOGOUT
    }
}

export function autoLogin(){
    return async dispatch => {
        let token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            let expData = new Date(localStorage.getItem('expirationDate'));
            if(expData <= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token));
                dispatch(autoLogout((expData.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}