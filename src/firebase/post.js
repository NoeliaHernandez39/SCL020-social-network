//import { searchPost } from '../lib/view/templateSearch.js';
import {
    db, addDoc, collection, getDocs, query, where, auth, orderBy, deleteDoc, doc
  } from './init.js';

  //Llama array con todo los post para el home
const getAllPosts = async () => {
  try {
    const postsArray = []; //array vacio donde quedaran los post.
    const getAllPostsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));//consulta a db.
    const allPostsSnapshot = await getDocs(getAllPostsQuery);// espera obtener los datos.
    allPostsSnapshot.forEach((doc) => {
      postsArray.push(doc.data());//.data(), toma data especifica de nuestra coleccion.
    });
    return postsArray;
  } catch (err) {
    console.log(err);
  }
};

  //Llama array de los posts del usuario especifico para su perfil
const getCurrentUserPosts = async () => {
  try {
    const postsArray = [];
    const user = auth.currentUser.uid;//propiedad para obtener el usuario que accedio si no accede nadie es null
    const getCurrentUserPostsQuery = query(collection(db, 'posts'), where('idUser', '==', user), orderBy('createdAt', 'desc'));//metodo where recibe 3 parametros uno para filtrar uno para comparar y el valor
    const postsSnapshot = await getDocs(getCurrentUserPostsQuery);
    postsSnapshot.forEach((doc) => {
      const postId = doc.id;
      const postData = doc.data()
      const post = {
        id: postId,
        ...postData
      }
      postsArray.push(post);
    });
    return postsArray;
  } catch (error) {
    console.log(error);
  }
};

  //Crea en la coleccion de la db
const createPost = async (dataPost) => {
  try {
    const user = auth.currentUser.uid;
    const secondsTimestamp = Math.floor(Date.now() / 1000)
    await addDoc(collection(db, 'posts'), {idUser: user, createdAt: secondsTimestamp, ...dataPost}); //... agrega otro elemento en un mismo objeto.
  } catch (error) {
    console.log(error)
  }
};

//borra del usuario especifico
const deletePost = id => deleteDoc(doc(db, "posts" , id));
  
  export { deletePost, createPost, getCurrentUserPosts, getAllPosts};