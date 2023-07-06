import BookItem from "./BookItem"
import SearchFilter from "./SearchFilter"
import {useState, useEffect} from 'react'

const BooksPage = ({apiBaseUrl, claimed}) => {
    const [books, setBooks] = useState([])
    const [genreId, setGenreId] = useState('0')
    const [search, setSearch] = useState('')

    useEffect(() => {
        const claimedQueryString = claimed !== undefined ? 'claimed=' + claimed + '&' : ''
        const genreQueryString = genreId !== '0' ? 'genre=' + genreId + '&' : ''
        const searchQueryString = search !== '' ? 'search=' + search : ''
        fetch(apiBaseUrl + '/books?' + claimedQueryString + genreQueryString + searchQueryString).then(response => response.json())
            .then(responseBody => {
                setBooks(responseBody.data)
            })
    }, [apiBaseUrl, claimed, genreId, search])

    useEffect(() => {
        setSearch('')
    }, [claimed])

    return (
        <div>
            <SearchFilter
                apiBaseUrl={apiBaseUrl}
                genreId={genreId}
                setGenreId={setGenreId}
                search={search}
                setSearch={setSearch}
            />
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
