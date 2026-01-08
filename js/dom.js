/**
 * Crée une carte de voiture (Tâche 3.1 & Tâche 5.1)
 * @param {Object} car - Les données de la voiture provenant de l'API
 * @returns {HTMLElement} L'élément article représentant la carte complète
 */
function createCarCard(car) {
    const article = document.createElement('article');
    article.className = 'card shadow-sm h-100';

    // Logique d'affichage de l'image (Lien externe ou serveur local)
    let imageUrl = 'https://via.placeholder.com/400x250?text=Pas+d+image';
    
    if (car.image_url && car.image_url.trim() !== "") {
        if (car.image_url.startsWith('http')) {
            // C'est un lien web direct
            imageUrl = car.image_url;
        } else {
            // C'est un fichier stocké sur le serveur (ex: uploads/photo.jpg)
            const serverRoot = API_CONFIG.baseURL.replace('/api', '');
            imageUrl = `${serverRoot}/${car.image_url}`;
        }
    }

    // Injection du contenu HTML
    // Ajout d'une div d'action en bas de carte pour les boutons (Tâche 5.1) 
    article.innerHTML = `
        <a href="car.html?id=${car.id}">
            <img src="${imageUrl}" class="card-img-top" alt="${car.brand}" style="height: 200px; object-fit: cover;">
        </a>
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${car.year} ${car.brand} ${car.model}</h5>
            <p class="card-text text-muted flex-grow-1">${car.description || ''}</p>
            
            <div class="d-flex justify-content-between align-items-center mt-auto">
                <a href="car.html?id=${car.id}" class="btn btn-primary btn-sm">See more</a>
                
                <button type="button" 
                        class="btn btn-outline-danger btn-sm btn-delete" 
                        data-car-id="${car.id}">
                    Supprimer
                </button>
            </div>
        </div>
    `;
    
    return article;
}

/**
 * Affiche un spinner de chargement dans un conteneur
 * @param {HTMLElement} container - L'élément DOM où injecter le spinner
 */
function showLoading(container) {
    container.innerHTML = '<div class="text-center w-100 my-5"><div class="spinner-border text-primary"></div></div>';
}

/**
 * Affiche un message d'erreur dans un conteneur
 * @param {HTMLElement} container - L'élément DOM où injecter l'erreur
 * @param {string} message - Le message à afficher
 */
function showError(container, message) {
    container.innerHTML = `<div class="alert alert-danger w-100 text-center">${message}</div>`;
}