let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute;

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id +']').classList.add("active")
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


// --------- Technical skills transition


document.addEventListener("DOMContentLoaded", function() {
    const bars = document.querySelectorAll('.skill-bar .bar span');
    // Usar um timeout para garantir que a transição ocorra
    bars.forEach(bar => {
        const finalWidth = bar.style.width; // Captura a largura final
        bar.style.width = '0%'; // Reseta a largura
        setTimeout(() => {
            bar.style.width = finalWidth; // Define a largura final após um curto atraso
        }, 10); // Delay para garantir a transição
    });
});


// --------- circle skills  transition

document.querySelectorAll('.circle').forEach(circle => {
    const dots = circle.getAttribute('data-dots');
    const percent = circle.getAttribute('data-percent');
    const angle = (360 / dots) * (percent / 100);

    for (let i = 0; i < dots; i++) {
        const point = document.createElement('div');
        point.classList.add('points');
        point.style.setProperty('--i', i);
        point.style.setProperty('--rot', `${angle}deg`);
        circle.appendChild(point);
    }

    // Marca os pontos conforme a porcentagem
    const points = circle.querySelectorAll('.points');
    for (let i = 0; i < percent/*markedPoints*/; i++) {
        points[i].classList.add('marked');
    }
});

// ------------- Back to top -------------

window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = 'block'; // Mostra o botão
    } else {
        backToTopButton.style.display = 'none'; // Esconde o botão
    }
});


document.getElementById('backToTop').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ------------- Slider -------------

document.addEventListener('DOMContentLoaded', function () {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.swiper-slide');
    let currentSlide = 0;

    // Function to hide all slides
    function hideAllSlides() {
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
    }

    // Function to show the current slide
    function showSlide(index) {
        hideAllSlides();
        slides[index].style.display = 'block';
    }

    // Show the first slide initially
    showSlide(currentSlide);

    // Event listener for previous button
    prevBtn.addEventListener('click', function () {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
    });

    // Event listener for next button
    nextBtn.addEventListener('click', function () {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    });
});
