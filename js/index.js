"use strict"

const elProduct = document.querySelector(".product")

const korzina = []

const getCountryData = function(data) {
    for(let dataArr of data ){
        const html = `
              <div class="col-lg-4 card-border col-md-6 wow zoomIn" data-wow-delay="0.1s">
                        <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                            <div class="service-icon flex-shrink-0">
                                <img class="img" src="${dataArr.image}" >
                            </div>
                            <h5 class="mb-3">${dataArr.name}</h5>
                            <p>${dataArr.description}</p>
                            <strong>${dataArr.price.toLocaleString("uzs", {
                                style: 'currency',
                                currency: 'uzs',
                            })}</strong>
                            <a class="btn px-3 mt-auto mx-auto" data-btn-id="${dataArr.id}" href="">Korzinka</a>
                        </div>
                    </div>
        `

        elProduct.insertAdjacentHTML("beforeend", html)
    }
}

const getCountry = function() {
    fetch("https://kansmir.iprogrammer.uz/products/all/")
    .then(res => res.json())
    .then(data => getCountryData(data))
}

getCountry()