import stylesUtils from '../../styles/utils.module.css'
import styles from '../../styles/formStyles.module.css'

export default function SignInForm({handleChange, handleSubmit, credentials}) {
    
    return (
        <div className={stylesUtils['signUp']}>
            <div className={styles['container-form']}>
                <h3>Sign in</h3>
                <p class="subtitle">Sign in with your Virtual Lab account.</p>
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
                    <div className={styles['buttonContainer']}>
                        <button
                            type="button" 
                            className={`btn btn-primary btn-lg ${styles['btnCreate']}`}>
                            Create account
                        </button>
                        <button
                            type="submit" 
                            className={`btn btn-primary btn-lg ${styles['btn-SignIn']}`}>
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
