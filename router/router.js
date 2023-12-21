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
        // await this.loadComponent('home-page', '../pages/home-page');
        await import('../pages/home-page.js');
        this.layout.loadPage(`<home-page></home-page>`);
        break;
      case '/upload':
        await import('../pages/upload-page.js');
        this.layout.loadPage(`<upload-page></upload-page>`);
        // await this.loadComponent('upload-page', '../pages/upload-page');
        this.loadUploadWidgetScript();
        break;
      case '/apiupload':
        await import('../pages/api-upload-page.js');
        this.layout.loadPage(`<api-upload-page></api-upload-page>`);
        // await this.loadComponent('api-upload-page', '../pages/api-upload-page');
        break;
      case '/album':
        await import('../pages/album-page.js');
        this.layout.loadPage(`<album-page></album-page>`);
        // await this.loadComponent('album-page', '../pages/album-page');
        break;
      default:
        this.layout.loadPage('<p>Page not found</p>');
    }
  }

  // async loadComponent(tagName, modulePath) {
  //   if (!customElements.get(tagName)) {
  //     try {
  //       await import(`${modulePath}.js`);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   this.layout.loadPage(`<${tagName}></${tagName}>}`);
  // }

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
