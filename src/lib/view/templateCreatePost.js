import { createPost } from "../../firebase/post.js";

export const newPost = () => {
    const divNewPost = document.createElement('div')
    divNewPost.setAttribute('class', 'postMain')
    
    const viewNewPost = `
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
            <a id= "logoutButton" >
                <div class="option">
                    <i class="fa-solid fa-arrow-right-from-bracket fa-xl" title="Cerrar sesión"></i>
                    <h4>Cerrar sesión</h4>
                </div>
            </a>
        </div>
    </div>
    <div class="userHeader" >
        <div class="userIcon">
            <i class="fa-solid fa-circle-user fa-6x"></i>
        </div>
        <div class="userName" id="nameHeader">
            <h2>Mi perfil</h2>
        </div>
        <div class="userTitle" id="titleHeader">
                <p>Mis Publicaciones:</p> 
        </div>
    </div>
    <div class="postBody">
        <div class="userNav">
        </div>
        <div class="post">
            <input class="post__textarea" name="createPostInput"  id="createPostTextarea" placeholder="Escribe un texto"></input>
        </div>
        <div class="optionsPost">
            <div class="radioButtons" id="radioButtonsCreatePost">
                <div class="radioButtonContainer">
                    <input  type="radio" id="veganOptionId" name="postType" value="vegan" checked>
                    <labelfor="veganOptionId">Vegano</label>
                </div>
                <div class="radioButtonContainer">
                    <input type="radio" id="glutenFreeId" name="postType" value="glutenFree">
                    <label for="glutenFreeId">Sin gluten</label>
                </div>
                <div class="radioButtonContainer">
                    <input type="radio" id="sugarFreeId" name="postType" value="sugarFree">
                    <label for="sugarFreeId">Sin azúcar</label>
                </div>
                <div class="radioButtonContainer">
                    <input type="radio" id="lactoseFreeId" name="postType" value="lactoseFree">
                    <label for="lactoseFreeId">Sin lactosa</label>
                </div>
            </div>
            <div class="divOptionsBt">
                <a class="buttons" id="createPost">Publicar</a>
            </div>
        </div>
    </div>
</div>
`
divNewPost.innerHTML = viewNewPost;

const createPostButton = divNewPost.querySelector('#createPost')
const textarea = divNewPost.querySelector('#createPostTextarea')

createPostButton.addEventListener('click', () => {
    const postType = divNewPost.querySelector('input[name="postType"]:checked').value;

    const dataPost = {
        text: textarea.value,
        postType: postType
    }
    
    if (textarea.value == '' || null || undefined){
    alert ('Debes ingresar texto')
    } else {
        createPost(dataPost)
        window.location = '#/userProfile'
    }
})

    return divNewPost;
};
