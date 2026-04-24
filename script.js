let tasks = [];

function addTask(){
    let taskField = document.getElementById("task");
    let desFeild = document.getElementById("des");

    let task = taskField.value;
    let des = desFeild.value;

    if(task === "" || des === ""){
        alert("Enter task and description");
        return;
    }

    tasks.push({
        task:task,
        des:des
    });

    saveToLocalStorage();

    taskField.value = "";
    desFeild.value = "";

    displayTask();

}

function displayTask(){
    let list = document.getElementById("list");
    list.innerHTML = "";

    tasks.forEach((item,index)=>{
        list.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.task}</td>
                <td>${item.des}</td>
                <td>
                    <button class="btn btn-warning text-center" onclick="editTask(${index})">Edit</button>
                    <button class = "btn btn-danger text-center" onclick="deleteTask(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editTask(index){
    let newTask = prompt("Edit your task", tasks[index].task);
    let newDes = prompt("Edit your description", tasks[index].des);

    if(newTask !== null && newTask !== "" && newDes !== null && newDes !== ""){
        tasks[index].task = newTask;
        tasks[index].des= newDes;
        saveToLocalStorage();
        displayTask();
    }
}

function deleteTask(index){
    
    tasks.splice(index,1);
saveToLocalStorage();
displayTask();
}

function saveToLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadLocalStorage(){
   let data = localStorage.getItem("tasks");
    if(data){
        tasks = JSON.parse(data);
    }
    displayTask();
}
window.onload = loadLocalStorage;