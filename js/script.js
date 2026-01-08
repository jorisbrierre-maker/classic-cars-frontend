document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.getElementById('login-form');
    const addCarForm = document.getElementById('add-car-form');
    const cardContainer = document.querySelector('.card-cont');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Variable pour stocker temporairement l'ID à supprimer (Tâche 5.4) [cite: 462, 465]
    let carIdToDelete = null;

    // 1. Fonctions d'affichage et navigation
    function showLoginSection() {
        document.getElementById('login-section').classList.remove('d-none');
        document.getElementById('cars-section').classList.add('d-none');
        if (logoutBtn) logoutBtn.classList.add('d-none');
        localStorage.removeItem('token');
    }

    async function showApp() {
        try {
            const cars = await fetchAllCars();
            document.getElementById('login-section').classList.add('d-none');
            document.getElementById('cars-section').classList.remove('d-none');
            if (logoutBtn) logoutBtn.classList.remove('d-none');
            displayCars(cars);
        } catch (err) {
            console.error("Session expirée :", err);
            showLoginSection();
        }
    }

    // --- INITIALISATION ---
    if (localStorage.getItem('token')) {
        await showApp();
    } else {
        showLoginSection();
    }

    // 2. Gestion de la connexion (Login)
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const user = document.getElementById('username').value;
            const pass = document.getElementById('password').value;
            try {
                await login(user, pass);
                await showApp();
            } catch (err) {
                alert("Erreur : " + err.message);
            }
        });
    }

    // 3. Gestion de l'ajout de voiture (Partie 5)
    if (addCarForm) {
        addCarForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(addCarForm);
            const carData = Object.fromEntries(formData);
            
            // Conversion des types
            carData.year = parseInt(carData.year);
            carData.price = parseFloat(carData.price);
            carData.mileage = parseInt(carData.mileage);

            const result = await createCar(carData);
            if (result) {
                document.querySelector('#addCarModal .btn-close').click();
                addCarForm.reset();
                await showApp(); // Rafraîchissement de la liste
            } else {
                alert("L'ajout a échoué.");
            }
        });
    }

    // 4. Gestion de la suppression (Tâche 5.3 & 5.4)
    if (cardContainer) {
        // Utilisation de l'Event Delegation sur le conteneur parent [cite: 410-412]
        cardContainer.addEventListener('click', (event) => {
            // On vérifie si l'élément cliqué est le bouton supprimer [cite: 413-415]
            if (event.target.classList.contains('btn-delete')) {
                // On récupère l'ID stocké dans le dataset [cite: 416, 465]
                carIdToDelete = event.target.dataset.carId;
                
                // On affiche le modal de confirmation Bootstrap [cite: 466-470]
                const confirmModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
                confirmModal.show();
            }
        });
    }

    // Écouteur sur le bouton de confirmation du modal (Tâche 5.4) [cite: 471-472]
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async () => {
            if (!carIdToDelete) return;

            // Appel API pour la suppression (Approche Pessimistic) [cite: 343-344, 475]
            const success = await deleteCar(carIdToDelete);

            if (success) {
                // Fermer le modal [cite: 479]
                const modalElement = document.getElementById('confirmDeleteModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide();
                
                // Rafraîchir l'interface [cite: 478]
                await showApp();
                alert("Voiture supprimée avec succès.");
            } else {
                alert("Erreur lors de la suppression sur le serveur.");
            }
            
            carIdToDelete = null; // Réinitialisation [cite: 484]
        });
    }

    // 5. Fonctions utilitaires
    function displayCars(cars) {
        cardContainer.innerHTML = '';
        if (cars.length === 0) {
            cardContainer.innerHTML = '<p class="text-center w-100">Aucune voiture disponible.</p>';
            return;
        }
        cars.forEach(car => {
            cardContainer.appendChild(createCarCard(car));
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            showLoginSection();
        });
    }
});