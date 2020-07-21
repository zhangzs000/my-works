// import Router from './router';
// import Track from './track';

// class App {
//   constructor(options) {
//       this.options = options;
//       this.router = new Router();
//       this.track = new Track();
//       this.init();
//   }

//   init() {
//       window.addEventListener('DOMContentLoaded', () => {
//           this.router.to('home');
//           this.track.tracking();
//           this.options.onReady();
//       });
//   }
// }

// class App {
//   constructor(options) {
//       this.options = options;
//       this.router = options.router;
//       this.track = options.track;
//       this.init();
//   }
//   init() {
//       window.addEventListener('DOMContentLoaded', () => {
//         this.router.to('home');
//         this.track.tracking();
//         this.options.onReady();
//       });
//   }
// }

class App {
  
  static modules= [];

  constructor(options) {
      this.options = options;
      this.init();
  }

  init() {
      window.addEventListener('DOMContentLoaded', () => {
        this.initModules();
        this.options.onReady(this);
      });
  }
  static use(module) {
    Array.isArray(module) ? module.map(item => App.use(item)) : App.modules.push(module);
  }
  initModules() {
    App.modules.map(module => module.init && typeof module.init == 'function' && module.init(this));
  }
}


export default App;