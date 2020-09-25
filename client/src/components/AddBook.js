import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries"



class AddBook extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            genre: "",
            author: "",
            language: ""
        }
    }
    // displayAuthors(){
    //     var data = this.props.data
    //     if (data.loading){
    //         return(<option disabled>Loading...</option>)
    //     } else {
    //         return data.authors.map(author => {
    //             return(
    //                 <option key={author.id} value={author.id}>{author.name}</option>
    //             )
    //         })
    //     }
    // }

    submitForm(e){
        e.preventDefault();
        console.log(this.state)
        this.props.addBookMutation({
            variables: {
                title: this.state.title,
                genre: this.state.genre,
                author: this.state.author,
                language: this.state.language
            },
            refetchQueries: [{query: getBooksQuery}]
        });
        this.setState({
            title: '',
            genre: '',
            author: '',
            language: ''
        })
    }

    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book Title:</label>
                    <input type="text" onChange={ (e) => this.setState({title: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <input type="text" onChange={ (e) => this.setState({author: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ (e) => this.setState({genre: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Language:</label>
                    <input type="text" onChange={ (e) => this.setState({language: e.target.value})}/>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default graphql(addBookMutation, { name: "addBookMutation" })(AddBook)
