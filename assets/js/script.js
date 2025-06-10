/*obtener los enlaces */

const navLinks = document.querySelectorAll('nav ul li a')
navLinks.forEach((eachlink) => {
  eachlink.addEventListener('click', smoothScroll)
})

function smoothScroll(evt){
  evt.preventDefault()

  /*obtener el link, relacionado con cada seccion donde 
  se hizo el click*/

  const targetId = evt.target.getAttribute('href')
  const targetSection = document.querySelector(targetId)
/*al hacer click en cada link, getBoundingClientRect()
entrega la cantidad de px en que se encuentra el top de cada
sección de la parte superior */

  /* console.log(targetSection.getBoundingClientRect().top) */

  /*los valores de cada top de seccion se guardan redondeados en una variable*/
  const originalTop = Math.floor(targetSection.getBoundingClientRect().top - 200)

  /*se usa el metodo scrollBy, que toma un objeto con 3 propiedades */
  window.scrollBy({top: originalTop, left: 0, behavior: 'smooth'})
  /* console.log(originalTop) */

}

/*se agrega un eventListener a la carga de página, ya que todos los elementos
deben estar cargados para medir las alturas respectivas*/

window.addEventListener('load', () => {
  const posts = document.querySelectorAll('section')
  let postTops = []
  let pageTop
  let counter = 1
  let prevCounter = 1
  let doneResizing

  /* console.log(posts[0].getBoundingClientRect().top + window.scrollY) */ ;/*scrollY devuelve el numero de 
  px en que la ventana ha sido scrolled verticalmente*/

  /* console.log(postTops) */

  resetPagePosition()

  window.addEventListener('scroll', () =>{
    pageTop = window.scrollY + 250
   /*  console.log(pageTop + 250) */

    if(pageTop > postTops[counter]){
      counter++
      /* console.log(`down ${counter}`) */
    }
    else if(counter>1 && pageTop<postTops[counter-1]){
      counter--
      /* console.log(`up ${counter}`) */
    }
    if(counter!=prevCounter){
      navLinks.forEach((each) =>{
        each.removeAttribute('class')
      })

      /*asignar la selección al link clickeado */
        const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`)
        thisLink.className = "selected"
      prevCounter = counter
    }
  })

  /*método para cuando se redimensione la ventana,
  solo se captura cuando se haya terminado de redimensionar */
  window.addEventListener('resize', () =>{
    clearTimeout(doneResizing)
    doneResizing = setTimeout(() => {
      resetPagePosition()
    }, 500)
  })

  function resetPagePosition(){
    postTops = []

    posts.forEach((post) => {
      postTops.push(Math.floor(post.getBoundingClientRect().top + window.scrollY))
    })
    const pagePosition = window.scrollY +250;
    counter = 0

    postTops.forEach((post) => {
      if(pagePosition>post){
        counter++
      }
    })
    navLinks.forEach((each) =>{
      each.removeAttribute('class')
    })
     const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`)
      thisLink.className = "selected"
  }
})