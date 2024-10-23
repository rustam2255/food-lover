window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabContents = document.querySelectorAll('.tab_content'),
    tabParents = document.querySelector('.tabheader__items')

// Tabs
  function hideTabContents(){
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active')
    })
    tabContents.forEach(tabContent => {
      tabContent.style.display = 'none'
    })
  }
  function showTabContents(index){
    tabs[index].classList.add('tabheader__item_active')
    tabContents[index].style.display = 'flex'
    tabContents[index].classList.add('fade')
  }

  hideTabContents()
  showTabContents(2)

  tabParents.addEventListener('click', (event) => {
    const target = event.target
    if(target && target.classList.contains('tabheader__item')){
      tabs.forEach((tab, index) => {
        if(target == tab){
          hideTabContents()
          showTabContents(index)
        }
      })
    }
  })

 // Timer
	
 const deadline = '2024-11-14'

 function getTimeRemaining(endtime) {
   let days, hours, minutes, seconds
   const time = Date.parse(endtime) - Date.parse(new Date())

   if (time <= 0) {
     days = 0
     hours = 0
     minutes = 0
     seconds = 0
   } else {
     days = Math.floor(time / (1000 * 60 * 60 * 24)),
     hours = Math.floor((time / (1000 * 60 * 60)) % 24),
     minutes = Math.floor((time / (1000 * 60)) % 60),
     seconds = Math.floor((time / 1000) % 60)
   }

   return {
     totalTime: time,
     days,
     hours,
     minutes,
     seconds,
   }
 }

 function formatNumber(number) {
   if (number >= 0 && number < 10) {
     return `0${number}`
   } else {
     return number
   }
 }

 function setClock(selector, endtime) {
   const timer = document.querySelector(selector),
     days = timer.querySelector('#days'),
     hours = timer.querySelector('#hours'),
     minutes = timer.querySelector('#minutes'),
     seconds = timer.querySelector('#seconds'),
     timeInterval = setInterval(updateClock, 1000)

   updateClock()

   function updateClock() {
     const time = getTimeRemaining(endtime)

     days.textContent = formatNumber(time.days)
     hours.textContent = formatNumber(time.hours)
     minutes.textContent = formatNumber(time.minutes)
     seconds.textContent = formatNumber(time.seconds)

     if (time.totalTime <= 0) {
       clearInterval(timeInterval)
     }
   }
 }

 setClock('.timer', deadline)


 //Modal
 const modalOpenBtn = document.querySelectorAll('[data-modal] '),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-modal-close] ')
    function openModal() {
      modal.classList.add('show')
      modal.classList.remove('hide')
      document.body.style.overflow = 'hidden'
      modal.classList.add('modal_fade')
      clearInterval(modalTimerId)
    }
    function closeModal() {
      modal.classList.add('hide')
      modal.classList.remove('show')
      document.body.style.overflow = ''
    }
    modalOpenBtn.forEach(btn => {
      btn.addEventListener('click', openModal)
    })
    modalCloseBtn.addEventListener('click', closeModal)
    modal.addEventListener('click', (event) => {
      if(event.target === modal){
        closeModal()
      }
    })
    document.addEventListener('keydown', (event) => {
      if(event.code === 'Escape' && modal.classList.contains('show')){
        closeModal()
      }
    })
    const modalTimerId = setTimeout(openModal, 5000)

  //Class
  class OfferMenu {
    constructor(src, alt, title, descr, discount, sale, parentSelector){
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.discount = discount
      this.sale = sale
      this.parentSelector = document.querySelector(parentSelector)
      this.formatToUSD()
    }

    formatToUSD(){
      this.discount = this.discount.toLocaleString("en-US", {style:"currency", currency:"USD"})
      this.sale = this.sale.toLocaleString("en-US", {style:"currency", currency:"USD"})
    }
    render(){
      const element = document.createElement('div')
      element.innerHTML = 
      `
       <img src="${this.src}" alt="${this.alt}">
            <div>
              <h3>${this.title}</h3>
              <p>${this.descr}</p>
              <p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
            </div>
      `
      this.parentSelector.append(element)
    }
  }
  fetch('http://localhost:3000/offers', {
    method: 'GET',
    headers: {'Content-Type': 'apllication/json'}
  }).then(response => response.json())
    .then(data => {
      data.forEach(offer => {
        const {src, alt, descr, discount, sale, title} = offer
        new OfferMenu(src,alt,title,descr,discount,sale, '.offers-items').render()
      })
    })


  //Class 2
  class DayTimeMenu {
    constructor(src,alt,title,descr, parentSelector){
      this.src = src
      this.title = title
      this.alt = alt
      this.descr = descr
      this.parentSelector = document.querySelector(parentSelector)
    }
    render(){
      const element = document.createElement('div')
      element.innerHTML = 
      `
      <img src="${this.src}" alt="${this.alt}">
      <h3>${this.title}</h3>
      <p>${this.descr}</p>
      `
      this.parentSelector.append(element)
    }
  }
  const days = [
    {
      src: "./img/breckfastIcon.png",
      alt: "Breakfast",
      title: "Breakfast",
      descr: "8:00 am to 10:00 am"
    },
    {
      src: "./img/lunchIcon.png",
      alt: "Lunch",
      title: "Lunch",
      descr: "4:00 pm to 7:00 pm"
    },
    {
      src: "../img/dinnerIcon.png",
      alt: "Dinner",
      title: "Dinner",
      descr: "9:00 pm to 1:00 Am"
    },
    {
      src: "./img/dessertIcon.png",
      alt: "dessert",
      title: "Dessert",
      descr: "All day"
    }
  ]
  days.forEach(day => {
    const {src,alt,title,descr} = day
    new DayTimeMenu(src,alt,title,descr,'.daytime-items').render()
  })
  

  //Form
  const form  = document.querySelector('form'),
    tokenBot = '7421724087:AAFdQ1afTNP6FqtVX4SrIeVGi3tnfoMCruE',
    idBot = '1987316580'

    const message = {
      loading: 'Loading...',
      success: 'Thanks for contacting us',
      failure: 'something went wrong'
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const statusMessage = document.createElement('div')
      statusMessage.textContent = message.loading
      form.append(statusMessage)
      const formData = new FormData(form)
      const object = {}
      formData.forEach((value, key) => {
        object[key] = value
      })
      fetch(`https://api.telegram.org/bot${tokenBot}/sendmessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          chat_id: idBot,
          text: `Name: ${object.name}. Phone: ${object.phone}`
        })
      }).then(() => {
        statusMessage.textContent = message.success
        form.reset()
      })
        .catch(() => (statusMessage.textContent = message.failure))
        .finally(() => {
          setTimeout(() => {
            statusMessage.remove()
          },2000)
        })
      
    })
  //Slider
  const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current')
  
  
  let slideIndex = 1

  if(slides.length < 10){
    total.textContent = `0${slides.length}`
  }else{
    total.textContent = slides.length
  }
  function showSlides(index) {
    if(index > slides.length){
      slideIndex = 1
    }
    if(index <= 0){
      slideIndex = slides.length
    }
    slides.forEach(slide => slide.style.display = 'none')
    slides[slideIndex - 1].style.display = 'block'
    if(slides.length < 10){
      current.textContent = `0${slideIndex}`
    }else{
      current.textContent = slideIndex
    }
  }
  showSlides(slideIndex)
  function moveSlides(index) {
    showSlides(slideIndex += index)
  }
  prev.addEventListener('click', (e) => {
    moveSlides(-1)

    
  })
  next.addEventListener('click', () => {
    moveSlides(1)
  })
  

})