console.log('main.js loaded');

const mainMenueTrigger = document.querySelector('[data-js-main-menue-trigger]');
mainMenueTrigger.addEventListener('click', handleMenueClick);

function handleMenueClick() {
    console.log('handleMenueClick');
    const mainMenue = document.querySelector('.main-menu');
    mainMenue.classList.toggle('is-active');
    mainMenueTrigger.classList.toggle('is-active');
}