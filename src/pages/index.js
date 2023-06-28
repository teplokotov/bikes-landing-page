// Styles
import './index.scss';

const body = document.querySelector('.body');

// For E-mail form
const footerForm = document.querySelector('.footer__form');
const emailInput = footerForm.querySelector('.form__input');
const submitBtn = footerForm.querySelector('.form__btn');

// For Burger-menu
const burgerMenu = document.querySelector('.burger-menu');
const headerNav = document.querySelector('.header__nav');

// For Theme-switcher
const switchers = document.querySelectorAll('.switcher__checkbox');

burgerMenu.addEventListener('click', (evt) => {
  burgerMenu.classList.toggle('burger-menu_opened');
  headerNav.classList.toggle('header__nav_opened');
  body.classList.toggle('body_locked');
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

footerForm.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(evt) {
  evt.preventDefault();
  if(emailInput.value) {
    submitBtn.style.color = '#ffffff00';
    emailInput.value = 'Круто!';
    emailInput.disabled = true;
  }
}
