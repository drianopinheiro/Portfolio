const music = new Audio('on.mp3');

function playInterfaceSound() {
    music.play().catch(() => {});
}

const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
        playInterfaceSound();
    })
}


if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
        playInterfaceSound();
    })
}


const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(event) {
    const activeHeader = event.currentTarget;
    const activeContent = activeHeader.parentNode;
    const shouldOpen = activeContent.classList.contains('skills__close');

    for (const content of skillsContent) {
        content.classList.remove('skills__open');
        content.classList.add('skills__close');
    }
    skillsHeader.forEach(header => header.setAttribute('aria-expanded', 'false'));

    if (shouldOpen) {
        activeContent.classList.remove('skills__close');
        activeContent.classList.add('skills__open');
        activeHeader.setAttribute('aria-expanded', 'true');
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
    el.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleSkills(event);
        }
    })
})

const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        if (!target) return;

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
            tab.setAttribute('aria-selected', 'false')
        })
        tab.classList.add('qualification__active')
        tab.setAttribute('aria-selected', 'true')
        playInterfaceSound();
    })
})

const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function (modalCkick) {
    modalViews[modalCkick].classList.add('active-modal')
    playInterfaceSound();
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })

    })
})


const portfolioContainer = document.querySelector('.portfolio__container');
if (portfolioContainer) {
    new Swiper(portfolioContainer, {
        loop: true,
        grabCursor: true,
        spaceBetween: 24,
        navigation: {
            nextEl: portfolioContainer.querySelector('.swiper-button-next'),
            prevEl: portfolioContainer.querySelector('.swiper-button-prev'),
        },
        pagination: {
            el: portfolioContainer.querySelector('.swiper-pagination'),
            clickable: true,
        },
        keyboard: {
            enabled: true,
        },
    });
}

const skillsCarousel = document.querySelector('.skills__carousel');
if (skillsCarousel) {
    new Swiper(skillsCarousel, {
        slidesPerView: 1.1,
        spaceBetween: 12,
        grabCursor: true,
        navigation: {
            nextEl: skillsCarousel.querySelector('.skills__swiper-button--next'),
            prevEl: skillsCarousel.querySelector('.skills__swiper-button--prev'),
        },
        pagination: {
            el: skillsCarousel.querySelector('.skills__pagination'),
            clickable: true,
        },
        keyboard: {
            enabled: true,
        },
        breakpoints: {
            420: { slidesPerView: 2, spaceBetween: 12 },
            700: { slidesPerView: 3, spaceBetween: 16 },
            1000: { slidesPerView: 4, spaceBetween: 16 },
        },
    });
}


const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrolly = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')
        const sectionLink = document.querySelector(`.nav__menu a[href="#${sectionId}"]`)

        if (!sectionLink) return;

        if (scrolly > sectionTop && scrolly <= sectionTop + sectionHeight) {
            sectionLink.classList.add('active-link')

        }
        else {
            sectionLink.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

function scrollHeader() {
    const nav = document.getElementById('header')

    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

function scrollUp() {
    const scrollup = document.getElementById('scroll-up');
    if (!scrollup) return;

    if (this.scrollY >= 560) scrollup.classList.add('show-scroll'); else scrollup.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);

const themeButton = document.getElementById('theme-button')
const sunTheme = 'sun-theme'
if (themeButton) {
    try {
        document.body.classList.toggle(sunTheme, localStorage.getItem('selected-theme') === sunTheme)
    } catch (error) {
        // A indisponibilidade do armazenamento nao deve impedir a interface de funcionar.
    }
    themeButton.setAttribute('aria-label', document.body.classList.contains(sunTheme) ? 'Ativar tema escuro' : 'Ativar tema claro')

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(sunTheme)
        const selectedTheme = document.body.classList.contains(sunTheme) ? sunTheme : 'dark-theme'
        themeButton.setAttribute('aria-label', selectedTheme === sunTheme ? 'Ativar tema escuro' : 'Ativar tema claro')

        try {
            localStorage.setItem('selected-theme', selectedTheme)
        } catch (error) {
            // O tema continua alternando mesmo sem persistencia.
        }

        playInterfaceSound();
    })
}

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".ai-track");

  if (!track) return;

  // Duplica os cards para criar o movimento infinito
  const cards = Array.from(track.children);

  cards.forEach(card => {
    const clone = card.cloneNode(true);

    clone.setAttribute("aria-hidden", "true");

    track.appendChild(clone);
  });

  // Pausa e retoma a animação
  const carousel = document.querySelector(".ai-carousel");

  carousel.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });

  carousel.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
});





