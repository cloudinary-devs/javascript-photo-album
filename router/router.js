class Router {
  constructor(layout) {
    this.layout = layout;
    window.onpopstate = this.routeChange.bind(this);
    this.routeChange();
  }

  async routeChange() {
    const path = window.location.pathname;
    switch (path) {
      case '/':
        await this.loadComponent('home-page', '../pages/home-page.js');
        break;
      case '/upload':
        await this.loadComponent('upload-page', '../pages/upload-page.js');
        this.loadUploadWidgetScript();
        break;
      case '/apiupload':
        await this.loadComponent(
          'api-upload-page',
          '../pages/api-upload-page.js'
        );
        break;
      case '/album':
        await this.loadComponent('album-page', '../pages/album-page.js');
        break;
      default:
        this.layout.loadPage('<p>Page not found</p>');
    }
  }

  async loadComponent(tagName, modulePath) {
    if (!customElements.get(tagName)) {
      try {
        await import(modulePath);
      } catch (error) {
        console.error(error);
      }
    }
    this.layout.loadPage(`<${tagName}></${tagName}>`);
  }

  loadUploadWidgetScript() {
    const uploadPage = document.querySelector('upload-page');
    if (uploadPage) {
      uploadPage.loadUW();
    }
  }

  navigate(path) {
    window.history.pushState({}, path, window.location.origin + path);
    this.routeChange();
  }
}

const layout = document.querySelector('layout-component');
const router = new Router(layout);

document.addEventListener('navigate', (event) => {
  const path = event.detail.path;
  router.navigate(path);
});
