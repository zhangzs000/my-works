class Track {
  constructor(){

  }
  tracking(){
    console.log('Track tracking....')
  }
}

export default {

  init(app) {
      app.track = new Track(app.options.track);
      app.track.tracking();
  }
  
};
// export default Track