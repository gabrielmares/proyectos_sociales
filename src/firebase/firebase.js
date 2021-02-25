import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// eslint-disable-next-line
import firebaseConfig from './config';


// funcion que registra a los usuarios en la app
export const registerUser = async (nombre, email, password, OC) => {
    if (OC) {
        OC = 1
    } else {
        OC = 0
    }
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
    });
    React.useEffect(() => {
        const unsuscribe = firebase.auth().onAuthStateChanged(async user => {
            if (user) { //si tenemos un usuario en linea, obtenemos el token y lo regresamos
                let tokenID = await user.getIdTokenResult();
                if (tokenID) {
                    saveLogged({ pending: false, user, isSignedIn: false })
                } else {
                    saveLogged({ pending: false, user: '', isSignedIn: false })
                }
            }
            else { //si no hay usuario limpiamos valores condicionales
                saveLogged({ pending: false, user: '', isSignedIn: false })
            }
        })
        return () => unsuscribe();
    }, [])

    return logged;
};



// grabar un elemento en la coleccion, comunidades y lineas de intervencion
export const saveElement = async (collection, element) => {
    try {
        await firebase.firestore().collection(`${collection}`).doc(element).set({ 'nombre': element })
            .then(res => {
                return res;
            })
            .catch(err => console.error(err))

    } catch (error) {
        console.error('se produjo un error', error)
    }

}


// descarga la lista lineas de intervencion
export const GetDocuments = (colectionToDownload) => {
    let array = [];
    const [list, setList] = useState({
        pending: true,
        coleccion: []
    })

    useEffect(() => {
        function get() {
            if (list.pending) {
                return firebase.firestore().collection(colectionToDownload).onSnapshot(snapshot);
            }
            return setList({
                pending: false,
                coleccion: []
            })
        }
        get();
        // eslint-disable-next-line
    }, [])
    const snapshot = async snapshot => {
        array = [];
        await snapshot.docs.map(comunidad => array.push(comunidad.id));
        setList({
            pending: false,
            coleccion: array
        })

    }

    return list;


}


// grabar un evento en la coleccion
export const saveEvents = async (element) => {
    try {
        await firebase.firestore().collection('listaEventos').doc(element.title).set({ ...element, id: Date.now() })
            .then(res => {
                return res;
            })
            .catch(err => console.log(err))

    } catch (error) {
        console.error('se produjo un error', error)
    }

}

// funcion que descarga la lista de eventos almacenados en BD
export const GetEvents = (colectionToDownload) => {
    let array = [];
    const [list, setList] = useState({
        pending: true,
        coleccion: []
    })

    useEffect(() => {
        function get() {
            if (list.pending) {
                return firebase.firestore().collection(colectionToDownload).onSnapshot(snapshot)
            }
            return setList({
                pending: false,
                coleccion: []
            })
        }
        get();
        // eslint-disable-next-line
    }, [])

    const snapshot = async snapshot => {
        array = [];
        await snapshot.docs.map(comunidad => {
            return array.push(comunidad.data())
        });
        setList({
            pending: false,
            coleccion: array
        })

    }


    return list;


}

export const DeleteDocument = async (title) => {
    try {
        await firebase.firestore().collection('listaEventos').doc(title).delete();
    } catch (err) {
        return console.error(err);
    }

}


export const CloseEvent = async (event, array) => {
    try {
        await firebase
            .firestore()
            .collection('listaEventos')
            .doc(event)
            .update({
                impactPeople: array
            })
    } catch (error) {
        return console.log(error)
    }
}