import { doc, setDoc, updateDoc } from "firebase/firestore";

   export  async function postData(data,id,todoText,modifiedAt,db,todosList,editDataTodo,editTodo, refetchTodo) {
        if (editTodo) {
            const todoToUpdate = todosList.find((todos) => todos.id === editDataTodo.id);
            if (todoToUpdate) {
                await updateDoc(doc(db, "Todo", todoToUpdate.id), {
                    todoText: todoText,
                    modifiedAt: modifiedAt,
                })
                refetchTodo()
            }
        } else {
            await setDoc(doc(db, "Todo", id), {
                createBy: data.user.email,
                todoText: todoText,
                id: id,
                modifiedAt: modifiedAt
            });
            refetchTodo()
        }

    }