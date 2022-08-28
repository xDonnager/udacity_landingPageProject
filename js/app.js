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
const browserSupport = {
    events: !!window.addEventListener,
    selectors: !!document.querySelectorAll
};
const appSelectors = {
    sections : document.querySelectorAll('section'),
    navbarList : document.querySelector('#navbar__list'),
    header : document.querySelector('.page__header'),
    main : document.querySelector('main'),
}

/**
 * Scrolling aux vars
 */
let timeoutId;
let scrollPos = 0;

let createdBtn = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
const hideNavMenu = () => {
    appSelectors.header.style.display = 'none'
}

const showNavMenu = () => {
    appSelectors.header.style.display = 'initial'
}

function createScrollToTopButon() {
    const div = document.createElement('div');
    div.innerHTML = `<span class="material-symbols-outlined">arrow_upward</span>`
    div.classList.add('scroll__btn');

    // sync with hero section
    div.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('hero').scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        })
    })

    appSelectors.main.appendChild(div);
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function createListElements(sections) {
    const fragment = document.createDocumentFragment();

    for (const section of sections) {
        const listElement = document.createElement('li');
        const anchorElement = document.createElement('a');

        anchorElement.textContent = section.getAttribute('data-nav');
        anchorElement.href = '#' + section.id
        anchorElement.classList.add('menu__link');

        listElement.appendChild(anchorElement);
        fragment.appendChild(listElement);
    }
    return fragment;
}

function createNavigationMenu(navItemsFragment, hostElement) {
    hostElement.appendChild(navItemsFragment);
}

// Add class 'active' to section when near top of viewport
function updateActiveSection(sections) {
    for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top >= -30 && rect.top <= 200 && rect.bottom >= 200) {
            section.classList.add('focused')
        } else {
            section.classList.remove('focused')
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(e) {
    e.preventDefault();
    const clickedSection = e.target.hash.replace('#', '')
    const targetSection = document.getElementById(clickedSection);
    targetSection.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    })
}


/**
 * End Main Functions
 * Begin Events
 * 
 */

if (browserSupport.events && browserSupport.selectors){
    // Build menu and add click event listener
    document.addEventListener('DOMContentLoaded', () => {
        createNavigationMenu(createListElements(appSelectors.sections), appSelectors.navbarList);

        //how to call callback function and pass params as well as event?
        appSelectors.navbarList.addEventListener('click', scrollToSection)
    });

    // Set sections as active
    window.addEventListener('scroll', (e) => {
        if (timeoutId) clearTimeout(timeoutId);
        scrollPos = window.scrollY;

        updateActiveSection(appSelectors.sections);
        showNavMenu();

        //hide fixed navigation bar
        timeoutId = setTimeout(() => {
            hideNavMenu();
        }, 3000)

        //create scrollup button
        if (scrollPos >= 1000 && !createdBtn) {
            createScrollToTopButon();
            createdBtn = true;
        };

    })

    //show navigation menu if mouse is near.
    window.addEventListener('mouseover', (e) => {
        if (e.y <= 110) {
            showNavMenu();
        }
    })

} else {
    alert('Seems that you are using some kind of old browser, some features may not be available')
}

