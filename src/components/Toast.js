import ShowToastContext from "@/Context/showToastContext";
import { useContext, useEffect } from "react"

function Toast({msg}) {
    const {showToastMsg,setShowToastMsg} = useContext(ShowToastContext)
    useEffect(() => {
        setInterval(() => {
            setShowToastMsg('')
        }, 2000);
    },[showToastMsg])

    return (    
<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>{msg}</span>
  </div>
</div>
    )
}

export default Toast