// Styles
import './index.scss';

const body = document.querySelector('.body');

// For Burger-menu
const burgerMenu = document.querySelector('.burger-menu');
const headerNav = document.querySelector('.header__nav');

// For Theme-switcher
const switchers = document.querySelectorAll('.switcher__checkbox');

burgerMenu.addEventListener('click', (evt) => {
  burgerMenu.classList.toggle('burger-menu_opened');
  headerNav.classList.toggle('header__nav_opened');
});

switchers.forEach((switcher) => {
  switcher.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      body.classList.toggle('body_theme_light');
      body.classList.toggle('body_theme_dark');
      switchers[0].checked = true;
      switchers[1].checked = true;
    } else {
      body.classList.toggle('body_theme_light');
      body.classList.toggle('body_theme_dark');
      switchers[0].checked = false;
      switchers[1].checked = false;
    }
  });
});
