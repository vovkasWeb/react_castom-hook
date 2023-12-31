import React, { useEffect, useRef, useState } from 'react'
import useScroll from '../hook/useScroll'

const List = () => {
	const [todos, setTodos] = useState([])
	const [page, setPage] = useState(1)
	const limit = 20
    const parentRef = useRef()
    const childRef= useRef();
    const interseted = useScroll(parentRef,childRef,()=>fetchTodos(page,limit))
	function fetchTodos (page,limit)  {
		fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
			.then(response => response.json())
			.then(json => {
                setTodos(prev=>[...prev,...json]);
                setPage(prev =>prev +1)
            })
	}
    



	return (
		<div ref={parentRef} style={{height: '80vh',overflow:'auto'}}>
			{todos
				? todos.map(todo => (
						<div
							key={todo.id}
							style={{ padding: 30, border: '2px solid black' }}
						>
							[{todo.id}] {todo.title}
						</div>
				  ))
				: null}
                <div ref={childRef} style={{height: 20,background:'green'}}/>
		</div>
	)
}

export default List
