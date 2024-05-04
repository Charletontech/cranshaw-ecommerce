//Grabbing generally used data
var menuIcon = document.querySelector(".menuIcon");
var cover = document.querySelector(".cover");
var aside = document.getElementsByTagName("aside")[0];
var cartRowCont = document.querySelector(".cartRowCont");
var displayCategory = document.querySelector(".displayCategory");
var totalDisplay = document.querySelector(".total");
var productsCont = document.querySelector(".productsCont");

const toggleMenu = () => {
  aside.classList.toggle("showAsideMenu");
  cover.classList.toggle("showCover");
};

//show cart logic
let cartCont = document.querySelector(".cartCont");
function toggleCart() {
  cartCont.classList.toggle("showCart");
}

var cart = [];

//logic to fetch products data from server
let products;
var all = document.getElementById("all");
window.addEventListener("DOMContentLoaded", async () => {
  all.classList.add("activeCategory");
  try {
    var getProducts = await axios("/get-all-products");
    products = getProducts.data;

    products.forEach((each) => {
      productsCont.innerHTML += `
                <div class="productCard">
                    <img src="${each.img}" alt="${each.Name} picture" onclick="popUpDetails(e = this)">
                    <div class="productName">
                        <p >${each.Name} </p>
                    </div>
                    <div class="productCardDetailCont">
                        <p>N${each.price}</p>
                        <div>
                            <i class="id" style="display: none;">${each.id}</i>
                            <button>
                            <svg class="addToCart" style="fill: white; margin-top: -0.3em; margin-left: -0.1em;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                `;
    });
  } catch (error) {
    console.error("Error fetching products data from server. Error: ", error);
  }
});

//logic to show product pop up
var productDetailsPop = document.querySelector('.productDetailsPop')
var closePopUp = document.querySelector('.closePopUp')
closePopUp.addEventListener('click', () => {
  productDetailsPop.classList.toggle('showProductDetails')
})
function popUpDetails(e) {
  productDetailsPop.classList.toggle('showProductDetails')
  var imgSrc = e.src;
  var productName = e.parentNode.children[1].children[0].innerText
  var productPrice = e.parentNode.children[2].children[0].innerText
  
  var popUpProductName = document.querySelector('.popUpProductName')
  var popUpProductPrice = document.querySelector('.popUpProductPrice')
  var popUpImg = document.querySelector('.productDetailsPop img')
  
  popUpProductName.innerHTML = productName;
  popUpProductPrice.innerHTML = productPrice;
  popUpImg.src = imgSrc
}




//logic to add product to cart
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("addToCart")) {
    var currentBtn = event.target;
    var prodId = currentBtn.parentNode.parentNode.children[0].innerHTML;
    var foundProd = products.find((product) => product.id == prodId);

    if (foundProd) {
      addProd(foundProd, currentBtn);
    } else {
      alert("Product not found");
    }
  }
});

function addProd(foundProd, currentBtn) {
  currentBtn.parentNode.innerHTML = `<svg style="fill: white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/></svg>`;
  currentBtn.style.fontSize = "0.8em";
  currentBtn.disabled = true;

  if (typeof foundProd.price === "string") {
    foundProd.price = parseFloat(
      foundProd.price.replace(/\W/g, "").replace(/[a-z]/i, "")
    );
  }
  cart.push(foundProd);
  Swal.fire({
    position: "center",
    icon: "success",
    text: "Item added!",
    showConfirmButton: false,
    timer: 1500,
  });
  //call function to update cart UI
  displayCart(foundProd, calcTotal());
}

//logic to update cart UI
function displayCart(foundProd, total) {
  totalDisplay.innerHTML = `N ${total}`;

  cartRowCont.innerHTML += `
    <div class="cartRow">
        <img src="${foundProd.img}" alt="">
        <div class="cartDetails">
            <div class="cartDetailsHeader">
                <h3>${foundProd.Name} ajkdjak dkajaka  </h3>
                <p class="delete">
                    <svg style="fill: red;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </p>
            </div>
            <div class="price-qty-cont">
                <p>N ${foundProd.price}</p>
                <div class="qty-flexBox">
                    <p style="display: none">${foundProd.id}</p>
                    <p class="increaseQty" style="color: white;">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </p>
                    <p>Qty:</p>
                    <p class="qty" >1</p>
                    <p class="decreaseQty">
                        <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z"/></svg>
                    </p>
                </div>
            </div>
        </div>
    </div>
    `;

  //logic to increment qty
  var increaseQty = document.querySelectorAll(".increaseQty");
  increaseQty.forEach((item) => {
    var qty = item.parentNode.children[3];
    var id = item.parentNode.children[0].innerText;
    item.addEventListener("click", function () {
      cart.forEach((item) => {
        if (id == item.id) {
          item.qty = parseFloat(item.qty);
          item.qty += 1;
          qty.innerText = item.qty;
          calcTotal();
          totalDisplay.innerHTML = `N ${calcTotal()}`;
        }
      });
    });
  });

  //logic to decrement qty
  var decreaseQty = document.querySelectorAll(".decreaseQty");
  decreaseQty.forEach((item) => {
    var qty = item.parentNode.children[3];
    var id = item.parentNode.children[0].innerText;
    item.addEventListener("click", function () {
      cart.forEach((item) => {
        if (id == item.id) {
          item.qty -= 1;
          item.qty < 0 ? (item.qty = 0) : item.qty;
          qty.innerText = item.qty;
          calcTotal();
          totalDisplay.innerHTML = `N ${calcTotal()}`;
        }
      });
    });
  });

  //logic to delete item from cart
  var deleteItem = document.querySelectorAll(".delete");
  deleteItem.forEach((each) => {
    each.addEventListener("click", () => {
      Swal.fire({
        position: "top",
        text: "Delete this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      }).then((result) => {
        if (result.isConfirmed) {
          var id =
            each.parentNode.parentNode.children[1].children[1].children[0]
              .innerText;
          var newCart = cart.filter((each) => parseFloat(id) !== each.id);
          cart = newCart;
          each.parentNode.parentNode.parentNode.innerHTML = "";
          totalDisplay.innerHTML = `N ${calcTotal()}`;
          reEnableButton(id);

          Swal.fire({
            position: "top",
            icon: "success",
            text: "Item Deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    });
  });

  //Re-enable add to cart button
  function reEnableButton(id) {
    var productCardId = document.querySelectorAll(".id");
    productCardId.forEach((each) => {
      if (each.innerText == id) {
        each.parentNode.children[1].disabled = false;
        each.parentNode.children[1].style.fontSize = "0.8em";
        each.parentNode.children[1].innerHTML =
          '<svg class="addToCart" style="fill: white; margin-top: -0.3em; margin-left: -0.1em;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>';
      }
    });
  }
}

//logic to calculate total amount in cart
function calcTotal() {
  var total = 0;
  cart.forEach(({ price, qty }) => {
    var subTotal = price * qty;
    total = total + subTotal;
  });
  total < 0 ? (total = 0) : total;
  return total;
}

//logic to clear cart
let clearCart = document.querySelector(".clearCart");
clearCart.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "This will delete all items in cart!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Clear cart!",
  }).then((result) => {
    if (result.isConfirmed) {
      cart.splice(0, cart.length);
      calcTotal();
      if (cartRowCont.hasChildNodes()) {
        //logic to re-enable buttons
        cart.forEach((each) => {
          reEnableButton(each.id);
        });

        //delete items from cart UI
        cartRowCont.innerHTML = ``;
        calcTotal();
        totalDisplay.innerHTML = `N ${calcTotal()}`;
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cleared!",
        text: "Cart is now empty",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
});

//logic to change product category
var categories = document.querySelectorAll(".categories ul li");
categories.forEach((each) => {
  each.addEventListener("click", (e) => {
    removeClass();
    e.target.classList.toggle("activeCategory");
    var category = e.target.innerHTML;
    displayCategory.style.transition = "1s ease-in";
    displayCategory.innerText = category;

    productsCont.innerHTML = ``;
    if (category == "All") {
      displayCategory.innerText = "All Products";
      products.forEach((prod) => {
        productsCont.innerHTML += `
                <div class="productCard">
                    <img src="${prod.img}" alt="${prod.Name} picture">
                    <div class="productName">
                        <p >${prod.Name}</p>
                    </div>
                    <div class="productCardDetailCont">
                        <p>${prod.price}</p>
                        <div>
                            <i class="id" style="display: none;">${prod.id}</i>
                            <button>
                            <svg class="addToCart" style="fill: white; margin-top: -0.3em; margin-left: -0.1em;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                `;
        return;
      });
    }

    products.forEach((prod) => {
      if (prod.category == category) {
        productsCont.innerHTML += `
                <div class="productCard">
                    <img src="${prod.img}" alt="${prod.Name} picture">
                    <div class="productName">
                        <p >${prod.Name}</p>
                    </div>
                    <div class="productCardDetailCont">
                        <p>${prod.price}</p>
                        <div>
                            <i class="id" style="display: none;">${prod.id}</i>
                            <button>
                            <svg class="addToCart" style="fill: white; margin-top: -0.3em; margin-left: -0.1em;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                `;
        return;
      }
    });

    if (!productsCont.hasChildNodes()) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: `No items in ${category} category`,
        showClass: {
          popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
        },
        hideClass: {
          popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
        },
      });
    }
  });
});

function removeClass() {
  categories.forEach((each) => {
    each.style.transition = "ease-in-out 0.5s";
    each.classList.remove("activeCategory");
  });
}

//logic to check login session
function noSession() {
  localStorage.setItem("cranshawCart", JSON.stringify(cart));
  Swal.fire({
    position: "center",
    icon: "info",
    title: "Login Needed",
    text: "We found out you are not logged in on this device. Please login to complete your purchase. Don't worry the items in your cart have been saved.",
    showConfirmButton: true,
    confirmButtonText: "Log me in!",
  }).then(() => {
    window.location.href = "/login-to-create-session";
  });
}

function checkout(e) {
  e.innerHTML = `Please wait...`
  if (cart.length == 0) {
    e.innerHTML = `Checkout`
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Cart Empty!",
      text: "You need to add items to your cart to checkout",
    });
    return;
  }

  var $session = localStorage.getItem("cranshawUser");
  if (!$session) {
    noSession();
  } else {
    var userSessionId = JSON.parse($session).userId
    var getExpiry = JSON.parse($session).expiry;
    var expiryDate = new Date(getExpiry).getTime();
    var currentDate = new Date().getTime();
    if (currentDate > expiryDate) {
      console.log("expired");
      localStorage.removeItem("cranshawUser");
      noSession();
    } else {
      $session = JSON.parse($session);
      //check if user's balance is enough
      var userBalance;
      async function getUserBalance(x) {
        var fetchOptions = {
          method: "POST",
          body: JSON.stringify(x),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        };

        await fetch("/get-user-balance", fetchOptions)
          .then((res) => res.json())
          .then((data) => (userBalance = data))
          .catch((err) => console.error(err));
      }
      getUserBalance($session);

      parseFloat(userBalance) < calcTotal()
        ? Swal.fire({
            icon: "warning",
            title: "Insufficient Funds!",
            text: "Dear esteemed customer, you do not have sufficient funds in your wallet to complete this transaction. Please fund your wallet and try again.",
            showConfirmButton: true,
            confirmButtonText: "Take me to dashboard",
            showCancelButton: true,
          }).then(() => {
            window.location.href = "/login";
          })
        : fetch("/checkout", {
            method: "POST",
            body: JSON.stringify({id: userSessionId, cart: cart}),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.status === 200) {
                Swal.fire({
                  icon: "success",
                  title: "Successful!",
                  text: "Order successfully sent.",
                  timer: 4000,
                });
                cart.splice(0, cart.length);
                cartRowCont.innerHTML = ``;
                totalDisplay.innerHTML = 0;
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error!",
                  text: "An error occurred. You may have insufficient funds.",
                  showConfirmButton: true,
                });
              }
            })
            .catch((err) => {
              console.error(err);
            });
    }
  }
}
