document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('#item-input');
    const addButton = document.querySelector('#add-button');
    const itemList = document.querySelector('#item-list');

    // Função para salvar a lista no localStorage
    function saveList() {
        const items = Array.from(itemList.querySelectorAll('li')).map(li => li.textContent.replace(/[\u{200C}\u{200D}\s]+$/, ''));
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    // Função para carregar a lista do localStorage
    function loadList() {
        const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        items.forEach(item => addItemToList(item));
    }

    // Função para adicionar item à lista
    function addItemToList(itemText) {
        const li = document.createElement('li');
        li.textContent = itemText;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Adiciona ícone de lixeira
        deleteButton.onclick = function() {
            itemList.removeChild(li);
            saveList();
        };

        li.appendChild(deleteButton);
        itemList.appendChild(li);
        saveList(); // Atualiza a lista no localStorage após adicionar o item
    }

    // Adiciona item ao clicar no botão
    addButton.addEventListener('click', function() {
        const itemText = input.value.trim();
        if (itemText) {
            addItemToList(itemText);
            input.value = '';
        }
    });

    // Adiciona item ao pressionar Enter
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    // Carrega a lista ao iniciar
    loadList();

    // Partículas
    const canvas = document.querySelector('#particles');
    const ctx = canvas.getContext('2d');
    const particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            size: Math.random() * 5 + 1,
            speedX: (Math.random() - 0.5) * 3,
            speedY: (Math.random() - 0.5) * 3,
            color: 'rgba(106, 13, 173, 0.7)'
        };
        particles.push(particle);
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
                const index = particles.indexOf(particle);
                if (index > -1) particles.splice(index, 1);
            }
        });
        requestAnimationFrame(animateParticles);
    }

    function addParticlesOnMouseMove(e) {
        createParticle(e.x, e.y);
    }

    window.addEventListener('mousemove', addParticlesOnMouseMove);
    animateParticles();
});
