navigator.getWebcam = ( navigator.getUserMedia ||
 navigator.webkitGetUserMedia ||
 navigator.mozGetUserMedia ||
 navigator.msGetUserMedia );


var peer = new Peer({ key : 'zyvikbgfagb0ggb9' ,
  debug : 3 ,
  config: {'iceServers': [ 
  { url : 'stun:stun1.l.google.com:19302'} ,
  { url : 'stun:stun2.l.google.com:19302'} ,
  { url : 'turn:numb.viagenie.ca' , username:"hiteyadav@gmail.com" , credential:"katrina1"} 
  ]
}});

peer.on('open' , function(){
  $('#my-id').text(peer.id);
});

peer.on('call' , function(call) {
  call.answer(window.localStream);
  step3(call);
});

$(function() {
  $('#make-call').click(function() {
    var call = peer.call($('#callto-id').val(), window.localStream);
    step3(call);
  });

  $('end-call').click(function() {
    window.existingCall.close();
    step2();
  });

  $('#step1-retry').click(function() {
    $('#step1-error').hide();
    step();
  });

  step1();

})


function step1() {
  navigator.getWebcam({audio: true, video: true}, function(stream){
    $('#my-video').prop('src', URL.createObjectURL(stream));

    window.localStream = stream;
    step2();
  }, function(){ $('#step1-error').show();});
}

function step2() {
  $('#step1' , '#step3').hide();
  $('#step2').show();
}

function step3(call) {
  if (window.existingCall) {
    window.existingCall.close();
  }

  call.on('stream' , function(stream) {
    $('#their-video').prop('src' , URL.createObjectURL(stream));
  });
  $('#step1' , '#step2').hide();
  $('#step3').show();
}

