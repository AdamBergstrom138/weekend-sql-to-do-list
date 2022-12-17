console.log( 'js' );
$(document).ready(onReady);
function onReady(){
    console.log('JQ');
    fetchAndRenderToDo();
    $( '#submitButton' ).on( 'click', submit)
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
            <td class="ready${todo.id}">${todo.complete}</td>
            <td><button type="button" class="deleteButton">Delete</button></td>
          </tr>
          `);
        //   if (koala.ready_to_transfer === 'N'){
        //     $(`.ready${koala.id}`).empty();
        //     $(`.ready${koala.id}`).append('<td><button type="button" class="transferButton">Ready</button></td>');
        //   }
        }
      }).catch(function(error){
        console.log('error in GET', error);
      });
}

function submit(){
    console.log('in submit');
    letNewTask = $('#toDoIn').val();
    letNewComplete = 'N';
    let taskToSend = {
        task: letNewTask,
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
