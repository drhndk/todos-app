import EditTodoContext from "@/Context/editTodoContext";
import ShowToastContext from "@/Context/showToastContext";
import app from "@/lib/firebase/init";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { handleEditTodo } from "./InputTodos";
import { useMutation } from "react-query";
import Spinner from "./Spinner";

function TodoList({ todoList, setTodoText,refetchTodo}) {
    const db = getFirestore(app)
    const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext)
    const { editTodo, setEditTodo } = useContext(EditTodoContext)
    const{editDataTodo,setEditDataTodo} = useContext(EditTodoContext)

    const hapusTodo = async (todo) => {
        await deleteDoc(doc(db, "Todo", todo.id))
        refetchTodo()
    }

    const {mutateAsync,isLoading} = useMutation("deleteTodo",(todo) => hapusTodo(todo))

    const deleteTodo = async (todo) => {
        try {
            await mutateAsync(todo)
            setShowToastMsg("Todo deleted")
        }catch (error) {
            console.log(error);
        }
    }
    const handleEditTodo = (todo) => {
        setEditTodo(true);
        setTodoText(todo.todoText);    
        setEditDataTodo(todo)
    }

    return (
        <div>
            {todoList?.map((todo, idx) => (
                <div key={idx}>
                    <div className="flex gap-2 items-center mt-[5px]">
                        <div className="border-[1px] mt-[3px] border-slate-500 w-[270px] md:w-[300px] flex justify-between items-center break-all">
                            <h1 className="px-[2px] py-[2px] text-sm md:text-md text-slate-300">{todo.todoText}</h1>

                        </div>

                        <h1 className="text-xs text-slate-400">{todo.modifiedAt}</h1>
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500 cursor-pointer" onClick={() => handleEditTodo(todo)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        {isLoading ? <Spinner widthAndHeight={"w-5 h-5"}/> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600 cursor-pointer" onClick={() => deleteTodo(todo)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        }
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}
export default TodoList