document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    
    // Carga
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayCards(data.tarjetas);
        }
    };
    xhr.open('GET', 'datos.json', true);
    xhr.send();

    // Función para mostrar las tarjetas
    function displayCards(cardsData) {
        const cardsContainer = document.getElementById('cards-container');
        cardsData.forEach(cardData => {
            const card = document.createElement('div');
            card.classList.add('card');

            const title = document.createElement('h3');
            title.textContent = cardData.titulo;

            const description = document.createElement('p');
            description.textContent = cardData.descripcion;

            card.appendChild(title);
            card.appendChild(description);
            cardsContainer.appendChild(card);
        });
    }

    // clic al botón de búsqueda
    searchButton.addEventListener('click', function() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            // Comprobar si el término de búsqueda está presente en el título o la descripción
            if (title.includes(searchInput) || description.includes(searchInput)) {
                card.style.display = 'block'; // Muestra la tarjeta
            } else {
                card.style.display = 'none'; // Oculta la tarjeta
            }
        });
    });
});
