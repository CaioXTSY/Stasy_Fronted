document.querySelector('.login-form').addEventListener('submit', function (event) {
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      event.preventDefault();
    }
  });