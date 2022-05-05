function myFunction(){
  document.getElementById("logoIcon").innerHTML = 'Icon Changed' + new Date().toTimeString();
  if(window.dataLayer){
    dataLayer.push({
      'color': 'red',
      'conversionValue': 50,
      'event': 'customize'
    });
  }
}