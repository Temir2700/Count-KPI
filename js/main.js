let inp1 = $('.inp1')
let inp2 = $('.inp2')
let inp3 = $('.inp3')
let btn = $('#btn')
let list = $('.student-list')
let editItem = null;

btn.on('click', function(){
    console.log(typeof +inp3.val())
    if(!inp1.val() || !+inp2.val() || !+inp3.val()){
        alert('Введите все данные!')
        return
    }
    let students = {
        fullname: inp1.val(),
        task: +inp2.val(),
        test: +inp3.val()
       
    }
    let result = ((+inp2) + (+inp3))/2
    console.log(result)
    showStudents(students)
    showAction()
    inp1.val('');
    inp2.val('');
    inp3.val('')
})
console.log(inp2.val())

function showStudents(students){
    fetch('http://localhost:8000/KPI', {
        method: 'POST',
        body: JSON.stringify(students),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then(() => showAction())
}

function showAction(){
    fetch('http://localhost:8000/KPI')
        .then(result => result.json())
        .then(data => {
            list.html('')

            data.forEach(item => {
                console.log((item.task + item.test))
                list.append(`<li id=${item.id} class="d-flex flex-column pl-5 pt-5 ">Student:${item.fullname} <br>Task: ${item.task} <br>Test: ${item.test} <br>Total KPI: ${(item.task + item.test) / 2}
                 <button class='btn-delete'>Delete</button>
                 <button data-id="${item.id}" class="btn-edit">Edit</button>
                </li>`)
            })
        })
}

$('body').on('click', '.btn-delete', function(event){
    let id = event.target.parentNode.id
    fetch(`http://localhost:8000/KPI/${id}`, {
        method: 'DELETE'
    })
     .then(() => showAction())
})
showAction()

$('body').on('click', '.btn-edit', function(e){
    editItem = $(e.target).attr("data-id")
    fetch(`http://localhost:8000/KPI/${editItem}`)
      .then(res => res.json())
      .then(data => {
          console.log(data)
           $('.edit-fullname').val(data.Fullname)
           $('.edit-task2').val(data.Task)
           $('.edit-test').val(data.Test)
           
           $('.main-modal').css('display', 'block')
      })
})


$('.btn-save').on('click', function(){
    console.log(typeof +$('.edit-task2').val())
    let obj = {
        fullname:  $('.edit-fullname').val(),
        task: +$('.edit-task2').val(),
        test: +$('.edit-test').val(),
    }
    fetch(`http://localhost:8000/KPI/${editItem}`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            "Content-type" : 'application/json'
        }
    })
        .then(() => {
            showAction()
            $('.main-modal').css('display', 'none')
        })
    })

    $('.btn-close').on('click', function(){
        $('.main-modal').css('display', 'none')
    })
    
   

 