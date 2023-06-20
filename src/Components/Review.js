const Review = ({name, rating, review}) => {
    return (
        <div>
            <p className="font-semibold">{name}</p>
            <p>Score: {rating}/5 stars</p>
            <p>{review}</p>
        </div>
    )
}

export default Review