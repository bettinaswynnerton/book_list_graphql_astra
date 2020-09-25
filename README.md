# book_list_graphql_astra

This is a simple example project with a GraphQL server connecting to a Datatax Astra databas, with a React UI.

The UI lists the content of a book database and allows to add new books to the database. It pulls details about these books with graphQL.

Here is a screenshot of the UI:


The example is very much based on this FreeCodeCamp tutorial, with some adaptation to use Astra as the database, and some modifications for a newer version of the Apollo client. 

https://www.youtube.com/watch?v=ed8SzALpx1Q

(Thanks very much for this excellent tutorial.)

Preparation:

Create an Astra instance here with a keyspace `books`.
In Astra's cql console, create two tables and one custom index:

```
CREATE TABLE books.books (
    title text PRIMARY KEY,
    author text,
    genre text,
    language text
);

CREATE TABLE books.authors (
    name text PRIMARY KEY,
    gender text,
    language text
);

CREATE CUSTOM INDEX books_by_author ON books.books (author) USING 'StorageAttachedIndex' WITH OPTIONS = {'case_sensitive': 'false'};
```

Download the secure connect bundle from the Astra connection dialog.

Modify your connection in the /server/connect-database.js file with your secure bundle path and credentials

```
const client = new Client({
    cloud: { secureConnectBundle: '/Users/bettinaswynnerton/Downloads/creds.zip' },
    credentials: { username: 'KVUser', password: 'KVPassword' }
  });
```

Start the server with: `node app.js`

To test the graphQL API, navigate to `http://localhost:4000/graphql`

You can test the API with the embedded graphiql UI.

To insert some books via graphQL use this mutation query:

```
    mutation {
        addBook(
          title: "I, Robot", 
          author: "Isaac Asimov", 
          genre: "Science Fiction", 
          language: "English") {
            title
        }
    }
```

To insert an author, use this mutation query:

```
    mutation {
        addAuthor(
          name: "Isaac Asimov", 
          gender: "M", 
          language: "Russian") {
            name
        }
    }
```

The datamodel uses the book titles and the author names as primary keys. 

You can also add some data via the Astra cql console, like here:

```
insert into books.books (title, author, genre, language) values ('A Scanner Darkly', 'Philip K Dick', 'Science Fiction', 'English');
insert into books.books (title, author, genre, language) values ('Ubik', 'Philip K Dick', 'Science Fiction', 'English');
insert into books.books (title, author, genre, language) values ('The Man in the High Castle', 'Philip K Dick', 'Science Fiction', 'English');

insert into books.authors (name, gender, language) values ('Philip K Dick', 'M', 'English') ;
```

This gives us enough data to play with graphql queries:

The following query looks up one book and then gives us also all the other books by the author:

```
query {
  book (title: "Ubik")
  {
    title 
    author
    authorName {
	  name
      books {
        title
      }
    }
  }
}
```

Expected outcome with the data as before:

```
{
  "data": {
    "book": {
      "title": "Ubik",
      "author": "Philip K Dick",
      "authorName": {
        "name": "Philip K Dick",
        "books": [
          {
            "title": "A Scanner Darkly"
          },
          {
            "title": "Ubik"
          },
          {
            "title": "The Man in the High Castle"
          }
        ]
      }
    }
  }
}
```

You can inspect the graphQL API with the asynchronous calls to Astra in schema/schema.js

The client code is built with React and Apollog GraphQL client.

First install your modules: `npm install`

Then to run: `npm start`

This will launch the frontend on `http://localhost:3000`

The single page will list all books that are in the database. Selecting one book will display the details in the panel on the right. 

You can add another book via the form. 

TO DO:

Add another form to add an author, currently not implemented in UI.

Reset the form after submitting form data. 





