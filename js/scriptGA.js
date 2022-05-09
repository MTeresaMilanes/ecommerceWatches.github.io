var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
      videoId: 'I8AyFs2uESg',
      events: {
          // 'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
      }
  });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        'event': 'video_play',
        'pagePath': 'https://mteresamilanes.github.io/ecommerceWatches.github.io/',
        'pageTitle': 'ECommerce',
        'visitorType': 'user',
      })
      console.log("event play detected");
    }
    if (event.data == YT.PlayerState.PAUSED) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        'event': 'video_pause',
        'pagePath': 'https://mteresamilanes.github.io/ecommerceWatches.github.io/',
        'pageTitle': 'ECommerce',
        'visitorType': 'user',
      })
        console.log("event paused detected");
    }
}

// function onPlayerReady(event) { 
//     event.target.playVideo(); 
// }



