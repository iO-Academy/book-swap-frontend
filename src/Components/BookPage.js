import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ClaimForm from "./ClaimForm"
import ReturnForm from "./ReturnForm"
import Review from "./Review"
import ReviewForm from "./ReviewForm"

const BookPage = ({apiBaseUrl}) => {
    const [title, setTitle] = useState(null)
    const [author, setAuthor] = useState(null)
    const [blurb, setBlurb] = useState(null)
    const [claimedBy, setClaimedBy] = useState(null)
    const [image, setImage] = useState('')
    const [pageCount, setPageCount] = useState(null)
    const [genre, setGenre] = useState(null)
    const [reviews, setReviews] = useState([])
    const [averageRating, setAverageRating] = useState(0)

    const defaultImage = 'https://via.placeholder.com/600x840.png/000000?text=Book%20Cover%20Missing'

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

    useEffect(() => {
        setAverageRating(calculateAverageRating(reviews))
    }, [reviews])

    const calculateAverageRating = (reviews) => {
        const ratings = reviews.map(review => review.rating)
        const average = ratings.reduce((sumSoFar, currentRating) => sumSoFar + currentRating, 0) / ratings.length
        return average.toFixed(1)
    }
    
    return (
        <>
            {!title ? <p className="text-center">Loading...</p> : 
                <div className="flex flex-col sm:flex-row justify-center w-full p-7 gap-7 items-center sm:items-start">
                    <img className="w-full max-w-xs sm:max-w-sm" src={image ?? defaultImage} alt={'Book cover of ' + title + ' by ' + author} />
                    <div className="w-full sm:max-w-lg items-center sm:items-start flex flex-col gap-2">
                        <h2 className="text-3xl font-semibold text-center sm:text-left">{title}</h2>
                        <p>{author}</p>
                        {pageCount && <p>{pageCount} pages</p>}
                        <p>{genre}</p>
                        <p>
                            <a className="underline" href="#reviews">{reviews.length} reviews</a>
                            {reviews != 0 && (' - ' + averageRating + '/5 stars')}
                        </p>
                        
                        { claimedBy ? 'Claimed by ' + claimedBy : <ClaimForm id={id} apiBaseUrl={apiBaseUrl} setClaimedBy={setClaimedBy} />}
                        { claimedBy && <ReturnForm id={id} apiBaseUrl={apiBaseUrl} setClaimedBy={setClaimedBy} claimedBy={claimedBy} /> }
                        
                       
                        {blurb && <p className="italic text-center sm:text-left">{blurb}</p>}

                         
                        <div id="reviews" className="w-full sm:max-w-xl mx-auto flex flex-col gap-3">
                            <h3 className="text-2xl font-semibold text-center sm:text-left">Reviews</h3>
                            <ReviewForm id={id} apiBaseUrl={apiBaseUrl} setReviews={setReviews} />
                            {reviews ? 
                                reviews.map((review, index) => 
                                    <Review name={review.name} rating={review.rating} review={review.review} key={review.name + index} />)
                            : 'There are no reviews yet.'
                            }
                        </div>
                        
                    </div>
                </div>
            }
            
        </>
    )
}

export default BookPage