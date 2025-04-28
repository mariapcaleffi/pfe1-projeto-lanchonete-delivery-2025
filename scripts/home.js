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

const clienteInput = document.getElementById('cliente');
const enderecoInput = document.getElementById('endereco');
const produtoSelect = document.getElementById('produto');
const gerarPedidoBtn = document.getElementById('gerarPedido');
const execucaoDiv = document.getElementById('execucao');
const acaminhoDiv = document.getElementById('acaminho');
const dataHoraAtual = document.getElementById('dataHoraAtual');

let pedidosExecucao = [];
let pedidosCaminho = [];

// Preencher o select com produtos
produtos.forEach(produto => {
    const option = document.createElement('option');
    option.value = produto.nome;
    option.textContent = produto.nome;
    produtoSelect.appendChild(option);
});

function atualizarDataHora() {
    const agora = new Date();
    const data = agora.toLocaleDateString();
    const hora = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dataHoraAtual.textContent = `Hoje é = ${data} Agora são = ${hora}`;
    return { data, hora };
}

setInterval(atualizarDataHora, 1000);

function criarCard(pedido, tipo) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <p><strong>Cliente:</strong> ${pedido.cliente}</p>
      <p><strong>Produtos:</strong> ${pedido.produtos.join(', ')}</p>
      <p><strong>Endereço:</strong> ${pedido.endereco}</p>
      <p><strong>Data:</strong> ${pedido.data}</p>
      <p><strong>Hora:</strong> ${pedido.hora}</p>
      <button>${tipo === 'execucao' ? 'Enviar Entrega' : 'Pedido Entregue'}</button>
    `;

    const button = card.querySelector('button');
    button.addEventListener('click', () => {
        if (tipo === 'execucao') {
            pedidosExecucao = pedidosExecucao.filter(p => p.id !== pedido.id);
            pedidosCaminho.push({ ...pedido, horaEntrega: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
            renderizarPedidos();
        } else {
            pedidosCaminho = pedidosCaminho.filter(p => p.id !== pedido.id);
            salvarFinalizado(pedido);
            renderizarPedidos();
        }
    });

    return card;
}

function renderizarPedidos () {
    execucaoDiv.innerHTML = '';
    pedidosExecucao.forEach(pedido => {
        execucaoDiv.appendChild(criarCard(pedido, 'execucao'));
    });

    acaminhoDiv.innerHTML = '';
    pedidosCaminho.forEach(pedido => {
        acaminhoDiv.appendChild(criarCard(pedido, 'acaminho'));
    });
}

function salvarFinalizado(pedido) {
    let pedidosFinalizados = JSON.parse(localStorage.getItem('pedidosFinalizados')) || [];
    pedidosFinalizados.push({
        ...pedido,
        horaChegada: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem('pedidosFinalizados', JSON.stringify(pedidosFinalizados));
}

gerarPedidoBtn.addEventListener('click', () => {
    const { data, hora } = atualizarDataHora();

    // Coletar produtos selecionados
    const produtosSelecionados = Array.from(produtoSelect.selectedOptions).map(option => option.value);

    const novoPedido = {
        id: Date.now(),
        cliente: clienteInput.value,
        endereco: enderecoInput.value,
        produtos: produtosSelecionados, // Armazenar múltiplos produtos
        data,
        hora
    };

    pedidosExecucao.push(novoPedido);
    renderizarPedidos();

    clienteInput.value = '';
    enderecoInput.value = '';
    produtoSelect.selectedIndex = -1; // Limpar seleção
});