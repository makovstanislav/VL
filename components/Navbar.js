import Nav from 'react-bootstrap/Nav'


export default function Navbar() {
    return (
        <div>
            <Nav class="navbar navbar-expand-xxl bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img src="/images/virtuallab_iconLogo_v3_notext_25x25.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />
                        Virtual Labs
                    </a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/sign-up">Sign Up</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/sign-in">Sign In</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </Nav>
        </div>
)}