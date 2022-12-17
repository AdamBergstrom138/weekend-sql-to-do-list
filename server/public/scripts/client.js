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
          <tr ${conditionallyApplyStatus(todo)}data-id=${todo.id}>
            <td class="task">${todo.task}</td>
            <td>${conditionallyApplyChangeButton(todo)}</td>
            <td>${todo.edit}</td>
            <td><button type="button" class="deleteButton">🥫</button></td>
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
// <td><button type="button" class="changeButton">${todo.complete}</button></td>

//<li ${conditionallyApplyVampireStylez(creature)} data-id=${creature.id}>
// function conditionallyApplyVampireStylez(creature) {
//     if (creature.type === 'Vampire') {
//       return 'class="bloood"'
//     }
//     else {
//       return ''
//     }
//   }

function conditionallyApplyChangeButton(todo) {
    if (todo.complete === 'N'){
        return `
        <button type="button" class="changeButton">❌</button>
        `
    } else {
        return `
        <button type="button" class="changeButton">✔️</button>
        `
    }
}

function conditionallyApplyStatus(todo) {
    if (todo.complete === 'Y'){
        return 'class="status"'
    } else {
        return ''
    }
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

