import './styles.css'
import React, { define } from 'react-mvx'
import ReactDOM from 'react-dom'
import { Record } from 'type-r'
import { localStorageIO } from 'type-r/endpoints/localStorage'

@define class AppState extends Record {
    // Persist this class to the local storage.
    static endpoint = localStorageIO( '/react-mvx/example' );

    // Define state structure
    static attributes = {
        id : 'form',
        name : '',
        email : '',
        isActive : true
    }
}

@define class Application extends React.Component {
    static State = AppState;

    componentWillMount(){
        // Load from the local storage.
        this.state.fetch();
    }

    // Save to the local storage
    onSubmit =  e => {
        e.preventDefault();
        this.state.save();
    }

    onCancel = () => this.state.set( this.state.defaults() );

    render(){
        // Link the state...
        const { name, email, isActive } = this.linkAll();

        return (
            <form onSubmit={ this.onSubmit }>
                <label>
                    Name: <input type="text" { ...name.props }/>
                </label>

                <label>
                    Email: <input type="text" { ...email.props }/>
                </label>

                <label>
                    Is active: <input type="checkbox" { ...isActive.props }/>
                </label>

                <button type="submit">Save</button>
                <button type="button" onClick={ this.onCancel }>
                    Clear
                </button>
            </form>
        );
    }
}

ReactDOM.render( <Application/>, document.getElementById( 'react-application' ) );