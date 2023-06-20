import { useState } from "react"

const ClaimForm = ({id, apiBaseUrl, setClaimedBy}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            name: name,
            email: email
        }
        fetch(apiBaseUrl + '/books/claim/' + id, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            if(response.status === 200) {
                setClaimedBy(name)
            } else {
                response.json().then(responseBody => {
                    const nameErrorsString = responseBody.errors.name?.join("\n") ?? ''
                    const emailErrorsString = responseBody.errors.email?.join("\n") ?? ''
                    alert("Claiming the book failed: \n" 
                    + nameErrorsString + "\n"
                    + emailErrorsString)
                })
            }
        })

    }

    return (
        <form className="flex flex-col max-w-xs gap-3 p-3 bg-green-300" onSubmit={handleSubmit}>
            <p>Want to claim this book?</p>
            <input className="p-1" type="text" name="name" placeholder="Name" value={name} onChange={ (event) => setName(event.target.value) }/>
            <input className="p-1" type="email" name="email" placeholder="Email" value={email} onChange={ (event) => setEmail(event.target.value) } />
            <input className="bg-green-500 p-1" type="submit" value="Claim"/>
        </form>
    )
}

export default ClaimForm

