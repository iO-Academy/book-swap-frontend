import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AddBookPage = ({apiBaseUrl}) => {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genreId, setGenreId] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [year, setYear] = useState(2000)
    const [image, setImage] = useState('')
    const [blurb, setBlurb] = useState('')
    const [genres, setGenres] = useState([])

    useEffect(() => {
        fetch(apiBaseUrl + '/genres').then(response => response.json())
            .then(responseBody => {
                setGenres(responseBody.data)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            title: title,
            author: author,
            genre_id: genreId,
            page_count: pageCount,
            year: year,
        }

        if (blurb !== '') {
            requestBody.blurb = blurb
        }

        if (image !== '') {
            requestBody.image = image
        }

        fetch(apiBaseUrl + '/books', {
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            if(response.status === 201) {
                navigate("/")
            } else {
                response.json().then(responseBody => {
                    const titleErrorsString = responseBody.errors.title?.join("\n") ?? ''
                    const authorErrorsString = responseBody.errors.author?.join("\n") ?? ''
                    const genreErrorsString = responseBody.errors.genre_id?.join("\n") ?? ''
                    const yearErrorsString = responseBody.errors.year?.join("\n") ?? ''
                    const blurbErrorsString = responseBody.errors.blurb?.join("\n") ?? ''
                    alert("Adding the book failed: \n" 
                    + titleErrorsString + "\n"
                    + authorErrorsString + "\n"
                    + genreErrorsString + "\n"
                    + yearErrorsString + "\n"
                    + blurbErrorsString)
                })
            }
        })
    }

    return (
        <form className="max-w-xl mx-auto my-3 flex flex-col gap-4 px-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <label htmlFor="title">Title (required)</label>
                <input className="p-1" type="text" id="title" name="title" placeholder="Title" value={title} onChange={ (event) => setTitle(event.target.value) }/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="author">Author (required)</label>
                <input className="p-1" type="text" id="author" name="author" placeholder="Author" value={author} onChange={ (event) => setAuthor(event.target.value) }/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="genreId">Genre (required)</label>
                <select className="w-fit px-2 py-1" name="genreId" value={genreId} onChange={(event) => setGenreId(event.target.value)}>
                    <option value="0" disabled>Select</option>  
                    {genres?.map(genre => <option value={genre.id} key={genre.id}>{genre.name}</option> )}
                </select> 
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="pageCount">Page count</label>
                <input className="p-1" type="number" id="pageCount" name="pageCount" value={pageCount} onChange={ (event) => setPageCount(event.target.value) }/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="year">Year</label>
                <input className="p-1" type="number" id="year" name="year" placeholder="Year" value={year} onChange={ (event) => setYear(event.target.value) }/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="image">Image URL</label>
                <input className="p-1" type="text" id="image" name="image" placeholder="Image URL" value={image} onChange={ (event) => setImage(event.target.value) }/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="blurb">Blurb</label>
                <textarea className="p-1" type="text" id="blurb" rows="5" maxLength="500" placeholder="Blurb" value={blurb} onChange={ (event) => setBlurb(event.target.value) }/>
            </div>
            <input className="bg-green-400 p-1" type="submit" value="Add book"/>

        </form>
    )
}

export default AddBookPage