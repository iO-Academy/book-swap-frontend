import { useState } from "react"

const ReviewForm = ({id, apiBaseUrl, setReviews}) => {
    const [name, setName] = useState('')
    const [rating, setRating] = useState(5)
    const [review, setReview] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            name: name,
            rating: rating,
            review: review,
            book_id: id
        }
        fetch(apiBaseUrl + '/reviews', {
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            if(response.status === 201) {
                setReviews(existingReviews => [...existingReviews, {name, rating, review}])
                setName('')
                setRating(5)
                setReview('')
            } else {
                response.json().then(responseBody => {
                    alert("Claiming the book failed: \n" + responseBody.message)
                })
            }
        })

    }

    return (
        <form className="flex flex-col w-full sm:max-w-xs gap-3 p-3 bg-green-300" onSubmit={handleSubmit}>
            <p>Want to review this book?</p>
            <input className="p-1" type="text" name="name" placeholder="Name" value={name} onChange={ (event) => setName(event.target.value) }/>
            <div className="flex gap-3">
                <label htmlFor="rating">Rating: </label>
                <select className="w-fit px-2 py-1" name="rating" value={rating} onChange={(event) => setRating(event.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            
            <textarea className="p-1" rows="4" name="review" placeholder="Review" value={review} onChange={ (event) => setReview(event.target.value) } />
            <input className="bg-green-500 p-1" type="submit" value="Claim"/>
        </form>
    )
}

export default ReviewForm

