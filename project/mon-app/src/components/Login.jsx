import React, { useState } from 'react'
import { auth, db } from "../firebase"
import { withRouter } from "react-router-dom"


const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [isRegister, setIsRegister] = useState(false)


    const dataProcess = e => {
        e.preventDefault()
        if (!email.trim()) {
            setError("champ email vide")
            return
        }
        if (!password.trim()) {
            setError("champ password vide")
            return
        }

        if (password.length < 6) {
            setError("votre mot de passe doit contenir en moins 6 caractères")
            return
        }
        setError(null)

        if (isRegister) {
            register()
        } else {
            login()
        }
    }

    const login = React.useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, password)
            setEmail("")
            setPassword("")
            setError(null)
            props.history.push("/admin")

        } catch (error) {
            if (error.code === "auth/invalid-email") { setError("Adresse email invalide") }
            if (error.code === "auth/wrong-password") { setError("votre mot de passe est incorrect") }
            if (error.code === "auth/user-not-found") { setError("compte introuvable") }
        }
    }, [email, password, props.history])






    const register = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            setEmail("")
            setPassword("")
            setError(null)
            props.history.push("/admin")

        } catch (error) {
            if (error.code === "auth/invalid-email")
                setError("Adresse email invalide")
            if (error.code === "auth/email-already-in-use")
                setError("Cette adresse email est déjà utilisé")
        }

    }, [email, password, props.history])





    return (
        <div className="mt-5" >
            <h3 className="text-center">
                {
                    isRegister ? "créer votre compte " : "Login "
                }
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={dataProcess}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>

                            )
                        }
                        <input type="text"
                            type="email"
                            className="form-control mb-2"
                            placeholder="votre email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input type="text"
                            type="password"
                            className="form-control mb-2"
                            placeholder="votre password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            {
                                isRegister ? " Créer mon compte" : "connexion"
                            }
                        </button>

                        <button
                            className="btn btn-sm btn-info btn-block"
                            type="button"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {
                                isRegister ? "vous avez un compte?" : "je souhaite créer un compte"
                            }
                        </button>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default withRouter(Login) 
