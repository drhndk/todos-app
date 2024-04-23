import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"

function Login() {
    const { data } = useSession()
    const { push } = useRouter()
    useEffect(() => {
        if (data) {
            push('/')
        }
    }, [data])
    return (
        <div className='flex justify-center  
        items-center'>
            <div className="mt-[8%]">
                <div className="flex justify-center">
                    <Image
                        src={'/logo.png'}
                        alt='logo'
                        width={200}
                        height={100}
                    />
                </div>
                <button
                    className=' text-white mt-3'
                    onClick={() => signIn()}>
                    <Image
                        src={'/google1.png'}
                        alt='google'
                        width={300}
                        height={300}
                    />
                </button>
            </div>

        </div>
    )
}

export default Login