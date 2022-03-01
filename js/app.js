const getTag = tagId => document.getElementById(tagId);
const clearContent = tagId => document.getElementById(tagId).textContent = '';
const toggleSpinner = displayProperty => getTag('search-loader').style.display = displayProperty;

const searchPhone = () => {
    // clearing before search result 
    clearContent('phone-container');
    clearContent('no-phone-found');

    // search loader toggle 
    toggleSpinner('block');

    // Getting search input 
    const searchField = getTag('search-field');
    const searchText = searchField.value.toLowerCase();

    // Vaidation of search input 
    if (searchText == '') {
        alert('Please Enter Search Keyword!');
        toggleSpinner('none');
        return;
    }

    // Set api url 
    const phoneApiUrl = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    // Fetching data 
    fetch(phoneApiUrl)
        .then(response => response.json())
        .then(dataset => displayPhone(dataset.data));
}

// Phone display function 
const displayPhone = phones => {
    let phonesDefault = phones.slice(0, 20);

    if (phones.length == 0) {
        showError('no-phone-found', 'No Phone found!');
    }

    if (phones.length > 20) {
        // Adding Show all button 
        const showAllContainer = getTag('show-all-container');
        showAllContainer.innerHTML = `
        <button id="show-all-phones" class="btn fs-6 px-3 py-2 text-white" style="background-color: #5E63B6;">Show All Phones</button>
        `;

        // Displaying all phones 
        getTag('show-all-phones').addEventListener('click', () => {
            showPhonesByCount(phones);
            getTag('show-all-phones').style.display = 'none';
        })
    }

    showPhonesByCount(phonesDefault);
}

const showPhonesByCount = phonesCount => {
    // clearing previous phones
    clearContent('phone-container');

    // Getting phones 
    const phoneContainer = getTag('phone-container');
    phonesCount.forEach(phone => {
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
    })

    // search loader toggle 
    toggleSpinner('none');
}

// phone detail function 
const getPhoneDetail = phoneId => {
    // clearing previous phone details 
    clearContent('detail-container');
    const detailApiUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    fetch(detailApiUrl)
        .then(response => response.json())
        .then(dataset => displayPhoneDetail(dataset.data));
}

// Display phone detail function 
const displayPhoneDetail = phoneInfo => {
    const detailContainer = getTag('detail-container');
    const sensorsArray = phoneInfo.mainFeatures.sensors;
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${phoneInfo.image}" class="card-img-top" alt="...">
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="fw-bold">Name: </span>${phoneInfo.name}</li>
            <li class="list-group-item"><span class="fw-bold">Brand: </span>${phoneInfo.brand}</li>
            <li id="release-date" class="list-group-item"><span class="fw-bold">Realease Date: </span>${phoneInfo.releaseDate}</li>
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
            <li class="list-group-item"><span class="fw-bold">Storage: </span>${phoneInfo.mainFeatures.storage}</li>
        </ul>

        <div id="others-container">
        
        </div>
    </div>
    `;
    detailContainer.appendChild(div);

    // Showing message if relasedate not found
    if (phoneInfo.releaseDate == false) {
        showError('release-date', 'Release Date not found!');
    }

    getSensors(sensorsArray);

    // Getting others info if available 
    if (phoneInfo.others) {
        getOthers(phoneInfo.others)
    } else {
        showError('others-container', 'Others info not found!');
    }
}

// Sensor getting function 
const getSensors = sensorsArray => {
    // getting sensors if available 
    if (sensorsArray) {
        const sensorsContainer = getTag('phone-sensors');
        sensorsArray.forEach(sensor => {
            const li = document.createElement('li');
            li.innerText = sensor;
            li.classList.add('list-group-item');
            sensorsContainer.appendChild(li);
        })
    }
}

// other info getting function 
const getOthers = others => {
    const othersContainer = getTag('others-container');
    othersContainer.innerHTML = `
    <h5 class="px-3 mt-4 fw-bold">Others</h5>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"><span class="fw-bold">Bluetooth: </span>${others.Bluetooth}</li>
        <li class="list-group-item"><span class="fw-bold">GPS: </span>${others.GPS}</li>
        <li class="list-group-item"><span class="fw-bold">NFC: </span>${others.NFC}</li>
        <li class="list-group-item"><span class="fw-bold">Radio: </span>${others.Radio}</li>
        <li class="list-group-item"><span class="fw-bold">USB: </span>${others.USB}</li>
        <li class="list-group-item"><span class="fw-bold">WLAN: </span>${others.WLAN}</li>
    </ul>
    `;
}

// Erros message showing function  
const showError = (tagId, message) => {
    const tag = getTag(tagId);
    tag.innerHTML = `<p class="px-3 fw-bold text-danger">${message}</p>`;
}