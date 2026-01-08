document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (!carId) return;

    try {
        const car = await fetchCarById(carId);
        if (car) {
            document.getElementById('car-title').textContent = `${car.year} ${car.brand} ${car.model}`;
            document.getElementById('car-img').src = car.image_url;
            document.getElementById('car-year').textContent = car.year;
            document.getElementById('car-brand').textContent = car.brand;
            document.getElementById('car-model').textContent = car.model;
            document.getElementById('car-price').textContent = `${car.price} €`;
            document.getElementById('car-mileage').textContent = `${car.mileage} km`;
            document.getElementById('car-description').textContent = car.description;
        }
    } catch (err) {
        console.error(err);
    }
});