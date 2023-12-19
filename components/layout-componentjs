class LayoutComponent extends HTMLElement {
  constructor() {
    super();
    this.links = [
      { href: '/', text: 'Home' },
      { href: '/upload', text: 'Upload (Upload Widget)' },
      { href: '/apiupload', text: 'API Upload' },
      { href: '/album', text: 'Photo Album' },
    ];
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="navbar bg-base-100">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabIndex="0" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
              </svg>
            </label>
            <ul tabIndex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              ${this.links
                .map(
                  ({ href, text }) => `
                <li><a href="${href}">${text}</a></li>
              `
                )
                .join('')}
            </ul>
          </div>
          <a href="/" class="btn btn-ghost text-xl">
            Cloudinary JavaScript Photo Album
          </a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            ${this.links
              .map(
                ({ href, text }) => `
              <li><a href="${href}">${text}</a></li>
            `
              )
              .join('')}
          </ul>
        </div>
      </div>
      <main class="bg-gray-200 container mx-auto p-8 rounded-lg shadow-2xl" id="main-content"></main>
    `;

    this.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const path = event.target.getAttribute('href');
        document.dispatchEvent(
          new CustomEvent('navigate', { detail: { path } })
        );
      });
    });
  }

  loadPage(pageHtml) {
    this.querySelector('#main-content').innerHTML = pageHtml;
  }
}

customElements.define('layout-component', LayoutComponent);
