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
  location.href = './https://mteresamilanes.github.io/ecommerceWatches.github.io/?utm_source=newsletter&utm_medium=email&utm_campaign=luxury+watch&utm_term=luxury'
}
function mailmeClick(){
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    'event': 'click_mailme_button', 
    'click_type' : 'button_mailme',
  });
}


fetch('./product.json')
.then(function(response){
  return response.json();
})
.then(function(products){
  let placeholder = document.querySelector('.image-collage');
  

  let out = "";
  for(let product of Object.keys(products)){    
    out += `
    <div class="card" >
      <img src="${products[product][0].image}" class="image" data-id="${products[product][0].id}" data-name="${products[product][0].title}">
    </div>
    <div class="card" >
      <img src="${products[product][1].image}" class="image" data-id="${products[product][1].id}" data-name="${products[product][1].title}">
    </div>
    <div class="card" >
      <img src="${products[product][2].image} class="image" data-id="${products[product][2].id}" data-name="${products[product][2].title}">
    </div>
    <div class="card" >
      <img src="${products[product][3].image} class="image" data-id="${products[product][3].id}" data-name="${products[product][3].title}">
    </div>
    <div class="card" >
      <img src="${products[product][4].image} class="image" data-id="${products[product][4].id}" data-name="${products[product][4].title}">
    </div>
    `;
  
  }
  placeholder.innerHTML = out;
  let cards = document.getElementsByClassName('card');
  for(let card of cards) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      let element = e.target;
      let dataId = element.getAttribute('data-id');
      let dataName = element.getAttribute('data-name');
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        'event': 'click_image',
        'dataId': dataId,
        'dataName': dataName,
      });
    })
  }
})


