/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll('section');
const navbarList = document.querySelector('#navbar__list');
const header = document.querySelector('.page__header');
const main = document.querySelector('main');

let timeoutId;
let scrollPos = 0;

let createdBtn = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function hideNavMenu(){
    header.style.display = 'none'
}

function showNavMenu(){
    header.style.display = 'initial'
}

function createScrollToTopButon(){
    const div = document.createElement('div');
    div.innerHTML = `<span class="material-symbols-outlined">arrow_upward</span> <a href="#hero">Scroll to top</a>`
    div.classList.add('scroll__btn')
    main.appendChild(div);
    
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function createListElements(sections){
    let listElements = [];
    for (const section of sections) {
        const listElement = document.createElement('li');
        const anchorElement = document.createElement('a');

        anchorElement.textContent = section.getAttribute('data-nav');
        anchorElement.href = '#' + section.id
        anchorElement.classList.add('menu__link');

        listElement.appendChild(anchorElement);
        listElements.push(listElement)
    }
    return listElements;
}

function createNavigationMenu(navItems, hostElement){
    for(let i = 0; i < navItems.length; i++){
        hostElement.appendChild(navItems[i])
    }
}

// Add class 'active' to section when near top of viewport
function updateActiveSection(){
    for (const section of sections){
        const rect = section.getBoundingClientRect();
        if(rect.top >= 0 && rect.top <= 200 && rect.bottom >= 200){
            section.classList.add('focused')
        } else {
            section.classList.remove('focused')
        }
    }
}

// Scroll to anchor ID using scrollTO event
// function scrollToSection(e){
//     console.log(e.target);
//     // e.preventDefault();
//     if(e.target.nodeName === 'A'){
//         console.log('clicked A')
//     }
// }


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', () => {
    createNavigationMenu(createListElements(sections), navbarList);
})

// Scroll to section on link click
// no need to implement event listeners, we are using html scroll-behavior: smooth;
// navbarList.addEventListener('click', scrollToSection)

// Set sections as active
window.addEventListener('scroll', (e) => {
    if(timeoutId) clearTimeout(timeoutId);
    scrollPos = window.scrollY;

    updateActiveSection();
    showNavMenu();

    timeoutId = setTimeout( ()=>{
        hideNavMenu();
    }, 3000)

    if(scrollPos >= 2500 && !createdBtn) {
        createScrollToTopButon();
        createdBtn = true;
    };

})

//hide fixed navigation bar
// document.addEventListener('scroll', () => {
//     showNavMenu();
//     setTimeout(hideNavMenu, 3000)
        
// })

//show navigation menu if mouse is near.
window.addEventListener('mouseover', (e) => {
    if(e.y <= 110){ 
        showNavMenu();
    }
})