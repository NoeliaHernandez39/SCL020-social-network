import {
    db, addDoc, collection, getDocs, query, where, auth,
  } from './init.js';
  
  const getAllPosts = async () => {
    try {
      const postsArray = [];
      const getAllPostsQuery = query(collection(db, 'posts'));
      const allPostsSnapshot = await getDocs(getAllPostsQuery);
  
      allPostsSnapshot.forEach((doc) => {
        postsArray.push(doc.data());
      });
  
      return postsArray;
    } catch (err) {
      console.log(err);
    }
  };
  
  const getCurrentUserPosts = async () => {
    try {
      const postsArray = [];
      const user = auth.currentUser;
      const getCurrentUserPostsQuery = query(collection(db, 'posts'), where('idUser', '==', user.uid));
  
      const postsSnapshot = await getDocs(getCurrentUserPostsQuery);
  
      postsSnapshot.forEach((doc) => {
        postsArray.push(doc.data());
      });
  
      return postsArray;
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
  
      await addDoc(
        collection(db, 'posts'),
        { ...dataPost, idUser: user.uid },
      );
  
      console.log('todo salio super bien!');
    } catch (error) {
      console.log(error);
    }
  };
  
  export { createPost, getCurrentUserPosts, getAllPosts };


