const Review = ({author, rating, review}) => {
    return (
        <div>
            <p className="font-semibold">{author}</p>
            <p>Score: {rating}/5 stars</p>
            <p>{review}</p>
        </div>
    )
}

export default Review