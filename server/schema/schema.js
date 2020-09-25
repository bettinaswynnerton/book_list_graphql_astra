const graphql = require('graphql');
const _ = require("lodash")
const client = require('../connect-database')

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {type: GraphQLString},
        language: {type: GraphQLString},
        authorName: {
            type: AuthorType,
            resolve(parent, args){
                //code to get data from db
                const query = 'select * from books.authors where name=?';
                const params = [parent.author];
                const getData = async () => {
                    const result = await client.execute(query, params, { prepare: true });
                    return result.rows[0]
                } 
                return getData()
            }
        }
    })
})

// CREATE TABLE books.authors (
//     name text PRIMARY KEY,
//     gender text,
//     language text
// )

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        name: {type: GraphQLString},
        gender: {type: GraphQLString},
        language: {type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                const query = 'select * from books.books where author=?';
                const params = [parent.name];
                console.log(parent.name)
                const getData = async () => {
                    const result = await client.execute(query, params, { prepare: true });
                    return result.rows
                } 
                return getData()
            }
        }
    })
})


// CREATE TABLE books.books (
//     title text PRIMARY KEY,
//     author text,
//     genre text,
//     language text
// ) 

const RootQuery = new GraphQLObjectType({   
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {title: {type: GraphQLString}},
            resolve(parent,args){
                //code to get data from db
                const query = 'select * from books.books where title=?';
                const params = [args.title];
                const getData = async () => {
                    const result = await client.execute(query, params, { prepare: true });
                    return result.rows[0]
                } 
                return getData()
            }
        },
        author: {
            type: AuthorType,
            args: {name: {type: GraphQLString}},
            resolve(parent,args){
                //code to get data from db
                const query = 'select * from books.authors where name=?';
                const params = [args.name];
                const getData = async () => {
                    const result = await client.execute(query, params, { prepare: true });
                    return result.rows[0]
                } 
                return getData()
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //code to get data from db
                const query = 'select * from books.books';
                const getData = async () => {
                    const result = await client.execute(query, { prepare: true });
                    return result.rows
                } 
                return getData()
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //code to get data from db
                const query = 'select * from books.authors';
                const getData = async () => {
                    const result = await client.execute(query, { prepare: true });
                    return result.rows
                } 
                return getData()
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                gender: {type: GraphQLString},
                language: {type: GraphQLString}
            },
            resolve(parent, args){
                const query = 'insert into books.authors (name, gender, language) values (?,?,?)';
                const params = [args.name, args.gender, args.language];
                client.execute(query, params, { prepare: true });
                return args
            }
            
        },
        addBook: {
            type: BookType,
            args: {
                title: {type: GraphQLString},
                genre: {type: GraphQLString},
                language: {type: GraphQLString},
                author: {type: GraphQLString}
            },
            resolve(parent, args){
                const query = 'insert into books.books (title, author, genre, language ) values (?,?,?,?)';
                const params = [args.title, args.author, args.genre, args.language];
                client.execute(query, params, { prepare: true });
                return args
            }
            
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})