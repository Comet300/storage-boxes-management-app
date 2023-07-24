const hamMenu = document.querySelector('.ham-menu');
var navSlide = document.querySelector('.container .nav-class');
let currentPage = "#evidenta";

hamMenu.addEventListener('click', () => {
  if (navSlide.style.transform === 'translateY(100%) translateX(0px)') {
    return navSlide.style.transform = 'translateY(100%) translateX(100%)'
  }
  navSlide.style.transform = 'translateY(100%) translateX(0)'
})

document.querySelectorAll("li a").forEach(item => {

  item.addEventListener("click", (e) => {
    let clickedItem = document.querySelector(`#${e.target.textContent.toLowerCase()}`)
    if (clickedItem) {

      if (`#${e.target.textContent.toLowerCase()}` == currentPage) {
        return navSlide.style.transform = 'translateY(100%) translateX(100%)';
      }

      document.querySelector(`#${e.target.textContent.toLowerCase()}`).classList.remove("hidden");
      document.querySelector(currentPage).classList.add("hidden");
      currentPage = `#${e.target.textContent.toLowerCase()}`;


      if (navSlide.style.transform === 'translateY(100%) translateX(0px)') {
        navSlide.style.transform = 'translateY(100%) translateX(100%)'
      }

      document.querySelectorAll("li a").forEach(obj => {
        obj.classList.remove("active-link");
      })
      e.target.classList.add("active-link");
    }

  });
});


///-----------------------

document.querySelectorAll("td .dot").forEach(item => {
  if (item.parentElement.textContent.trim().toLocaleLowerCase() == "da") {
    item.style.background = "#4DDB9C";
  } else {
    item.style.background = "#CC6664";
  }
});




//---------------

const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
  accordionItemHeader.addEventListener("click", event => {

    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

    // const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    // if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
    //   currentlyActiveAccordionItemHeader.classList.toggle("active");
    //   currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    // }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = 135 * 2 + "px";
      if (window.innerWidth <= 450)
        accordionItemBody.style.maxHeight = 120 + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }

  });
});

window.onload=function(){ setTimeout(function(){ 		window.scrollTo(0, 1); 	}, 0); }