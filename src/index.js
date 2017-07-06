import Redux from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

/**action creator */
const addTodo = (text) => {
    return {type: 'add_todo', text}
}

/** reducer */
const todoReducer = (state=[], action) => {
    if(typeof state === 'undefined') {
        return []
    }
    switch(action.type) {
        case 'add_todo':
            return state.concat({text: action.text, completed: false})
        default:
            return state
    }
}

const initialState = [{text: 'Go to swimming', completed: false}, {text: 'enjoy coding', completed: false}]
var store = createStore(todoReducer, initialState)

var App = React.createClass({
    getInitialState: function() {
        return {
            items: store.getState()
        }
    },
    componentDidMount: function(){
		var unsubscribe = store.subscribe(this.onChange);
	},
	onChange: function(){
		this.setState({
			items: store.getState()
		});
	},
    render() {
        return (
            <div>
                <input ref="input" type="text" placeholder="输入todo项" style={{ marginRight: '10px' }} />
                <button onClick = { this.handleAdd }>点击添加</button>
                <ul>
                    {this.state.items.map( item => { return <li style= {{color: 'green', margin: '6px', fontWeight: 'bold'}}>{ item.text }</li> } )}
                </ul>
            </div>
        )
    },
    handleAdd() {
        let input  = ReactDOM.findDOMNode(this.refs.input);
        let value = input.value.trim();

        if(value) {
            store.dispatch(addTodo(value))
        }
        input.value = ""
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('root')
)