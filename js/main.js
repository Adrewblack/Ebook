const bookmarkSide = document.querySelector(".bookmark-side");
const bookmarkOpen = document.querySelector(".bookmark-open");
const bookmarkOpened = document.querySelector(".bookmark-opened");
const product = document.querySelectorAll(".product-card");
const productsRow = document.querySelector(".products");
const bookmarkBtn = document.querySelectorAll(".bookmark-btn");
const markedBooks = document.querySelector(".marked-books");
const pagination = document.querySelector(".pagination");
const pages = document.querySelectorAll(".pages");

function openBookmarkSide() {
  bookmarkSide.classList.add("bookmark-side-open");
  bookmarkOpened.classList.add("bookmark-opened-true");
  product.forEach((card) => card.classList.add("product-card-wrapped"));
  productsRow.classList.add("products-wrapped");
    pagination.style.marginLeft = "280px";
    
}

bookmarkOpen.addEventListener("click", () => {
  bookmarkSide.classList.toggle("bookmark-side-open");
  bookmarkOpened.classList.toggle("bookmark-opened-true");
  product.forEach((card) => card.classList.toggle("product-card-wrapped"));
  productsRow.classList.toggle("products-wrapped");
  pagination.style.marginLeft = "280px";
});

bookmarkBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    openBookmarkSide();
  });
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 80) {
    bookmarkSide.style = "top: 0";
  } else {
    bookmarkSide.style = "top: 73px";
  }
});

window.addEventListener("click", (e) => {
  const isBookmarkBtnClicked = Array.from(bookmarkBtn).some((el) =>
    el.contains(e.target)
  );

  if (!bookmarkSide.contains(e.target) && !isBookmarkBtnClicked) {
    bookmarkSide.classList.remove("bookmark-side-open");
    bookmarkOpened.classList.remove("bookmark-opened-true");
    product.forEach((card) => {
      card.classList.remove("product-card-wrapped");
    });
    productsRow.classList.remove("products-wrapped");
  }
});

function getMarkedBooks(bookName, bookAuthor) {
  let markedBook = document.createElement("div");
  markedBook.classList.add("marked-book");

  let bookDesc = document.createElement("div");
  bookDesc.classList.add("book-desc");

  let bookSpan = document.createElement("span");
  bookSpan.textContent = `${bookName}`;

  let bookP = document.createElement("p");
  bookP.textContent = `${bookAuthor}`;
  bookDesc.append(bookSpan);
  bookDesc.append(bookP);

  let bookAct = document.createElement("div");
  bookAct.classList.add("book-act");

  let readBtn = document.createElement("button");
  let readBtnImg = document.createElement("img");
  readBtnImg.src = `../assets/book-open.svg`;
  readBtn.append(readBtnImg);

  let deleterBtn = document.createElement("button");
  let deleterBtnImg = document.createElement("img");
  deleterBtnImg.src = `../assets/delete.svg`;
  deleterBtn.append(deleterBtnImg);

  bookAct.append(readBtn);
  bookAct.append(deleterBtn);

  markedBook.appendChild(bookDesc);
  markedBook.appendChild(bookAct);

  return markedBook;
}

bookmarkBtn.forEach((button) => {
  button.addEventListener("click", () => {
    let card = button.closest(".product-card");
    let bookName = card.querySelector("span").textContent;
    let bookAuthor = card.querySelector(".product-desc p").textContent;
    markedBooks.appendChild(getMarkedBooks(bookName, bookAuthor));
    pagination.style = "margin-left: 70px;";
  });
});

pages.forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Bu tugmalarni hali to'liq ishga tushirmadim");
  });
});
