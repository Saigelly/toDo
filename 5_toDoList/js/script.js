const FIELD_TASK = document.querySelector('.task-list');
const LIST_TASK = document.querySelector('.task-list__tasks');
let TASK_ID = 0;

//создание карточки таска при нажатие на кнопку добавить или интер
const addBtn = document.querySelector('.control__btn');

addBtn.addEventListener('click', () => {
    const taskInput = document.querySelector('.control__input')
    //Если что-то введенов инпут, то делаем карточку
    if (taskInput.value) {
        const newTask = document.createElement('li');
        newTask.classList.add('task-list__item', 'item');

        const taskID = generateTaskID();

        newTask.dataset.taskId = `task_${taskID}`
        newTask.innerHTML = `
            <input type="checkbox" name="chec-task" class="item__checkbox" id="task_${taskID}" >
            <p class="item__text">${taskInput.value}</p>
                            <ul class="item__action">
                                <li class="btn-action btn-action_done">
                                    <img src="../5_toDoList/img/done.png"  alt="done" class="btn-action__img btn-action__img_done">
                                </li>
                                <li class="btn-action btn-action_del">
                                    <img src="../5_toDoList/img/delete.png" alt="delete" class="btn-action__img btn-action__img_del">
                                </li>
                            </ul>
        `;

        LIST_TASK.append(newTask);
        taskInput.value = '';

        //при изменения осстояния чекбокса, меняем стиль Таска на "выбранный"
        newTask.firstElementChild.addEventListener('change', (e) => {
            e.target.parentElement.classList.toggle('item_checked')
        });


    }
})


//обработка нажатий на карточку таска.
FIELD_TASK.addEventListener('click', (e) => {
    const pressBtn = e.target;
    //если кнопка выполнить, то меняем стиль таска на "выполнено"
    if (pressBtn.classList.contains('btn-action__img_done')) {
        pressBtn.closest('.task-list__item').classList.toggle('item_done');
    }
    //если удалить то удаляем
    if (pressBtn.classList.contains('btn-action__img_del')) {
        pressBtn.closest('.task-list__item').outerHTML = '';
        updateQuantitySelected();
    }
    //если кликнули на другие элементы Таска
    if (pressBtn.classList.contains('item__action') ||
        pressBtn.classList.contains('item__text') ||
        pressBtn.classList.contains('task-list__item')) {

        //записываем нажатый Таск в переменную
        const checkedTaskEl = pressBtn.closest('.task-list__item');
        document.getElementById(checkedTaskEl.dataset.taskId).click();
        //передаем количество выбранных тасков
        updateQuantitySelected();

        //активируем верхнее меню управление
        activeTaskListHeader();
    }
    
    // если нажали на cancel отменить выбор
    if (pressBtn.classList.contains('btn-action__img_cancel')) {
        Array.from(document.querySelectorAll('.item__checkbox')).forEach(el => {
            if (el.checked) {
                el.click();
            }
        });
        updateQuantitySelected();
    }
    //Выбрать всё
    if (pressBtn.classList.contains('action-list__btn_choose-all')) {
        Array.from(document.querySelectorAll('.item__checkbox')).forEach(el => {
            if (!el.checked) {
                el.click();
            }
        });
        updateQuantitySelected();
    }
    //Удалить выбранное
    if (pressBtn.classList.contains('action-list__btn_delete-all')) {
        Array.from(document.querySelectorAll('.item__checkbox')).forEach(el => {
            if (el.checked) {
                el.closest('.task-list__item').outerHTML = '';
            }
        });
        updateQuantitySelected();
    }
})


//фнукиця для генерации id для Task
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
    
    if(quntActive === 0){
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