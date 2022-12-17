console.log( 'js' );
$(document).ready(onReady);
function onReady(){
    console.log('JQ');
    fetchAndRenderToDo();
    $('body').on('click', '#submitButton', submit);
    $('body').on('click', '.deleteButton', deleteToDo);
    $('body').on('click', `.changeButton`, changeCompleteStatus);
    //$('body').on('click', `.changeButtonYes`, changeCompleteStatusYes);
}

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
          <tr data-id=${todo.id}>
            <td>${todo.task}</td>
            <td><button type="button" id=".ready${todo.id}" class="changeButton">${todo.complete}</button></td>
            <td>${todo.edit}</td>
            <td><button type="button" class="deleteButton">Delete</button></td>
          </tr>
          `);
        // if (todo.complete === 'N'){
        //     console.log('rable rable');
        //     console.log(`${todo.complete}`);
        //     $(`#ready${todo.id}`).remove();
        //     $(`#ready${todo.id}`).append(`<td><button type="button" id=".ready${todo.id}" class="changeButtonNo">${todo.complete}</button></td>`);
        // } 
        }
      }).catch(function(error){
        console.log('error in GET', error);
      });
}


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
}

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
    })
}
// function changeCompleteStatusYes(){
//     console.log('in changeCompleteStatusNo');
//     let idToUpdate = $(this).parent().parent().data().id;
//     console.log(idToUpdate);
//     $.ajax({
//       method: 'PUT',
//       url: `/todo/${idToUpdate}`,
//       data: {
//         complete: 'N'
//       }
//     }).then((response) => {
//         fetchAndRenderToDo();
//     }).catch((error) => {
//       console.log('Error in fetchAndRenderToDo();:', error);
//     })
// }

