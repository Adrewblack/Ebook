const searchInput = document.querySelector(".search-bar input");
const siteMode = document.querySelector(".site-mode");
const logoutBtn = document.querySelector(".logout");
const bookmarkSide = document.querySelector(".bookmark-side");
const bookmarkOpen = document.querySelector(".bookmark-open");
const bookmarkOpened = document.querySelector(".bookmark-opened");
const productInfoBtn = document.querySelectorAll(".info-header span");
const markedBooks = document.querySelector(".marked-books");
const pagination = document.querySelector(".pagination");
const pages = document.querySelectorAll(".pages");
const bookInfo = document.querySelector(".book-info");
const closeInfo = document.querySelector(".close-info");
const productRow = document.querySelector(".products");

window.addEventListener("DOMContentLoaded", () => {
  const loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.style.display = "block";
  document.body.style = "background: #000";
  document.querySelector("main").style.display = "none";
  document.querySelector("header").style.display = "none";
  setTimeout(() => {
    loadingSpinner.style.display = "none";
    document.body.style.background = "white";
    document.querySelector("main").style.display = "block";
    document.querySelector("header").style.display = "block";
  }, 2000);
  fetch("https://openlibrary.org/people/mekBot/books/currently-reading.json")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.reading_log_entries.length; i++) {
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let cardImg = document.createElement("img");
        cardImg.src = `https://covers.openlibrary.org/b/olid/${data.reading_log_entries[i].work.cover_edition_key}.jpg`;
        cardImg.style = "width: 200px; height:200px";
        cardBody.append(cardImg);
        let cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");
        let productDesc = document.createElement("div");
        productDesc.classList.add("product-desc");
        let bookName = document.createElement("span");
        bookName.classList.add("book-name");
        bookName.textContent = data.reading_log_entries[i].work.title;
        let bookAuthor = document.createElement("p");
        bookAuthor.classList.add("author");
        bookAuthor.textContent = data.reading_log_entries[i].work.author_names;
        let bookDate = document.createElement("p");
        bookDate.classList.add("book-date");
        bookDate.textContent =
          data.reading_log_entries[i].work.first_publish_year;
        productDesc.append(bookName, bookAuthor, bookDate);
        let buttons = document.createElement("div");
        buttons.classList.add("buttons");
        let bookmarkBtn = document.createElement("button");
        bookmarkBtn.classList.add("bookmark-btn");
        bookmarkBtn.textContent = "Bookmark";
        let moreInfoBtn = document.createElement("button");
        moreInfoBtn.classList.add("more-info");
        moreInfoBtn.textContent = "More Info";
        moreInfoBtn.addEventListener("click", () => {
          bookInfo.classList.add("book-info-show");
          const card = moreInfoBtn.closest(".product-card");
          const bookCover = card.querySelector(".card-body img").src;
          const bookName = card.querySelector(".book-name").textContent;
          const bookAuthor = card.querySelector(".author").textContent;
          const bookPublished = card.querySelector(".book-date").textContent;
          // Replace the following placeholder values with actual data
          const bookPublishers = "Book Publishers";
          const bookCategories = "Book Categories";
          const bookCount = "Book Count";

          infoBookSide(
            bookName,
            bookCover,
            bookAuthor,
            bookPublished,
            bookPublishers,
            bookCategories,
            bookCount
          );
        });
        let readBtn = document.createElement("button");
        readBtn.classList.add("read-btn");
        readBtn.textContent = "Read";
        buttons.append(bookmarkBtn, moreInfoBtn, readBtn);
        cardFooter.append(productDesc, buttons);
        productCard.append(cardBody, cardFooter);
        productRow.appendChild(productCard);
        bookmarkBtn.addEventListener("click", () => {
          const card = bookmarkBtn.closest(".product-card");
          const bookName = card.querySelector(".book-name").textContent;
          const bookAuthor = card.querySelector(".author").textContent;
          const isAlreadyMarked = Array.from(markedBooks.children).some(
            (markedBook) => {
              const existingBookName =
                markedBook.querySelector(".book-desc span").textContent;
              const existingBookAuthor =
                markedBook.querySelector(".book-desc p").textContent;
              return (
                existingBookName === bookName &&
                existingBookAuthor === bookAuthor
              );
            }
          );
          if (!isAlreadyMarked) {
            markedBooks.appendChild(getMarkedBookElement(bookName, bookAuthor));
            saveMarkedBooksToLocalStorage(bookName, bookAuthor);
            pagination.style.marginLeft = "70px";
            openBookmarkSide();
          } else {
            alert("This book already marked");
          }
        });
      }
    });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const searchTerm = searchInput.value;
      console.log(searchTerm);
      let searchLoading = document.createElement("span");
      searchLoading.classList.add("search-loading");
      searchLoading.textContent = "Loading";
      productRow.innerHTML = "";
      productRow.appendChild(searchLoading);

      fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.docs && data.docs.length > 0) {
            for (let i = 0; i < data.docs.length; i++) {
              let productCard = document.createElement("div");
              productCard.classList.add("product-card");
              let cardBody = document.createElement("div");
              cardBody.classList.add("card-body");
              let cardImg = document.createElement("img");
              cardImg.src = `https://covers.openlibrary.org/b/olid/${data.docs[i].cover_edition_key}.jpg`;
              cardImg.style = "width: 200px; height:200px";
              cardBody.append(cardImg);
              let cardFooter = document.createElement("div");
              cardFooter.classList.add("card-footer");
              let productDesc = document.createElement("div");
              productDesc.classList.add("product-desc");
              let bookName = document.createElement("span");
              bookName.classList.add("book-name");
              bookName.textContent = data.docs[i].title;
              let bookAuthor = document.createElement("p");
              bookAuthor.classList.add("author");
              bookAuthor.textContent = data.docs[i].author_names;
              let bookDate = document.createElement("p");
              bookDate.classList.add("book-date");
              bookDate.textContent = data.docs[i].first_publish_year;
              productDesc.append(bookName, bookAuthor, bookDate);
              let buttons = document.createElement("div");
              buttons.classList.add("buttons");
              let bookmarkBtn = document.createElement("button");
              bookmarkBtn.classList.add("bookmark-btn");
              bookmarkBtn.textContent = "Bookmark";
              let moreInfoBtn = document.createElement("button");
              moreInfoBtn.classList.add("more-info");
              moreInfoBtn.textContent = "More Info";
              moreInfoBtn.addEventListener("click", () => {
                bookInfo.classList.add("book-info-show");
                const card = moreInfoBtn.closest(".product-card");
                const bookCover = card.querySelector(".card-body img").src;
                const bookName = card.querySelector(".book-name").textContent;
                const bookAuthor = card.querySelector(".author").textContent;
                const bookPublished =
                  card.querySelector(".book-date").textContent;
                const bookPublishers = "Book Publishers";
                const bookCategories = "Book Categories";
                const bookCount = "Book Count";

                infoBookSide(
                  bookName,
                  bookCover,
                  bookAuthor,
                  bookPublished,
                  bookPublishers,
                  bookCategories,
                  bookCount
                );
              });
              let readBtn = document.createElement("button");
              readBtn.classList.add("read-btn");
              readBtn.textContent = "Read";
              buttons.append(bookmarkBtn, moreInfoBtn, readBtn);
              cardFooter.append(productDesc, buttons);
              productCard.append(cardBody, cardFooter);
              productRow.appendChild(productCard);
              searchLoading.remove();
            }
          } else {
            alert("This book not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching search data:", error);
        });
      if (searchTerm.value == "") {
        productRow.appendChild(productCard);
      }
    }
  });
});

let isDarkMode = false;
siteMode.addEventListener("click", () => {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    // Dark mode
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    document.querySelector("header").style.borderBlockColor = "black";
  } else {
    // Light mode
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  }

  document.querySelectorAll("*").forEach((element) => {
    if (isDarkMode) {
      element.style.backgroundColor = "black";
      element.style.color = "white";
    } else {
      element.style.backgroundColor = "white";
      element.style.color = "black";
    }
  });
});

logoutBtn.addEventListener("click", () => {
  const userConfirmed = confirm("Are you sure you want to log out?");

  if (userConfirmed) {
    localStorage.clear();
    window.location.href = "../index.html";
  }
});

function openBookmarkSide() {
  bookmarkSide.classList.add("bookmark-side-open");
  bookmarkOpened.classList.add("bookmark-opened-true");
  toggleProductCardWrapping(true);
  pagination.style.marginLeft = "280px";
}

bookmarkOpen.addEventListener("click", () => {
  openBookmarkSide();
});

window.addEventListener("scroll", function () {
  bookmarkSide.style.top = window.scrollY > 80 ? "0" : "73px";
});

window.addEventListener("click", (e) => {
  const isBookmarkBtnClicked = e.target.classList.contains("bookmark-btn");
  if (!bookmarkSide.contains(e.target) && !isBookmarkBtnClicked) {
    closeBookmarkSide();
  }
});

function getMarkedBookElement(bookName, bookAuthor, bookPublished) {
  const markedBook = document.createElement("div");
  markedBook.classList.add("marked-book");
  const bookDesc = document.createElement("div");
  bookDesc.classList.add("book-desc");
  const bookSpan = document.createElement("span");
  bookSpan.textContent = `${bookName}`;
  const bookP = document.createElement("p");
  bookP.textContent = `${bookAuthor} - ${bookPublished}`;
  bookDesc.append(bookSpan, bookP);
  const bookAct = document.createElement("div");
  bookAct.classList.add("book-act");
  const readBtn = document.createElement("button");
  readBtn.classList.add("read-btn");
  const readBtnImg = document.createElement("img");
  readBtnImg.src = `../assets/book-open.svg`;
  readBtn.append(readBtnImg);
  const deleterBtn = document.createElement("button");
  deleterBtn.classList.add("deleter-btn");
  const deleterBtnImg = document.createElement("img");
  deleterBtnImg.src = `../assets/delete.svg`;
  deleterBtn.append(deleterBtnImg);
  bookAct.append(readBtn, deleterBtn);
  markedBook.append(bookDesc, bookAct);
  readBtn.addEventListener("click", () => {
    infoBookSide(
      bookName,
      `https://covers.openlibrary.org/b/olid/${bookAuthor}.jpg`, // Use appropriate cover source
      bookAuthor,
      bookPublished,
      "Book Publishers", // Replace with actual value
      "Book Categories", // Replace with actual value
      "Book Count" // Replace with actual value
    );
  });
  deleterBtn.addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to delete this book?");
    if (confirmation) {
      const bookName = markedBook.querySelector(".book-desc span").textContent;
      const bookAuthor = markedBook.querySelector(".book-desc p").textContent;
      markedBook.remove();
      saveMarkedBooksToLocalStorage(bookName, bookAuthor);
    }
  });
  return markedBook;
}

function saveMarkedBooksToLocalStorage(bookName, bookAuthor) {
  const markedBooksData = loadMarkedBooksFromLocalStorage();
  const isAlreadyMarked = markedBooksData.some(
    (book) => book.bookName === bookName && book.bookAuthor === bookAuthor
  );
  if (!isAlreadyMarked) {
    markedBooksData.push({ bookName, bookAuthor });
    const markedBooksString = JSON.stringify(markedBooksData);
    localStorage.setItem("markedBooks", markedBooksString);
  } else {
    alert("This book already marked");
  }
}

function loadMarkedBooksFromLocalStorage() {
  const markedBooksString = localStorage.getItem("markedBooks");
  return JSON.parse(markedBooksString) || [];
}

window.addEventListener("load", () => {
  const markedBooksData = loadMarkedBooksFromLocalStorage();
  markedBooksData.forEach((book) => {
    markedBooks.appendChild(
      getMarkedBookElement(book.bookName, book.bookAuthor)
    );
  });
});

function toggleProductCardWrapping(isWrapped) {
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) =>
    card.classList.toggle("product-card-wrapped", isWrapped)
  );
  productRow.classList.toggle("products-wrapped", isWrapped);
}

function closeBookmarkSide() {
  bookmarkSide.classList.remove("bookmark-side-open");
  bookmarkOpened.classList.remove("bookmark-opened-true");
  toggleProductCardWrapping(false);
}

function infoBookSide(
  bookName,
  bookCoverSrc,
  bookAuthor,
  bookPublished,
  bookPublishers,
  bookCategories,
  bookCount
) {
  const bookInfo = document.querySelector(".book-info");
  bookInfo.classList.add("info-visible");
  const infoHeader = bookInfo.querySelector(".info-header span");
  infoHeader.textContent = bookName;
  const bookCover = bookInfo.querySelector(".book-cover img");
  bookCover.src = bookCoverSrc;
  const authorSpan = bookInfo.querySelector(".book-author span");
  authorSpan.textContent = bookAuthor;
  const publishedSpan = bookInfo.querySelector(".book-published span");
  publishedSpan.textContent = bookPublished;
  const publishersSpan = bookInfo.querySelector(".book-publishers span");
  publishersSpan.textContent = bookPublishers;
  const categoriesSpan = bookInfo.querySelector(".book-categories span");
  categoriesSpan.textContent = bookCategories;
  const countSpan = bookInfo.querySelector(".book-count span");
  countSpan.textContent = bookCount;
}

productInfoBtn.forEach((infoBtn, index) => {
  infoBtn.addEventListener("click", () => {
    const card = productRow.querySelectorAll(".product-card")[index];
    const bookName = card.querySelector(".book-name").textContent;
    const bookCoverSrc = card.querySelector(".card-body img").src;
    const bookAuthor = card.querySelector(".author").textContent;
    const bookPublished = card.querySelector(".book-date").textContent;
    // Replace the following placeholder values with actual data
    const bookPublishers = "Book Publishers";
    const bookCategories = "Book Categories";
    const bookCount = "Book Count";
    infoBookSide(
      bookName,
      bookCoverSrc,
      bookAuthor,
      bookPublished,
      bookPublishers,
      bookCategories,
      bookCount
    );
  });
});

closeInfo.addEventListener("click", () => {
  const bookInfo = document.querySelector(".book-info");
  bookInfo.style.right = "-100%";
});
