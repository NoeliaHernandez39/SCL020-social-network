import { logout } from '../../firebase/auth.js';
import { deletePost, getCurrentUserPosts } from '../../firebase/post.js';
import { getUserData } from '../../firebase/users.js';
import { showTemplates } from '../router.js';

export const userProfile = () => {
const divUserProfile = document.createElement('div');
    divUserProfile.setAttribute('id', 'containerUserProfile');
    const viewUserProfile = `
    <div class="menu__side" id="menu_side">
        <div id="containImg">
            <img src="img/logo2.png" id="logo2">
        </div>
        <div class="options__menu">	
            <a href="#/userProfile" class="selected">
                <div class="option">
                    <i class="fa-solid fa-circle-user fa-xl" title="Perfil" ></i>
                    <h4> Mi perfil</h4>
                </div>
            </a>
            <a href="#/home">
                <div class="option">
                    <i class="fa-solid fa-house fa-xl" title="Inicio"></i>
                    <h4>Inicio</h4>
                </div>
            </a>
            <a href="#/search">
                <div class="option">
                    <i class="fa-solid fa-magnifying-glass fa-xl" title="Buscar"></i>
                    <h4>Buscar</h4>
                </div>
            </a>
            <a id= "logoutButton">
                <div class="option">
                    <i class="fa-solid fa-arrow-right-from-bracket fa-xl" title="Cerrar sesión"></i>
                    <h4>Cerrar sesión</h4>
                </div>
            </a>
        </div>
    </div>
    <div class="postMain">
        <div class="userHeader">
            <img src= "img/userheader4.png">
            <div class="userIcon">
                <i class="fa-solid fa-circle-user fa-6x"></i>
            </div>
            <div class="userName" id="nameHeader">
                <h2>Mi perfil</h2>
            </div>
            <div class="userTitle">
                <h3>Mis Publicaciones:</h3>
            </div>
            <div class= "createBtn">
                <a href="#/createPost" class="buttonGreen">Crea un Post</a>  
            </div>
        </div>
        <div class="postBody">
        </div>
    </div>
    `;

    divUserProfile.innerHTML = viewUserProfile;

    const btn = divUserProfile.querySelector('#logoutButton')
    const postBody = divUserProfile.querySelector('.postBody');
        btn.addEventListener('click', () => {
            logout()
        })

    getCurrentUserPosts()
        .then((postsResponse) => {
            postsResponse.forEach((post) => {
                console.log(post)
                let postId1 = post.id;
                getUserData(post.idUser)
                    .then((idUser) => {
            const date = new Date(Number(post.createdAt) * 1000).toLocaleDateString()
            const postHTML = document.createElement('div');
            postHTML.innerHTML = `
                        <div class='postProfile'>
                            <div class="userNav">
                                <div class="userIcon">
                                    <i class="fa-solid fa-circle-user fa-3x"></i>
                                </div>
                            
                                <div class="userName">
                                    <p>${idUser?.username}</p>
                                </div>
                            
                                <div class="userTitle">
                                    <p>${idUser?.userType}</p>
                                </div>
                                <div class="userDate">
                                    <p class="date">${date}</p>
                                </div>
                            </div>
                            <div class="post">
                                <h2>${post.text}</h2> 
                            </div>
                            <div class="like">
                                <div>
                                    <img src="img/cuplike.png" class ="cupcakeImg" alt="cuplike">
                                </div>
                                <div class="pencilIcon">
                                    <a href="#/editPost" <i class="fa-solid fa-pencil fa-2xl"></i> </a>
                                    <button class="btn-delete" data-docid=${postId1}>X</button>
                                </div>
                            </div>
                        </div>`;
                
                        const deleteBtn = postHTML.querySelectorAll(".btn-delete")
                        deleteBtn.forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                const properties = e.target.dataset.docid;
                                console.log(properties)
                                const deleteConfirm = confirm("¿Are you sure you want to delete this post?");
                                if (deleteConfirm === true) {
                                    await deletePost(properties)
                                    alert("Post has been deleted");
                                    showTemplates('#/userProfile')
                                }
                            })
                        });
                postBody.appendChild(postHTML);
            });
        });
    });
    return divUserProfile;
};

// ******************************
// export const userProfile = () => {
//     const divUserProfile = document.createElement('div')
//     divUserProfile.setAttribute('id', 'containerUserProfile')
//     const viewUserProfile = `
//     <div class="menu__side" id="menu_side">
//     <div id="containImg">
//         <img src="img/logo2.png" id="logo2">
//     </div>
//     <div class="options__menu">	
//         <a href="#/userProfile" class="selected">
//             <div class="option">
//                 <i class="fa-solid fa-circle-user fa-xl" title="Perfil" ></i>
//             <h4> nombre usuario titulo</h4>
//         </div>
//     </a>
//     <a href="#/home">
//         <div class="option">
//             <i class="fa-solid fa-house fa-xl" title="Inicio"></i>
//             <h4>Inicio</h4>
//         </div>
//     </a>
//     <a href="#/search">
//         <div class="option">
//             <i class="fa-solid fa-magnifying-glass fa-xl" title="Buscar"></i>
//             <h4>Buscar</h4>
//         </div>
//     </a>
//     <a href="">
//         <div class="option">
//             <i class="fa-solid fa-arrow-right-from-bracket fa-xl" title="Cerrar sesión"></i>
//             <h4>Cerrar cesion</h4>
//         </div>
//     </a>
//     </div>
// </div>
//     <div class="userMain">
//         <div class="userHeader">
//             <div class="userIcon">
//                 <i class="fa-solid fa-circle-user fa-6x"></i>
//             </div>
//             <div class="userName" id="nameHeader">
//                 <p>Nombre de usuario<p>
//             </div>
//             <div class="userTitle" id="titleHeader">
//                 <p>Titulo baker o eater</p>
//             </div>
//         </div>
//         <div class="createPostFlex">
//             <p>Mis Publicaciones:</p>
//             <a href="#/createPost" class="buttonGreen">Nuevo post</a>
//         </div>
//         <div class="postContainer">
//             <div class="postBody">
//                 <div class="userNav">
//                     <div class="userIcon">
//                         <i class="fa-solid fa-circle-user fa-3x"></i>
//                     </div>
//                     <div class="userName">
//                         <p>Nombre de usuario</p>
//                     </div>
//                     <div class="userTitle">
//                         <p>Baker</p>
//                     </div>
//                 </div>
//                 <div class="post">
//                     <h2> aqui va el post</h2> 
//                 </div>
//                 <div class="like">
//                     <div>
//                         <img src="img/cuplike.png" class ="cupcakeImg" alt="cuplike">
//                     </div>
//                     <div class="pencilIcon">
//                         <a href="#/editPost" <i class="fa-solid fa-pencil fa-2xl"></i> </a>
//                     </div>
//                 </div>
//             </div>
//             <div class="postBody">
//                 <div class="userNav">
//                     <div class="userIcon">
//                         <i class="fa-solid fa-circle-user fa-3x"></i>
//                     </div>
//                     <div class="userName">
//                         <p>Nombre de usuario</p>
//                     </div>
//                     <div class="userTitle">
//                         <p>Baker</p>
//                     </div>
//                 </div>
//                 <div class="post">
//                     <h2> aqui va el post</h2> 
//                 </div>
//                 <div class="like">
//                     <div>
//                         <img src="img/cuplike.png" class ="cupcakeImg" alt="cuplike">
//                     </div>
//                     <div class="pencilIcon">
//                         <a href="#/editPost" <i class="fa-solid fa-pencil fa-2xl"></i> </a>
//                     </div>
//                 </div>
//             </div>
//             <div class="postBody">
//                 <div class="userNav">
//                     <div class="userIcon">
//                         <i class="fa-solid fa-circle-user fa-3x"></i>
//                     </div>
//                     <div class="userName">
//                         <p>Nombre de usuario</p>
//                     </div>
//                     <div class="userTitle">
//                         <p>Baker</p>
//                     </div>
//                 </div>
//                 <div class="post">
//                     <h2> aqui va el post</h2> 
//                 </div>
//                 <div class="like">
//                     <div>
//                         <img src="img/cuplike.png" class ="cupcakeImg" alt="cuplike">
//                     </div>
//                     <div class="pencilIcon">
//                         <a href="#/editPost" <i class="fa-solid fa-pencil fa-2xl"></i> </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// `
//     divUserProfile.innerHTML = viewUserProfile;
//     return divUserProfile;
// };