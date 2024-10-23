let idLojista = null;

const email = sessionStorage.getItem('userEmail');

if (!email) {
    console.error('E-mail não encontrado no sessionStorage');
} else {
    fetch(`http://localhost:4000/lojistas?email=${email}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const lojista = Array.isArray(data) ? data[0] : data;

            if (!lojista) {
                console.error('Lojista não encontrado');
                return;
            }
            document.getElementById('empresa-name').textContent = lojista.nomeEmpresa || 'Nome da Empresa';
            document.getElementById('empresa-email').textContent = lojista.email || 'email@gmail.com';

            idLojista = lojista.id; 
            console.log('ID do lojista:', idLojista); 
        })
        .catch(error => console.error('Erro ao buscar os dados do lojista:', error));
}

document.getElementById('imagemProduto').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const imgElement = document.querySelector('.profile-pic img'); 

    if (file) {
        const imgURL = URL.createObjectURL(file);
        imgElement.src = imgURL; 
        imgElement.alt = file.name; 
    }
});

document.getElementById('edit-btn').addEventListener('click', async (event) => {
    event.preventDefault();

    const nomeProduto = document.getElementById('nomeProduto').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const descricao = document.getElementById('descricao').value;
    const imagemProduto = document.getElementById('imagemProduto').files[0];

    if (!nomeProduto || isNaN(preco) || !descricao || !idLojista) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const formData = new FormData();
    formData.append('nome', nomeProduto);
    formData.append('preco', preco.toString());
    formData.append('descricao', descricao);
    formData.append('idLojista', idLojista);

    if (imagemProduto) {
        formData.append('imagemProduto', imagemProduto);
    }

    try {
        const response = await fetch('http://localhost:4000/produtos/', {
            method: 'POST',
            body: formData,
        });
    
        const responseText = await response.text();
    
        if (response.ok) {
            alert('Produto adicionado com sucesso!');

            document.getElementById('nomeProduto').value = '';
            document.getElementById('preco').value = '';
            document.getElementById('descricao').value = '';
            document.getElementById('imagemProduto').value = ''; 
            document.querySelector('.profile-pic img').src = '/Dashboard/images/profile.jpg'; 
        } else {
            console.error('Erro na resposta:', responseText);
            alert(`Erro ao adicionar produto: ${responseText}`);
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Ocorreu um erro ao adicionar o produto. Tente novamente.');
    }
});
