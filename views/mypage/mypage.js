
  const showModalButton = document.getElementById('showModal');
  const closeModalButton = document.getElementById('closeModal');
  const cancelModalButton = document.getElementById('cancelModal');
  const submitFormButton = document.getElementById('submitForm');
  const modal = document.getElementById('modal1');
  const form = document.getElementById('signupForm');

  // Show modal
  showModalButton.addEventListener('click', function() {
    modal.classList.add('is-active');
  });

  // Close modal
  closeModalButton.addEventListener('click', function() {
    modal.classList.remove('is-active');
  });

  // Cancel modal
  cancelModalButton.addEventListener('click', function() {
    modal.classList.remove('is-active');
  });

  // Submit form
  submitFormButton.addEventListener('click', function() {
    // Here you can fetch the form data and send it somewhere
    const formData = new FormData(form);
    
    // Just an example: Log out the ID
    console.log(formData.get('newId'));

    modal.classList.remove('is-active');
  });

  // My Order 누를 시 모달창
  const showOrderModalButton = document.getElementById('showOrderModal');
  const closeOrderModalButton = document.getElementById('closeOrderModal');
  const closeOrderModalFooterButton = document.getElementById('closeOrderModalFooter');
  const orderModal = document.getElementById('modal2');
  
  // Show order modal
  showOrderModalButton.addEventListener('click', function() {
    // Before showing the modal, you can fetch and display the order data here
    // For demonstration purposes, I'll populate it with some dummy data:
    populateOrderList([
      { name: '제품1', quantity: 2, price: '$20', address: '서울', status: '배송중' },
      { name: '제품2', quantity: 1, price: '$15', address: '부산', status: '배송완료' },
    ]);
  
    orderModal.classList.add('is-active');
  });
  
  // Close order modal
  closeOrderModalButton.addEventListener('click', function() {
    orderModal.classList.remove('is-active');
  });
  
  closeOrderModalFooterButton.addEventListener('click', function() {
    orderModal.classList.remove('is-active');
  });
  
  function populateOrderList(orders) {
    const orderListElem = document.getElementById('orderList');
    orderListElem.innerHTML = '';  // Clear current list
  
    orders.forEach(order => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${order.name}</td>
        <td>${order.quantity}</td>
        <td>${order.price}</td>
        <td>${order.address}</td>
        <td>${order.status}</td>
      `;
      orderListElem.appendChild(row);
    });
  }
  
