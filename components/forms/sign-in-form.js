import stylesUtils from '../../styles/utils.module.css'
import styles from '../../styles/formStyles.module.css'

export default function SignInForm({handleChange, handleSubmit, credentials, user, loading, error}) {
    let status = null
    if (error) {
        if (error.message === 'Firebase: Error (auth/user-not-found).') {
            status = <a>Incorrect email or password.            </a>
        } else if (error.message=== 'Firebase: Error (auth/wrong-password).') {
            status = <a>Incorrect email or password.            </a>
            console.log(error)
        } else if (error.message=== 'Firebase: Error (auth/invalid-email).') {
            status = <a>Incorrect email or password.            </a>
            console.log(error)
        } else if (error.message==='Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
            status = <a>Too many login attempts. Try again later</a>
        } 
        else {
            status = <a>{error.message}</a>
        }
        
    }
    return (
        <div className={stylesUtils['signIn']}>
            <div className={styles['container-form']}>
                <h3>Sign in</h3>
                <p className="subtitle">Sign in with your Virtual Lab account.</p>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div class="mb-3">
                        <input
                            type="email"
                            placeholder='Email'
                            onChange={handleChange}
                            name="email"
                            value={credentials.email}
                            autoComplete="off"
                            className={`form-control ${styles['input']} ${styles['email']}`}
                        ></input>
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder='Password'
                            onChange={handleChange}
                            name="password"
                            value={credentials.password}
                            autoComplete="off"
                            className={`form-control ${styles['input']}`}
                        ></input>
                    </div>
                    <a href="#" className={styles['forgotPassword']}>Forgot password?</a>
                    {status && <div className={styles['status']}> {status} </div>}
                    
                    <div className={styles['buttonContainer']}>
                        <a href="/sign-up" className={styles['btnCreate']}>
                            Create account
                        </a>
                        <button
                            type="submit" 
                            className={`${styles['btn-SignIn']}`}>
                            Sign in
                        </button>
                    </div>
                    <hr className={styles['divider']}></hr>
                    <div className={`${styles['tos']}`}>
                        By proceeding, you accept our&nbsp;
                        <a target="_blank" href="#">Terms of Service</a>
                        &nbsp;and&nbsp;  
                        <a target="_blank" href="#">Privacy Statement</a>
                    </div>
                    
                    
                </form>
            </div>
        </div>
    ) 
}
