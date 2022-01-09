export default `self.addEventListener("message", (e) => {
  if (e.data.action == "timeout") {
    if(!self.activeTimeouts){
      self.activeTimeouts = {}
    }

    let t = self.setTimeout(() => {
      self.postMessage({
        action: "timeout",
        timeStamp: e.data.timeStamp,
        data: e.data.data,
        name: e.data.name
      });
      self.clearTimeout(t);
      delete self.activeTimeouts[e.data.name];

      t = 0;
    }, e.data.delay);

    if(/string|number/.test(typeof e.data.name)){
      self.activeTimeouts[e.data.name] = {
        ref: t,
        timeStamp: e.data.timeStamp
      };
    }

  }
  
  if(e.data.action == 'clearTimeout'){
    const postMessage = value =>
      self.postMessage({
        action: 'clearTimeout',
        value,
      })

    if(!e.data.name){
      return postMessage(false)
    }

    const ts = self?.activeTimeouts?.[e.data?.name]||0;

    if(!ts){
      postMessage(false)
    }else{
      self.clearTimeout(ts.ref);
      
      postMessage(true)

      self.postMessage({
        action: "timeout",
        timeStamp: ts.timeStamp,
        cancelled: true,
        name: e.data.name
      });

      delete self.activeTimeouts[e.data.name];
    }
  }


});`;
