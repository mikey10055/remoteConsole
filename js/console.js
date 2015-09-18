var rconsole = (function() {

  var c = document.getElementById('rconsole');
  var rc = document.getElementById('rconsole');

  var scrolling = false;
  var lastReceved = 0;

  function log(str,time,ln)
  {
    time = time || new Date().getTime();
    ln = ln || 'N/A';
    c.innerHTML += "<div class='r-log'>" + "<small>" + formatDate(time) + "</small><br>" + ln +": " + str + "</div>\n";
    scrollToBottom();
  }
  function warn(str,time,ln)
  {
    time = time || new Date().getTime();
    ln = ln || 'N/A';
    c.innerHTML += "<div class='r-warn'>" + "<small>" + formatDate(time) + "</small><br>" + ln +": " + str + "</div>\n";
    scrollToBottom();
  }
  function info(str,time,ln)
  {
    time = time || new Date().getTime();
    ln = ln || 'N/A';
    c.innerHTML += "<div class='r-info'>" + "<small>" + formatDate(time) + "</small><br>" + ln +": " + str + "</div>\n";
    scrollToBottom();
  }
  function error(str,time,ln)
  {
    time = time || new Date().getTime();
    ln = ln || 'N/A';
    c.innerHTML += "<div class='r-error'>" + "<small>" + formatDate(time) + "</small><br>" + ln +": " + str + "</div>\n";
    scrollToBottom();
  }

  function str_pad(n) {
      return String("00" + n).slice(-2);
  }

  function formatDate(time) {
        dd = new Date(parseInt(time));

        return str_pad(dd.getHours()) + ':' + str_pad(dd.getMinutes()) + ':' + str_pad(dd.getSeconds());
  }


  window.setInterval(function(){
    $.ajax({
      method: "POST",
      url: "check.php",
      dataType: "JSON",
      data: { log:  rc.innerHTML}
    })
      .fail(function(m){
        console.log(m);
        console.log('failed');
      })
      .done(function( msg ) {
        if (msg != false) {
          if (msg[0] != lastReceved) {
            lastReceved = msg[0];
            switch(msg[2]){
              case 'log':
                log(msg[1],msg[0],msg[3]);
              break;
              case 'warn':
                warn(msg[1],msg[0],msg[3]);
              break;
              case 'info':
                info(msg[1],msg[0],msg[3]);
              break;
              case 'error':
                error(msg[1],msg[0],msg[3]);
              break;
            }

          }

        }
    });
  },1);




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
