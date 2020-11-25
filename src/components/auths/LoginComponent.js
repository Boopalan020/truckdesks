import React from 'react'

import { useGoogleLogin } from 'react-google-login'
import { refreshTokenSetup } from '../refreshToken'
import GoogleButton from 'react-google-button'

const clientId = '253103175843-00vv27nslcgtncskq0n55uif09n9aoho.apps.googleusercontent.com'

function LoginComponent({ setloggedIn }) {

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        setloggedIn(true)
        refreshTokenSetup(res);
      };
    
      const onFailure = (res) => {
        console.log('Login failed: res:', res);
        
      };
    
      const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
        // responseType: 'code',
        // prompt: 'consent',
      });
    
    return (
        <div>
            <GoogleButton type="dark" onClick = {signIn} />
        </div>
    )
}
export default LoginComponent
