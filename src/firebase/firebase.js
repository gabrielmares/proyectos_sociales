import React from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// eslint-disable-next-line
import firebaseConfig from './config';


// funcion que registra a los usuarios en la app
export const registerUser = async (nombre, email, password, OC) => {
    console.log(OC)
    if (OC) {
        OC = 1
    } else {
        OC = 0
    }
    // console.log(OC)
    const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return await newUser.user.updateProfile({
        displayName: nombre,
        photoURL: OC
    });
};



// iniciar sesion
export const loginUser = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async user => {
            if (user) {
                let tokenID = await firebase.auth().currentUser.getIdTokenResult();
                return tokenID;
            }
        })
        .catch(e => {
            console.log(e)
            return e;
        })

};

// generar email de restablecimiento de contraseña
export const ResetPassword = async email => {
    let mensage;
    await firebase.auth().sendPasswordResetEmail(email)
        .then(resp => {
            mensage = 200;
        })
        .catch(e => {
            mensage = 404;
        })
    return mensage;
}

// funcion para cerrar sesion
export function logOut() {
    return firebase.auth().signOut();
};

// obtener la informacion del usuario y el tokenId para los intercambios con el backend
export const useAuth = () => {
    const [logged, saveLogged] = React.useState({
        isSignedIn: true,
        pending: true,
        user: null,
        token: ''
    });
    React.useEffect(() => {
        const unsuscribe = firebase.auth().onAuthStateChanged(async user => {
            if (user) { //si tenemos un usuario en linea, obtenemos el token y lo regresamos
                let tokenID = await user.getIdTokenResult();
                if (tokenID) {
                    saveLogged({ pending: false, user, isSignedIn: false, token: tokenID })
                } else {
                    saveLogged({ pending: false, user: '', isSignedIn: false, token: '' })
                }
            }
            else { //si no hay usuario limpiamos valores condicionales
                saveLogged({ pending: false, user: '', isSignedIn: false, token: '' })
            }
        })
        return () => unsuscribe();
    }, [])

    return logged;
};

