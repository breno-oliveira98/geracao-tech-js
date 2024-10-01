function buscarTarefas() {
    fetch("http://localhost:3001/tarefas")
        .then(res => res.json())
        .then(res => {
            inserirTarefa(res)
            console.log(res)
        })
}
buscarTarefas()

function inserirTarefa(listaTarefas) {
    if (listaTarefas.length > 0) {
        const tasks = document.getElementById('tasks')
        tasks.innerHTML = ""
        listaTarefas.map(tarefas => {
            tasks.innerHTML +=
                `
            <li>
                <h2>${tarefas.titulo}</h2>
                <p>${tarefas.descricao}</p>
                <div class="actions">
                    <box-icon name='trash' size="sm"></box-icon>
                </div>
            </li>
            `
        })
    }
}


