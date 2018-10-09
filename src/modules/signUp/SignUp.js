import OListInput from '../../components/olist-input/OListInput';

class SignUp extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const mainAppContainer = document.createElement('div');
    const denis = 'denis';
    const getHTMLView = () => `
      <section class="wrapper bg-white">
          <a href="#" class="logo text-center">
            <svg width="88" height="35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.677 9.738C5.282 9.738 0 15.249 0 22.368 0 29.489 5.282 35 12.677 35c7.35 0 12.631-5.512 12.631-12.631 0-7.12-5.282-12.631-12.63-12.631zm5.971 12.63c0 3.95-2.388 7.028-5.97 7.028-3.584 0-6.018-3.077-6.018-7.027s2.434-7.028 6.017-7.028 5.971 3.078 5.971 7.028zM35.606 0h-6.523v34.449h6.523V0zM47.56 34.449v-24.16h-6.522v24.16h6.523zm0-27.513V1.378h-6.522v5.558h6.523zM69.712 12.907c-2.25-2.113-5.144-3.17-8.36-3.17-4.409 0-8.634 2.48-8.634 7.396 0 4.225 3.169 5.879 6.062 7.119 2.389 1.056 4.594 1.791 4.594 3.49 0 1.47-1.746 2.114-3.078 2.114-2.342 0-3.858-1.057-5.695-2.848l-3.72 3.858C53.543 33.53 56.85 35 60.617 35c4.685 0 9.278-2.434 9.278-7.762 0-4.594-3.95-6.155-7.074-7.441-2.02-.827-3.812-1.608-3.812-3.124 0-1.148 1.102-1.837 2.343-1.837 1.837 0 3.536.919 4.776 2.021l3.583-3.95zM87.14 15.709v-5.42h-6.154V4.96h-5.512l-1.01 5.328H71.57v5.42h2.894v10.059c0 1.424.091 2.848.459 4.042.873 3.123 3.399 5.19 7.165 5.19 1.884 0 4.18-.505 5.742-1.424l-2.021-4.823c-.827.414-1.608.69-2.618.69-1.378 0-1.93-.873-2.113-2.297-.092-.69-.092-1.332-.092-2.067v-9.37h6.155z" fill="#0C29D0"/></svg>
          </a>
          <div class="wrapper-content">
            <h1 class="title text-center c-dark">Crie sua conta</h1>
            <form id="account" class="account">
              <div class="field">
                <label for="account-name" class="c-gray account-label">Nome completo</label>
                <input type="text" name="account-name" id="account-name" class="c-dark account-input">
              </div>
              <div class="field">
                <label for="account-email" class="c-gray account-label">E-mail</label>
                <input type="email" name="account-email" id="account-email" class="c-dark account-input">
              </div>
              <div class="field">
                <label for="account-password" class="c-gray account-label">Senha</label>
                <input type="password" name="account-password" id="account-password" class="c-dark account-input">
                <svg viewBox="0 0 500 8" xmlns="http://www.w3.org/2000/svg" class="strength-indicator">
                  <rect x="0" y="0" width="32%" height="8" rx="5" ry="5" />
                  <rect x="34%" y="0" width="32%" height="8" rx="5" ry="5" />
                  <rect x="68%" y="0" width="32%" height="8" rx="5" ry="5" />
                </svg>
                <p id="character" class="c-gray indicator-description">Pelo menos 6 caracteres</p>
                <p id="uppercase" class="c-gray indicator-description">Pelo menos 1 letra maiuscula</p>
                <p id="number" class="c-gray indicator-description">Pelo menos 1 numero</p>
              </div>
              <div class="field">
                <label for="account-confirm-password" class="c-gray account-label">Confirme sua senha</label>
                <input type="password" name="account-confirm-password" id="account-confirm-password" class="c-dark account-input">
              </div>
              <button type="submit" class="account-button bg-light-green c-white" disabled>
                Criar conta
              </button>
            </form>
          </div>
      </section>
    `;

    mainAppContainer.classList.add('sign-up');
    mainAppContainer.innerHTML = getHTMLView();

    shadow.appendChild(mainAppContainer);
  }
}

customElements.define('sign-up', SignUp);

export default SignUp;
