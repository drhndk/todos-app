import EditTodoContext from '@/Context/editTodoContext'
import ShowToastContext from '@/Context/showToastContext'
import Toast from '@/components/Toast'
import '@/styles/globals.css'

import { SessionProvider } from "next-auth/react"
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [showToastMsg, setShowToastMsg] = useState('')
  const [editTodo, setEditTodo] = useState(false)
  const [editDataTodo, setEditDataTodo] = useState()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
    <ShowToastContext.Provider value={{ showToastMsg, setShowToastMsg }}>
      <EditTodoContext.Provider value={{ editTodo, setEditTodo, editDataTodo, setEditDataTodo }}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
            {showToastMsg &&
              <Toast msg={showToastMsg} />
            }
          </SessionProvider>
      </EditTodoContext.Provider>
    </ShowToastContext.Provider>
    </QueryClientProvider>

  )
}