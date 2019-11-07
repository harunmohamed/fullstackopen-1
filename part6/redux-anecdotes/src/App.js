import React from 'react';
// import { addAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
	const anecdotes = props.store.getState()

	const vote = (id) => {
		console.log('vote', id)
		props.store.dispatch({
			type: 'VOTE',
			id
		})
	}

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		props.store.dispatch({
			type: 'ADD',
			// data: {
			// 	content,
			// 	important: false,
			// 	id: generateId()
			// }
			content
		})
		event.target.anecdote.value = ''
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='anecdote' /></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default App