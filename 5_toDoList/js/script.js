


// 4) Логика массовых действий
//     При нажатие на карточку появляется галочка слева (чекбокс)
//     и появляется кнопки выполнить и удалить, которые будут действовать на все выбранные таски

// 5) где то снизу добавить кнопку "выбрать все" который веберет все чек боксы

// 6) Если хотябы один чекбокс активен, рядом с кнопкой выбрать все появить кнопку "отменить выбор"

// 7) Менять иконку после нажатия кнопки done на какую-то типо отменить
// const TASK_LIST = document.querySelector('.task-list__tasks') 
// const TASK_LIST_HEADER = document.querySelector('.task-list__header')

const TASK_LIST = document.querySelector('.task__list')
let TASK_ID = 0;
// let TASK_LIST_HEADER_IS_VISIBILITY = false;



//создание карточки таска при нажатие на кнопку добавить или интер
const addBtn = document.querySelector('.control__btn');

addBtn.addEventListener('click', () => {
    const taskInput = document.querySelector('.control__input')
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

        TASK_LIST.append(newTask);
        taskInput.value = '';
    }
})


//обработка нажатий на карточку таска.
TASK_LIST.addEventListener('click', (e) => {
    const pressBtn = e.target;
    //если кнопка выполнить, то меняем стиль таска на "выполнено"
    if (pressBtn.classList.contains('btn-action__img_done')) {
        pressBtn.closest('.task-list__item').classList.toggle('item_done');
    }
    //если удалить то удаляем
    if (pressBtn.classList.contains('btn-action__img_del')) {
        pressBtn.closest('.task-list__item').outerHTML = '';
    }
    //если кликнули на другие элементы Таска
    if (pressBtn.classList.contains('item__action') ||
        pressBtn.classList.contains('item__text') ||
        pressBtn.classList.contains('task-list__item')) {

        //записываем нажатый Таск в переменную
        const checkedTaskEl = pressBtn.closest('.task-list__item');
        //активируем чекбокс с подходящим id
        chekboxChecked(checkedTaskEl.dataset.taskId);
        //меняем стиль таск на "выбранный"
        checkedTaskEl.classList.toggle('item_checked');

        //передаем количество выбранных тасков
        updateQuantitySelected();
        
        //активируем верхнее меню управление
        activeTaskListHeader();
    }
    //если нажали на cancel отменить выбор
    // if(pressBtn.classList.contains('btn-action__img_cancel')){
    //     const checkedCollection = document.querySelectorAll('.item_checked');
    //     checkedCollection.forEach(el => el.classList.remove('item_checked'));
    // }
})

// реализовать алгоритм работы кнопок
// починить баг, при котором если удалить все таски и один из них был выбранный, то менюшка остается, а должна исчезать

//фнукиця для генерации id для Task
function generateTaskID() {
    return TASK_ID += 1;
}

//функция переключения чекбокса
function chekboxChecked(id) {
    const checkBox = document.getElementById(`${id}`);
    checkBox.checked
        ? checkBox.checked = false
        : checkBox.checked = true
}


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
    
        quntiteActiveEl.textContent = `Выбрано ${quntActive}`
}

function activeTaskListHeader(){
    const checkboxCollection = Array.from(document.querySelectorAll('.item__checkbox'));

    const taskListHeader = document.querySelector('.task-list__header');
    
    const isActive = checkboxCollection.find(el => el.checked);
    if(isActive && !taskListHeader.classList.contains('_active')){
        taskListHeader.classList.add('_active');
    }
    if(!isActive){
        taskListHeader.classList.remove('_active');
    }   
}



// Обработка нажатий на кнопки из верхенго меню управления

// TASK_LIST_HEADER.addEventListener('click', (e) =>{

//     const pressBtn = e.target;

//     if(pressBtn.classList.contains('btn-action__img_cancel')){
//         console.log('Yes')
//     }

// })