
var rconsole = (function(){

  var location = 'http://192.168.1.217:8080/remoteConsole/rec.php';
  var logQueue = [];
  var active = false;
  var failed = false;
  var currentQueueNumber = 0;
  var httpRequest;


  function getErrorObject(){
      try { throw Error('') } catch(err) { return err; }
  }

  function log(str) {

    var err = getErrorObject();
    var caller_line = err.stack.split("\n")[4];
    var index = caller_line.indexOf("at ");
    var clean = caller_line.slice(index+2, caller_line.length);
    var ln = clean.split(":")[3];

    str = 'message=' + str + '&type=log' + '&ln=' + ln;
    logQueue.push(str);
    reqRequest();
  }
  function warn(str) {

    var err = getErrorObject();
    var caller_line = err.stack.split("\n")[4];
    var index = caller_line.indexOf("at ");
    var clean = caller_line.slice(index+2, caller_line.length);
    var ln = clean.split(":")[3];

    str = 'message=' + str + '&type=warn' + '&ln=' + ln;
    logQueue.push(str);
    reqRequest();
  }
  function info(str) {

    var err = getErrorObject();
    var caller_line = err.stack.split("\n")[4];
    var index = caller_line.indexOf("at ");
    var clean = caller_line.slice(index+2, caller_line.length);
    var ln = clean.split(":")[3];

    str = 'message=' + str + '&type=info' + '&ln=' + ln;
    logQueue.push(str);
    reqRequest();
  }
  function error(str) {

    var err = getErrorObject();
    var caller_line = err.stack.split("\n")[4];
    var index = caller_line.indexOf("at ");
    var clean = caller_line.slice(index+2, caller_line.length);
    var ln = clean.split(":")[3];

    str = 'message=' + str + '&type=error' + '&ln=' + ln;
    logQueue.push(str);
    reqRequest();
  }


  function reqRequest(){
    if (!active) {
      request();
    }
  }


  function request() {

    if (!failed) {



      active = true;
      var params = logQueue[currentQueueNumber];
      var date = new Date().getTime();
      params += '&timesent=' + date;


      if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
      } else if (window.ActiveXObject) { // IE
        try {
          httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
          try {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
          }
          catch (e) {}
        }
      }

      if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
      }
      httpRequest.onreadystatechange = clog;
      httpRequest.open('POST', location);
      httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      httpRequest.send(params);

    }

  }

      function clog() {

        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            if (currentQueueNumber < logQueue.length-1) {
              setTimeout(function(){
                request();
              },50)
            } else {
              active = false;
            }
            currentQueueNumber++;
          } else {
            alert('There was a problem with the request. status \n ' + httpRequest.status);
            failed = true;
          }
        }
      }

      return {
        log: log,
        warn: warn,
        info: info,
        error: error,
        logQueue: logQueue
      }



}());
