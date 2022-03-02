const moreMobileBtn = document.getElementById('allProductBtn');
moreMobileBtn.style.display = 'none';

// By-default autoload this Mobile
function autoLoad() {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => SearchCheck(data));
}
autoLoad();

// enter key event
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    toggleSpinner('block');
    toggleSearchResult('none')
    document.getElementById('card-section').style.display = 'none'
    searchMobile();
  }
});

// error handle
const SearchCheck = (data) => {
  if (data.status == true) {
    document.getElementById("alert").style.display = "none";
    loadDataInCard(data.data);
  } else {
    document.getElementById("alert").style.display = "block";
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = "";
    toggleSpinner('none');
  }
};

// button event handler
const searchMobile = async() => {
  toggleSpinner('block');
  toggleSearchResult('none')
  document.getElementById('card-section').style.display = 'none'
  const search = document.getElementById("search-field");
  const text = search.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${text}`;
  search.value = "";

  try {
    const res = await fetch(url);
    const data = await res.json();
    SearchCheck(data)
  } catch (error) {
    console.log(error);
  }
};

// load data in card
const loadDataInCard = (mobiles) => {
  let sliced = mobiles.slice(0,20);
  // console.log(mobiles);
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  for (const mobile of sliced) {
    const cardCol = document.createElement("div");
    cardCol.classList.add("col-lg-4", "col-md-4", "col-sm-12", "mt-5");
    cardCol.innerHTML = `
    <div class="card shadow p-2 bg-body rounded" style="background-color: #69696917; min-height : 570px" id="card">
    <img src="${mobile.image}" alt="s" class="card-img-top card-img">
      <div class="card-body">
        <h2 class="cart-title"> <span class="text-warning fw-bold">Name :</span> ${mobile.phone_name}</h2>
        <h2 class="cart-text"> <span class="text-success fw-bold">Brand :</span> ${mobile.brand}</h2>
        <button type="button" class="btn btn-outline-secondary" onclick="moreDetailsBtnHandler('${mobile.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal">More Details</button>
      </div>
    </div>        
    `;
    cardContainer.appendChild(cardCol);
  }
  moreMobileBtn.style.display = 'block';
  document.getElementById('card-section').style.display = 'block';
  toggleSearchResult('block');
  toggleSpinner('none');
};

// more button handler
const moreDetailsBtnHandler = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => moreDetails(data.data));
};


// moreDetails Showing 
const moreDetails = (Details) =>{
    console.log(Details);
    document.getElementById('exampleModalLabel').innerText = Details.name
    const modalContainer = document.getElementById('modal-body')
    modalContainer.textContent = ''
    const modalBody = document.createElement('div');
    modalBody.innerHTML = 
    `
    <img src="${Details.image}" alt="">
    ${Details.releaseDate != '' ? `<h4 class="text-warning fw-bold text-capitalize p-2">Release Date : <span class="text-primary fw-light">${Details.releaseDate}</span> </h4>` : `<h4 class="text-danger text-center text-capitalize"></h4>`}
    <hr>
    <h2 class="text-center text-capitalize" style="color:gray">Main Features</h2>
    <h5><i class="fas fa-check text-primary"></i> Processor : <span>${Details.mainFeatures.chipSet}</span></h5>
    <h5><i class="fas fa-check text-primary"></i> Display : <span>${Details.mainFeatures.displaySize}</span></h5>
    <h5><i class="fas fa-check text-primary"></i> Memory : <span>${Details.mainFeatures.memory}</span></h5>
    <h5><i class="fas fa-check text-primary"></i> Storage : <span>${Details.mainFeatures.storage}</span></h5>
    <hr>

    ${Details.others ? `
    <h2 class="text-center text-capitalize" style="color:gray">Specification</h2>
    <h5><i class="fas fa-check text-primary"></i> Bluetooth : <span>${Details.others?.Bluetooth}</span></h5>
    <h5><i class="fas fa-check text-primary"></i> GPS : <span>${Details.others?.GPS}</span></h5>
    <h5><i class="fas fa-check text-primary"></i> NFC : <span>${Details.others?.NFC}</span></h5>
    <h5><i class="fas fa-check text-primary"></i> Radio : <span>${Details.others?.Radio}</span></h5>
    <h5><i class="fas fa-check text-primary"></i> USB : <span>${Details.others?.USB}</span></h5>
    <h5><i class="fas fa-check text-primary"></i> WLAN : <span>${Details.others?.WLAN}</span></h5>
    ` : `
    <h2 class="text-center text-capitalize" style="color:gray">Sensor List</h2>
        ${document.createElement('div').innerHTML = sensorListCreating(Details.mainFeatures.sensors).innerHTML}
    `}

    `
    modalContainer.appendChild(modalBody);
}


// sensor list create function 
const sensorListCreating = (data) =>{
    const sensorUl = document.createElement('ul');
    for (let i = 0; i < data.length; i++) {
        const list = data[i];
        const sensorLi = document.createElement('li');
        sensorLi.innerText = list;
        sensorUl.appendChild(sensorLi);
    }
    return sensorUl;
}

// spinner Function
const toggleSpinner = (spinnerStyle) =>{
    document.getElementById('spinner').style.display = spinnerStyle;
}

// spinner Function
const toggleSearchResult = (value) =>{
  document.getElementById('card-section').style.display = value;
}