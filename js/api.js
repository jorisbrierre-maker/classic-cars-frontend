async function login(username, password) {
    const response = await fetch(`${API_CONFIG.baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error("Identifiants incorrects");
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;
}

async function fetchAllCars() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const json = await response.json();
    return json.data || json;
}

async function fetchCarById(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const json = await response.json();
    return json.data || json;
}

// Tâche 4.3 : Envoyer une nouvelle voiture au serveur [cite: 88-106]
/**
 * Envoie les données de la nouvelle voiture au serveur (Tâche 4.3)
 */
async function createCar(carData) {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}`, {
            method: 'POST',
            headers: {
                // Indispensable pour que le serveur lise l'image_url [cite: 62, 81, 94, 135]
                'Content-Type': 'application/json',
                // Indispensable pour avoir l'autorisation d'écrire [cite: 82, 95]
                'Authorization': `Bearer ${token}`
            },
            // On transforme l'objet en chaîne de caractères JSON [cite: 63, 67, 86, 96]
            body: JSON.stringify(carData)
        });

        if (!response.ok) {
            throw new Error(`Erreur serveur : ${response.status}`);
        }

        const result = await response.json();
        // On retourne la voiture créée (qui contient maintenant son ID et son image_url) [cite: 101, 154]
        return result.data || result; 
    } catch (error) {
        console.error('Erreur lors de la création de la voiture :', error);
        return null;
    }
}
async function deleteCar(carId) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}/${carId}`, {
            method: 'DELETE', // Méthode HTTP DELETE [cite: 321]
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 404) return true; // Déjà supprimé [cite: 389]
        return response.ok; // Retourne true si succès (200 ou 204) [cite: 382]
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        return false;
    }
}