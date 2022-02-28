const searchPhone = () => {
    // clearing before search result 
    document.getElementById('phone-container').textContent = '';
    // Getting search input 
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // Set api url 
    const phoneApiUrl = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    // Fetching data 
    fetch(phoneApiUrl)
        .then(response => response.json())
        .then(dataset => displayPhone(dataset.data));
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="shadow pe-radius p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body text text-center">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button id="product-detail" class="btn fs-6 px-3 py-2 text-white" style="background-color: #5E63B6;">Get
                    Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(div);
        console.log(phone);
    })
    console.log(phones);
}