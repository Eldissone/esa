function openMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');

    if (mobileMenu) mobileMenu.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');

    if (mobileMenu) mobileMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const modals = document.querySelectorAll('.modal');
    if (modals.length > 0) {
        modals.forEach(modal => {
            modal.addEventListener('click', function (e) {
                if (e.target === this) {
                    closeModal();
                }
            });
        });
    } else {
        console.warn('Nenhum modal encontrado no DOM');
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    const mobileLinks = document.querySelectorAll('.mobile-menu a[href^="#"]');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM carregado, inicializando animações...'); // Debug

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const animatedItems = document.querySelectorAll('.grid-animated');
        console.log(`Encontrados ${animatedItems.length} itens para animar`); // Debug

        if (animatedItems.length > 0) {
            gsap.utils.toArray('.grid-animated').forEach((item, i) => {
                gsap.fromTo(item, {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }
    } else {
        console.warn('GSAP ou ScrollTrigger não estão disponíveis');
    }

    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            if (targetId.startsWith('#')) {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    console.warn(`Elemento ${targetId} não encontrado para scroll`);
                }
            }
        });
    });

});


const btnVer = document.querySelectorAll("#btn-ver");
const slideDiv = document.querySelector(".swiper-slide div");
const slideText = document.querySelector(".swiper-slide p");


btnVer.forEach(ver => {
    ver.addEventListener('click', function (e) {
        slideDiv.classList.toggle('active');
        slideText.classList.toggle('active');
    });
});

