// button event handler 
const searchMobile = () =>{
    const search = document.getElementById('search-field');
    const text = search.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${text}`;
    search.value = '';
    // console.log(url);

    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data))
}

