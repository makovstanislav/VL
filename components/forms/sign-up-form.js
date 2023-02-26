export default function SignUpForm({handleChange, handleSubmit, credentials}) {
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Type username'
                    onChange={handleChange}
                    name="name"
                    value={credentials.name}
                ></input>
                <input
                    type="email"
                    placeholder='Type email'
                    onChange={handleChange}
                    name="email"
                    value={credentials.email}
                ></input>
                <input
                    type="password"
                    placeholder='Type password'
                    onChange={handleChange}
                    name="password"
                    value={credentials.password}
                ></input>
                <input
                    type="checkbox"
                    id="isSeller"
                    name="isSeller"
                    onChange={handleChange}
                >
                </input>
                <button>Submit</button>
            </form>
        </section>
    )
    
}
