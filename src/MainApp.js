// import OListInput from './components/olist-input/input'

class MainApp extends HTMLElement {

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        const mainAppContainer = document.createElement('div');
        const getHTMLView = () => (
            `<p>DENISSSSXXDXS OkKDDD<p>`
        );

        mainAppContainer.classList.add('main-app');
        mainAppContainer.innerHTML = getHTMLView();

        shadow.appendChild(mainAppContainer);
    }

}

customElements.define('main-app', MainApp);

export default MainApp;