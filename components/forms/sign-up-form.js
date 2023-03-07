import styles from '../../styles/formStyles.module.css'
import stylesUtils from '../../styles/utils.module.css'

export default function SignUpForm({handleChange, handleSubmit, credentials}) {
    return (
        <div className={stylesUtils['signUp']}>
            <div className={styles['container-form']}>
                <h3>Create a Virtual Lab account</h3>
                <p class="subtitle">It's fast, easy and free!</p>
                <form onSubmit={handleSubmit} autoComplete="off">
                
                    <div class="mb-3">
                        <input 
                            type="email" 
                            className={`form-control ${styles['input']} ${styles['email']}`} 
                            id="exampleInputEmail" 
                            aria-describedby="emailHelp"
                            onChange={handleChange}
                            name="email"
                            value={credentials.email}
                            placeholder='Email'
                            autoComplete="off"
                        />
                    </div>
                    <div class="mb-3">
                        <div>
                            <input 
                                type="password" 
                                className={`form-control ${styles['input']}`}
                                id="exampleInputPassword1"
                                onChange={handleChange}
                                name="password"
                                value={credentials.password}
                                placeholder='Password'
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div class="mb-3">
                        <div>
                            <input 
                                type="password" 
                                className={`form-control ${styles['input']}`}
                                id="exampleInputPassword2"
                                onChange={handleChange}
                                name="password2"
                                value={credentials.password2}
                                placeholder='Confirm the password'
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={`btn btn-primary btn-lg ${styles['btnForm']}`}>
                        Create account
                    </button>
                    <div className={`${styles['tos']}`}>
                        By proceeding, you accept our&nbsp;
                        <a target="_blank" href="#">Terms of Service</a>
                        &nbsp;and&nbsp;  
                        <a target="_blank" href="#">Privacy Statement</a>
                    </div>
                    <div className={`${styles['alreadyMember']}`}>
                        Already a member?&nbsp;
                        <a href="/sign-in">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    )
    
}
