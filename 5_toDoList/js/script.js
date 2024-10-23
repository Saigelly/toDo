const LIST_TASK = document.querySelector('.task-list__tasks');
const CONTROL_FORM = document.querySelector('.control__form');
let TASK_ID = 0;

//создание карточки таска при нажатие на кнопку добавить или интер
CONTROL_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.querySelector('.control__input')
    //Если что-то введенов инпут, то делаем карточку
    if (taskInput.value) {
        const newTask = document.createElement('li');
        newTask.classList.add('task-list__item', 'item');
        const taskID = `task_${generateTaskID()}`;
        newTask.dataset.taskId = taskID;
        newTask.innerHTML = `
            <input type="checkbox" name="chec-task" onchange="selectedTask()" class="item__checkbox" id="${taskID}" >
            <p class="item__text">${taskInput.value}</p>
                            <ul class="item__action">
                                <li class="btn-action btn-action_done">
                                    <img src="./img/done.png"  alt="done" onclick="doneTask()" class="btn-action__img btn-action__img_done">
                                </li>
                                <li class="btn-action btn-action_del">
                                    <img src="./img/delete.png" alt="delete" onclick="deleteTask()" class="btn-action__img btn-action__img_del">
                                </li>
                            </ul>
        `;
        LIST_TASK.append(newTask);
        taskInput.value = '';
    }
})
//функция которая делает задачу выполненной
function doneTask() {
    event.stopPropagation()
    const pressBtn = event.target;
    pressBtn.classList.contains('btn-action__img_done')
    pressBtn.closest('.task-list__item').classList.toggle('item_done');
}
//функция которая удаляет задачу
function deleteTask() {
    event.stopPropagation()
    const pressBtn = event.target;
    pressBtn.closest('.task-list__item').outerHTML = '';
    updateQuantitySelected();
}
//функция которая отмечает задачу
LIST_TASK.addEventListener('click', (e) => {
    const pressBtn = e.target;
    //записываем нажатый Таск в переменную
    const checkedTaskEl = pressBtn.closest('.task-list__item');
    document.getElementById(checkedTaskEl.dataset.taskId).click();
    //передаем количество выбранных тасков
    updateQuantitySelected();
    //активируем верхнее меню управление
    activeTaskListHeader();
});
//функция которая выделяет таск
function selectedTask(){
    event.target.parentElement.classList.toggle('item_checked');
}
// функция которая отменяет выбор тасков
function cancelSelected() {
    Array.from(document.querySelectorAll('.item__checkbox')).forEach(el => {
        if (el.checked) {
            el.click();
        }
    });
    updateQuantitySelected();
}
// функция которая выделяет все таски
function selectAll(){
    Array.from(document.querySelectorAll('.item__checkbox')).forEach(el => {
        if (!el.checked) {
            el.click();
        }
    });
    updateQuantitySelected();
}
// функция которая удаляет все таски
function deleteAll(){
    Array.from(document.querySelectorAll('.item__checkbox')).forEach(el => {
        if (el.checked) {
            el.closest('.task-list__item').outerHTML = '';
        }
    });
    updateQuantitySelected();
}
//фунукиця для генерации id для Task
function generateTaskID() {
    return TASK_ID += 1;
}
//Функция для подсчета выбранных тасков и запись этих данных в хедере
function updateQuantitySelected() {
    const checkboxCollection = Array.from(document.querySelectorAll('.item__checkbox'));
    const quntiteActiveEl = document.querySelector('.action-list__quntite');
    const quntActive = checkboxCollection.reduce((quant, el) => {
        if (el.checked) {
            quant += 1;
        }
        return quant
    }
        , 0);

    if (quntActive === 0) {
        activeTaskListHeader();
    }
    quntiteActiveEl.textContent = `Выбрано ${quntActive}`
}
//Функция активациии хедра таск листа, если выделен хотябы один таск
function activeTaskListHeader() {
    const checkboxCollection = Array.from(document.querySelectorAll('.item__checkbox'));
    const taskListHeader = document.querySelector('.task-list__header');
    const isActive = checkboxCollection.find(el => el.checked);
    if (isActive && !taskListHeader.classList.contains('_active')) {
        taskListHeader.classList.add('_active');
    }
    if (!isActive) {
        taskListHeader.classList.remove('_active');
    }
}