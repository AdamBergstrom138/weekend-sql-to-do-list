console.log( 'js' );
$(document).ready(onReady);
function onReady(){
    console.log('JQ');
    fetchAndRenderToDo();
    $('body').on('click', '#submitButton', submit); // submits to do from input 
    $('body').on('click', '.deleteButton', deleteToDo); // deletes to do from server
    $('body').on('click', '.changeButton', changeCompleteStatus); // changes complete to 'Y'
    $('body').on('click', '.changeButtonToNo', changeCompleteStatusNo); // changes complete to 'Y'
    $('body').on('click', '.editButton', editSubmit); // currently not working as intended
}
// fetchAndRenderToDo will fetch everything from todo table (database) and render
function fetchAndRenderToDo(){
    console.log( 'in fetchAndRenderToDo()' );
    $.ajax({
       type: 'GET',
       url: '/todo'
      }).then(function(response) {
        $('#toDoTable').empty();
        console.log(response);
        for(let todo of response){
          $('#toDoTable').append(`
          <tr ${conditionallyApplyStatus(todo)}data-id=${todo.id}>
            <td class="task">${todo.task}</td>
            <td>${conditionallyApplyChangeButton(todo)}</td>
            <td><button type="button" class="deleteButton">🥫</button></td>
          </tr>
          `);
        }
      }).catch(function(error){
        console.log('error in GET', error);
      });
}
//   <td>${conditionallyApplyEdit(todo)}</td>  
//   removed this from the table until I finish it.

// conditionallyApplyEdit I haven't quite figured out how I'd like to
// implement an edit feature so I have removed it from the table
function conditionallyApplyEdit(todo) {
    if (todo.edit === 'none'){
        return `
        <button type="button" class="editButton">edit</button>
        `
    } else {
        return `
        <button type="button" class="editedButton">✔️</button>
        `
    }
}
// conditionallyApplyChangeButton will change the button class and emoji
function conditionallyApplyChangeButton(todo) {
    if (todo.complete === 'N'){
        return `
        <button type="button" class="changeButton">❌</button>
        `
    } else {
        return `
        <button type="button" class="changeButtonToNo">✔️</button>
        `
    }
}
// conditionallyApplyStatus will change the class of the table row to 'status'
// this will show a change in the table via css
function conditionallyApplyStatus(todo) {
    if (todo.complete === 'Y'){
        return 'class="status"'
    } else {
        return ''
    }
}
// editSubmit will update edit to 'edited' // need to finish
function editSubmit(){
    console.log('in editsubmit');
    let idToUpdate = $(this).parent().parent().data().id;
    $.ajax({
        method: 'PUT',
        url: `/todo/edit/${idToUpdate}`,
        data: {
          edit: 'edited'
        }
      }).then((response) => {
          fetchAndRenderToDo();
      }).catch((error) => {
        console.log('Error in fetchAndRenderToDo();:', error);
      })
}
// submit will submit (post) a new task to the database
function submit(){
    console.log('in submit');
    letNewTask = $('#toDoIn').val();
    letNewEdit = 'none';
    letNewComplete = 'N';
    let taskToSend = {
        task: letNewTask,
        edit: letNewEdit,
        complete: letNewComplete
    };
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: taskToSend
    }).then((response) => {
        fetchAndRenderToDo();
    }).catch((error) => {
        console.log('Error in submit:', error);
    });
    $('#toDoIn').val('');
}
// deleteToDo will delete the to do from the database
function deleteToDo(){
    console.log('in delete');
    let idToDelete = $(this).parent().parent().data().id;
    console.log(idToDelete);
    $.ajax({
      method: 'DELETE',
      url: `/todo/${idToDelete}`
    }).then((response) => {
        fetchAndRenderToDo();
    }).catch((error) => {
      console.log('Error in deleteToDo:', error);
    })
}
// changeCompleteStatus will change complete to a value of 'Y'
function changeCompleteStatus(){
    console.log('in changeCompleteStatus');
    let idToUpdate = $(this).parent().parent().data().id;
    console.log(idToUpdate);
        $.ajax({
            method: 'PUT',
            url: `/todo/${idToUpdate}`,
            data: {
              complete: 'Y'
            }
          }).then((response) => {
              fetchAndRenderToDo();
          }).catch((error) => {
            console.log('Error in fetchAndRenderToDo();:', error);
          }); 
}
// changeCompleteStatusNo will change complete to a value of 'N'
function changeCompleteStatusNo(){
    console.log('in changeCompleteStatus');
    let idToUpdate = $(this).parent().parent().data().id;
    console.log(idToUpdate);
        $.ajax({
            method: 'PUT',
            url: `/todo/${idToUpdate}`,
            data: {
              complete: 'N'
            }
          }).then((response) => {
              fetchAndRenderToDo();
          }).catch((error) => {
            console.log('Error in fetchAndRenderToDo();:', error);
          }); 
}
