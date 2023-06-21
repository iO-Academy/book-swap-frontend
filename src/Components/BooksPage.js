import BookItem from "./BookItem"
import GenreFilter from "./GenreFilter"
import {useState, useEffect} from 'react'

const BooksPage = ({apiBaseUrl, claimed}) => {
    const [books, setBooks] = useState([])
    const [genreId, setGenreId] = useState(0)

    useEffect(() => {
        const claimedQueryString = claimed !== undefined ? 'claimed=' + claimed + '&' : ''
        const genreQueryString = genreId !== '0' ? 'genre=' + genreId : ''
        fetch(apiBaseUrl + '/books?' + claimedQueryString + genreQueryString).then(response => response.json())
            .then(responseBody => {
                setBooks(responseBody.data)
            })
    }, [claimed, genreId])

    return (
        <div>
            <GenreFilter apiBaseUrl={apiBaseUrl} genreId={genreId} setGenreId={setGenreId} />
            <div className="flex flex-row flex-wrap justify-center">
                {
                    books ? books.map(book => <BookItem 
                        id={book.id}
                        key={book.id} 
                        title={book.title} 
                        author={book.author}
                        genre={book.genre.name} 
                        image={book.image} />
                    ) : 'Loading...'
                }
            </div>
        </div>
    )
}

export default BooksPage
