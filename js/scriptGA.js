var player
function onYouTubeIframeAPIReady () {
  player = new YT.Player('player', {
    videoId: 'I8AyFs2uESg',
    events: {
      onStateChange: onPlayerStateChange
    }
  })
}

function onPlayerStateChange (event) {
  if (event.data == YT.PlayerState.PLAYING) {
    window.dataLayer = window.dataLayer || []
    dataLayer.push({
      event: 'video_play',
      visitorType: 'user'
    })
    console.log('event play detected')
  }
  if (event.data == YT.PlayerState.PAUSED) {
    window.dataLayer = window.dataLayer || []
    dataLayer.push({
      event: 'video_pause',
      visitorType: 'user'
    })
    console.log('event paused detected')
  }
}

function eventClick(){
  // "gtag({'event': 'click_join_button', 'click_type' : 'button_join','event_category': 'button', 'event_label': 'Subscribe to our newsletter'});
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    'event': 'click_join_button', 
    'click_type' : 'button_join',
  });
}
