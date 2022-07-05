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


// Iniciar Sesión
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // 
    // const userData = await getUserData(userCredential.user.uid)
    /* 
      {
        username: '',
        userType: '',
        birthday: ''
      }
    */
    // localStorage.setItem('userData', JSON.stringify(userData))
    alert('Sesión iniciada correctamente')
    showTemplates('#/home')
    return userCredential;
  } catch (error) {
    if (error == 'FirebaseError: Firebase: Error (auth/invalid-email).'){
      alert ('Correo invalido')
    } else if (error == 'FirebaseError: Firebase: Error (auth/wrong-password).'){
      alert ('Contraseña invalida')
    }
    else if (error == 'FirebaseError: Firebase: Error (auth/user-not-found).'){
      alert('Usuario no encontrado')
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
    throw error.message;
  } 
};


const googleLogin = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    showTemplates('#/home')
    console.log(response);
    return response.user;
  } catch (error) {
    console.log(error.message)
    throw error.message;
  }
};




// Cerrar sesion
const logout = async () => {
  try {
    const response = await signOut(auth);
    // localStorage.removeItem('userData')
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


