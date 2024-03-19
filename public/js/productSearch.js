document.getElementById('search-product').addEventListener('click', function() {
    var productCode = document.getElementById('product-code').value;

    // Substitua isso pela chamada ao seu backend
    fetchProductFromBackend(productCode).then(function(product) {
        var productDisplay = document.getElementById('product-display');
        productDisplay.innerHTML = '';

        if (product) {
            productDisplay.innerHTML = 'Produto: ' + product.name + ', Preço: ' + product.price;
        } else {
            productDisplay.innerHTML = 'Nenhum produto encontrado com esse código.';
        }
    });
});

function fetchProductFromBackend(productCode) {
    // Substitua isso pela chamada ao seu backend
    return new Promise(function(resolve, reject) {
        // Simulando um produto sendo retornado
        resolve({ name: 'Produto Exemplo', price: 'R$10,00' });
    });
}