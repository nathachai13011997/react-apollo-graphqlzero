import React from 'react'

const Input = ({addLimit}) => {
    const onKeyDown = (e) =>{
        const lim = e.target.value
        if(e.key === "Enter" && lim){
            addLimit(lim)
        }
    }
    return <>
       <input onKeyDown={onKeyDown}   type="text" className="form-control col" />
    </>
}
export default Input
