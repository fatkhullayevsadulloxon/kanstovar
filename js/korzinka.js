const elList = document.querySelector(".product-korzina")
const elClearBtn = document.querySelector(".clear-btn")
const elProductResult = document.querySelector(".product-result")

let lstore;

lstore = JSON.parse(window.localStorage.getItem("korzina"))



const korzina = lstore || []

if(korzina.length){
  elClearBtn.classList.remove("d-none")
}

const getCountryDataBookmark = function () {
  for (let bookmark of korzina) {
    const html = `
              <div class="col-lg-4 card-border col-md-6 wow zoomIn" data-wow-delay="0.1s">
                        <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                            <div class="service-icon flex-shrink-0">
                                <img class="img mt-5" src="${bookmark.image}" >
                            </div>
                            <h5 class=" mt-5">${bookmark.name}</h5>
                            <p>${bookmark.description}</p>
                            <strong>${bookmark.price.toLocaleString("uzs", {
      style: 'currency',
      currency: 'uzs',
    })}</strong>  
    <a type="button" href="tel:+998930550595" class="btn mx-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Sotib olish
    </a>

                        </div>
                    </div>
        `
    elList.insertAdjacentHTML("beforeend", html)
  }
}

elClearBtn.addEventListener("click", (e) => {

  window.localStorage.removeItem("korzina")
  window.location.reload(true)

})

getCountryDataBookmark()