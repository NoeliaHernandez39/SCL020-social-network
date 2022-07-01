import { searchPost } from '../lib/view/templateSearch.js';
import {
    db, addDoc, collection, getDocs, query, where, auth,
  } from './init.js';
  
  const getAllPosts = async () => {
    try {
      const postsArray = []; //array vacio donde quedaran los post 
      const getAllPostsQuery = query(collection(db, 'posts'));//hace la consulta lee y ubica la coleccion "posts"
      const allPostsSnapshot = await getDocs(getAllPostsQuery);// espera los datos 
  
      allPostsSnapshot.forEach((doc) => {
        postsArray.push(doc.data());//de donde viene data??
      });
  
      return postsArray;
    } catch (err) {
      console.log(err);
    }
  };
  
  const getCurrentUserPosts = async () => {
    try {
      const postsArray = [];
      const user = auth.currentUser;//es una propiedad para obtener el usuario que accedio si no accede nadie es null
      const getCurrentUserPostsQuery = query(collection(db, 'posts'), where('idUser', '==', user.uid));//metodo where recibe 3 parametros uno para filtrar uno para comparar y el valor
      const postsSnapshot = await getDocs(getCurrentUserPostsQuery);
      postsSnapshot.forEach((doc) => {
        postsArray.push(doc.data());//data adjunta el array que trae postsSnapshot
      });
  
      return postsArray;
      //console.log(postsArray)
    } catch (error) {
      console.log(error);
    }
  };
  
  const createPost = async (dataPost) => {
    /*
          {
              text: 'jasjajdasdas',
              postType: 'type',
              (img: 'url')
          }
      */
  
    try {
      const user = auth.currentUser;
  
      await addDoc(collection(db, 'posts'),{ ...dataPost, idUser: user.uid },);
  
      console.log('todo salio super bien!');
    } catch (error) {
      console.log(error);
    }
  };
  
  export { createPost, getCurrentUserPosts, getAllPosts };


