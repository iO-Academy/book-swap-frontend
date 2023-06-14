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
        fetch(apiBaseUrl + '/books' + id, {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
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
        <div>

        </div>
    )
}

export default BookPage