class Router {
  constructor(){
    
  }
  to(name) {
    console.log('Router to....',name)
  }
}

export default {

  init(app) {
      app.router = new Router(app.options.router);
      app.router.to('home');
  }

};

// export default Router