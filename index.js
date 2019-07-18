'user strict';

//NOTE when item is added to todo list does not have id key:value pair. how do you use cuid?

const STORE = [
    {id: 1, name: 'buy book', checked: false},
    {id: 2, name: 'defeat ganon in zelda', checked: false},
    {id: 3, name: 'buy groceries', checked: true},
    {id: 4, name: 'stop at post office', checked: false},
]

function generateItemElement(item) {
    return `
    <li data-item-id="${item.id}" class="list-group-item">
        <i class="fas fa-star important"></i>
        <span class="todo-item js-todo-item ${item.checked ? "todo-item__checked" : ''}">${item.name}</span>
        <i class="fas fa-trash-alt delete" id="js-delete"></i>
    </li>`
}

function generateTodoListString(todoarray) {

    //store new array from map method into a variable
    const items = todoarray.map((item) => generateItemElement(item));

    //turns the array returned from the map method into a string
    return items.join("");
}

function renderTodoList() {
    //render the todo list to the page
    console.log('`renderTodoList` ran');

    //generate a string of the todos in the STORE array
    const todoListItemsString = generateTodoListString(STORE);

    //update HTML in the DOM
    $('.js-todo-list').html(todoListItemsString);
    
}



function addItems(item) {
    //push the item to the STORE array
    const addedItem = {id: STORE.length + 1, name: item, checked: false};
    console.log(addedItem);
    STORE.push(addedItem);
    console.log(STORE);
}

function handleNewSubmitItems() {
  
    //on form submit event listener
    $('.js-todo-add-form').submit(function(event) {
        
        //prevent default browser form submission 
        event.preventDefault();
        console.log('`handleNewSubmitItems` ran');

        //get value from input element 
        const newItem = $('.js-todo-entry').val();
        console.log(newItem);

        //reset the input field to be empty 
        $('.js-todo-entry').val('');

        //add item to STORE array
        addItems(newItem)

        //re-render page with newly added items
        renderTodoList();

    });
    
}

function getIdOfElement(item) {
    //returns list item id 
    return $(item).closest('li').data('item-id');
}

function deleteItem(itemId) {
    //use findIndex method on STORE array to get index of item to use to splice out item from array
    const itemIndex = STORE.findIndex((item) => item.id === itemId);
    console.log(itemIndex);

    //use the itemIndex to splice out item from array
    STORE.splice(itemIndex, 1);
    console.log(STORE);
}

function deleteItemClicked() {
    
    //create an event listener on the trash icon
    $('.js-todo-list').on('click', '.delete', (event) => {
        console.log('`deleteItemClicked` ran')

        //get item id of element clicked on using a new function
        const deletedId = getIdOfElement(event.currentTarget);
        console.log(deletedId);

        deleteItem(deletedId);

        renderTodoList();
        
    });
}

//WHY WONT THE JQUERY TOGGLE FUNCTION WORK ??
function toggleColorOfListItem(item) {
     const importantItem = $(item).closest('li');
     console.log(importantItem);

     //toggle class of background color
     $(importantItem).css('background', '#C70039');
     console.log(importantItem);
}

function makeItemImportant() {
    $('.js-todo-list').on('click', '.important', (event) => {
        console.log('`makeItemImportant` ran');
        //store element clicked in a variable- this will be star icon
        const listItem= event.currentTarget;
        console.log(listItem);

        //change color of stare on click to remain yellow
         $(listItem).toggleClass('yellow');

         toggleColorOfListItem(listItem);   
    });
}

//have a function of mouseover event on the list-items to have them change color

function handleTodoList() {
    renderTodoList();
    handleNewSubmitItems();
    deleteItemClicked();
    makeItemImportant();

}

$(handleTodoList);