document.getElementById('registerForm').addEventListener('submit', function(event){
    event.preventDefault();

    const  id = 3;
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    fetch('http://localhost:8000/usuarios/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nome, email, senha }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha no registro');
        }
        return response.json();
    })
    .then(data => {
        console.log('Sucesso:', data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
});
