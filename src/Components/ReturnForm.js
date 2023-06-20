import { useState } from "react"

const ReturnForm = ({id, apiBaseUrl, claimedBy, setClaimedBy}) => {
    const [email, setEmail] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            email: email
        }
        fetch(apiBaseUrl + '/books/return/' + id, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            if(response.status === 200) {
                setClaimedBy(null)
            } else {
                response.json().then(responseBody => {
                    const emailErrorsString = responseBody.errors?.email?.join("\n")
                    alert("Returning the book failed: \n" + (emailErrorsString ? emailErrorsString : responseBody.message))
                })
            }
        })

    }

    return (
        <form className="flex flex-col max-w-xs gap-3 p-3 bg-green-300" onSubmit={handleSubmit}>
            <p>Want to return this book?</p>
            <input className="p-1" type="email" name="email" placeholder={claimedBy + '\'s email'} value={email} onChange={ (event) => setEmail(event.target.value) } />
            <input className="bg-green-500 p-1" type="submit" value="Return"/>
        </form>
    )
}

export default ReturnForm

