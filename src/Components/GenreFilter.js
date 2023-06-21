import {useState, useEffect} from 'react'

const GenreFilter = ({apiBaseUrl, genreId, setGenreId}) => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        fetch(apiBaseUrl + '/genres').then(response => response.json())
            .then(responseBody => {
                setGenres([{id: 0, name: 'All'}, ...responseBody.data])
            })
    }, [])

    return (
        <div className="flex flex-col sm:flex-row gap-3 p-5 mx-auto items-center">
            <p>Filter by genre:</p>
           <select className="w-fit px-2 py-1" name="rating" value={genreId} onChange={(event) => setGenreId(event.target.value)}>
                {genres?.map(genre => <option value={genre.id}>{genre.name}</option> )}
            </select> 
        </div>
        
    )
}

export default GenreFilter