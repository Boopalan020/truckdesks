import { Container } from '@material-ui/core'
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Avatar from 'react-avatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    toCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
}))

function ProfileComponent({ profiledata }) {

    // console.log("After Login Profile data  :",profiledata)
    const classes = useStyles()
    return (
        <Container maxWidth = "sm" style = {{ padding : "10px" }}>
            {/* Avatar component comes here */}
            <Row sm>
                <Col className = { classes.toCenter } >
                    <Avatar round= { true } src = { profiledata.imgUrl } size="100"/>
                </Col>
            </Row>

            <Row sm>
                <Col sm style = {{ textAlign : "center" }}>
                    { profiledata.originalName } <br />
                    { profiledata.emailid }
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        profiledata : state.profiledata
    }
}

export default connect(mapStateToProps)(ProfileComponent)
