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

// For Bikes section
const tabs = document.querySelectorAll('.bikes__tabs li a');
const tabPages = document.querySelectorAll('.bikes__groups');
const bikesSelect = document.querySelector('.bikes__select');
tabPages[0].style.display = 'block';

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

tabs.forEach((tab) => {
  tab.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('bikes__tab_selected')) {
      tabs.forEach((item) => item.classList.remove('bikes__tab_selected'));
      evt.target.classList.add('bikes__tab_selected');
      bikesSelect.value = evt.target.dataset['id'];
    }
    tabPages.forEach((item) => {
      item.style.display = item.id === evt.target.dataset['id'] ? 'block' : 'none';
    });
  });
});

bikesSelect.addEventListener('change', handleBikesSelect);

function handleBikesSelect(evt) {
  tabs.forEach((item) => {
    if (item.dataset['id'] === evt.target.value) {
      item.classList.add('bikes__tab_selected');
    } else {
      item.classList.remove('bikes__tab_selected');
    }
  });
  tabPages.forEach((item) => {
    item.style.display = item.id === evt.target.value ? 'block' : 'none';
  });
}
