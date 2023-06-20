const Review = ({author, score, reviewText}) => {
    return (
        <div>
            <p className="font-semibold">{author}</p>
            <p>Score: {score}/5 stars</p>
            <p>{reviewText}</p>
        </div>
    )
}

export default Review