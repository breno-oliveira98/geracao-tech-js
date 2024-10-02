// Função para buscar tarefas da API
function buscarTarefas() {
    fetch("http://localhost:3000/tarefas")
        .then(res => res.json())
        .then(res => {
            inserirTarefa(res);
            console.log(res);
        })
        .catch(err => {
            console.error('Erro ao buscar tarefas: ', err);
        });
}

// Função para inserir tarefas na lista
function inserirTarefa(listaTarefas) {
    if (listaTarefas.length > 0) {
        const tasks = document.getElementById('tasks');
        tasks.innerHTML = ""; // Limpa a lista antes de inserir
        listaTarefas.forEach(tarefas => {
            tasks.innerHTML += `
                <li>
                    <h2>${tarefas.titulo}</h2>
                    <p>${tarefas.descricao}</p>
                    <div class="actions">
                        <box-icon name='trash' onclick="deletarTarefa(${tarefas.id})" size="sm"></box-icon>
                    </div>
                </li>
            `;
        });
    }
}

// Função para fechar o modal
function fecharModal() {
    return document.querySelector('.btn-close').click();
}

const tituloInput = document.getElementById('titleInput')
const descricaoInput = document.getElementById('descriptionInput')

// Função para adicionar uma nova tarefa
function novaTarefa() {
    event.preventDefault(); // Impede o envio padrão do formulário
    console.log(tituloInput.value);
    
    let tarefa = {
        titulo: tituloInput.value,
        descricao: descricaoInput.value,
    };

    fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tarefa)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(res => {
        console.log(res); // Exibe a resposta da API
        buscarTarefas(); // Atualiza a lista de tarefas
    })
    .catch(err => {
        console.error('Erro ao adicionar tarefa: ', err);
    });

    fecharModal(); // Fecha o modal após salvar a tarefa
}

function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
        
    })
    .then(res => res.json())
    .then(res => {
        alert("Deletado")
        console.log(res)
    })
}

buscarTarefas()

// Chama a função para buscar tarefas ao carregar a pági
