const keyboardContainer = document.querySelector("#keyboardContainer");
const mouseContainer = document.querySelector("#mouseContainer");
const soundContainer = document.querySelector("#soundContainer");
const etcContainer = document.querySelector("#etcContainer");

const url = "http://localhost:5001";

const getThreeProducts = async (category, container) => {
  await fetch(`${url}/api/product/?higherCategory=${category}&sortType=recent`)
    .then((response) => {
      if (!response.ok)
        return response.json().then((data) => Promise.reject(data));
      return response.json();
    })
    .then((data) => {
      loadProductsContainer(data.products.slice(0, 3), container);
    })
    .catch((error) => {
      console.error(error);
    });
};

const loadProductsContainer = (products, container) => {
  products.forEach((product) => {
    container.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
  <div><a href="${url}/product?productNumber=${product.product_number}">
  <img src=${product.main_img_url}>
  <p class="is-size-5">${product.product_name}</p>
  <p class="is-size-6">${parseInt(product.price).toLocaleString()}원</p></a>
  </div>
  `,
    );
  });
};

getThreeProducts("키보드", keyboardContainer);
getThreeProducts("마우스", mouseContainer);
getThreeProducts("음향장비", soundContainer);
getThreeProducts("기타", etcContainer);
