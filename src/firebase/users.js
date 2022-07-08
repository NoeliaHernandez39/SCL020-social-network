import {db, doc, getDoc} from './init.js';
  
  const getUserData = async (uid) => {
    try {
      const getUserDataDoc = doc(db, 'users', uid);//trae propiedades dentro de la collection users
      const userDocSnapshot = await getDoc(getUserDataDoc);
      return userDocSnapshot.data(); //data from firebase/collection/users/ANYid)
    } catch (err) {
      console.log(err);
    }
  };
  
  export { getUserData };