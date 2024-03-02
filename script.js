const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');
const mostWins = [
    'Lewis Hamilton', // 103
    'Michael Schumacher', // 91
    'Max Verstappen', // 54
    'Sebastian Vettel', // 53
    'Alain Prost', // 51
    'Ayrton Senna', // 41
    'Fernando Alonso', // 32
    'Nigel Mansell', // 31
    'Jackie Stewart', // 27
    'Jim Clark & Niki Lauda' // 25
];
const listItems = [];

let dragStartIndex;

createList();

function createList() {
    [...mostWins]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
        });
    
    addEventListeners()
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index')
}

function dragEnter() {
    this.classList.add('over')
}

function dragLeave() {
    this.classList.remove('over')
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)
    this.classList.remove('over')    
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')
    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()
        if (personName !== mostWins[index]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragover', dragLeave)
    })
}

check.addEventListener('click', checkOrder)