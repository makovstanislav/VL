import styles from '../../styles/formStyles.module.css'
import stylesUtils from '../../styles/utils.module.css'

export default function SignUpForm({handleChange, handleSubmit, credentials}) {
    return (
        <div className={stylesUtils['signUp']}>
            <div className={styles['container-form']}>
                <h3>Create a Virtual Lab account</h3>
                <p class="subtitle">It's fast, easy and free!</p>
                <form onSubmit={handleSubmit }>
                    <div class="mb-3">
                        <label for="exampleInputName" class="form-label">First Name</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="exampleInputName" 
                            onChange={handleChange}
                            name="name"
                            value={credentials.name}
                            placeholder='First Name'
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputLastName" class="form-label">Last Name</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="exampleInputLastName"
                            placeholder='Last Name'
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputCompany" class="form-label">Company</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="exampleInputCompany"
                            placeholder='Company'
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail" class="form-label">Email address</label>
                        <input 
                            type="email" 
                            class="form-control" 
                            id="exampleInputEmail" 
                            aria-describedby="emailHelp"
                            onChange={handleChange}
                            name="email"
                            value={credentials.email}
                            placeholder='Email'
                        />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input 
                            type="password" 
                            class="form-control" 
                            id="exampleInputPassword1"
                            onChange={handleChange}
                            name="password"
                            value={credentials.password}
                            placeholder='Password'
                        />
                    </div>
                    <div class="mb-3 form-check">
                        <input 
                            type="checkbox" 
                            class="form-check-input" 
                            id="exampleCheck1"
                            name="isSeller"
                            onChange={handleChange}
                        />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button 
                        type="submit" 
                        className={`btn btn-primary btn-lg ${styles['btn-create-account']}`}>
                        Create account
                    </button>
                    <div class="tos">
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
