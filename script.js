//document.addEventListener("DOMContentLoaded", getTodos);
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".todo-list");

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  for(i=0; i<=todos.length;i++){
    if (todos[i] == todo) todos.splice(i,1)
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Create list
    const list = document.querySelector(".todo-list")
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    const cMark = document.createElement("span");
    cMark.classList.add("check-mark");
    newTodo.appendChild(cMark);
    const tex = document.createElement("p");
    tex.innerText = todo
    newTodo.appendChild(tex);
    const del = document.createElement("span");
    del.classList.add("delete")
    newTodo.appendChild(del);
    //attach final Todo
    list.appendChild(newTodo);
  });
}

$(function() {
  //$("form,#todo-input").submit(function(event){event.preventDefault()})
  $(document).ready(getTodos(),checkLight())
  
  /* Count */
  function updateCount(){
    var items = $(".todo-item").length;
    $("#counter").text(items+" items")
  }
  updateCount()
  
  /*clear*/
  $(".items-clear").on("click", function(){
    findCompleted();
    let todos = localStorage.getItem("todos");
    let t = JSON.parse(todos)
    for (i in t){
      for (j in ar){
        if (t[i] == ar[j]) removeLocalTodos(t[i]) 
      }
    };
    $(".todo-item.completed").fadeOut(500);
    setTimeout(function(){
    $(".todo-item.completed").remove();
    updateCount()
    }, 750);
  })

  var ar = []
  function findCompleted(){
    $(".todo-list").children().each(function(){
      if ($(this).hasClass("completed"))
        ar.push($(this).text());
    })
  }
  

  /*Check mark*/ 
   $(".check-mark").on("click", function(){
   $(this).toggleClass("checked")
   $(this).siblings().toggleClass("checked")
   $(this).parents(".todo-item").toggleClass("completed");
 })

  /* Add */
  $(".add-mark").on("click", function(){
    let text = $("#todo-input").val();
    saveLocalTodos(text);
    updateCount();
    $("#todo-input").val("")
    window.location.reload();
  })
  $("form").submit(function(){
    let text = $("#todo-input").val();
    saveLocalTodos(text);
    updateCount();
    $("#todo-input").val("")
    window.location.reload();
  })
  
  
  /* Delete */
  $(".delete").on("click",function(){
    let todo = $(this).parent(".todo-item")
    todo.addClass("fall");
    removeLocalTodos($(this).siblings("p").text());
    setTimeout(function(){
    todo.remove();
    updateCount()
    }, 1000);
  })
  
  /* Sort */
  function deselect(){
    $(".items-statuses").children(".in-use").removeClass("in-use");
    $(".todo-item").fadeIn()
  }

  $(".to-do").on("click", function(){
    deselect();
    $(this).addClass("in-use")
    $(".completed").fadeOut()
  })

  $(".finished").on("click", function(){
    deselect();
    $(this).addClass("in-use")
    $(".todo-item:not(.completed)").fadeOut()
  })

  $(".all").on("click", function(){
    deselect();
    $(this).addClass("in-use")
  })
  
  /* Theme cache */
  $(".sun,.moon").on("click",function(){
    lightMode = localStorage.getItem('lightMode');
    if (lightMode != "enabled") {
      enableLightMode();
    }   
    else {  
      disableLightMode();
    }
  })
  function checkLight(){
    lightMode = localStorage.getItem('lightMode')
    if (lightMode === 'enabled') {
      enableLightMode();
    }
    else disableLightMode()
  }

  function enableLightMode(){
    $("body,header,.add-mark,.check-mark,.todo-items-info").addClass("light");
    $(".sun").addClass("none");
    $(".moon").removeClass("none");
    localStorage.setItem("lightMode","enabled")
  }
  function disableLightMode(){
    $("body,header,.add-mark,.check-mark,.todo-items-info").removeClass("light");
    $(".moon").addClass("none");
    $(".sun").removeClass("none");
    localStorage.setItem("lightMode",null)
  }
  
})