const BookItem = ({id, title, author, genre, image}) => {
    return (
        <div className="max-w-xs bg-violet-300 p-6 m-6">
            <img className="w-full" src={image}/>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p>{author}</p>
            <p>{genre}</p>
        </div>
    )
}

export default BookItem