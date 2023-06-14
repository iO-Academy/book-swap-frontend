import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const BookPage = ({apiBaseUrl}) => {
    const [title, setTitle] = useState(null)
    const [author, setAuthor] = useState(null)
    const [blurb, setBlurb] = useState(null)
    const [claimedBy, setClaimedBy] = useState(null)
    const [image, setImage] = useState(null)
    const [pageCount, setPageCount] = useState(null)
    const [genre, setGenre] = useState(null)
    const [reviews, setReviews] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        fetch(apiBaseUrl + '/books/' + id)
        .then(response => response.json())
        .then(responseBody => {
            const book = responseBody.data
            console.log(book)
            setTitle(book.title)
            setAuthor(book.author)
            setBlurb(book.blurb)
            setClaimedBy(book.claimed_by_name)
            setImage(book.image)
            setPageCount(book.page_count)
            setGenre(book.genre.name)
            setReviews(book.reviews)
        })
    }, [])
    
    return (
        <div className="flex flex-row flex-wrap justify-center w-full p-7 gap-7">
            <img className="max-w-md w-full" src={image} alt={'Book cover of ' + title + ' by ' + author} />
            <div className="max-w-lg flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">{title}</h2>
                <p>{author}</p>
                <p>{pageCount} pages</p>
                <p>{genre}</p>
                <p className="italic">{blurb}</p>
            </div>
        </div>
    )
}

export default BookPage