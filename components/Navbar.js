import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'




export default function Navbar() {

    const [logged, setLogged] = useState(false)
    const [email, setEmail] = useState("")

    useEffect(() => {
        setLogged(getCookie('logged'))
        setEmail(getCookie('email'))
    }, [])

    const dashboard = (
        <a class="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
    )

    const signIn = (
        <a class="nav-link active" aria-current="page" href="/sign-in">Sign In</a>
    )

    return (
        <div>
            <nav class="navbar navbar-expand-sm bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img src="/images/virtuallab_logo_v3_grey.png" alt="Logo" width="100%" height="24" class="d-inline-block align-text-top" />
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                {logged ? dashboard : signIn}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
)}
