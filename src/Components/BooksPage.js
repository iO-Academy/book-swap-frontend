import BookItem from "./BookItem"
import {useState, useEffect} from 'react'

const BooksPage = ({apiBaseUrl, claimed}) => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch(apiBaseUrl + '/books' + (claimed !== undefined ? '?claimed=' + claimed : '')).then(response => response.json())
            .then(responseBody => {
                setBooks(responseBody.data)
            })
    }, [claimed])

    return (
        <div className="flex flex-row flex-wrap justify-center">
            {
                books ? books.map(book => <BookItem 
                    id={book.id} 
                    title={book.title} 
                    author={book.author}
                    genre={book.genre.name} 
                    image={book.image} />
                ) : 'Loading...'
            }
        </div>
    )
}

export default BooksPage
