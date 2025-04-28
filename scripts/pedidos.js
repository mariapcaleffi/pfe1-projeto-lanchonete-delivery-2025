const produtos = [
    { id: 1, nome: "Hamburguer", preco: 15.00 },
    { id: 2, nome: "X-Burguer", preco: 20.00 },
    { id: 3, nome: "X-Salada", preco: 20.00 },
    { id: 4, nome: "X-Bacon", preco: 25.00 },
    { id: 5, nome: "X-Egg", preco: 30.00 },
    { id: 6, nome: "X-Tudo", preco: 35.00 }
];

const pedidoForm = document.getElementById('pedidoForm');
const pedidosContainer = document.getElementById('pedidosContainer');
const tabelaFinalizados = document.getElementById('t abelaFinalizados');
const tbodyFinalizados = document.getElementById('tbodyFinalizados');
const btnConcluidos = document.getElementById('btnConcluidos');

produtos.forEach(produto => {
    const option = document.createElement('option');
    option.value = produto.id;
    option.textContent = produto.nome;
    document.getElementById('produtoSelect').appendChild(option);
});

pedidoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const clienteNome = document.getElementById('clienteNome').value;
    const produtoId = document.getElementById('produtoSelect').value;
    const produto = produtos.find(p => p.id == produtoId);
    const dataHora = new Date().toLocaleString();

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>Cliente: ${clienteNome}</p>
        <p>Data e Hora: ${dataHora}</p>
        <button onclick="finalizarPedido(this)">Finalizar Pedido</button>
    `;
    pedidosContainer.appendChild(card);
    pedidoForm.reset();
});

function finalizarPedido(button) {
    const card = button.parentElement;
    const clienteNome = card.querySelector('p').textContent.split(': ')[1];
    const produtoNome = card.querySelector('h3').textContent;
    const dataHora = card.querySelector('p:nth-child(3)').textContent.split(': ')[1];

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${clienteNome}</td>
        <td>${produtoNome}</td>
        <td>${dataHora}</td>
    `;
    tbodyFinalizados.appendChild(row);
    localStorage.setItem('finalizados', tbodyFinalizados.innerHTML);
    card.remove();
}

btnConcluidos.addEventListener('click', function() {
    const finalizados = localStorage.getItem('finalizados');
    tbodyFinalizados.innerHTML = finalizados || '';
    document.getElementById('finalizados').classList.remove('hidden');
    document.getElementById('listagem').classList.add('hidden');
});