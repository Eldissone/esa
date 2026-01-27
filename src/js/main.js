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

const btnVer = document.querySelectorAll(".btn-ver");

// Adiciona evento de clique em cada botão
btnVer.forEach(ver => {
    ver.addEventListener('click', function (e) {
        // Previne que o clique se propague para o documento
        e.stopPropagation();
        
        // Encontra o slide específico deste botão
        const slideDiv = this.closest('.swiper-slide').querySelector('div');
        const slideText = this.closest('.swiper-slide').querySelector('p');
        
        // Fecha todos os outros slides abertos
        btnVer.forEach(otherBtn => {
            if (otherBtn !== this) {
                const otherSlideDiv = otherBtn.closest('.swiper-slide').querySelector('div');
                const otherSlideText = otherBtn.closest('.swiper-slide').querySelector('p');
                const otherSpan = otherBtn.closest('.swiper-slide').querySelector('span');
                
                otherSlideDiv.classList.remove('active');
                otherSlideText.classList.remove('active');
                if (otherSpan) otherSpan.classList.remove('active');
                otherBtn.textContent = 'ver mais';
            }
        });
        
        // Alterna o estado do slide atual
        slideDiv.classList.toggle('active');
        slideText.classList.toggle('active');
        
        // Opcional: adiciona classe ao span se necessário
        const slideSpan = this.closest('.swiper-slide').querySelector('span');
        if (slideSpan) slideSpan.classList.toggle('active');
        
        // Muda o texto do botão
        if (slideText.classList.contains('active')) {
            this.textContent = 'ver menos';
        } else {
            this.textContent = 'ver mais';
        }
    });
});

// Fecha todos os slides ao clicar em qualquer lugar da página
document.addEventListener('click', function(e) {
    // Verifica se o clique NÃO foi em um botão "ver mais" nem dentro de um slide ativo
    if (!e.target.closest('.btn-ver') && !e.target.closest('.swiper-slide div.active')) {
        btnVer.forEach(btn => {
            const slideDiv = btn.closest('.swiper-slide').querySelector('div');
            const slideText = btn.closest('.swiper-slide').querySelector('p');
            const slideSpan = btn.closest('.swiper-slide').querySelector('span');
            
            slideDiv.classList.remove('active');
            slideText.classList.remove('active');
            if (slideSpan) slideSpan.classList.remove('active');
            btn.textContent = 'ver mais';
        });
    }
});