import { logInTemplate } from './lib/view/templateLogIn.js';
import { showTemplates } from './lib/router.js';

const init = () => {
    document.querySelector('#root').innerHTML = logInTemplate();
    showTemplates(window.location.hash)
    window.addEventListener('hashchange', () => {
        showTemplates(window.location.hash)
    })
}

window.addEventListener('load', init)