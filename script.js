const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

var isButton = false;

var count = 0;

//создаем переменную для массива задач, чтобы работать с localStorage
var arrOfTasks
//если в localStorage уже имеются добавленные нами ранее задачи
if (localStorage.getItem('arrOfTasks')) {

  //мы достаем из localStorage задачи, которые хранятся в виде строки (хоть мы и передавали массив) и делаем из нее массив
  arrOfTasks = localStorage.getItem('arrOfTasks').split(',')
  //делаем из нашего массива 'строку без запятых' и передаем эту строку в качестве html-заполнителя в list
  list.innerHTML = arrOfTasks.join('')

  //обновляем счетчики
  itemCountSpan.innerHTML = list.childElementCount;
  uncheckedCountSpan.innerHTML = list.childElementCount - count;

  //создаем кнопку удвления с первой задачей, если она не создана
  if (!isButton) {
    var button = document.createElement('button');
    button.className = classNames.TODO_DELETE;
    button.innerHTML = 'Delete';
    document.querySelector('.container').append(button);
    isButton = true;
  }

  //делаем кнопку недоступной. с неотмеченными элементами она не нужна
  if (count === 0) {
    document.querySelector('.todo-delete').disabled = true;
  }

  //одалживаем метод forEach у массивов, т.к. у html-коллекций не бывает своего встроенного метода forEach
  list.children.forEach = [].forEach
  //при выборе задачи обновляем счетчик невыбранных элементов и работаем над доступностью кнопки
  list.children.forEach(child => {
    child.children[0].onclick = event => {
      if (event.target.checked == true) {
        count++;
        //если какой-либо элемент отмечен делаем кнопку доступной
        document.querySelector('.todo-delete').disabled = false;
      } else {
        count--;
        //делаем кнопку недоступной. с неотмеченными элементами она не нужна
        if (count == 0) {
          document.querySelector('.todo-delete').disabled = true;
        }
      }
      uncheckedCountSpan.innerHTML = list.childElementCount - count;
    };
  });

  //удаляем выбранные элементы при нажатии на кнопку удаления и обновляем счетчики
  document.querySelector('.todo-delete').onclick = () => {
    document.querySelectorAll('.todo-checkbox').forEach(box => {
      if (box.checked == true) {
        box.parentElement.remove();
        //если мы удалили одну задачу из html-кода, то также удаляем задачу из нашего масива задач и передаем этот массив в качестве нового значения в localStorage
        arrOfTasks.pop()
        localStorage.setItem('arrOfTasks', arrOfTasks)
        count--;
        itemCountSpan.innerHTML = list.childElementCount;
        uncheckedCountSpan.innerHTML = list.childElementCount - count;
      }
    });

    //делаем кнопку недоступной. с неотмеченными элементами она не нужна
    document.querySelector('.todo-delete').disabled = true;

    //когда удалены все элементы из списка задач, убираем и кнопку удаления, т.к. нам больше нечего удвлять
    if (list.childElementCount == 0) {
      document.querySelector('.todo-delete').remove()
      isButton = false;
    }
  };
}
else {
  arrOfTasks = []
}

function newTodo() {

  //создаем элемент списка
  const element = document.createElement('li');
  element.className = classNames.TODO_ITEM;

  //создаем чекбокс
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.className = classNames.TODO_CHECKBOX;
  checkbox.style.display = 'inline-block'

  //создаем параграф для текста задачи
  const paragraph = document.createElement('p');
  paragraph.innerHTML = 'TO DO';
  paragraph.className = classNames.TODO_TEXT;
  paragraph.style.display = 'inline-block'

  //добавляем чекбокс и параграф в элемент списка
  element.append(checkbox);
  element.append(paragraph);

  //код добавленной задачи добавляем в наш массив для работы с localStorage и передаем этот массив в качестве нового значения в localStorage
  arrOfTasks.push(element.outerHTML)
  localStorage.setItem('arrOfTasks', arrOfTasks)

  //добавляем элемент списка в список задач
  list.append(element);

  //обновляем счетчики
  itemCountSpan.innerHTML = list.childElementCount;
  uncheckedCountSpan.innerHTML = list.childElementCount - count;

  //создаем кнопку удвления с первой задачей, если она не создана
  if (!isButton) {
    var button = document.createElement('button');
    button.className = classNames.TODO_DELETE;
    button.innerHTML = 'Delete';
    document.querySelector('.container').append(button);
    isButton = true;
  }

  //делаем кнопку недоступной. с неотмеченными элементами она не нужна
  if (count === 0) {
    document.querySelector('.todo-delete').disabled = true;
  }

  //при выборе задачи обновляем счетчик невыбранных элементов и работаем над доступностью кнопки
  checkbox.onclick = event => {
    if (event.target.checked == true) {
      count++;
      //если какой-либо элемент отмечен делаем кнопку доступной
      document.querySelector('.todo-delete').disabled = false;
    } else {
      count--;
      //делаем кнопку недоступной. с неотмеченными элементами она не нужна
      if (count == 0) {
        document.querySelector('.todo-delete').disabled = true;
      }
    }
    uncheckedCountSpan.innerHTML = list.childElementCount - count;
  };

  //удаляем выбранные элементы при нажатии на кнопку удаления и обновляем счетчики
  document.querySelector('.todo-delete').onclick = () => {
    document.querySelectorAll('.todo-checkbox').forEach(box => {
      if (box.checked == true) {
        box.parentElement.remove();
        //если мы удалили одну задачу из html-кода, то также удаляем задачу из нашего масива задач и передаем этот массив в качестве нового значения в localStorage
        arrOfTasks.pop()
        localStorage.setItem('arrOfTasks', arrOfTasks)
        count--;
        itemCountSpan.innerHTML = list.childElementCount;
        uncheckedCountSpan.innerHTML = list.childElementCount - count;
      }
    });

    //делаем кнопку недоступной. с неотмеченными элементами она не нужна
    document.querySelector('.todo-delete').disabled = true;

    //когда удалены все элементы из списка задач, убираем и кнопку удаления, т.к. нам больше нечего удвлять
    if (list.childElementCount == 0) {
      document.querySelector('.todo-delete').remove()
      isButton = false;
    }
  };

}
