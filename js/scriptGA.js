function myFunction(){
  document.getElementById("logoIcon").style.color = 'red';
  if(window.dataLayer){
    dataLayer.push({
      'color': 'red',
      'conversionValue': 50,
      'event': 'customize'
    });
  }
}