class Share {
  constructor(){
    
  }
  setShare(data) {
    console.log('setShare: ',data)
  }
}

export default {
  init(app) {
      app.share = new Share();
      app.setShare = data => app.share.setShare(data);
  }
};

// export default Share