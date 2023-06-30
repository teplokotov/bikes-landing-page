// Images
import HighwayLabel from '../images/highway-label.svg';
import GravelLabel from '../images/gravel-label.svg';
import TTLabel from '../images/TT-label.svg';

const SVGLabels = {
  'Highway': HighwayLabel,
  'Gravel': GravelLabel,
  'TT': TTLabel
}

// Swiper JS
import Swiper, { Pagination } from 'swiper';

// Styles
import './index.scss';

const coveringsData = {
  'Highway': {
    'title': 'Шоссе',
    'description': 'На шоссейном велосипеде можно ездить по асфальту на разных градиентах: будь то горы или равнины. Гонки проходят в командном пелотоне, но тренироваться можно и самостоятельно.',
  },
  'Gravel': {
    'title': 'Грэвел',
    'description': 'Грэвел похож на шоссейный велосипед, но конструкция рамы немного отличается, и на нём стоят более широкие покрышки, всё для того чтобы проехать по лёгкому бездорожью.',
  },
  'TT': {
    'title': 'ТТ',
    'description': 'ТТ — это велосипед для триатлона или раздельного старта, гооняют на таком велике только по равнинному асфальту, велик очень быстрые и аэродинамичный.',
  },
}

const body = document.querySelector('.body');
const welcomeButton = document.querySelector('.welcome__button');

// For E-mail form
const footerForm = document.querySelector('.footer__form');
const emailInput = footerForm.querySelector('.form__input');
const submitBtn = footerForm.querySelector('.form__btn');

// For Burger-menu
const burgerMenu = document.querySelector('.burger-menu');
const headerNav = document.querySelector('.header__nav');
const headerLinks = document.querySelectorAll('.header__link');

// For Theme-switcher
const switchers = document.querySelectorAll('.switcher__checkbox');

// For Coverings section
const coveringsHeading = document.querySelector('.coverings__heading');
const coveringsDescription = document.querySelector('.coverings__description');
const slidesContainer = document.querySelector('.coverings__slides-container');
const coveringsLabel = document.querySelector('.coverings__label');
const slides = document.querySelectorAll('.coverings__slide');
const btnPrev = document.querySelector('.control-btns__prev');
const btnNext = document.querySelector('.control-btns__next');

// For Bikes section
const tabs = document.querySelectorAll('.bikes__tabs li a');
const tabPages = document.querySelectorAll('.bikes__groups');
const bikesSelect = document.querySelector('.bikes__select');
tabPages[0].style.display = 'block';

burgerMenu.addEventListener('click', () => switchMenu());

headerLinks.forEach((headerLink) => {
  headerLink.addEventListener('click', () => switchMenu());
});

function switchMenu() {
  burgerMenu.classList.toggle('burger-menu_opened');
  headerNav.classList.toggle('header__nav_opened');
  body.classList.toggle('body_locked');
}

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

submitBtn.style.color = '#ffffff00';
emailInput.addEventListener('click', () => submitBtn.removeAttribute('style'));

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

const swiperCoverings = new Swiper('.coverings__slider', {
  slidesPerView: 1,
  spaceBetween: 18,
  loop: 'true',
  on: {
    init: () => increaseNumOFSlides(),
    slideNextTransitionEnd: () => drawDescription(),
    slidePrevTransitionEnd: () => drawDescription(),
  },
  breakpoints: {
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 40
    },
  },
});

btnNext.addEventListener('click', () => swiperCoverings.slideNext());
btnPrev.addEventListener('click', () => swiperCoverings.slidePrev());

function drawDescription() {
  const activeSlide = document.querySelector('.swiper-slide-active');
  const id = activeSlide.dataset['id'];
  // Title and description
  coveringsHeading.textContent = coveringsData[id]['title'];
  coveringsDescription.textContent = coveringsData[id]['description'];
  // Label
  coveringsLabel.src = SVGLabels[id];
}

// Fix for Swiper's loop: https://swiperjs.com/swiper-api#param-loop
function increaseNumOFSlides() {
  slides.forEach((slide) => slidesContainer.append(slide.cloneNode(true)));
}

function addSwiperSelector() {
  tabPages.forEach((tabPage) => {
    tabPage.classList.add('swiper');
    const tabGroup = tabPage.querySelector('.bikes__group');
    tabGroup.classList.add('swiper-wrapper');
    const tabSlides = tabGroup.querySelectorAll('.bikes__model');
    tabSlides.forEach((tabSlide) => {
      tabSlide.classList.add('swiper-slide');
      tabSlide.style.marginRight = '30px';
    });
  });
}

function removeSwiperSelector() {
  tabPages.forEach((tabPage) => {
    tabPage.classList.remove('swiper');
    const tabGroup = tabPage.querySelector('.bikes__group');
    tabGroup.classList.remove('swiper-wrapper');
    const tabSlides = tabGroup.querySelectorAll('.bikes__model');
    tabSlides.forEach((tabSlide) => {
      tabSlide.classList.remove('swiper-slide');
      tabSlide.style.marginRight = '0';
    });
  });
}

const swiperBikes = new Swiper('#tabHighway', {
  modules: [Pagination],
  slidesPerView: 'auto',
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
});
const swiperGravel = new Swiper('#tabGravel', {
  modules: [Pagination],
  slidesPerView: 'auto',
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
});
const swiperTT = new Swiper('#tabTT', {
  modules: [Pagination],
  slidesPerView: 'auto',
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
});

window.addEventListener("resize", updateSize);

function updateSize() {
  if(window.innerWidth < 1024) {
    addSwiperSelector();
    swiperBikes.enable();
    swiperGravel.enable();
    swiperTT.enable();
  } else {
    swiperBikes.disable();
    swiperGravel.disable();
    swiperTT.disable();
    removeSwiperSelector();
  }
}
updateSize();

welcomeButton.addEventListener('click', () => {
  location.href = "#wisdom";
});
