// Referencias
const lista = document.querySelector('.container ol');
const inputElementoLista = document.querySelector('main input');
const botaoAdicionarTarefa = document.querySelector('main button');
const botaoDeletarTodasTarefas = document.querySelector('.botao-deletar');
const mostrarLista = document.querySelector('#view');
const boxInput = document.querySelector('.box');
var tarefas = JSON.parse(localStorage.getItem('lista_tarefas')) || [];

// Funções
const atualizarTarefas = () => {
    lista.innerHTML = '';

    for (tarefa of tarefas) {
        var elementoTarefa = document.createElement('li');
        var textoTarefa = document.createTextNode(tarefa);
        var botaoDeletar = document.createElement('i');
        var indiceTarefa = tarefas.indexOf(tarefa);

        botaoDeletar.setAttribute('onclick', 'deletarTarefa(' + indiceTarefa + ')'); botaoDeletar.classList.add('fa', 'fa-trash-o');
        elementoTarefa.appendChild(textoTarefa); lista.appendChild(elementoTarefa); elementoTarefa.appendChild(botaoDeletar);
    };
};

// Função auxiliar
const focoInput = () => { if (window.innerWidth >= 992) { inputElementoLista.focus(); } else { }; };

const adicionarTarefa = () => {
    var textoTarefa = inputElementoLista.value;

    tarefas.push(textoTarefa);
    inputElementoLista.value = '';
    atualizarTarefas(); salvarNoStorage(); fimDaPagina(); inputElementoLista.focus(); setTimeout(() => botaoAdicionarTarefa.disabled = true, 100);
};

const deletarTarefa = (indiceTarefa) => {
    tarefas.splice(indiceTarefa, 1);
    atualizarTarefas(); salvarNoStorage(); focoInput();
};

const salvarNoStorage = () => {
    localStorage.setItem('lista_tarefas', JSON.stringify(tarefas));
}

const deletarTodasTarefas = () => {
    tarefas.splice(0, tarefas.length);
    atualizarTarefas();
    salvarNoStorage();
    focoInput();
};

const ativarBotao = () => { botaoAdicionarTarefa.disabled = (inputElementoLista.value.length <= 0) ? true : false; };

const fimDaPagina = () => { window.scrollTo(0, document.body.scrollHeight); }

// Eventos
window.addEventListener('load', () => { atualizarTarefas(); focoInput(); });
inputElementoLista.addEventListener('input', ativarBotao);
botaoAdicionarTarefa.addEventListener('click', adicionarTarefa);
botaoDeletarTodasTarefas.addEventListener('click', deletarTodasTarefas);
document.addEventListener('keydown', (event) => {
    if (event.which == 13 && inputElementoLista.value.length > 0) { adicionarTarefa(); };
});
mostrarLista.addEventListener('click', () => {
    boxInput.classList.toggle('remove');
    if (mostrarLista.classList.contains("fa-eye")) {
        mostrarLista.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        mostrarLista.classList.replace("fa-eye-slash", "fa-eye");
    };
});

setInterval(() => {
    botaoDeletarTodasTarefas.style.display = (tarefas.length > 0) ? 'flex' : 'none';
    mostrarLista.style.display = (tarefas.length > 0) ? 'flex' : 'none';
}, 100);