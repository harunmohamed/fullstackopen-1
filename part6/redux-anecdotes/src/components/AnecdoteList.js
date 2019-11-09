import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {

	const vote = (id) => {
		const anecdoteToChange = props.anecdotesToShow.find(o => o.id === id)
		props.addVote(id, anecdoteToChange)
		props.setNotif(`You voted for: ${anecdoteToChange.content}`, 10000)

	}


	return (
		<div>
			{
				props.anecdotesToShow.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>vote</button>
						</div>
					</div>
				)
			}
		</div>
	)
}

const anecdotesToShow = (anecdotes, filter) => {
	return anecdotes
		.filter(anecdote =>
			anecdote.content.toLowerCase()
				.includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter),
		filter: state.filter
	}
}

const mapDispatchToProps = {
	addVote,
	setNotif
}



const ConnectedAnecdoteList = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList