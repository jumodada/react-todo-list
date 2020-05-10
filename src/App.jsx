import React, {useState, useRef, useEffect, useCallback} from 'react'
import './App.css'

function useCounter(count) {
    const size = useSize()
    return (
        <h1>{count},{size.width}*{size.height}</h1>
    )
}



function useSize() {
    const [size,setSize] = useState(()=>{
        return {
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    })
    const onResize = useCallback(()=>{
        setSize({
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight,
        })
    },[])
    useEffect(()=>{
        window.addEventListener('resize',onResize,false)
        return ()=>{
            window.removeEventListener('resize',onResize,false)
        }
    },[])
    return size
}

function useCount(defaultCount) {
    const [count,setCount] = useState(defaultCount)
    const it = useRef()

    useEffect(()=>{
        it.current = setInterval(()=>{
            setCount(count=>count+1)
        },1000)
    },[])
    useEffect(()=>{
        if(count>=10){
            clearInterval(it.current)
        }
    })
    return [count,setCount]
}

function App(props) {
    const [count] = useCount(0)
    const Counter = useCounter(count)
    return (
        <div>
            <button>
                Click({count})
            </button>
            {Counter}
        </div>
    )
}


export default App;
