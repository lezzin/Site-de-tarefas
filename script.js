// Referencias
let lista = document.querySelector('.container ol');
let inputElementoLista = document.querySelector('main input');
let botaoAdicionarTarefa = document.querySelector('main button');
let botaoDeletarTodasTarefas = document.querySelector('.botao-deletar');
let mostrarLista = document.querySelector('#view');
let boxInput = document.querySelector('.box');

// Funções
var tarefas = JSON.parse(localStorage.getItem('lista_tarefas')) || [];

const atualizarTarefas = () => {
    lista.innerHTML = '';

    for (tarefa of tarefas) {
        var elementoTarefa = document.createElement('li');
        var textoTarefa = document.createTextNode(tarefa);
        var botaoDeletar = document.createElement('i');
        var indiceTarefa = tarefas.indexOf(tarefa);

        botaoDeletar.setAttribute('onclick', 'deletarTarefa(' + indiceTarefa + ')');
        botaoDeletar.classList.add('fa', 'fa-trash-o');

        elementoTarefa.appendChild(textoTarefa);
        lista.appendChild(elementoTarefa);
        elementoTarefa.appendChild(botaoDeletar);
    };
};

const adicionarTarefa = () => {
    var textoTarefa = inputElementoLista.value;

    tarefas.push(textoTarefa);
    inputElementoLista.value = '';
    atualizarTarefas(); salvarNoStorage(); fimDaPagina(); inputElementoLista.focus();
};

const deletarTarefa = (indiceTarefa) => {
    tarefas.splice(indiceTarefa, 1);
    atualizarTarefas(); salvarNoStorage(); inputElementoLista.focus()
};

const salvarNoStorage = () => {
    localStorage.setItem('lista_tarefas', JSON.stringify(tarefas));
}

const deletarTodasTarefas = () => {
    tarefas.splice(0, tarefas.length);
    atualizarTarefas();
    salvarNoStorage();
    inputElementoLista.focus()
};

const ativarBotao = () => {
    if (inputElementoLista.value.length <= 0) {
        botaoAdicionarTarefa.disabled = true
    } else { botaoAdicionarTarefa.disabled = false }
};

const fimDaPagina = () => {
    window.scrollTo(0, document.body.scrollHeight);
}

// Eventos
window.addEventListener('load', () => { atualizarTarefas(); inputElementoLista.focus(); });

botaoAdicionarTarefa.addEventListener('click', adicionarTarefa);
botaoDeletarTodasTarefas.addEventListener('click', deletarTodasTarefas);

document.addEventListener('keydown', (event) => {
    if (event.which == 13 && inputElementoLista.value.length > 0) {
        adicionarTarefa();
        setTimeout(() => botaoAdicionarTarefa.disabled = true, 100)
    };
});

inputElementoLista.addEventListener('input', ativarBotao);
botaoAdicionarTarefa.addEventListener('click', () => {
    botaoAdicionarTarefa.disabled = true;
});

mostrarLista.addEventListener('click', () => {
    boxInput.classList.toggle('remove');
    if (mostrarLista.classList.contains("fa-eye")) {
        mostrarLista.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        mostrarLista.classList.replace("fa-eye-slash", "fa-eye");
    }
})

setInterval(() => {
    // Operadores ternários
    botaoDeletarTodasTarefas.style.display = (tarefas.length > 0) ? 'flex' : 'none';
    mostrarLista.style.display = (tarefas.length > 0) ? 'flex' : 'none';
}, 10);