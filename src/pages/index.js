// Styles
import './index.scss';

const burgerMenu = document.querySelector('.burger-menu');
const headerNav = document.querySelector('.header__nav');

burgerMenu.addEventListener('click', (evt) => {
  burgerMenu.classList.toggle('burger-menu_opened');
  headerNav.classList.toggle('header__nav_opened');
});
