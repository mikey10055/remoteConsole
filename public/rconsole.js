
var rconsole = (function(){

  var location = 'http://localhost:8080/remoteConsole/rec.php';
  var logQueue = [];
  var active = false;
  var failed = false;
  var currentQueueNumber = null;
  var httpRequest;

  function log(str) {
    str = 'message=' + str + '&type=log';
    request(str);
  }


  function request(params) {

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

      function clog() {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
          } else {
            alert('There was a problem with the request. status \n ' + httpRequest.status);
            failed = true;
          }
        }
      }

      return {
        log: log
      }



}());
