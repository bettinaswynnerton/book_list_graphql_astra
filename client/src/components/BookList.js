import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc';
import { getBooksQuery } from "../queries/queries"
import BookDetails from './BookDetails';

class BookList extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    displayBooks(){
        var data = this.props.data
        if (data.loading){
            return(<div>Loading books...</div>)
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.title} onClick= { (e) => this.setState({selected: book.title})}>{book.title}</li>
                )
            })
        }
    }

    render() {
        return (
            <div>
              <ul id="book-list">
                  {this.displayBooks()}
                </ul> 
                <BookDetails bookTitle={ this.state.selected }/> 
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList)


