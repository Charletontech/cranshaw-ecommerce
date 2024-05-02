const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        let wrapper;
        const appendAlert = (message, type) => {
          wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert" style="display:flex; align-items: center; justify-content: space-between;">`,
            `   <div>${message}</div>`,
            '   <button type="button" style="background: transparent;" class="btn" data-bs-dismiss="alert" aria-label="Close"><span class="glyphicon glyphicon-remove"></span></button>',
            '</div>'
          ].join('')

          alertPlaceholder.append(wrapper)
        }


        function submitForm(e) {
          e.innerHTML = "Sending, Please wait...";
        return new Promise((resolve, reject) => {
          const form = document.getElementById('productForm');
          const formData = new FormData(form);

          fetch('/add-product', {
            method: 'POST',
            body: formData
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(data => {
            // Resolve the promise with response data
            resolve(data);
            
            // Display success message
            appendAlert('Success! Product has been added to database. You can fill the form again to add a new product.', 'success');
            e.innerHTML = "Submit";
          })
          .catch(error => {
            // Reject the promise with error
            reject(error);

            // Display error message
            appendAlert('Failed, An error occurred while adding product', 'danger');
            e.innerHTML = "Submit";
          });
        });
      }



    //logic to control dashboard UI
    var genContainer = document.querySelector('.gen-container');
    const order = document.getElementById('order')
    const productForm = document.getElementById('productForm')
    const menuContents = [order, productForm];

    function changeMenu(selectedContent) {
      // genContainer.innerHTML = ``;
      // genContainer.innerHTML = menuContent.innerHTML;
      menuContents.forEach(each => {
        if (each == selectedContent) {
          each.style.display = 'initial'
        } else {
          each.style.display = 'none'
        }
      });
    }
    
    
    //logic to display cart details
    var details = document.querySelectorAll('.details')
    var modalTable = document.querySelector('.modal-body table tbody')
    details.forEach(each => {
      each.addEventListener('click', () => {
        var cartContent = each.parentNode.parentNode.children[5];
        var getTotal = each.parentNode.parentNode.children[3];
        var displayTotal = document.getElementById('total');
        displayTotal.innerHTML = getTotal.innerHTML

        var cartData = JSON.parse(cartContent.innerHTML);
        cartData.forEach(each => {
          var amount = parseFloat(each.price) * parseFloat(each.qty)
          modalTable.innerHTML = ``
          modalTable.innerHTML += `
          <tr>
            <td> ${each.Name} </td>
            <td> ${each.qty} </td>
            <td> ${amount} </td>
          </tr>
          `
        })
      })
    });