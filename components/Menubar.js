import React from "react"
import Link from "next/link"
import Button from 'react-bootstrap/Button'


export default function Menubar({isSigned}) {
    const signs = (
        <div>
            <Link href="/sign-up">Sign Up</Link>
            <Link href="/sign-in">Sign In</Link>
        </div>
    )
    return (
        <div>
            {!isSigned && signs}
            <Link href="/items">Items database</Link>
            <button><Link href="/add-item">Add new item</Link></button>
            <Button type="button" class="btn btn-primary"> Hey there</Button>
        </div>
    )
}