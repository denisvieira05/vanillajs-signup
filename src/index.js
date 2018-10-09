if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log('JavaScript is enabled in the browser');
}

import SignUp from './modules/signUp/SignUp';

class MainApp extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const mainAppContainer = document.createElement('div');
    const getHTMLView = () => `<sign-up /> `;

    mainAppContainer.classList.add('main-app');
    mainAppContainer.innerHTML = getHTMLView();

    shadow.appendChild(mainAppContainer);
  }
}

customElements.define('main-app', MainApp);
