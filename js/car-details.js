async function initCarPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id'); 

    if (!carId) {
        window.location.href = 'index.html';
        return;
    }

    const car = await fetchCarById(carId); 
    if (car) {
        // On remplit le HTML (Exemple approche 1) [cite: 2326]
        document.querySelector('h1').textContent = `${car.year} ${car.brand} ${car.model}`;
        document.querySelector('.car-img').src = car.image_url || './imgs/default-car.png';
        // Remplir le tableau de spécifications ici... [cite: 2322]
    }
}