import './input.css'

class OListInput extends HTMLElement {
    
    constructor() {
        super();
    
        const shadow = this.attachShadow({ mode: 'open' });
        const oListInputContainer = document.createElement('div');
    
        oListInputContainer.classList.add('olist-input');
        oListInputContainer.innerHTML = `<p class="test">INPUT DENIS<p>`;

        shadow.appendChild(oListInputContainer);
    }
}

customElements.define('olist-input', OListInput);

export default OListInput;