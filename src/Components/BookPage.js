import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ClaimForm from "./ClaimForm"
import ReturnForm from "./ReturnForm"
import Review from "./Review"

const BookPage = ({apiBaseUrl}) => {
    const [title, setTitle] = useState(null)
    const [author, setAuthor] = useState(null)
    const [blurb, setBlurb] = useState(null)
    const [claimedBy, setClaimedBy] = useState(null)
    const [image, setImage] = useState(null)
    const [pageCount, setPageCount] = useState(null)
    const [genre, setGenre] = useState(null)
    const [reviews, setReviews] = useState([])

    const {id} = useParams()

    useEffect(() => {
        fetch(apiBaseUrl + '/books/' + id)
        .then(response => response.json())
        .then(responseBody => {
            const book = responseBody.data
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

    const calculateAverageRating = (reviews) => {
        const ratings = reviews.map(review => review.rating)
        const average = ratings.reduce((sumSoFar, currentRating) => sumSoFar + currentRating, 0) / ratings.length
        return average.toFixed(1)
    }
    
    return (
        <>
            {!title ? <p className="text-center">Loading...</p> : 
                <div className="flex flex-row flex-wrap justify-center w-full p-7 gap-7 items-start">
                    <img className="max-w-sm w-full" src={image} alt={'Book cover of ' + title + ' by ' + author} />
                    <div className="max-w-lg flex flex-col gap-2">
                        <h2 className="text-3xl font-semibold">{title}</h2>
                        <p>{author}</p>
                        <p>{pageCount} pages</p>
                        <p>{genre}</p>
                        <p>
                            <a className="underline" href="#reviews">{reviews.length} reviews</a>
                            {reviews && (' - ' + calculateAverageRating(reviews) + '/5 stars')}
                        </p>
                        
                        { claimedBy ? 'Claimed by ' + claimedBy : <ClaimForm id={id} apiBaseUrl={apiBaseUrl} setClaimedBy={setClaimedBy} />}
                        { claimedBy && <ReturnForm id={id} apiBaseUrl={apiBaseUrl} setClaimedBy={setClaimedBy} claimedBy={claimedBy} /> }
                        
                       
                        <p className="italic">{blurb}</p>

                        { reviews && 
                            <div id="reviews" className="max-w-xl mx-auto flex flex-col gap-3">
                                <h3 className="text-2xl font-semibold">Reviews</h3>
                                {reviews.map((review, index) => 
                                <Review author={review.name} score={review.rating} reviewText={review.review} key={review.name + index} />)}
                            </div>
                        }
                    </div>
                </div>
            }
            
        </>
    )
}

export default BookPage