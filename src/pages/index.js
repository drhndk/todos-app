import Image from 'next/image'
import { Inter } from 'next/font/google'
import TodoList from '@/components/TodoList'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import app from '@/lib/firebase/init'
import ShowToastContext from '@/Context/showToastContext'
import InputTodos from '@/components/InputTodos'
import EditTodoContext from '@/Context/editTodoContext'
import CancelEdit from '@/components/CancelEdit'
import { useQuery } from 'react-query'
import Spinner from '@/components/Spinner'
import { fetchData } from '@/Crud/fetchData'



export default function Home() {
  const [todoText, setTodoText] = useState('')
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext)
  const [todoList, setTodoList] = useState([])
  const { data } = useSession()
  const { push } = useRouter()
  const db = getFirestore(app)
  const { editTodo, setEditTodo } = useContext(EditTodoContext)

  useEffect(() => {
    if (!data) {
      push("/login")
    }
    //  else {
    //   getTodoList()
    // }
  }, [data, showToastMsg])
  
  const { data: todosList, isLoading, refetch: refetchTodo } = useQuery('data', () => fetchData(db, data))

  // const getTodoList = async () => {
  //   const q = query(collection(db, "Todo"), where("createBy", "==", data.user.email));
  //   const querySnapshot = await getDocs(q);
  //   const updateData = []
  //   querySnapshot.forEach((doc) => {
  //     updateData.push(doc.data())
  //     // doc.data() is never undefined for query doc snapshots
  //     // console.log(doc.id, " => ", doc.data());
  //     setTodoList(updateData)
  //   });
  // }

  return (
    <div>
      {data &&
        <div className='flex justify-center p-5'>
          <div className='w-[500px]'>
            <div>
              <div className='flex items-center gap-3'>
                <Image src={data.user.image}
                  width={40}
                  height={40}
                  alt='logoUser.png'
                  className='rounded-full'
                />
                <h1 className='text-white'>{data.user.name}</h1>
              </div>
              <div className='bg-blue-200 p-2 rounded-lg
            cursor-pointer flex flex-wrap sm:flex-nowrap w-[90px] mt-2 active:scale-95' onClick={() => signOut()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-500
                hover:animate-pulse transition-all ">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <h1 className="text-slate-500 text-sm">Logout</h1>
              </div>
            </div>

            <div className='flex gap-60 items-center'>
              <h1 className="text-[aqua] text-xl">MY TODOS</h1>
              {/* <h1 className='text-slate-400'>{`Total todo: ${todoList.length}`}</h1> */}
            </div>
            <div className='flex flex-col lg:flex-row sm:flex-row'>
              <InputTodos todoText={todoText} setTodoText={setTodoText} refetchTodo={refetchTodo} todosList={todosList} setTodoList={setTodoList} />
              {editTodo &&
                <CancelEdit setTodoText={setTodoText} />
              }
              {/* <h1 className='text-center mt-[4px]'>{todoList.length > 0 ? 'Todo List :' : 'Kamu belum memiliki catatan'}</h1> */}
            </div>
            {isLoading ? <Spinner widthAndHeight={"w-12 h-12"} />
              :
              <TodoList todoList={todosList} setTodoText={setTodoText} refetchTodo={refetchTodo} />
            }
          </div>
        </div>

      }
    </div>

  )
}
