"use strict"

const elProduct = document.querySelector(".product")

const getCountryData = function(data) {
    for(let dataArr of data ){
        const html = `
              <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.1s">
                        <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                            <div class="service-icon flex-shrink-0">
                                <i class="fa fa-home fa-2x"></i>
                            </div>
                            <h5 class="mb-3">${dataArr.title}</h5>
                            <p>${dataArr.id}</p>
                            <a class="btn px-3 mt-auto mx-auto" href="">Korzinka</a>
                        </div>
                    </div>
        `

        elProduct.insertAdjacentHTML("beforeend", html)
    }
}

const getCountry = function() {
    fetch("https://jsonplaceholder.typicode.com/todos/1/")
    .then(res => res.json())
    .then(data =>getCountryData(data))
}

getCountry()