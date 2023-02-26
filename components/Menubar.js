import React from "react"
import Link from "next/link"

export default function Menubar() {
    return (
        <div>
            <Link href="/sign-up">Sign Up</Link>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/posts/first-post">Items database</Link>
            <button>Add new item</button>
        </div>
    )
}