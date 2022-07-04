import { logout } from '../../firebase/auth.js';
import { getAllPosts } from '../../firebase/post.js';
import { getUserPostData } from '../../firebase/users.js';

export const home = () => {
    const divHome = document.createElement('div');
    divHome.setAttribute('id', 'divContainerHome');
    const viewHome = `
    <div class="menu__side" id="menu_side">
        <div id="containImg">
            <img src="img/logo2.png" id="logo2">
        </div>
        <div class="options__menu">	
            <a href="#/userProfile" class="selected">
                <div class="option">
                    <i class="fa-solid fa-circle-user fa-xl" title="Perfil" ></i>
                    <h4> nombre usuario titulo</h4>
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
            <a id="logoutButton">
                <div class="option">
                    <i class="fa-solid fa-arrow-right-from-bracket fa-xl" title="Cerrar sesión"></i>
                    <h4>Cerrar cesion</h4>
                </div>
            </a>
        </div>
    </div>
    <div class="postMain">

    </div>
</div>
`;
divHome.innerHTML = viewHome;
const btn = divHome.querySelector('#logoutButton');
const postMain = divHome.querySelector('.postMain');


getAllPosts() //trae todo los post
    .then((postList) => {
        postList.forEach((post) => { //trae todos los post filtrados
            getUserPostData(post.idUser)//uid especifico de cada post
        .then((users) => {
            const postElement = document.createElement('div'); 
            postElement.setAttribute('class', 'postBody') 

            postElement.innerHTML = `
                            <div class="userNav">
                                <div class="item1">
                                    <i class="fa-solid fa-circle-user fa-3x"></i>
                                </div>
                                <div class="item2">
                                    <p>${users.username}</p>
                                </div>
                                <div class="item3">
                                    <p>${users.userType}</p>
                                </div>
                            </div>

                            <div class="post">
                                <h2>${post?.text}</h2> 
                            </div>
                            <div class="like">
                                <div>
                                    <img src="img/cuplike.png" class ="cupcakeImg" alt="cuplike">
                                </div>
                            </div>
                        `;

            postMain.appendChild(postElement);
        });
    });
});

    // ASOCIAMOS EL BOTON DE CERRAR SESION CON LA FUNCION DE LOGOUT
btn.addEventListener('click', () => {
    logout();
});
return divHome;
};
