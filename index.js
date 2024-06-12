let cartArray = [];
console.log(cartArray);
const ul = document.getElementById("list");

const fetchBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((booksApiObj) => {
      if (booksApiObj.ok) {
        console.log(booksApiObj);
        return booksApiObj.json();
      } else {
        throw Error("Dati non ricevuti");
      }
    })
    .then((booksObj) => {
      console.log(booksObj);

      const booksContainer = document.getElementById("booksContainer");

      booksObj.forEach((book) => {
        const col = document.createElement("div");
        col.classList.add("col");
        const card = document.createElement("div");
        card.classList.add("card", "g-5");
        const img = document.createElement("img");
        img.classList.add("card-img-top", "h-100");
        img.src = book.img;
        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerText = book.title;
        const price = document.createElement("p");
        price.innerText = `€ ${book.price}`;
        const btn = document.createElement("a");
        btn.classList.add("btn", "btn-primary", "mb-4");
        btn.innerText = "Remove book";
        const addToCart = document.createElement("a");
        addToCart.classList.add("btn", "btn-primary", "mb-4");
        addToCart.innerText = "Add To Cart";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(btn);
        card.appendChild(addToCart);
        col.appendChild(card);
        booksContainer.appendChild(card);

        btn.addEventListener("click", (event) => {
          card.remove();
        });

        addToCart.addEventListener("click", (event) => {
          const li = document.createElement("li");
          li.classList.add("list-group-item");
          li.innerText = `${book.title} € ${book.price}`;
          ul.appendChild(li);
          const { title, price } = book;
          cartArray.push({ title, price });
          console.log(cartArray);
          localStorage.setItem("Cart", JSON.stringify(cartArray));
        });
      });
    })
    .catch((error) => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
  const getCart = localStorage.getItem("Cart");
  if (getCart) {
    const cartToObj = JSON.parse(getCart);
    cartArray = cartToObj;
    console.log(cartArray);

    cartArray.forEach((element) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerText = `${element.title} € ${element.price}`;

      ul.appendChild(li);
    });
  }
});
