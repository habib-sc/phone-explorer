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

// Phone display function 
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
                <button onclick="getPhoneDetail('${phone.slug}')" class="btn fs-6 px-3 py-2 text-white" style="background-color: #5E63B6;">Get
                    Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(div);
        console.log(phone);
    })
}

// phone detail function 
const getPhoneDetail = phoneId => {
    // clearing previous phone details 
    document.getElementById('detail-container').textContent = '';
    const detailApiUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    fetch(detailApiUrl)
        .then(response => response.json())
        .then(dataset => displayPhoneDetail(dataset.data));

}

// Display phone detail function 
const displayPhoneDetail = phoneInfo => {
    const detailContainer = document.getElementById('detail-container');
    const sensorsArray = phoneInfo.mainFeatures.sensors;
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${phoneInfo.image}" class="card-img-top" alt="...">
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="fw-bold">Name: </span>${phoneInfo.name}</li>
            <li class="list-group-item"><span class="fw-bold">Brand: </span>${phoneInfo.brand}</li>
            <li class="list-group-item"><span class="fw-bold">Realease Date: </span>${phoneInfo.releaseDate}</li>
        </ul>

        <h5 class="px-3 mt-4 fw-bold">Main Featuers</h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="fw-bold">Chip Set: </span>${phoneInfo.mainFeatures.chipSet}</li>
            <li class="list-group-item"><span class="fw-bold">Display: </span>${phoneInfo.mainFeatures.displaySize}</li>
            <li class="list-group-item"><span class="fw-bold">Memory: </span>${phoneInfo.mainFeatures.memory}</li>
            <li class="list-group-item">
                <span class="fw-bold">Sensors: </span>
                <ul id="phone-sensors" class="list-group list-group-flush">
                
                </ul>
            </li>
            <li class="list-group-item"><span class="fw-bold">Storage: </span>Iphone</li>
        </ul>

        <h5 class="px-3 mt-4 fw-bold">Others</h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="fw-bold">Bluetooth: </span>Iphone</li>
            <li class="list-group-item"><span class="fw-bold">NFC: </span>Iphone</li>
            <li class="list-group-item"><span class="fw-bold">Radio: </span>Iphone</li>
            <li class="list-group-item"><span class="fw-bold">USB: </span>Iphone</li>
            <li class="list-group-item"><span class="fw-bold">WLAN: </span>Iphone</li>
        </ul>
    </div>
    `;
    detailContainer.appendChild(div);
    getSensors(sensorsArray);
    console.log(phoneInfo);
}

const getSensors = sensorsArray => {
    if (sensorsArray) {
        const sensorsContainer = document.getElementById('phone-sensors');
        sensorsArray.forEach(sensor => {
            const li = document.createElement('li');
            li.innerText = sensor;
            li.classList.add('list-group-item');
            sensorsContainer.appendChild(li);
            console.log(sensor);
        })
    }
}