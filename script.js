'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Creating and Inserting elements
// .insertAdjacentHTML

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent='We include cookie for Improved Functionality';
message.innerHTML =
  'We include cookie for Improved Functionality.<button class="btn btn--close-cookie">Got it</button>';

header.prepend(message);
// DELETE ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// STYLES
// message.style.backgroundColor='#37383D';
// message.style.width='120%';

// message.style.height=Number.parseFloat(getComputedStyle(message).height)+40+'px';

// document.documentElement.style.setProperty('--color-primary','orangered');

// // ATTRIBUTES

// const logo=document.querySelector('.nav--logo');
// console.log(logo.alt);
// console.log(logo.src);
// logo.alt='Beautiful logo'

// logo.setAttribute('Company','Bankist');

// // data Attributes

// // Classes

// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// window.scrollTo({left:s1coords.left+window.pageXOffset,
//                  top:s1coords.top+window.pageYOffset,
//                   behavior:"smooth"});

// Modern Browers way

// EVENT PROPAGATION

// rgb(255,255,255);

// const randomIN=(min,max)=>
//   Math.floor(Math.random() * (max-min+1)+min);
// const randomColor=()=>
//   `rbg(${randomIN(0,255)},${randomIN(0,255)},${randomIN(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor=randomColor();

// });
// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor=randomColor();

// });
// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor=randomColor();

// });

// PAGE NAVIGATION

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
});

// const alert1=function(e){
//   alert('You hovered over header');
//   h1.removeEventListener('mouseenter',alert1);
// };

const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter',alert1);

// document.querySelectorAll('.nav__link').forEach(function(el){

//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id=this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:"smooth"});
//   });
// });

// EVENT DELEGATION IN SCROLLNG

// 1.add addEventListener to common parent Element
// 2. determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// GOing downwards child

// console.log(h1.querySelectorAll('.highlight'))
h1.firstElementChild.style.color = 'white';

// Going upwards
// console.log(h1.parentElement);
// h1.closest('.header').style.background='var(--gradient-primary)';
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// TABBBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  // ACTIVATE CONTENT AREA
  // console.log()
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('.operations__content--active');
});

// Menu fade Animation
// target is the event that has happened like click on an element and bubbling up to other parent elements like nav where we handle it
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});
nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('.nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el != link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

// The Intersections Observers API
// const obscallback=function(entries,Observer){
//   entries.forEach(entry=>{
//     console.log(entry);
//   })
// }
// const obsoptions={
//   root:null,
//   threshold:[0,0.2],
// };
// const Observer= new IntersectionObserver(obscallback,obsoptions);
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [Entry] = entries;
  // console.log(Entry);
  if (!Entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
// const header=document.querySelector('.header');
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

// laxy loading Images

const imgTarget = document.querySelectorAll('img[data-src]');
// console.log(imgTarget);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

// SLIDERS

const slides = document.querySelectorAll('.slide');
const btnleft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');

const slider = document.querySelector('.slider');
let curSlide = 0;
const maxSlide = slides.length;

slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
});
// 0% 100% 200% 300%
const gotoSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
  activateDots(curSlide);

  // 0% 100% 200% 300%
};
console.log('Welcome to Application');
const prevslide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
  activateDots(curSlide);
};
// INItializaton function
const init = function () {
  gotoSlide(0);
  createDots();
  activateDots(0);
};
init();

btnright.addEventListener('click', nextSlide);
btnleft.addEventListener('click', prevslide);

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowLeft' && prevslide();
  e.key === 'ArrowRight' && nextSlide();
});

// DOTS
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentElement(
      'beforeend',
      `
  <button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelectorAll(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
};

// EVENT DELEGATONS
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
  }
});
