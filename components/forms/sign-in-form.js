
export default function SignInForm({handleChange, handleSubmit, credentials}) {
    return (
        <section>
            <form onSubmit={handleSubmit}>
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
                <button>Login</button>
            </form>
            
        </section>
    )
    
}
