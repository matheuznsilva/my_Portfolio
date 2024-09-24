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

    // Marcar os pontos conforme a porcentagem
    const points = circle.querySelectorAll('.points');
    for (let i = 0; i < percent/*markedPoints*/; i++) {
        points[i].classList.add('marked');
    }
});
