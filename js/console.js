var rconsole = (function() {

  var c = document.getElementById('rconsole');
  var scrolling = false;



  function log(str)
  {
    c.innerHTML += str + "<br>\n";
    scrollToBottom();
  }
  function warn(str)
  {
    c.innerHTML += str + "<br>\n";
    scrollToBottom();
  }
  function info(str)
  {
    c.innerHTML += str + "<br>\n";
    scrollToBottom();
  }
  function error(str)
  {
    c.innerHTML += str + "<br>\n";
    scrollToBottom();
  }

function scrollToBottom()
{
    if (!scrolling) {
      c.scrollTop = c.scrollHeight;
    }
}

  return {
    log: log
  }

}())
