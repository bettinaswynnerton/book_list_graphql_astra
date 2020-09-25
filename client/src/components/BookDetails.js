import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc';
import { getBookQuery } from "../queries/queries"

class BookDetails extends Component {
    displayBookDetails() {
        const {book} = this.props.data 
        if (book) {
            return (
                <div>
                    <h2>{ book.title }</h2>
                    <p> { book.author }</p>
                    <p> { book.genre } </p>
                    <p> { book.language }</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {
                            book.authorName.books.map(item => {
                                return <li key={item.title} >{item.title}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }
    }
    render() {
        return (
            <div id="book-details">
                <p>Book details:</p>
                { this.displayBookDetails() }
            </div>
        )
    }
}

export default graphql(getBookQuery, {options: (props) => {
    return {
        variables: {
            title: props.bookTitle
        }
    }
}})(BookDetails)


