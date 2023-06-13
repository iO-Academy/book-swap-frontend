import BookItem from "./BookItem"

const Homepage = () => {
    return (
        <div className="flex flex-row flex-wrap justify-center">
            <BookItem id="1" title="Banana" author="Mr Snuggles" genre="Horror" imgSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg" />
            <BookItem id="1" title="Banana" author="Mr Snuggles" genre="Horror" imgSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg" />
        </div>
    )
}

export default Homepage