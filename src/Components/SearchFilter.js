import {useState, useEffect} from 'react'

const SearchFilter = ({apiBaseUrl, genreId, setGenreId, search, setSearch}) => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        fetch(apiBaseUrl + '/genres').then(response => response.json())
            .then(responseBody => {
                setGenres([{id: 0, name: 'All'}, ...responseBody.data])
            })
    }, [])

    return (
        <div className="flex flex-col sm:flex-row gap-3 p-5 mx-auto items-center">
            <label htmlFor="genreId">Filter by genre:</label>
            <select className="w-fit px-2 py-1" name="genreId" value={genreId} onChange={(event) => setGenreId(event.target.value)}>
                {genres?.map(genre => <option value={genre.id} key={genre.id}>{genre.name}</option> )}
            </select>
            <label htmlFor="search">Search:</label>
            <input type="search" value={search} onChange={event => setSearch(event.target.value)}/>
        </div>
        
    )
}

export default SearchFilter