import React from 'react'
import { connect } from "react-redux"

import { profileaction } from '../../redux/index'

import { useGoogleLogin } from 'react-google-login'
import { refreshTokenSetup } from '../refreshToken'
import GoogleButton from 'react-google-button'

const clientId = '253103175843-00vv27nslcgtncskq0n55uif09n9aoho.apps.googleusercontent.com'

function LoginComponent({ setloggedIn, changePrState }) {

    const onSuccess = (res) => {
        console.log("Login Successfull")
        // console.log('Login Success: currentUser:', res.profileObj)
        setloggedIn(true)
        changePrState(res.profileObj)
        refreshTokenSetup(res)
      };
    
      const onFailure = (res) => {
        console.log('Login failed res:', res)
      };
    
      const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
        // responseType: 'code',
        // prompt: 'consent',
      })
    
    return (
        <GoogleButton type="dark" onClick = {signIn} />
    )
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      changePrState : (data) => dispatch(profileaction(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
