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
  gtag(dataLayer.push({
    'event': 'click_join_button', 
    'click_type' : 'button_join',
  }));
}


const showFormError = (err) => {
  let errorEle = document.querySelector('.error');
  errorEle.innerHTML = err;
  errorEle.classList.add('show')

  setTimeout(() => {
      errorEle.classList.remove('show')
  }, 2000)
}

let applyBtn = document.querySelector('.apply-btn');

applyBtn.addEventListener('click', () => {
  let customerName = document.querySelector('#name').value;
  let customerEmail = document.querySelector('#email').value;
  let customerMessage = document.querySelector('#message').value;
  let customerNumber = document.querySelector('#number').value;
  let expRegEmail= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let isValidEmail = expRegEmail.test(customerEmail);

  if(!customerName.length || !customerEmail.length || !isValidEmail || !customerMessage || customerNumber.length < 10 || !Number(customerNumber)){
    if(!isValidEmail) {
      showFormError('email is not valid');
      console.log(customerEmail);
      console.log(isValidEmail);
    }else{
      showFormError('some information(s) is/are incorrect');
      console.log(isValidEmail);
    }
  }else{
    alert('Form was successfully submitted')
  }
  window.dataLayer = window.dataLayer || [];
  gtag(dataLayer.push({
    'event': 'click_sent_button', 
    'click_type' : 'button_sent',
    'email' : customerEmail,
    'contact number' : customerNumber,
    'customer name' : customerName,
  }));


})
