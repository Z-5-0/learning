import style from './CustomHttpHook.module.scss';

export const Tasks = (props) => {
    // console.log(props);
    const onDeleteTask = (id) => {
        props.onDeleteTask(id);
    }

    return (
        <>
            {props.tasks.length === 0 && <p>No tasks!</p>}
            {props.tasks.length > 0 &&
                props.tasks.map((task, index) => {
                    return (
                        <div key={index}
                            className={`${style.task} d-flex align-items-center justify-content-center justify-content-around mb-1`}>
                            <span>{task.name}</span>
                            <button className='btn btn-danger' onClick={() => onDeleteTask(task.id)}>Delete</button>
                        </div>
                    )
                })}
        </>
    )
}