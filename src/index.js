if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log('JavaScript is enabled in the browser');
}

class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<p class='test'>Hello world</p>";
  }
}

customElements.define('hello-world', HelloWorld)