import { createPost } from "../../firebase/post.js";

export const newPost = () => {
    const divNewPost = document.createElement('div')
    divNewPost.setAttribute('id', 'containerNewPost')
    
    const viewNewPost = `
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
    <a href="">
        <div class="option">
            <i class="fa-solid fa-arrow-right-from-bracket fa-xl" title="Cerrar sesión"></i>
            <h4>Cerrar cesion</h4>
        </div>
    </a>
    </div>
</div>
<div class="postMain">
    <div class="userHeader">
        <div class="item1">
            <i class="fa-solid fa-circle-user fa-6x"></i>
        </div>
        <div class="item2" id="nameHeader">
            <h2>Nombre de usuario</h2>
        </div>
        <div class="item3" id="titleHeader">
            <h3>Titulo baker o eater</h3>
        </div>
    </div>
    <div class="postBody">
        <div class="userNav">
            <div class="item1">
                <i class="fa-solid fa-circle-user fa-3x"></i>
            </div>
            <div class="item2">
                <p>Nombre de usuario</p>
            </div>
            <div class="item3">
                <p>Baker</p>
            </div>
        </div>
        <div class="post">
            
            <input class="post__textarea" name="createPostInput"  id="createPostTextarea" placeholder="Escribe un texto"></input>

            <div class="radioButtons">
                <div class="radioButtonContainer">
                    <input type="radio" id="veganOptionId" name="postType" value="vegan" checked>
                    <label for="veganOptionId">Vegan</label>
                </div>

                <div class="radioButtonContainer">
                    <input type="radio" id="fullOptionId" name="postType" value="full">
                    <label for="fullOptionId">Full</label>
                </div>
            </div>
        </div>
        <div class="optionsPost">
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



///////////////////////
// divProfile.innerHTML = viewProfile;

// const formPost = divProfile.querySelector(".formPost");
// const taskContainer = divProfile.querySelector("#feed-post");


// formPost.addEventListener("submit", async(e) => {
//     e.preventDefault();
//     // console.log("submit");
//     const contentPost = formPost["inputForm"].value;
//     saveTask(contentPost);
//     formPost.reset(); 
// }
//const createPostButton = divNewPost.querySelector('#login')
// const textarea = divNewPost.querySelector('#createPostTextarea')

// createPostButton.addEventListener('click', () => {
//     // const postType = divNewPost.querySelector('input[name="postType"]:checked').value;
//     const postType = divNewPost.querySelector('.b:checked').value;
//     const dataPost = {
//         text: textarea.value,
//         postType: postType
//     }

//     createPost(dataPost)
// })
