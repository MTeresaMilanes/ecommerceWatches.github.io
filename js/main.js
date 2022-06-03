const productoDOM = document.querySelector('.productos__center')
const carritoDOM = document.querySelector('.carrito')
const carritoCenter = document.querySelector('.carrito__center')
const openCarrito = document.querySelector('.carrito__icon')
const closeCarrito = document.querySelector('.close__carrito')
const overlay = document.querySelector('.carrito__overlay')
const carritoTotal = document.querySelector('.carrito__total')
const clearCarritoBtn = document.querySelector('.clear__carrito')
const itemTotales = document.querySelector('.item__total')
const detalles = document.getElementById('detalles')


let carrito = []
let buttonDOM = []



// image collage

// const collageImages = [...document.querySelectorAll('.collage-img')]

// collageImages.map((item, i) => {
//   item.addEventListener('click', () => {
//     collageImages.map((image, index) => {
//       if (index != i) {
//         image.style.filter = `blur(10px)`
//         item.style.zIndex = 2
//       }
//     })
//   })

//   item.addEventListener('mouseleave', () => {
//     collageImages.map((image, index) => {
//       image.style = null
//     })
//   })
// })


class UI {
  detalleProducto (id) {
    const filtroDato = productos.filter(item => item.id == id)
    let result = ''
    filtroDato.forEach(producto => {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        'event': 'select_item',
        currency : 'EUR',
        value :producto.price,
        items: [{
          item_id : producto.id,
          item_name : producto.title
        }]
      });
      result += `
			<article class="detalle-grid">
				<img src=${producto.image} alt="${producto.title}" class="img-fluid">
				<div class="detalles-content">
					<h3>${producto.title}</h3>
					<div class="rating">
						<span>
              <span class="iconify" data-icon="bi:star-fill"></span>
						</span>
						<span>
              <span class="iconify" data-icon="bi:star-fill"></span>
						</span>
						<span>
              <span class="iconify" data-icon="bi:star-fill"></span>
						</span>
						<span>
              <span class="iconify" data-icon="bi:star-fill"></span>
						</span>
						<span>
              <span class="iconify" data-icon="carbon:star"></span>
						</span>
					</div>
						<p class="price"><b>Precio: </b> $${producto.price}</p>
						<p class="description">
							<b>Descripcion: </b> <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quae ad ex sint expedita perspiciatis odit eligendi! Et quia ex aperiam dolorum sunt omnis maiores. Repudiandae delectus iste exercitationem vel?</span>
						</p>
						<p class="description">
							<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptates consequuntur in assumenda odit hic, aut cupiditate dolorem aspernatur! Quibusdam iusto magnam vero maxime quisquam voluptatibus minima aliquam molestias, iure ratione commodi, reiciendis quasi.</span>
						</p>
						<div class="bottom">
							<div class="btn__group">
								<button class="btn addToCart" data-id=${producto.id}>Add Your Cart</button>
							</div>
						</div>
				</div>
			</article>
			`
    })
    detalles.innerHTML = result
  }

  renderProductos (productos) {
    let result = ''
    productos.forEach(producto => {
      result += `
			<div class="producto">
        <div class="image__container">
          <img src=${producto.image} alt="">
        </div>
        <div class="producto__footer">
          <h1>${producto.title}</h1>
          <div class="rating">
            <span>
              <span class="iconify" data-icon="bi:star-fill"></span>
            </span>
            <span>
              <span class="iconify" data-icon="bi:star-fill"></span>
            </span>
            <span>
              <span class="iconify" data-icon="bi:star-fill"></span>
            </span>
            <span>
              <span class="iconify" data-icon="bi:star-fill"></span>
            </span>
            <span>
              <span class="iconify" data-icon="carbon:star"></span>
            </span>
          </div>
          <div class="price">$${producto.price}</div>
        </div>
        <div class="bottom">
          <div class="btn__group">
            <button class="btn addToCart" data-id=${producto.id}>Add Your Cart</button>
            <a href="product-details.html?id=${producto.id}"  class="btn view">View Details</a>
          </div>
        </div>
      </div>`
    })
    productoDOM.innerHTML = result
  }

  

  getButtons () {
    const buttons = [...document.querySelectorAll('.addToCart')]
    buttonDOM = buttons
    buttons.forEach(button => {
      const id = button.dataset.id
      const inCart = carrito.find(item => item.id === parseInt(id, 10))

      if (inCart) {
        button.innerHTML = 'Added Your Cart'
        button.disabled = true
        button.style.background = '#13b32b'
      }
      button.addEventListener('click', e => {
        e.preventDefault()
        e.target.innerHTML = 'Added Your Cart'
        e.target.disabled = true
        button.style.background = '#13b32b'

        // GET productos al carrito
        const carritoItem = { ...Storage.getProductos(id), cantidad: 1 }

        //agregamos el producto al carrito
        carrito = [...carrito, carritoItem]

        //Guardamos el carrito al localstorage
        Storage.saveCart(carrito)

        //Set cart values
        this.setItemValues(carrito)
        this.addCarritoItem(carritoItem)
        //Show al carrito
      })
    })
  }

  setItemValues (carrito) {
    let tempTotal = 0
    let itemTotal = 0
    carrito.map(item => {
      tempTotal += item.price * item.cantidad
      itemTotal += item.cantidad
    })
    carritoTotal.innerText = parseFloat(tempTotal.toFixed(2))
    itemTotales.innerText = itemTotal
  }

  addCarritoItem ({ image, price, title, id }) {
    const div = document.createElement('div')
    div.classList.add('carrito__item')
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      'event': 'add_to_cart',
      currency : 'EUR',
      value : price,
      items: [{
        item_id : id,
        item_name : title,
      }]
    })

    div.innerHTML = `
		<img src=${image} alt=${title}>
		<div>
			<h3>${title}</h3>
			<p class="price">$${price}</p>
		</div>
		<div>
			<span class="increase" data-id=${id}>
        <span class="iconify" data-icon="akar-icons:arrow-up"></span>
			</span>
			<p class="item__cantidad">1</p>
			<span class="decrease" data-id=${id}>
        <span class="iconify" data-icon="akar-icons:arrow-down"></span>
			</span>
		</div>
		<div>
			<span class="remove__item" data-id=${id}>
        <span class="iconify" data-icon="bxs:trash-alt"></span>
			</span>
		</div>
		`
    carritoCenter.appendChild(div)
  }
  show () {
    
    carritoDOM.classList.add('show')
    // paymentDOM.classList.add('show')
    overlay.classList.add('show')
    carrito = Storage.getCart()
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
      'event': 'view_cart',
      currency : 'EUR',
      value : tempTotal,
      items : arr,
    })
  }
  hide () {
    carritoDOM.classList.remove('show')
    // paymentDOM.classList.remove('show')
    overlay.classList.remove('show')
  }
  setAPP () {
    carrito = Storage.getCart()
    this.setItemValues(carrito)
    this.populate(carrito)
    openCarrito.addEventListener('click', this.show)
    closeCarrito.addEventListener('click', this.hide)
    // openPayment.addEventListener('click', this.show)
    // closePayment.addEventListener('click', this.hide)
  }
  populate (carrito) {
    carrito.forEach(item => this.addCarritoItem(item))
  }
  cartLogic () {
    clearCarritoBtn.addEventListener('click', () => {
      this.clearCarrito()
      this.hide()
    })

    carritoCenter.addEventListener('click', e => {
      const target = e.target.closest('span')
      const targetElement = target.classList.contains('remove__item')
      if (!target) return
      if (targetElement) {
        const id = parseInt(target.dataset.id)
        this.removeItem(id)
        carritoCenter.removeChild(target.parentElement.parentElement)
      } else if (target.classList.contains('increase')) {
        const id = parseInt(target.dataset.id, 10)
        let tempItem = carrito.find(item => item.id === id)
        tempItem.cantidad++
        Storage.saveCart(carrito)
        this.setItemValues(carrito)
        target.nextElementSibling.innerText = tempItem.cantidad
      } else if (target.classList.contains('decrease')) {
        const id = parseInt(target.dataset.id, 10)
        let tempItem = carrito.find(item => item.id === id)
        tempItem.cantidad--

        if (tempItem.cantidad > 0) {
          Storage.saveCart(carrito)
          this.setItemValues(carrito)
          target.previousElementSibling.innerText = tempItem.cantidad
        } else {
          this.removeItem(id)
          carritoCenter.removeChild(target.parentElement.parentElement)
        }
      }
    })
  }
  clearCarrito () {
    const cartItems = carrito.map(item => item.id)
    cartItems.forEach(id => this.removeItem(id))

    while (carritoCenter.children.length > 0) {
      carritoCenter.removeChild(carritoCenter.children[0])
    }
  }
  removeItem (id) {
    carrito = carrito.filter(item => item.id !== id)
    this.setItemValues(carrito)
    Storage.saveCart(carrito)
    let button = this.singleButton(id)
    let price = 0
    carrito.map(item => {
      price = item.price
    })
    
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      'event': 'remove_from_cart',
      currency : 'EUR',
      value : price,
    })
    if (button) {
      button.disabled = false
      button.innerText = 'add cart'
    }
  }
  singleButton (id) {
    return buttonDOM.find(button => parseInt(button.dataset.id) === id)
  }

}

class Storage {
  static saveProduct (obj) {
    localStorage.setItem('product', JSON.stringify(obj))
  }
  static saveCart (carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }
  static getProductos (id) {
    const producto = JSON.parse(localStorage.getItem('product'))
    return producto.find(product => product.id === parseFloat(id, 10))
  }
  static getCart () {
    return localStorage.getItem('carrito')
      ? JSON.parse(localStorage.getItem('carrito'))
      : []
  }
}

class Productos {
  async getProductos () {
    try {
      const result = await fetch('product.json')
      const data = await result.json()
      const productos = data.items 
      return productos
    } catch (err) {
      console.log(err)
    }
  }
}

let category = ''
let productos = []

function categoryValue () {
  const ui = new UI()

  category = document.getElementById('category').value
  if (category.length > 0) {
    const producto = productos.filter(regx => regx.category === category)
    ui.renderProductos(producto)
    ui.getButtons()
  } else {
    ui.renderProductos(productos)
    ui.getButtons()
  }
}

const query = new URLSearchParams(window.location.search)
let id = query.get('id')

document.addEventListener('DOMContentLoaded', async () => {
  const productosLista = new Productos()
  const ui = new UI()

  ui.setAPP()

  productos = await productosLista.getProductos()
  if (id) {
    ui.detalleProducto(id)
    Storage.saveProduct(productos)
    ui.getButtons()
    ui.cartLogic()
  } else {
    ui.renderProductos(productos)
    Storage.saveProduct(productos)
    ui.getButtons()
    ui.cartLogic()
  }
})



/*todo lo que no es el carrito*/

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
  if(!customerName.length || !customerEmail.length || !isValidEmail || !customerMessage || customerNumber.length < 9 || !Number(customerNumber)){
    if(!isValidEmail) {
      showFormError('email is not valid');
      console.log(customerEmail);
      console.log(isValidEmail);
    }else{
      showFormError('some information(s) is/are incorrect');
      console.log(isValidEmail);
    }
  }else{
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      'event': 'contact_form', 
      'click_type' : 'button_sent',
      'email' : customerEmail,
      'contact number' : customerNumber,
      'customer name' : customerName,
    });
    dataLayer.push({
      'event' : 'generate_lead',
    })
    location.href = 'https://mteresamilanes.github.io/ecommerceWatches.github.io/thankYouPageFormContact.html'
  }
})











