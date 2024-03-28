var menuIcon = document.querySelector('.menuIcon')
var cover = document.querySelector('.cover')
var aside = document.getElementsByTagName('aside')[0]
var cartRowCont = document.querySelector('.cartRowCont')

const  toggleMenu = () => {
    aside.classList.toggle('showAsideMenu')
    cover.classList.toggle('showCover')
}


//show cart logic
let cartCont = document.querySelector('.cartCont')
function toggleCart() {
    cartCont.classList.toggle('showCart')
}

// Add to cart logic
const products = [
    {
        id: 1,
        Name: 'Nike Air',
        img: 'img/Screenshot_20240324-140030.jpg',
        price: 'N 10,000',
        category: 'Shoes',
        qty: 1
    },
    {
        id: 2,
        Name: 'Headphone Pro',
        img: 'img/Screenshot_20240324-135928.jpg',
        price: 'N 15,000',
        category: 'Gadgets',
        qty: 1
    },
    {
        id: 3,
        Name: 'Headphone Max',
        img: 'img/Screenshot_20240324-135928.jpg',
        price: 'N 20,000',
        category: 'Gadgets',
        qty: 1
    }
]

var cart = []


// function addListenersToAddToCartButtons() {
//     let addToCartButtons = document.querySelectorAll('.addToCart');
//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', findProduct);
//     });
// }

// function addListenersToAddToCartButtons() {
//     let addToCart = document.querySelectorAll('.addToCart')

// addToCart.forEach(each => {
//     var currentBtn = each
//     each.addEventListener('click', findProduct)
    
//     function findProduct() {
//         let prodId = each.parentNode.children[0].innerHTML
//         var foundProd = products.find(product => {
//             return product.id == prodId
//         })

//         foundProd ? addProd(foundProd) : alert('product not found');
        
//     }
    

//     function addProd(foundProd) {
//         currentBtn.innerHTML = `<svg style="fill: white;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/></svg> `
//         currentBtn.style.fontSize = '0.8em'
//         currentBtn.disabled = true
//         if (typeof foundProd.price === 'string') {
//             foundProd.price = parseFloat(foundProd.price.replace(/\W/g, '' ).replace(/[a-z]/i, ''))
//         }
//             cart.push(foundProd)
            
//             //call function to update cart UI
//             displayCart(foundProd, calcTotal())
        
//     }  
// });

// //logic to update cart UI
// function displayCart(foundProd, total) {
//     var totalDisplay = document.querySelector('.total')
//     totalDisplay.innerHTML =`N ${total}`

    
//     cartRowCont.innerHTML += `
//     <div class="cartRow">
//             <img src="${foundProd.img}" alt="">
//             <div class="cartDetails">
//                 <div class="cartDetailsHeader">
//                     <h3>${foundProd.Name}</h3>
//                     <p class="delete">
//                     <svg style="fill: red;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
//                     </p>
//                 </div>
//                 <div class="price-qty-cont">
//                     <p>N ${foundProd.price}</p>
//                     <div class="qty-flexBox">
//                         <p style="display: none">${foundProd.id}</p>
//                         <p class="increaseQty" style="color: white;">
//                         <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
//                         </p>
//                         <p>Qty:</p>
//                         <p class="qty" >1</p>
//                         <p class="decreaseQty">
//                         <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z"/></svg>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `


//     //logic to increment qty
//     var increaseQty = document.querySelectorAll('.increaseQty')
//     increaseQty.forEach(item => {
//         var qty = item.parentNode.children[3]
//         var id = item.parentNode.children[0].innerText
//         item.addEventListener('click', function () {
//             cart.forEach(item => {
//                 if (id == item.id) {
//                     item.qty += 1; 
//                     qty.innerText = item.qty;
//                     calcTotal();
//                     totalDisplay.innerHTML =`N ${calcTotal()}`
//                 }
//             });
//         })
//     });
    

//     //logic to decrement qty
//     var decreaseQty = document.querySelectorAll('.decreaseQty')
//     decreaseQty.forEach(item => {
//         var qty = item.parentNode.children[3]
//         var id = item.parentNode.children[0].innerText
//         item.addEventListener('click', function () {
//             cart.forEach(item => {
//                 if (id == item.id) {
//                     item.qty -= 1; 
//                     qty.innerText = item.qty;
//                     calcTotal();
//                     totalDisplay.innerHTML =`N ${calcTotal()}`
//                 }
//             });
//         })
//     });


//     //logic to delete item from cart
//     var deleteItem = document.querySelectorAll('.delete')
//     deleteItem.forEach(each => {
//         each.addEventListener('click', () => {
//             var id = each.parentNode.parentNode.children[1].children[1].children[0].innerText
//             var newCart = cart.filter(each => {
//                 return parseFloat(id) !== each.id
//             })
//             cart = newCart;
//             each.parentNode.parentNode.parentNode.innerHTML = ``
//             totalDisplay.innerHTML =`N ${calcTotal()}`
//             reEnableButton(id)
//         })
//     });

//     //Re-enable add to cart button
    // function reEnableButton(id) {
    //     var productCardId = document.querySelectorAll('.id')
    //     productCardId.forEach(each => {
    //         console.log(each.innerText);
    //         if (each.innerText == id) {
    //             each.parentNode.children[1].disabled = false
    //             each.parentNode.children[1].style.fontSize = '0.8em'
    //             each.parentNode.children[1].innerHTML = '<svg style="fill: white; margin-top: -0.3em; margin-left: -0.1em;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>'
                
    //         }
    //     })
    // }

// }
// }




var totalDisplay = document.querySelector('.total');

document.addEventListener('click', function(event) {
    
    if (event.target.classList.contains('addToCart')) {
        var currentBtn = event.target;
        var prodId = currentBtn.parentNode.parentNode.children[0].innerHTML;
        var foundProd = products.find(product => product.id == prodId);

        if (foundProd) {
            addProd(foundProd, currentBtn);
        } else {
            alert('Product not found');
        }
    }
});


function addProd(foundProd, currentBtn) {
    currentBtn.parentNode.innerHTML = `<svg style="fill: white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/></svg>`;
    currentBtn.style.fontSize = '0.8em';
    currentBtn.disabled = true;

    if (typeof foundProd.price === 'string') {
        foundProd.price = parseFloat(foundProd.price.replace(/\W/g, '').replace(/[a-z]/i, ''));
    }
    cart.push(foundProd);
    Swal.fire({
        position: "top",
        icon: "success",
        text: "Item added!",
        showConfirmButton: false,
        timer: 1500
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
                <h3>${foundProd.Name}</h3>
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
    var increaseQty = document.querySelectorAll('.increaseQty');
    increaseQty.forEach(item => {
        var qty = item.parentNode.children[3];
        var id = item.parentNode.children[0].innerText;
        item.addEventListener('click', function() {
            cart.forEach(item => {
                if (id == item.id) {
                    item.qty += 1;
                    qty.innerText = item.qty;
                    calcTotal();
                    totalDisplay.innerHTML = `N ${calcTotal()}`;
                }
            });
        });
    });

    //logic to decrement qty
    var decreaseQty = document.querySelectorAll('.decreaseQty');
    decreaseQty.forEach(item => {
        var qty = item.parentNode.children[3];
        var id = item.parentNode.children[0].innerText;
        item.addEventListener('click', function() {
            cart.forEach(item => {
                if (id == item.id) {
                    item.qty -= 1;
                    qty.innerText = item.qty;
                    calcTotal();
                    totalDisplay.innerHTML = `N ${calcTotal()}`;
                }
            });
        });
    });

    //logic to delete item from cart
    var deleteItem = document.querySelectorAll('.delete');
    deleteItem.forEach(each => {
        each.addEventListener('click', () => {
            Swal.fire({
                position: 'top',
                text: "Delete this item?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete!"
              }).then((result) => {
                if (result.isConfirmed) {
                    var id = each.parentNode.parentNode.children[1].children[1].children[0].innerText;
                    var newCart = cart.filter(each => parseFloat(id) !== each.id);
                    cart = newCart;
                    each.parentNode.parentNode.parentNode.innerHTML = '';
                    totalDisplay.innerHTML = `N ${calcTotal()}`;
                    reEnableButton(id);
        
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        text: "Item Deleted!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
              });


            
        });
    });


    //Re-enable add to cart button
    function reEnableButton(id) {
        var productCardId = document.querySelectorAll('.id')
        productCardId.forEach(each => {
            if (each.innerText == id) {
                each.parentNode.children[1].disabled = false
                each.parentNode.children[1].style.fontSize = '0.8em'
                each.parentNode.children[1].innerHTML = '<svg class="addToCart" style="fill: white; margin-top: -0.3em; margin-left: -0.1em;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>'
                
            }
        })
    }
}       



//logic to calculate total amount in cart
function calcTotal() {
    var total = 0
    cart.forEach(({price, qty}) => {
        var subTotal = price * qty
        total = total + subTotal
    })
    return total
}


//logic to clear cart
let clearCart = document.querySelector('.clearCart')
clearCart.addEventListener('click', () => {
    Swal.fire({
        title: "Are you sure?",
        text: "This will delete all items in cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Clear cart!"
      }).then((result) => {
        if (result.isConfirmed) {
            cart = [];
            if (cartRowCont.hasChildNodes()) {
                cartRowCont.innerHTML = ``;
                totalDisplay.innerHTML = `N ${calcTotal()}`;
            }

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cleared!",
                text: 'Cart is now empty',
                showConfirmButton: false,
                timer: 1500
              });
        }
      });
   
    
    // while (cartRowCont.hasChildNodes) {
    //     cartRowCont.removeChild
    // }
    // cartRowCont.innerHTML += ` `;
})






//logic to change product category
var categories = document.querySelectorAll('.categories ul li')
categories.forEach(each => {
    each.addEventListener('click', (e) => {
        removeClass()
        e.target.classList.toggle('activeCategory')
        var category = e.target.innerHTML
        var productsCont = document.querySelector('.productsCont')
        productsCont.innerHTML = ``
        products.forEach(prod => {
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
                
                `
                return
            }
                
                //     productsCont.innerHTML = `<h3 style="text-align: center;"> No products in this category.</h3> `
        });

        if ( !productsCont.hasChildNodes()) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                text: `No items in ${category} category`,
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
        }
    })

});

function removeClass() {
    categories.forEach(each => {
        each.style.transition = 'ease-in-out 0.5s'
        each.classList.remove('activeCategory')
        
    });
}









// // Selectors
// var menuIcon = document.querySelector('.menuIcon');
// var cover = document.querySelector('.cover');
// var aside = document.getElementsByTagName('aside')[0];
// var cartRowCont = document.querySelector('.cartRowCont');

// // Function to toggle menu
// const toggleMenu = () => {
//     aside.classList.toggle('showAsideMenu');
//     cover.classList.toggle('showCover');
// };

// // Function to toggle cart
// function toggleCart() {
//     var cartCont = document.querySelector('.cartCont');
//     cartCont.classList.toggle('showCart');
// }

// // Products array
// const products = [
//     {
//         id: 1,
//         Name: 'Nike Air',
//         img: 'img/Screenshot_20240324-140030.jpg',
//         price: 'N 10,000',
//         category: 'Shoes',
//         qty: 1
//     },
//     {
//         id: 2,
//         Name: 'Headphone Pro',
//         img: 'img/Screenshot_20240324-135928.jpg',
//         price: 'N 15,000',
//         category: 'Gadgets',
//         qty: 1
//     },
//     {
//         id: 3,
//         Name: 'Headphone Max',
//         img: 'img/Screenshot_20240324-135928.jpg',
//         price: 'N 20,000',
//         category: 'Gadgets',
//         qty: 1
//     }
// ];

// var cart = [];

// // Function to add listeners to Add to Cart buttons
// function addListenersToAddToCartButtons() {
//     let addToCartButtons = document.querySelectorAll('.addToCart');

//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', findProduct);
//     });
// }

// function findProduct() {
//     let prodId = this.parentNode.children[0].innerHTML;
//     var foundProd = products.find(product => product.id == prodId);

//     foundProd ? addProd(foundProd, this) : alert('Product not found');
// }

// function addProd(foundProd, button) {
//     button.innerHTML = `<svg style="fill: white;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/></svg> `;
//     button.style.fontSize = '0.8em';
//     button.disabled = true;

//     if (foundProd.price.search(/\W/) !== -1) {
//         foundProd.price = parseFloat(foundProd.price.replace(/\W/g, '').replace(/[a-z]/i, ''));
//     }

//     cart.push(foundProd);
//     displayCart(foundProd, calcTotal());
// }

// function displayCart(foundProd, total) {
//     var totalDisplay = document.querySelector('.total');
//     totalDisplay.innerHTML = `N ${total}`;

//     cartRowCont.innerHTML += `
//     <div class="cartRow">
//         <img src="${foundProd.img}" alt="">
//         <div class="cartDetails">
//             <div class="cartDetailsHeader">
//                 <h3>${foundProd.Name}</h3>
//                 <p class="delete">delete</p>
//             </div>
//             <div class="price-qty-cont">
//                 <p>N ${foundProd.price}</p>
//                 <div class="qty-flexBox">
//                     <p style="display: none">${foundProd.id}</p>
//                     <p class="increaseQty" style="color: white;">+</p>
//                     <p>Qty:</p>
//                     <p class="qty" >1</p>
//                     <p class="decreaseQty">-</p>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `;

//     // Reattach event listeners to newly created elements
//     addListenersToCartElements();
// }

// function calcTotal() {
//     var total = 0;
//     cart.forEach(({ price, qty }) => {
//         var subTotal = price * qty;
//         total += subTotal;
//     });
//     return total;
// }

// function clearCart() {
//     var check = confirm('Are you sure you want to clear all products in cart?');
//     if (check) {
//         cart = [];
//         if (cartRowCont.hasChildNodes()) {
//             cartRowCont.innerHTML = '';
//             alert('Cart cleared!');
//         }
//     }
// }

// function removeClass() {
//     var categories = document.querySelectorAll('.categories ul li');
//     categories.forEach(each => {
//         each.style.transition = 'ease-in-out 0.5s';
//         each.classList.remove('activeCategory');
//     });
// }

// // Event Listeners
// menuIcon.addEventListener('click', toggleMenu);
// cover.addEventListener('click', toggleMenu);
// clearCart.addEventListener('click', clearCart);

// categories.forEach(each => {
//     each.addEventListener('click', (e) => {
//         removeClass();
//         e.target.classList.toggle('activeCategory');
//         var category = e.target.innerHTML;
//         var productsCont = document.querySelector('.productsCont');
//         productsCont.innerHTML = '';
//         products.forEach(prod => {
//             if (prod.category == category) {
//                 productsCont.innerHTML += `
//                 <div class="productCard">
//                     <img src="${prod.img}" alt="${prod.Name} picture">
//                     <div class="productName">
//                         <p>${prod.Name}</p>
//                     </div>
//                     <div class="productCardDetailCont">
//                         <p>${prod.price}</p>
//                         <div>
//                             <i class="id" style="display: none;">${prod.id}</i>
//                             <button class="addToCart"><span class="material-symbols-outlined">shopping_cart</span></button>
//                         </div>
//                     </div>
//                 </div>`;
//             }
//         });
//     });
// });






// // Function to add event listeners to "Add to Cart" buttons
// function addListenersToAddToCartButtons() {
//     let addToCartButtons = document.querySelectorAll('.addToCart');
//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', findProduct);
//     });
// }

// // Logic to change product category
// var categories = document.querySelectorAll('.categories ul li');
// categories.forEach(each => {
//     each.addEventListener('click', (e) => {
//         removeClass();
//         e.target.classList.toggle('activeCategory');
//         var category = e.target.innerHTML;
//         var productsCont = document.querySelector('.productsCont');
//         productsCont.innerHTML = '';
//         products.forEach(prod => {
//             if (prod.category == category) {
//                 productsCont.innerHTML += `
//                 <div class="productCard">
//                     <img src="${prod.img}" alt="${prod.Name} picture">
//                     <div class="productName">
//                         <p>${prod.Name}</p>
//                     </div>
//                     <div class="productCardDetailCont">
//                         <p>${prod.price}</p>
//                         <div>
//                             <i class="id" style="display: none;">${prod.id}</i>
//                             <button class="addToCart"><span class="material-symbols-outlined">
//                                 shopping_cart
//                                 </span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 `;
//             } else {
//                 productsCont.innerHTML = `<h3 style="text-align: center;"> No products in this category.</h3> `;
//             }
//         });
//         // Reattach event listeners to "Add to Cart" buttons
//         addListenersToAddToCartButtons();
//     });
// });

// // Call the function to add event listeners initially
// addListenersToAddToCartButtons();











// var cart = []


// const products = [
//     {
//         id: 1,
//         Name: 'Nike Air',
//         img: 'img/Screenshot_20240324-140030.jpg',
//         price: 'N 10,000',
//         category: 'Shoes',
//         qty: 1
//     },
//     {
//         id: 2,
//         Name: 'Headphone Pro',
//         img: 'img/Screenshot_20240324-135928.jpg',
//         price: 'N 15,000',
//         category: 'Gadgets',
//         qty: 1
//     },
//     {
//         id: 3,
//         Name: 'Headphone Max',
//         img: 'img/Screenshot_20240324-135928.jpg',
//         price: 'N 20,000',
//         category: 'Gadgets',
//         qty: 1
//     }
// ]


// // Selectors
// var menuIcon = document.querySelector('.menuIcon');
// var cover = document.querySelector('.cover');
// var aside = document.getElementsByTagName('aside')[0];
// var cartRowCont = document.querySelector('.cartRowCont');
// var clearCart = document.querySelector('.clearCart');
// var categories = document.querySelectorAll('.categories ul li');
// var cartCont = document.querySelector('.cartCont');

// // Functions
// const toggleMenu = () => {
//     aside.classList.toggle('showAsideMenu');
//     cover.classList.toggle('showCover');
// };

// function toggleCart() {
//     cartCont.classList.toggle('showCart');
// }

// function addListenersToAddToCartButtons() {
//     let addToCartButtons = document.querySelectorAll('.addToCart');
//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', findProduct);
//     });
// }

// function findProduct() {
//     let prodId = this.parentNode.children[0].innerHTML;
//     let foundProd = products.find(product => product.id == prodId);

//     foundProd ? addProd(foundProd) : alert('Product not found');
// }

// function addProd(foundProd) {
//     this.innerHTML = 'Added';
//     this.disabled = true;

//     if (foundProd.price.search(/\W/) !== -1) {
//         foundProd.price = parseFloat(foundProd.price.replace(/\W/g, '').replace(/[a-z]/i, ''));
//     }

//     cart.push(foundProd);
//     displayCart(foundProd, calcTotal());
// }

// function displayCart(foundProd, total) {
//     var totalDisplay = document.querySelector('.total');
//     totalDisplay.innerHTML = `N ${total}`;

//     cartRowCont.innerHTML += `
//     <div class="cartRow">
//         <img src="${foundProd.img}" alt="">
//         <div class="cartDetails">
//             <div class="cartDetailsHeader">
//                 <h3>${foundProd.Name}</h3>
//                 <p class="delete">delete</p>
//             </div>
//             <div class="price-qty-cont">
//                 <p>N ${foundProd.price}</p>
//                 <div class="qty-flexBox">
//                     <p style="display: none">${foundProd.id}</p>
//                     <p class="increaseQty" style="color: white;">+</p>
//                     <p>Qty:</p>
//                     <p class="qty" >1</p>
//                     <p class="decreaseQty">-</p>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `;

//     // Reattach event listeners to newly created elements
//     //addListenersToCartElements();
// }

// function calcTotal() {
//     var total = 0;
//     cart.forEach(({ price, qty }) => {
//         var subTotal = price * qty;
//         total += subTotal;
//     });
//     return total;
// }

// function clearCart() {
//     var check = confirm('Are you sure you want to clear all products in cart?');
//     if (check) {
//         cart = [];
//         if (cartRowCont.hasChildNodes()) {
//             cartRowCont.innerHTML = '';
//             alert('Cart cleared!');
//         }
//     }
// }

// function removeClass() {
//     categories.forEach(each => {
//         each.style.transition = 'ease-in-out 0.5s';
//         each.classList.remove('activeCategory');
//     });
// }

// // Event Listeners
// menuIcon.addEventListener('click', toggleMenu);
// cover.addEventListener('click', toggleMenu);
// clearCart.addEventListener('click', clearCart);

// categories.forEach(each => {
//     each.addEventListener('click', (e) => {
//         removeClass();
//         e.target.classList.toggle('activeCategory');
//         var category = e.target.innerHTML;
//         var productsCont = document.querySelector('.productsCont');
//         productsCont.innerHTML = '';
//         products.forEach(prod => {
//             if (prod.category == category) {
//                 productsCont.innerHTML += `
//                 <div class="productCard">
//                     <img src="${prod.img}" alt="${prod.Name} picture">
//                     <div class="productName">
//                         <p>${prod.Name}</p>
//                     </div>
//                     <div class="productCardDetailCont">
//                         <p>${prod.price}</p>
//                         <div>
//                             <i class="id" style="display: none;">${prod.id}</i>
//                             <button class="addToCart"><span class="material-symbols-outlined">
//                                 shopping_cart
//                                 </span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 `;
//             } else {
//                 productsCont.innerHTML = `<h3 style="text-align: center;"> No products in this category.</h3> `;
//             }
//         });
//         addListenersToAddToCartButtons();
//     });
// });

// // Initial setup
// addListenersToAddToCartButtons();
