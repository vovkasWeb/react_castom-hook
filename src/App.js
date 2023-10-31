import {  useReducer, useState } from 'react'
import useInput from './hook/useInput'
import Hover from './components/Hover'
import List from './components/List'
import useDebounce from './hook/useDebounce'
import axios from 'axios'
import useRequest from './hook/useRequest'

function App() {
	const username = useInput('')
	const password = useInput('')

	const [value, setValue] = useState('')
const debouncedSearch = useDebounce(search,500)


const [todos,loding,error] = useRequest(fetchTodos)

	function search(query) {
		fetch(`https://jsonplaceholder.typicode.com/todos`)
			.then(response => response.json())
			.then(json => {
				console.log(json)
			})
	}


	function fetchTodos() {
	return axios.get(`https://jsonplaceholder.typicode.com/todos`)
  }


	const onChange = e => {
		setValue(e.target.value)
    debouncedSearch(e.target.value)
	}
if(loding){
  return<h1>Идет загрузка...</h1>
}
if(error){
  return <h1>Произошла ошибка</h1>
}
	return (
		<div>
			<input type='text' value={value} onChange={onChange} />
			<input {...username} type='text' placeholder='Username' />
			<input {...password} type='text' placeholder='Password' />
			<button onClick={() => console.log(username.value, password.value)}>
				Click
			</button>
			<Hover />
			{/* <List /> */}
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
		</div>
	)
}

export default App
