import React from 'react'
import { useGoogleLogout } from 'react-google-login'
import toast from 'toasted-notes' 
import Alert from '@material-ui/lab/Alert'

import Button from "@material-ui/core/Button"

const clientId = '253103175843-00vv27nslcgtncskq0n55uif09n9aoho.apps.googleusercontent.com'
function LogoutComponent({ setloggedIn }) {

    const onLogoutSuccess = (res) => {
        setloggedIn(false)
        toast.notify(
            <Alert size="small" severity="success">
              Logged out
            </Alert>,
            {
              position : "top",
              duration : "4000"
            }
          )
      }
    
      const onFailure = () => {
        console.log('Handle failure cases')
      }
    
      const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
      })

    return (
        <div>
            <Button color = "inherit" onClick={signOut}>
                Logout
            </Button>
        </div>
    )
}
export default LogoutComponent