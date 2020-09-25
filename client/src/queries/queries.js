import { gql } from "@apollo/client"

const getAuthorsQuery = gql`
    {
        authors {
            name
        }
    }
`

const getBooksQuery = gql`
    {
        books {
            title
        }
    }
`

const addBookMutation = gql`
    mutation AddBook($title: String!, $author: String!, $genre: String!, $language: String!){
        addBook(title: $title, author: $author, genre: $genre, language: $language){
            title
        }
    }
`;

const getBookQuery = gql`
    query ($title: String) {
        book(title: $title) {
            title
            author
            genre
            language
            authorName {
                name
                gender
                language
                books {
                    title
                    language
                }
            }
        }
    }
`

export { getAuthorsQuery , getBooksQuery , addBookMutation, getBookQuery}