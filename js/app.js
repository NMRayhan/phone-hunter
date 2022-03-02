// enter key event
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchMobile();
  }
});

// By-default autoload this Mobile
function autoLoad() {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadDataInCard(data.data));
}
autoLoad();

// button event handler
const searchMobile = () => {
  const search = document.getElementById("search-field");
  const text = search.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${text}`;
  search.value = "";

  fetch(url)
    .then((res) => res.json())
    .then((data) => loadDataInCard(data.data));
};

// load data in card
const loadDataInCard = (mobiles) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  for (const mobile of mobiles) {
    console.log(mobile);
    const cardCol = document.createElement("div");
    cardCol.classList.add("col-lg-4", "col-md-4", "col-sm-12", "mt-5");
    cardCol.innerHTML = `<div class="card">
            <img src="${mobile.image}" alt="s" class="card-img-top card-img">
                <div class="card-body">
                    <h2 class="cart-title"> <span class="text-warning fw-bold">Name :</span> ${mobile.phone_name}</h2>
                    <h2 class="cart-text"> <span class="text-success fw-bold">Brand :</span> ${mobile.brand}</h2>
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-primary" onclick="moreDetails('${mobile.slug}')">Show Details</button>
                </div>
            </div>`;
    cardContainer.appendChild(cardCol);
  }
};

// more details showing
const moreDetails = (phoneId) => {
  console.log(phoneId);
};
