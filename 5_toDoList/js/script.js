


// 4) Логика массовых действий
//     При нажатие на карточку появляется галочка слева (чекбокс)
//     и появляется кнопки выполнить и удалить, которые будут действовать на все выбранные таски

// 5) где то снизу добавить кнопку "выбрать все" который веберет все чек боксы

// 6) Если хотябы один чекбокс активен, рядом с кнопкой выбрать все появить кнопку "отменить выбор"

const TASK_LIST = document.querySelector('.task__list.task-list')




// 1)Реализовать создание тасков
//      при нажатие на кнопку "Добавить"
//      если что-то есть в инпуте, нарисовать карточку таска с текстом из инпута
const addBtn = document.querySelector('.control__btn');

addBtn.addEventListener('click', () => {
    const taskInput = document.querySelector('.control__input')
    if(taskInput.value){
        const newTask = document.createElement('li');
        newTask.classList.add('task-list__item');
        newTask.innerHTML = `
            <p class="task-list__text">${taskInput.value}</p>
                            <ul class="task-list__action">
                                <li class="task-list__btn task-list__btn_done">
                                    <img src="../5_toDoList/img/done.png"  alt="done" class="task-list__btn-done_img">
                                </li>
                                <li class="task-list__btn task-list__btn_del">
                                    <img src="../5_toDoList/img/delete.png" alt="delete" class="task-list__btn-del_img">
                                </li>
                            </ul>
        `;
        
        TASK_LIST.append(newTask);
        taskInput.value = '';
    }
})

// 2)Сделать логику при нажатие на кнопку done
//      зачеркнуть текст, поменять фон блоку, поставить галочку
// 3)Сделать логику при нажатие кнопки delete
//      удалить карточку


TASK_LIST.addEventListener('click', (e) => {
    const pressBtn = e.target;
     if (pressBtn.classList.contains('task-list__btn-done_img')){
        pressBtn.closest('.task-list__item').classList.toggle('task-list__item_done');
    }
    if (pressBtn.classList.contains('task-list__btn-del_img')){
        pressBtn.closest('.task-list__item').outerHTML = '';
    }
} )