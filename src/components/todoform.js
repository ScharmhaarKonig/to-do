import React, {useState} from 'react';

export const Todoform = ({addTodo}) => {
    const [value, setValue] = useState("")

    const handleSubmit = e => {
        e.preventDefault();

        addTodo(value)


    }
    return (
        <form className='todoform' onSubmit={handleSubmit}>
            <input type='text' className='todo-input' value={value} placeholder='enter task here' onChange={(e) => setValue(e.target.value)}/>
            <button type='submit' className='todo-btn'>Add Task</button>
        </form>
    )
}