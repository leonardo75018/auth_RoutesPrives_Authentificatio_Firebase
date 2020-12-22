import React from 'react'
import { auth } from "../firebase"
import { withRouter } from "react-router-dom"


const Admin = (props) => {
    const [user, setUser] = React.useState(null)
    console.log(user)




    React.useEffect(() => {
        if (auth.currentUser) {
            console.log("user existed ")
            setUser(auth.currentUser)
        } else {
            props.history.push("/login")
        }
    }, [])

    return (
        <div>
            <h2>Route privée </h2>
        </div>
    )
}

export default withRouter(Admin);
