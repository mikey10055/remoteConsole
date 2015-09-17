var rconsole = (function() {

  var c = document.getElementById('rconsole');

  function getConsoleContents()
  {
    return c.innerHTML;
  }

  function log(str)
  {
    c.innerHTML += str + "<br>\n";
  }



  return {
    log: log
  }

}())
