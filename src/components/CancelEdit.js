import EditTodoContext from "@/Context/editTodoContext"
import { useContext } from "react"

function CancelEdit({setTodoText}) {
    const { editTodo, setEditTodo } = useContext(EditTodoContext)
    const{editDataTodo,setEditDataTodo} = useContext(EditTodoContext)
    const cancelEdit = () => {
        setEditDataTodo('')
        setTodoText('');    
        setEditTodo(false);
    }
    return (
        <button onClick={() => cancelEdit()} className="bg-lime-500 p-2 px-4 border-[1px] border-l-0 ml-[24px] sm:ml-2 border-slate-400 rounded-full hover:scale-105  cursor-pointer w-[115px] mt-[4px] md:mt-0 active:scale-95">Cancel Edit</button>
    )
}

export default CancelEdit