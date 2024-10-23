document.addEventListener('DOMContentLoaded', function() {


    document.getElementById('tela2').addEventListener('click', function() {
        window.location.href = 'signup-stage-2.html';
    });

});

document.getElementById('tela2').addEventListener('click', () => {
    const storeName = document.querySelector('input[placeholder="Digite o nome da loja"]').value;
    const storeCnpj = document.querySelector('input[placeholder="Digite o CNPJ da loja"]').value;
    const storePhoneNum = document.querySelector('input[placeholder="Digite o número de telefone da loja"]').value;

    if (!storeName || !storeCnpj || !storePhoneNum) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    sessionStorage.setItem('storeName', storeName);
    sessionStorage.setItem('storeCnpj', storeCnpj);
    sessionStorage.setItem('storePhoneNum', storePhoneNum);


    window.location.href = './signup2.html';
});

