document.getElementById('formCadastro').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('password').value;

    try {

        const response = await fetch('http://localhost:4000/lojistas/');
        const lojistas = await response.json();


        const lojista = lojistas.find(lojista => lojista.email === email && lojista.senha === password);

        if (lojista) {
            sessionStorage.clear();
            const token = `token_${lojista.id}_${new Date().getTime()}`;
        
           sessionStorage.setItem('authToken', token,);
           sessionStorage.setItem('userEmail',email);

            window.location.href = '../Dashboard/index.html';
        } else {
            alert('E-mail ou senha incorretos.');
        }
    } catch (error) {
        console.error('Erro ao buscar lojistas:', error);
        alert('Erro ao realizar login. Tente novamente mais tarde.');
    }
});

const params = new URLSearchParams(window.location.search);
if (params.get('success') === 'true') {
    document.getElementById('successMessage').style.display = 'block';
}