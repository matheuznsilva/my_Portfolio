// ESSE SCRIPT É SÓ DE TESTE, NÃO É PARA SER USADO NO SITE FINAL
// Ele é usado para testar o carrossel de projetos
// O código final deve ser colocado no arquivo script.js dentro da pasta public/static/javascript

document.addEventListener('DOMContentLoaded', () => {
    // Array de objetos contendo os dados de cada projeto
    const projects = [
        {
            number: '01',
            type: 'Frontend Project',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.',
            technologies: 'Html 5, Css 3, Javascript',
            image: 'img/thumb1.png' // Caminho para sua imagem
        },
        {
            number: '02',
            type: 'Fullstack Project',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.',
            technologies: 'Next.js, Tailwind.css, Node.js',
            image: 'img/thumb2.png' // Caminho para sua imagem
        },
        {
            number: '03',
            type: 'Frontend Project',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.',
            technologies: 'Next.js, Tailwind.css',
            image: 'img/thumb3.png' // Caminho para sua imagem
        }
    ];

    let currentProjectIndex = 0; // Índice do projeto atualmente exibido

    // Obtenção dos elementos HTML pelo ID
    const projectNumberElement = document.getElementById('projectNumber');
    const projectTitleElement = document.getElementById('projectTitle');
    const projectDescriptionElement = document.getElementById('projectDescription');
    const projectTechnologiesElement = document.getElementById('projectTechnologies');
    const projectImageElement = document.getElementById('projectImage');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const carouselContent = document.querySelector('.carousel-content'); // Para a transição de opacidade

    // Função para atualizar o conteúdo do carrossel
    function updateCarouselContent() {
        const project = projects[currentProjectIndex];

        // Adiciona a classe 'fade-out' para iniciar a transição de saída
        carouselContent.classList.add('fade-out');

        // Espera a transição de saída terminar para atualizar o conteúdo
        setTimeout(() => {
            projectNumberElement.textContent = project.number;
            projectTitleElement.textContent = project.type;
            projectDescriptionElement.textContent = project.description;
            projectTechnologiesElement.textContent = project.technologies;
            projectImageElement.src = project.image;
            projectImageElement.alt = `Imagem do ${project.type}`;

            // Remove a classe 'fade-out' e adiciona 'fade-in' para a transição de entrada
            carouselContent.classList.remove('fade-out');
            carouselContent.classList.add('fade-in');

            // Remove 'fade-in' após um breve período para permitir que a transição ocorra na próxima atualização
            setTimeout(() => {
                carouselContent.classList.remove('fade-in');
            }, 500); // Deve ser igual ou maior que a duração da transição CSS
        }, 300); // Tempo para a transição 'fade-out' ocorrer (deve ser menor que a transição CSS)
    }

    // Event Listener para o botão 'Próximo'
    nextButton.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length; // Avança para o próximo projeto, volta ao início se chegar ao fim
        updateCarouselContent();
    });

    // Event Listener para o botão 'Anterior'
    prevButton.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length; // Volta para o projeto anterior, vai para o fim se chegar ao início
        updateCarouselContent();
    });

    // Inicializa o carrossel com o primeiro projeto ao carregar a página
    updateCarouselContent();
});