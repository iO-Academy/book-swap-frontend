import { useState } from "react"

const ClaimForm = ({id, apiBaseUrl, setClaimedBy}) => {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)

    const onSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            name: name,
            email: email
        }
        fetch(apiBaseUrl + '/books/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            if(response.status === 200) {
                setClaimedBy(name)
            } else {
                response.json().then(responseBody => {
                    alert('Claiming the book failed: ' + responseBody.message)
                })
            }
        })

    }

    return (
        <form className="">
            <p>Want to claim this book?</p>
            <input type="text" name="name" value={name} onChange={ (event) => setName(event.target.value) }/>
            <input type="email" name="email" value={email} onChange={ (event) => setEmail(event.target.value) } />
        </form>
    )
}

export default ClaimForm