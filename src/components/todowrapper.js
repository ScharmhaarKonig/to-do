import React, {useState} from 'react';
import { Todoform } from './todoform';
import {v4 as uuidv4 } from 'uuid';
uuidv4();

export const Todowrapper = () => {
    const [todos, setTodos] = useState([])

    const addTodo = todo => {
        setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false }])
    }
    return (
        <div className='Todowrapper'>
            <Todoform addTodo={addTodo}/>
        </div>
    )
}