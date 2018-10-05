import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from './types';

//Get current profile

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => 
            //If the profile is found then return it
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => 
            //If the profile is not found then return empty object and prompt user to create profile
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
        );
} 

//Create new profile
export const createProfile = (profileData, history) => dispatch => {    
    axios  
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        })
    );
}  

//Profile Loading 
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//Profile Loading 
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

//Delete Account
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')){
        axios   
            .delete('/api/profile')
            .then(res => dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
    }
}


 