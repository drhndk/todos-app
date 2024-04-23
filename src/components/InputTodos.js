import EditTodoContext from "@/Context/editTodoContext";
import ShowToastContext from "@/Context/showToastContext";
import { postData } from "@/Crud/postData";
import app from "@/lib/firebase/init";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import Spinner from "./Spinner";

function InputTodos({ todoText, setTodoText, todosList, setTodoList, refetchTodo }) {
    const [disabledHandle, setDisabledHandle] = useState(true)
    const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext)
    const { editTodo, setEditTodo } = useContext(EditTodoContext)
    const { editDataTodo, setEditDataTodo } = useContext(EditTodoContext)
    const { data } = useSession()
    const id = Date.now().toString()
    const modifiedAt = moment().format("D MMM YYYY LT")
    const db = getFirestore(app)
    const { mutateAsync, status,isLoading } = useMutation("postTodo",() => postData(data, id, todoText, modifiedAt, db, todosList, editDataTodo, editTodo,refetchTodo))


    const createTodo = async () => {
        // Lakukan update data todo di sini
        if (editTodo) {
            await mutateAsync()
            setShowToastMsg('Todo Updated')
        } else {
            // Buat todo baru di sini
            await mutateAsync()
            setShowToastMsg('Todo Created')
        }
        setTodoText('')
        setDisabledHandle(true)
        setEditTodo(false);
    }

    const handleChange = (e) => {
        setTodoText(e.target.value)
        // e.target.value == '' ? setDisabledHandle(true) : setDisabledHandle(false)
    }
    return (
        <div className="flex justify-center mt-[10px]">
            <form action="" >
                <div className="flex gap-2">
                <input type="text" className="border-[1px] border-slate-400 p-[4px] rounded-md" placeholder="Tulis catatan anda... " onChange={handleChange} value={todoText} />
                {isLoading ? <Spinner widthAndHeight={"w-7 h-7"}/> : 
                <button onClick={(e) => createTodo(e.preventDefault())} disabled={todoText == "" ? true : false} className="bg-lime-500 p-2 px-4 border-[1px] border-l-0 ml-[12px] border-slate-400 rounded-full hover:scale-105  cursor-pointer active:scale-95">Submit</button>
    }
                </div>
            </form>
        </div>
    )
}

export default InputTodos
