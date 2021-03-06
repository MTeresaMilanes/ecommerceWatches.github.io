function formats(ele,e){
  if(ele.value.length<19){
    ele.value= ele.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    return true;
  }else{
    return false;
  }
}

function numberValidation(e){
  e.target.value = e.target.value.replace(/[^\d ]/g,'');
  return false;
}

function formatString(e) {
  var inputChar = String.fromCharCode(e.keyCode);
  var code = e.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  e.target.value = e.target.value.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
  ).replace(
    /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
  ).replace(
    /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
  ).replace(
    /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
  ).replace(
    /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
  ).replace(
    /\/\//g, '/' // Prevent entering more than 1 `/`
  );
}

function validate_cvv(cvv){

  var myRe = /^[0-9]{3,4}$/;
  var myArray = myRe.exec(cvv);
  if(cvv!=myArray)
   {
     alert("Invalid cvv number"); //invalid cvv number
     return false;
  }else{
      return true;  //valid cvv number
     }

}

let paymentBtn = document.querySelector('.payment-order-btn');

paymentBtn.addEventListener('click', () => {
  carrito = Storage.getCart()
  let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
  let transaction_id = "";
  for (i=0; i<20; i++) transaction_id +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
  window.dataLayer = window.dataLayer || [];
  let arr = [];
  let tempTotal = 0
  let itemTotal = 0
  carrito.map(item => {
    tempTotal += item.price * item.cantidad
    itemTotal += item.cantidad
  })
  for (let index = 0; index < carrito.length; index++) {
    const element = carrito[index];
    let token = {'item_id': element.id, 'item_name': element.title};
    arr.push(token);
  }
  
  dataLayer.push({
    'event': 'purchase',
    currency: 'EUR',
    transaction_id: transaction_id,
    value : tempTotal,
    items : arr,
  
  });  
  dataLayer.push({
    'event' : 'add_payment_info',
    currency: 'EUR',
    value : tempTotal,
    items: arr,
  })
  location.href = 'https://mteresamilanes.github.io/ecommerceWatches.github.io/thankYouPageCart.html'
})  

