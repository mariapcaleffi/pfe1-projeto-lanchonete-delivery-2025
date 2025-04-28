const tbody = document.getElementById('tbodyPedidos');
const valorTotalPedidosElement = document.getElementById('valorTotalPedidos'); // Elemento para mostrar o total
const pedidosFinalizados = JSON.parse(localStorage.getItem('pedidosFinalizados')) || [];
const produtos = [
    { id: 1, nome: "Hamburguer", preco: 15.00 },
    { id: 2, nome: "X-Burguer", preco: 18.00 },
    { id: 3, nome: "X-Salada", preco: 20.00 },
    { id: 4, nome: "X-Bacon", preco: 25.00 },
    { id: 5, nome: "X-Egg", preco: 30.00 },
    { id: 6, nome: "X-Tudo", preco: 35.00 },
    { id: 7, nome: "X-Frango", preco: 20.00 },
    { id: 8, nome: "X-Calabresa", preco: 25.00 },
    { id: 9, nome: "X-Picanha", preco: 30.00 },
    { id: 10, nome: "X-File", preco: 35.00 },
    { id: 11, nome: "X-Coração", preco: 20.00 },
    { id: 12, nome: "X-Misto", preco: 25.00 },
    { id: 13, nome: "X-Batata", preco: 30.00 },
    { id: 14, nome: "X-Vegano", preco: 35.00 },
    { id: 19, nome: "Guaraná Lata", preco: 6.00 },
    { id: 20, nome: "Coca-Cola Lata", preco: 7.00 },
    { id: 21, nome: "Fanta Lata", preco: 6.50 },
    { id: 22, nome: "Água Mineral", preco: 3.00 },
    { id: 23, nome: "Suco Natural", preco: 8.00 },
    { id: 24, nome: "Cerveja Lata", preco: 10.00 }
];

let valorTotalGeral = 0; // Variável para armazenar o valor total de todos os pedidos

pedidosFinalizados.forEach(pedido => {
    const tr = document.createElement('tr');

    // Calcular o valor total do pedido
    const produtosSelecionados = pedido.produtos; // Supondo que os produtos estão armazenados como um array
    let valorTotalPedido = 0;

    produtosSelecionados.forEach(produtoNome => {
        const produto = produtos.find(p => p.nome === produtoNome);
        if (produto) {
            valorTotalPedido += produto.preco; // Somar o preço do produto ao total do pedido
        }
    });

    valorTotalGeral += valorTotalPedido; // Somar o valor do pedido ao total geral

    tr.innerHTML = `
        <td>${pedido.id}</td>
        <td>${pedido.cliente}</td>
        <td>${pedido.endereco}</td>
        <td>${pedido.produtos.join(', ')}</td>
        <td>${pedido.data}</td>
        <td>${pedido.hora}</td>
        <td>${pedido.horaEntrega || 'N/A'}</td>
        <td>${pedido.horaChegada || 'N/A'}</td>
        <td>R$ ${valorTotalPedido.toFixed(2)}</td> <!-- Exibir o valor total do pedido -->
    `;

    tbody.appendChild(tr);
});

// Atualizar o valor total no card
valorTotalPedidosElement.textContent = valorTotalGeral.toFixed(2);