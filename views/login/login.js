// 로그인 실패 -> 알림창, 성공 -> 마이 페이지 연결
document.getElementById('login-button').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevents form from submitting in traditional way

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Dummy check: you'd replace this with an actual server request
  if(username === 'user@maiil.com' && password === 'pass') {
      // Successful login, redirecting to another page
      window.location.href = './my page.html'; 
  } else {
      // Failed login, show alert
      alert('Login failed!');
  }
});

//
// Toggle edit mode for profile fields
document.getElementById('editButton').addEventListener('click', function() {
  let fields = ['emailField', 'nameField', 'addressField', 'phoneField'];
  let isEditable = fields.some(id => !document.getElementById(id).hasAttribute('readonly'));

  fields.forEach(id => {
      let field = document.getElementById(id);
      if (isEditable) {
          field.setAttribute('readonly', true);
          field.classList.add('is-static');
      } else {
          field.removeAttribute('readonly');
          field.classList.remove('is-static');
      }
  });

  if (isEditable) {
      // Handle saving logic here (e.g., sending data to the backend)
      alert('회원정보가 변경되었습니다!');
  }

  // Toggle button text between "Edit" and "Save"
  this.textContent = isEditable ? 'Edit' : 'Save';
});
