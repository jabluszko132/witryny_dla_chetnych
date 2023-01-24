let taskList = [];

// console.log(Array.prototype.indexOf.call(sth.chidlren,element));

function Task(date,taskName,isRealised)
{
    this.date = date,
    this.taskName = taskName,
    this.isRealised = isRealised,
    this.getData = function ()
    {
        console.log(`Nazwa zadania ${this.taskName} Termin zadania: [${this.date}] Czy zrealizowane: ${tlumaczenie(this.isRealised)}`);
    }
}


function tlumaczenie(x)
{
    if(x) return "tak";
    else return "nie";
}

add.onclick = function () 
{
    if (taskName.value != "")
    {
        let task = document.createElement('li');
        const newTask = new Task(date.value,taskName.value,false);
        taskList.push(newTask);
        task.innerHTML = "<input onchange='displayImage(event)' type='file' accept='image/png image/jpg image/webpm'> <div>" + taskName.value + "</div>" + " <a href='#' class='edits' onclick='edytuj(event)'>Edit</a><a href='#' onclick='giveThemData(event)'>Log</a><input type='checkbox' onclick='taskCompletion(event)'><br>";
        taskName.value = "";
        task.setAttribute('width', '100%');
        task.setAttribute('height', '3em');
        task.setAttribute('class', 'zadania');
        list.appendChild(task);
    }
    checkIfEmpty();
}




function edytuj(event) { // event target => a (edit)
    event.target.parentNode.setAttribute('id','currentTask');  
    currentTask.innerHTML = "<input type='text' value='" + taskList[taskNumber()].taskName + "' onblur='zmiana(event)' style='width: 50%; height: 2em;'> ";
}

function zmiana(event) {    //event target => text input
    if (event.target.value == "") 
    {
        taskList.splice(taskNumber(),1); 
        currentTask.remove();
        checkIfEmpty();
    }
    else 
    {
        currentTask.innerHTML = "<input onchange='displayImage(event)' type='file' accept='image/png image/jpg image/webpm'><div>" + event.target.value + "</div>" + " <a href='#' class='edits' onclick='edytuj(event)'>Edit</a><a href='#' onclick='giveThemData(event)'>Log</a><input type='checkbox' onclick='taskCompletion(event)'><br>";
        taskList[taskNumber()].taskName = event.target.value;
        currentTask.setAttribute('id','');
    }
}


function giveThemData(event) //event target => a href= (log)
{
    event.target.parentNode.setAttribute('id','currentTask');
    taskList[taskNumber()].getData();
    currentTask.setAttribute('id','');
}


function taskNumber()
{
    return Array.prototype.indexOf.call(currentTask.parentNode.children,currentTask);
}



function checkIfEmpty()
{
    if (list.children.length == 0) notask.style.display = "block";
    else notask.style.display = "none"; 
}


function taskCompletion(event)
{
    event.target.parentNode.setAttribute('id','currentTask');
    taskList[taskNumber()].isRealised = true;
    currentTask.setAttribute('id','');
}


function displayImage(event)
{
    const reader = new FileReader();
    var upimage = "";
    reader.addEventListener('load', () => {
        upimage = reader.result;
        let newImg = document.createElement('img');
        newImg.setAttribute('src',upimage);
        newImg.setAttribute('class','taskImg');
        event.target.parentNode.insertBefore(newImg,event.target.parentNode.children[0]);
        event.target.remove();

    })
    console.log(event.target.files);
    reader.readAsDataURL(event.target.files[event.target.files.length-1]);
}