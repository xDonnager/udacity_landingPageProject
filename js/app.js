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

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


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
        // console.log(section)
        // console.log('top',rect.top)
        // console.log('bot',rect.bottom)
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
document.addEventListener('scroll', updateActiveSection)
