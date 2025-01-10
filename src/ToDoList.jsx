import React, { useState, useEffect, useRef } from 'react';
import Task from './Task'; // Import the Task component
import EditTask from './EditTask';


const ToDoList = () => {
    const effectRan = useRef(false);
    const url = "http://localhost:3000"

    // // test data
    // const tasks = [
    //     {id: 1, text: "task one", checked: false},
    //     {id: 2, text: "task two", checked: true},
    //     {id: 3, text: "task three", checked: false}
    // ]

    //state to hold array of tasks
    // const [tasksList, setTasksList] = useState([
    //     {id: 1, text: "task one", checked: false, isEditing: false},
    //     {id: 2, text: "task two", checked: true, isEditing: false},
    //     {id: 3, text: "task three", checked: false, isEditing: false}
    // ]);

    //state to hold array of tasks
    const [tasksList, setTasksList] = useState([]);

    console.log(tasksList);

    //state to hold textbox input
    const [taskName, setTaskName] = useState('');

    // const axios = require('axios');

    useEffect(() => {

        if (effectRan.current === false) {
            getTodos();
            console.log("useEffect fired");
        }

        return () => {
            effectRan.current = true;
        };
        

    }, []);

    // const getUsers = () => {
    //     axios.get('/')
    //         .then((response) => {console.log(response.data)})
    // }

    async function getTodos() {
        try {
            const response = await fetch(url);
            const json = await response.json();
            // console.log("Here are the todos from the database")
            // console.log(json);
            // console.log("here is it parsed")
            // console.log(JSON.parse(json))
            // console.log("here is the type")
            // console.log(typeof json);
            // console.log("here is response.body")
            // console.log(response.body())
            json.forEach(task => addToDoFromDB(task));
            // json.map((task) => console.log(task))
            // json.map(console.log("hello"))
        } catch {}



    }

    //function to add todo from database
    const addToDoFromDB = (task) => {
        // const parsedTask = JSON.parse(task);
            const newTask = {
                id: task.id,
                text: task.text,
                checked: task.checked,
                isEditing: false
            };
            // console.log(newTask)
            setTasksList(tasksList => [...tasksList, newTask]);
            // console.log("here is the tasks list")
            // console.log(tasksList)
            setTaskName('');
        // console.log(task.text);
    };

    //function to add todo
    const addToDo = async () => {
        if (taskName != '') {
            const newTask = {
                id: Date.now(),
                text: taskName,
                checked: false,
                isEditing: false
            };
            setTasksList([...tasksList, newTask]);
            setTaskName('');
            console.log("the new task is" + newTask.id + newTask.text + newTask.checked)
            const taskToSend = {
                id: newTask.id,
                text: newTask.text,
                checked: newTask.checked
            }
            const request = new Request(url + '/post', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskToSend),
            });
            console.log("here is the request body from the react thing" + request.body);
            const response = await fetch(request);
            console.log(response.status);
        }
    };

    const deleteToDo = async (id) => {
        setTasksList(
            tasksList.filter((task) => task.id !== id)
        );
        console.log('/delete/' + id);
        const request = new Request(url + '/delete/' + id, {
            method: "DELETE",
        });
        const response = await fetch(request);
    };

    //function to check off todo
    const onChecked = async (id, checked) => {
        console.log("onChecked run");
        console.log(id);
        // console.log(tasksList[1].checked)
        //need to set the task list so that it updates the dom
        //run through all the tasks and change the one with the matching id to checked
        setTasksList(
            tasksList.map((task) => task.id === id ? {...task, checked: !task.checked} : task)
        );
        console.log("checked before sending is" + checked);
        console.log("fliped check is" + !checked);
        const request = new Request(url + '/patch/check/' + id + '/' + !checked, {
            method: 'PATCH',
        });
        const response = await fetch(request);
        // console.log(tasksList[1].checked)
    };

    //function to change an existing todo
    const editTodo = async (id, newText) => {
        setTasksList(
            tasksList.map((task) => task.id === id ? {...task, text: newText, isEditing: false} : task)
        );
        console.log("updated todo on front end");
        console.log(newText);
        const request = new Request(url + '/patch/' + id + '/' + newText, {
            method: 'PATCH',
        });
        const response = await fetch(request);
    }

    //function to change task component to edit task component
    const toggleEdit = (id) => {
        setTasksList(
            tasksList.map((task) => task.id === id ? {...task, isEditing: true} : task)
        );
    }

  return (
    <div>
        {/* I need to run throuhg the tasks list and make Task items */}
        {tasksList.map((task) => task.isEditing ? (
            <EditTask
                id={task.id}
                text={task.text}
                editTodo={editTodo}
            />
        ) : (
            <Task
                id={task.id}
                text={task.text}
                checked={task.checked}
                onChecked={onChecked}
                deleteToDo={deleteToDo}
                toggleEdit={toggleEdit}
            />
        ) )}

        <div className="flex justify-center items-center flex-col">
            <input className="bg-cyan-500 flex justify-center" value={taskName} onKeyDown={(e) => {if(e.key === "Enter") {addToDo()}}} onChange={(e) => setTaskName(e.target.value)}></input>
            <button onClick={() => addToDo()}>Add New Task</button>
        </div>
        {/* <button onClick={() => getTodos()}>Get the todos</button> */}
    </div>
  );
};

export default ToDoList;

