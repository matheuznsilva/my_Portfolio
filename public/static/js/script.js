// --- Definições Globais (para dados estáticos como projetos, acessíveis por todo o script) ---
const projects = [
    {
        number: '01',
        type: 'Website Radio Cidade',
        description: 'O site da Rádio Cidade Web foi desenvolvido utilizando HTML, CSS e JavaScript para atender a uma necessidade de projeto rápido, objetivo e com poucos recursos, conforme solicitado pelo cliente. A escolha dessas tecnologias visou a rapidez na implementação e a simplicidade da estrutura, garantindo uma presença online funcional e eficiente para a rádio em um curto espaço de tempo',
        technologies: 'Html, CSS, Javascript',
        image: '/static/images/work/SiteCidadeWeb.png', // Caminho relativo ajustado para o Flask
        githubLink: 'https://github.com/matheuznsilva/Website-Radio-Cidade',
        liveLink: 'https://radiocidadeweb.com.br'
    },
    {
        number: '02',
        type: 'Web system Brasileirão',
        description: 'The objective of this work is to develop a statistical system for the Brazilian football championship for an important Brazilian media company (fictional).',
        technologies: 'Html 5, Css 3, Javascript, Flask, SQL',
        image: '/static/images/work/thumb2.png', // Caminho relativo ajustado para o Flask
        githubLink: 'https://github.com/matheuznsilva/BrasileiraoWebSystem',
        liveLink: '#'
    },
    {
        number: '03',
        type: 'Frontend Project',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.',
        technologies: 'Next.js, Tailwind CSS',
        image: '/static/images/work/thumb3.png', // Caminho relativo ajustado para o Flask
        githubLink: 'https://github.com/matheuznsilva',
        liveLink: '#'
    }
];

let currentProjectIndex = 0; // Estado para controlar o projeto atual do carrossel

// --- Principal Função de Inicialização do DOM ---
document.addEventListener("DOMContentLoaded", () => {

    // --- Seletores de Elementos ---
    // Navegação e Animações Gerais
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const backToTopButton = document.getElementById('backToTop');

    // Carrossel de Projetos
    const projectNumberElement = document.getElementById('projectNumber');
    const projectTitleElement = document.getElementById('projectTitle');
    const projectDescriptionElement = document.getElementById('projectDescription');
    const projectTechnologiesElement = document.getElementById('projectTechnologies');
    const projectImageElement = document.getElementById('projectImage');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const carouselContent = document.querySelector('.carousel-content');
    const githubLinkButton = document.querySelector('.link-button.github-link');
    const liveLinkButton = document.querySelector('.link-button.live-link');

    // Formulário de Contato
    const contactForm = document.getElementById('contact-form');


    // --- Funções Auxiliares ---

    /**
     * Alterna a classe 'active' para o ícone do menu e a barra de navegação.
     */
    const toggleMenu = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    /**
     * Adiciona ou remove a classe 'active' nos links de navegação com base na posição de rolagem.
     * Também gerencia a visibilidade do botão 'Voltar ao Topo'.
     */
    const handleScrollActiveNavLinks = () => {
        const currentScrollY = window.scrollY;

        sections.forEach(sec => {
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (currentScrollY >= offset && currentScrollY < offset + height) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeNavLink = document.querySelector(`header nav a[href*=${id}]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }
            }
        });

        // Mostra/esconde o botão "Voltar ao Topo"
        if (currentScrollY > 100) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    };

    /**
     * Anima a largura das barras de habilidade (Technical Skills).
     */
    const animateSkillBars = () => {
        const bars = document.querySelectorAll('.skill-bar .bar span');
        bars.forEach(bar => {
            const finalWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = finalWidth;
            }, 500); // Pequeno atraso para garantir a transição
        });
    };

    /**
     * Inicializa os pontos para as habilidades circulares (Professional Skills).
     */
    const initializeCircleSkills = () => {
        document.querySelectorAll('.circle').forEach(circle => {
            const dots = parseInt(circle.getAttribute('data-dots'));
            const percent = parseInt(circle.getAttribute('data-percent'));
            const angle = (360 / dots) * (percent / 100);

            for (let i = 0; i < dots; i++) {
                const point = document.createElement('div');
                point.classList.add('points');
                point.style.setProperty('--i', i);
                point.style.setProperty('--rot', `${angle}deg`);
                circle.appendChild(point);
            }

            const points = circle.querySelectorAll('.points');
            for (let i = 0; i < percent; i++) {
                points[i].classList.add('marked');
            }
        });
    };

    /**
     * Lida com o clique no botão "Voltar ao Topo".
     * @param {Event} e - O evento de clique.
     */
    const handleBackToTopClick = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    /**
     * Atualiza o conteúdo do carrossel com base no projeto atual.
     */
    const updateCarouselContent = () => {
        const project = projects[currentProjectIndex];

        carouselContent.style.opacity = '0'; // Inicia fade-out

        setTimeout(() => {
            projectNumberElement.textContent = project.number;
            projectTitleElement.textContent = project.type;
            projectDescriptionElement.textContent = project.description;
            projectTechnologiesElement.textContent = project.technologies;
            projectImageElement.src = project.image;
            projectImageElement.alt = `Imagem do ${project.type}`;

            if (githubLinkButton) {
                githubLinkButton.href = project.githubLink || '#';
            }
            if (liveLinkButton) {
                liveLinkButton.href = project.liveLink || '#';
                liveLinkButton.style.display = (project.liveLink && project.liveLink !== '#') ? 'flex' : 'none';
            }

            carouselContent.style.opacity = '1'; // Inicia fade-in
        }, 300); // Tempo para o fade-out
    };

    /**
     * Avança para o próximo slide do carrossel.
     */
    const nextSlide = () => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        updateCarouselContent();
    };

    /**
     * Retrocede para o slide anterior do carrossel.
     */
    const prevSlide = () => {
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        updateCarouselContent();
    };

    /**
     * Lida com o envio do formulário de contato.
     * @param {Event} e - O evento de envio.
     */
    const handleContactFormSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            phone: document.getElementById('phone').value
        };

        try {
            const response = await fetch('/send-email', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                contactForm.reset();
            } else {
                alert(`Erro: ${result.error || 'Ocorreu um erro desconhecido.'}`);
            }
        } catch (error) {
            console.error('Ocorreu um erro ao enviar o formulário: ', error);
            alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
        }
    };


    // --- Adição de Listeners de Eventos e Inicialização ---
    // Navegação e Animações Gerais
    if (menuIcon) menuIcon.addEventListener('click', toggleMenu);
    if (backToTopButton) backToTopButton.addEventListener('click', handleBackToTopClick);
    window.addEventListener('scroll', handleScrollActiveNavLinks);

    // Inicializa animações ao carregar
    animateSkillBars();
    initializeCircleSkills();
    handleScrollActiveNavLinks(); // Para o estado inicial da navbar e botão

    // Carrossel de Projetos
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }
    updateCarouselContent(); // Carrega o primeiro projeto ao carregar a página

    // Formulário de Contato
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});