import { useEffect, useRef, useState } from 'react';
import style from './CustomHttpHook.module.scss';
import { Tasks } from './Tasks';
import { useApi } from './use-api';

export const CustomHttpHook = () => {
    let [tasks, setTasks] = useState([]);
    let [errorMessage, setErrorMessage] = useState(null);

    let taskNameRef = useRef();

    // ----- ----- ----- ----- ----- GET ----- ----- ----- ----- -----

    let [sendGetRequest, getError] = useApi(); // a sendHttpRequest függvényt, és az errorMessage-t adja vissza

    function getTasks(tasks) { // arrow function esetében a useApi getTasks hívása panaszkodik, hogy előbb lett használva, mint definiálva
        tasks.then(data => {
            let taskList = [];
            for (let key in data) { // objektumon egyszerűen for...in ciklussal mehetünk végig
                taskList.push({ id: key, name: data[key].name });
            }
            setTasks(taskList);
        });
        setErrorMessage(getError);
    };

    const onFetchTasks = () => { // kiszerveztük a sendGetRequest-et, hogy mindenhonnan csak az onFetchTasks függvényt kelljen meghívni
        sendGetRequest(
            'https://react-api-b8dfa-default-rtdb.firebaseio.com/Tasks.json',
            'GET',
            null,
            getTasks // callback függvény, amit akkor hív meg a kód, ha az API-hívás sikeresen lefutott);
        )
    }

    useEffect(() => {
        onFetchTasks();
    }, []);

    // ----- ----- ----- ----- ----- POST ----- ----- ----- ----- -----

    let [sendPostRequest, postError] = useApi();

    function postTask() { // nem kap semmilyen adatot
        // console.log(tasks);
        sendPostRequest(
            `https://react-api-b8dfa-default-rtdb.firebaseio.com/Tasks.json`,
            'POST',
            { name: taskNameRef.current.value },
            createTask
        );
    }

    function createTask(task) { // a POST request válaszát itt kapjuk meg
        task.then((data) => {
            // console.log('data: ', data); // az új task ID-ját kapjuk vissza, esetünkben name kulcs alatt (object)
            onFetchTasks();
        })
    }

    // ----- ----- ----- ----- ----- DELETE ----- ----- ----- ----- -----

    let [sendDeleteRequest, deleteError] = useApi();

    const deleteTask = (id) => {
        sendDeleteRequest(
            `https://react-api-b8dfa-default-rtdb.firebaseio.com/Tasks/${id}.json`,
            'DELETE',
            null,
            onDeleteTask
        );
    }

    function onDeleteTask(task) {
        console.log(task) // pending Promise
        task.then((data) => {
            console.log('then: ', data); // null
            onFetchTasks();
        })
    }

    return (
        <>
            <div className={`${style.task_adder} d-flex align-items-center justify-content-center p-3 mb-1`}>
                <input type="text" placeholder="Task name" ref={taskNameRef}></input>
                <button className='btn btn-success' onClick={postTask}>Create</button>
            </div>
            {!errorMessage && <Tasks tasks={tasks} onDeleteTask={deleteTask}></Tasks>}
            {errorMessage && <p>ERROR: {errorMessage}</p>}
        </>
    )
}