import { showTemplates } from './../lib/router.js';
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  provider,
  db,
  doc,
  setDoc,
  signInWithRedirect,
  signInWithPopup
} from "./init.js";
import { getUserData } from './users.js';


// Iniciar Sesión
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // 
    const userData = await getUserData(userCredential.user.uid)
    /* 
      {
        username: '',
        userType: '',
        birthday: ''
      }
    */
    localStorage.setItem('userData', JSON.stringify(userData))
    alert('Sesión iniciada correctamente')
    showTemplates('#/home')
    return userCredential;
  } catch (error) {
    if (error == 'FirebaseError: Firebase: Error (auth/invalid-email).'){
      alert ('Correo invalido')
    } else if (error == 'FirebaseError: Firebase: Error (auth/wrong-password).'){
      alert ('Contraseña invalida')
    }
    throw error.message;
  }
};

// Registro de usuario
/* 

user = {
  username: 'pepito',
  birhtdaty: '20200,
  userType: 'baker',
  userPosts: [idPost1, idPost2, idPost3, ........]
}

*/

const signup = async (data) => {
  /* 
    const data  = {
      username: 'username1', undefined,
      email: 'username@emailg.com',
      password: 'contraseña',
      birthday: 2001/05/25,
      userType: 'baker',
      ---photoUrl: ',,,'
    }
  */
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data?.email, data?.password);

    const userFirestoreRegister = await setDoc(
      doc(db, "users", userCredential.user.uid), 
      { 
        username: data?.username,
        birthday: data?.birthday,
        userType: data?.userType
      }
    )

    showTemplates('#/home')
    return userCredential;
  } catch (error) {
    if (error == 'FirebaseError: Firebase: Error (auth/invalid-email).'){
      alert('Correo invalido Ej: 1234@micorreo.com')
    } else if (error == 'FirebaseError: Password should be at least 6 characters (auth/weak-password).'){
      alert ('La contraseña debe tener 6 o mas caracteres')
    } else if (error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).')
      alert ('Este correo ya tiene una cuenta asociada')
    else if (data.username  == ''|| null || undefined){
      alert ('Debes ingresar un nombre de usuario')
    }
    throw error.message;
  } 
};


const googleLogin = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
    // The signed-in user info.
  const user = result.user;
  console.log("user", user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
    // The email of the user's account used.
  const email = error.customData.email;
  
    // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  console.log("error", errorMessage)
    // ...
  });    
}



// Cerrar sesion
const logout = async () => {
  try {
    const response = await signOut(auth);
    localStorage.removeItem('userData')
    window.location = '#/'
    showTemplates('#/')
    alert('La sesión se cerró exitosamente')
    return response;
  } catch (error) {
    throw error.message;
  }
};

export { login, logout, signup, googleLogin, auth, onAuthStateChanged };

//Iniciar sesion con google


// ************************************************
// import { showTemplates } from './../lib/router.js';
// import {
//   auth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   setDoc,
//   db,
//   doc,
//   signOut,
//   provider,
//   signInWithPopup
// } from "./init.js";
// //import { async } from 'regenerator-runtime';


// // Iniciar Sesión
// const login = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     console.log(userCredential)
//     showTemplates('#/home')
//     return userCredential;
//   } catch (error) {
//     console.log(error.message)
//     throw error.message;
//   }
// };
// const signup = async (data) => {
//   /*const data  = {username: 'username1', undefined, email: 'username@emailg.com',password: 'contraseña',birthday: 2001/05/25,userType: 'baker',---photoUrl: ',,,'}
//   */
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
//     const userFirestoreRegister = await setDoc(
//       doc(db, "users", userCredential.user.uid), 
//       { 
//         username: data?.username,
//         birthday: data?.birthday,
//         userType: data?.userType
//       }
//     )
//     showTemplates('#/home')
//     return userCredential;
//   } catch (error) {
//     if (error == 'FirebaseError: Firebase: Error (auth/invalid-email).'){
//       alert('Invalido')
//     }
//     throw error.message;
//   }
// };
// const googleLogin = async () => {
//   try {
//     const response = await signInWithPopup(auth, provider);
//     showTemplates('#/home')
//     console.log(response);
//     return response.user;
//   } catch (error) {
//     console.log(error.message)
//     throw error.message;
//   }
// };
// // Cerrar sesion
// const logout = async () => {
//   try {
//     const response = await signOut(auth);
//     showTemplates('#/')
//     alert('La sesión se cerró exitosamente')
//     return response;
//   } catch (error) {
//     throw error.message;
//   }
// };

// export { login, logout, signup, googleLogin, auth, onAuthStateChanged}; /* */

// //Iniciar sesion con google


