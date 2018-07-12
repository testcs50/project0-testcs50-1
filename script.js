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
