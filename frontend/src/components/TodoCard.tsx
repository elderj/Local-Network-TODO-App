


import React, { useState } from 'react';
import { TODO_STATUSES } from '../types/todo';
import type { Todo, TodoStatus } from "../types/todo";

interface TodoCardProps {
    todo: Todo;
    updateStatus: (
        id: number,
        status: TodoStatus
    ) => void;

    deleteTodo: (id: number) => void;

    saveEdit: (
        id: number,
        title: string,
        desc: string
    ) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, updateStatus, saveEdit, deleteTodo }) => {

    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDesc, setEditDesc] = useState(todo.desc);
    const [isEditing, setIsEditing] = useState(false)

    function handleSave() {
        saveEdit(todo.id, editTitle, editDesc);
        setIsEditing(false);
    }

    return (

        <div className="todo" key={todo.id} style={{ marginBottom: 12 }}>
            <select
                value={todo.status}
                onChange={(e) =>
                    updateStatus(
                        todo.id,
                        e.target.value as TodoStatus
                    )
                }
            >
                {TODO_STATUSES.map(status => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            {isEditing ? (
                <>
                    <br />
                    <br />
                    Title: <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <br />
                    <br />
                    Description:  <input
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                    />
                    <button onClick={() => handleSave()}>
                        Save
                    </button>

                    <button onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <br />
                    <br />
                    Title:
                    <br />
                    {todo.title}
                    <br />
                    <br />
                    Description:
                    <br />
                    <p>{todo.desc}</p>
                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>
                        Delete
                    </button>
                </>
            )}
        </div>
    );
};

export default TodoCard;




