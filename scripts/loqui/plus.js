'use strict';

var Plus = {

  bolt: function () {
    var account = Messenger.account();
    var to = $('section#chat').data('jid');
    $('section#chat nav#plus').removeClass('show');
    if (to && App.online && account.connector.connection.connected){
      if (account.supports('attention')) {
        account.connector.attentionSend(to);
        window.navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]);
        App.audio('thunder');
        Tools.log('Sent a bolt to', to);
      } else {
        Lungo.Notification.error(_('NoSupport'), _('XMPPisBetter'), 'exclamation-sign');
      }
    }
  },
  
  emoji: function (emoji) {
    Lungo.Router.article('chat', 'main');
    Messenger.say(emoji);
  },
  
  imageSend: function () {
    var account = Messenger.account();
    if (account.supports('imageSend')) {
    var to = $('section#chat').data('jid');
      var e = new MozActivity({
        name: 'pick',
        data: {
          type: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp']
        }
      });
      e.onsuccess = function () {
        var blob = this.result.blob;
        account.connector.fileSend(to, blob);      
      }
    } else {
      Lungo.Notification.error(_('NoSupport'), _('XMPPisBetter'), 'exclamation-sign');
    }
  },

  videoSend: function () {
    var account = Messenger.account();
    if (account.supports('videoSend')) {
    var to = $('section#chat').data('jid');
      var e = new MozActivity({
        name: 'pick',
        data: {
          type: ['video/webm', 'video/mp4', 'video/3gpp']
        }
      });
      e.onsuccess = function () {
        var blob = this.result.blob;
        account.connector.fileSend(to, blob);      
      }
    } else {
      Lungo.Notification.error(_('NoSupport'), _('XMPPisBetter'), 'exclamation-sign');
    }
  },

  audioSend: function () {
    var account = Messenger.account();
    if (account.supports('audioSend')) {
    var to = $('section#chat').data('jid');
      var e = new MozActivity({
        name: 'pick',
        data: {
          type: ['audio/mpeg', 'audio/ogg', 'audio/mp4']
        }
      });
      e.onsuccess = function () {
        var blob = this.result.blob;
        account.connector.fileSend(to, blob);      
      }
    } else {
      Lungo.Notification.error(_('NoSupport'), _('XMPPisBetter'), 'exclamation-sign');
    }
  },
  
  locationSend: function () {
    var account = Messenger.account();
    if (account.supports('locationSend')) {
      var to = $('section#chat').data('jid');
      Geo.posGet(function (loc) {
        account.connector.locationSend(to, loc);
      });
    } else {
      Lungo.Notification.error(_('NoSupport'), _('XMPPisBetter'), 'exclamation-sign');
    }
  },
  
  rtc: function (constraints) {
    
  },

  showConsole: function() {
    $('#console').show();
  },
  
  hideConsole: function() {
    $('#console').hide();
  },
  
  log: function(msg) {
    var node=document.createElement("DIV");
    var textnode=document.createTextNode(msg);
    node.appendChild(textnode);
    document.getElementById('logConsole').appendChild(node);
    while(document.getElementById('logConsole').childNodes.length>15)
    { 
      document.getElementById('logConsole').removeChild(document.getElementById('logConsole').firstChild);
    }
  },
  
  clearConsole: function() {
    document.getElementById('logConsole').innerHTML='';
  }
  
}
