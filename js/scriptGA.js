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

let buttonFooter = document.querySelector('.fButton');
buttonFooter.addEventListener('click', () => {
  alert('successful subscription');
})
let buttonEmail = document.querySelector('.mailme');
buttonEmail.addEventListener('click', () => {
  alert('successful click mailme')
})
function joinClick(){
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    'event': 'click_join_button', 
    'click_type' : 'button_join',
  });
}
function mailmeClick(){
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    'event': 'click_mailme_button', 
    'click_type' : 'button_mailme',
  });
}

let http = new XMLHttpRequest();
http.open('get', 'product.json', true);
http.send();
http.onload = function() {
  if(this.readyState == 4 && this.status == 200) {
    let products = JSON.parse(this.responseText);
    console.log(products);
    let output = '';
    for(let item in products) {
      output += `<div class="card">
      <img class="card-img-top" src="${item.image}" alt="Card image cap"></div>`
    }
    document.querySelector('.image-collage').innerHTML = output;
  }
  
}


