import BookItem from "./BookItem"
import {useState, useEffect} from 'react'
const Homepage = ({apiBaseUrl}) => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch(apiBaseUrl + '/books')
            .then(response => response.json())
            .then(responseBody => {
                console.log(responseBody.data)
                setBooks(responseBody.data)
            })
    }, [])

    return (
        <div className="flex flex-row flex-wrap justify-center">
            {
                books ? books.map(book => <BookItem 
                    id={book.id} 
                    title={book.title} 
                    author={book.author}
                    genre={book.genre.name} 
                    imgSrc={book.imgSrc} />
                ) : 'Loading...'
            }
            <BookItem id="1" title="Banana" author="Mr Snuggles" genre="Horror" imgSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg" />
        </div>
    )
}

export default Homepage