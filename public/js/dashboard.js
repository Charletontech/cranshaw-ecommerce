let userId;
let orderHistoryData = [];
let dataSpace = document.getElementById("dataSpace").innerHTML;
dataSpace = JSON.parse(dataSpace);
window.addEventListener("DOMContentLoaded", async () => {
  userId = dataSpace.phone;
  //logic to handle local session
  if (!localStorage.getItem("cranshawUser")) {
    var date = new Date();
    var hour = date.getHours() + 1;
    if (hour > 23) {
      hour = 0;
    }
    var expiry = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hour,
      date.getMinutes()
    );
    localStorage.setItem(
      "cranshawUser",
      JSON.stringify({ userId: userId, expiry: expiry })
    );
  } else {
    console.log("session exists");
  }

  //logic to get transaction history
  var response = await axios.post('/transaction-history', {userId: userId})
  var x = response.data
  x.forEach(each => {
    orderHistoryData.push(each)
  })
});



//logic for fund wallet
function displayDetails() {
  Swal.fire({
    position: "center",
    icon: "info",
    title: "Fund wallet",
    html: `
        <div style="text-align: center;">
            <p>Make a transfer into the following account to fund your wallet</p>
            <br> 
            <b style="color: #7066e0;">Account number</b>
            <br>
            <p> ${dataSpace.account} </p>
            <br>
            <b  style="color: #7066e0;">Account Name</b>
            <p>${dataSpace.fullName}</p>
            <br>
            <b  style="color: #7066e0;">Bank</b>
            <br>
            <p>Hope PSB</p>
        </div>
        `,
    showConfirmButton: true,
  });
}

//logic to show history
var overlay = document.querySelector(".overlay");
function showHistory() {
  overlay.classList.toggle("showOverlay");
}

//logic to show order details
var orderDetails = document.querySelector(".orderDetails");
var orderDetailRow = document.querySelector(".orderDetails table tbody");
var orderDetailTotal = document.querySelector(".orderDetailTotal");
function showOrderDetail(e) {
  orderDetails.classList.toggle("showOrderDetails");
  var id = e.parentNode.children[0].innerText;
  id = id.slice(1);
  var foundProd = orderHistoryData.find((each) => {
    return each.orderID == id;
  });
  if (!foundProd) {
    alert("not found");
    return;
  }
  orderDetailRow.innerHTML = ``;
  var cart = JSON.parse(foundProd.cart)
  cart.forEach((each) => {
    var amount = parseFloat(each.price) * parseFloat(each.qty);
    orderDetailRow.innerHTML += `
            <tr>
                <td>${each.Name}</td>
                <td>${each.qty}</td>
                <td>N ${amount}</td>
            </tr>
        `;
  });

  orderDetailTotal.innerHTML = foundProd.total;
}

//go to store
function store() {
  Swal.fire({
    position: "center",
    icon: "info",
    text: "Please wait while we take you to our store...",
    showConfirmButton: false,
  });
  window.location.href = "/";
}
