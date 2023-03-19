"use strict";

const elProduct = document.querySelector(".product");
const elProductKorzina = document.querySelector(".product-korzina");
const elKorzina = document.querySelector(".korzina");
const elLoading = document.querySelector(".loading2");
// const elResult = document.querySelector(".result")
const elHullas = document.querySelector(".hullas");
const elInputName = document.querySelector(".input-name");
const elInputLast = document.querySelector(".input-last");
const elInputNumber = document.querySelector(".input-number");
const elFormData = document.querySelector(".form-data");
const elFormInput = document.querySelector(".form-input");
const elForm = document.querySelector(".form");
const elSearchList = document.querySelector(".list-search");
const elSearchListResult = document.querySelector(".list-search-result");
const elSearchFormResult = document.querySelector(".search-form-result");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

const getSearchData = function (data) {
    elSearchList.innerHTML = null
    for (let dataArr of data) {
        console.log(dataArr.id);

        const html = ` 
      <div class="">
        <a class="text-dark d-block positon-absolute search-block" href="#${dataArr.id}">${dataArr.name}</a>
      </div>
    `

        elSearchList.insertAdjacentHTML("beforeend", html)
    }
}



const getCountryData = function (data) {
    elProduct.innerHTML = "";

    for (let dataArr of data) {
        const html = `
                <div id="${dataArr.id}" class="col-lg-4 card-border col-md-6 wow zoomIn" data-wow-delay="0.1s">
                          <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                              <div class="service-icon flex-shrink-0">
                                  <img class="img mt-5" src="${dataArr.image}" >
                              </div>
                              <h5 class="mb-3 heading mt-5">${dataArr.name}</h5>
                              <p class="heading2">${dataArr.description.substr(
            0,
            60
        )}...</p>
                              <strong class="heading buy">${dataArr.price.toLocaleString(
            "uzs",
            {
                style: "currency",
                currency: "uzs",
            }
        )}</strong>
                              <a class="btn px-3 mt-auto mx-auto btn-book heading2" data-btn-id="${dataArr.id
            }" href="#!">Korzinka</a>
                          </div>
                      </div>
          `;
        elProduct.insertAdjacentHTML("beforeend", html);
    }

    elProduct.addEventListener("click", (e) => {
        const isBookmarkBtn = e.target.matches(".btn-book");

        if (isBookmarkBtn) {
            const filmId = e.target.dataset.btnId;

            e.target.textContent = "Saqlandi✅";

            fetch(`https://kansmir.iprogrammer.uz/product/get/${filmId}`)
                .then((res) => res.json())
                .then((data) => {
                    korzina.push(data);
                    window.localStorage.setItem("korzina", JSON.stringify(korzina));
                });
        }
    });
};

const getCountry = function () {
    fetch("https://kansmir.iprogrammer.uz/products/all/")
        .then((res) => res.json())
        .then((data) => getCountryData(data));
};

const getSearch = (inputValue) => {
    console.log(inputValue);

    var formdata = new FormData();
    formdata.append("content", inputValue);

    var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    fetch(`https://kansmir.iprogrammer.uz/products/search/`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            getSearchData(data)

        });
};

//  searchInput.addEventListener("click",(e)=>{
//     scrollToAnchor("products")
//     setTimeout(()=>{
//         e.target.focus()
//     },1000)
//  })
searchInput.addEventListener("input", (e) => {
    let value;

    value = e.target.value;
    console.log(value);
    if (value == "") {
        getCountry();
    } else {
        getSearch(value);
    }
});

// const renderSearch = function(search){
//     for(let searchArr of search){
//         const html = `
//             <p>${searchArr.name}</p>
//         `

//         elSearchList.insertAdjacentHTML("beforeend", html)
//     }
// }

// elForm.addEventListener("input", (e) => {
//     e.preventDefault()
//     const inputValue = elFormInput.value

//     getSearch(inputValue)

// })

let lstore;

lstore = JSON.parse(window.localStorage.getItem("korzina"));

const korzina = lstore || [];

elFormData.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValueName = elInputName.value;
    const inputValueLast = elInputLast.value;
    const inputValueNum = elInputNumber.value;

    fetch("https://kansmir.iprogrammer.uz/book/create/", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            first_name: inputValueName,
            last_name: inputValueLast,
            phone: inputValueNum,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            window.location.replace("index.html");
        });
});

getCountry();
