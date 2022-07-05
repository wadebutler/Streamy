import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = ({signIn, signOut, isSignedIn}) => {
    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1019690444523-0hamdmie2qmah5hvtgddufm1cfsh2897.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: "Streamy",
            }).then(() => {
                onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get())
                window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange)
            })
        });
    }, [])


    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId())
        } else {
            signOut()
        }
    }

    const handleSignIn = () => {
        window.gapi.auth2.getAuthInstance().signIn()
    }

    const handleSignOut = () => {
        window.gapi.auth2.getAuthInstance().signOut()
    }

    const renderAuthButton = () => {
        if (isSignedIn === null) {
            return <div>Loading...</div>
        } else if (isSignedIn) {
            return (
                <button onClick={() => handleSignOut()} className='ui red google button'>
                    <i className='google icon' />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={() => handleSignIn()} className='ui red google button'>
                    <i className='google icon' />
                    Sign In
                </button>
            )
        }
    }

    return (
        <div>
            {renderAuthButton()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);