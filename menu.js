async function loadMenuItemsFromCSV(csvFile, containerId) {
    try {
        const response = await fetch(csvFile);
        const data = await response.text();
        displayMenuItems(data, containerId);
    } catch (error) {
        console.error("Ошибка при загрузке CSV:", error);
    }
}

function displayMenuItems(data, containerId) {
    const items = parseCSV(data);
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    items.forEach(item => {
        const { name, description, price } = item;

        const dishCard = document.createElement('div');
        dishCard.classList.add('dish-card');

        const dishInfo = document.createElement('div');
        dishInfo.classList.add('dish-info');

        const dishName = document.createElement('h2');
        dishName.classList.add('dish-name');
        dishName.textContent = name;

        const dishDescription = document.createElement('p');
        dishDescription.classList.add('dish-description');
        dishDescription.textContent = description;

        dishInfo.appendChild(dishName);
        dishInfo.appendChild(dishDescription);

        const dishPrice = document.createElement('div');
        dishPrice.classList.add('dish-price');
        dishPrice.textContent = price;

        dishCard.appendChild(dishInfo);
        dishCard.appendChild(dishPrice);

        container.appendChild(dishCard);
    });
}

function parseCSV(data) {
    const rows = data.trim().split('\n');
    const items = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        if (row) {
            const [name, description, price] = row.map(cell => cell.replace(/^"|"$/g, ''));
            items.push({ name, description, price });
        }
    }
    return items;
}

// Загрузка данных из разных CSV-файлов для каждой категории
loadMenuItemsFromCSV('csv/breakfast.csv', 'breakfast-items');
loadMenuItemsFromCSV('csv/cold_appetizers.csv', 'cold-appetizers-items');
loadMenuItemsFromCSV('csv/hot_appetizers.csv', 'hot-appetizers-items');
loadMenuItemsFromCSV('csv/beer_appetizers.csv', 'beer-appetizers-items');
loadMenuItemsFromCSV('csv/salads.csv', 'salads-items');
loadMenuItemsFromCSV('csv/soups.csv', 'soups-items');
loadMenuItemsFromCSV('csv/kids_menu.csv', 'kids-menu-items');
