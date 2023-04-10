import styles from '../../styles/item-submitted.module.css'

export default function ItemSubmitted({title}) {
    
    return (
        <div className={`container ${styles['submitted']}`}>
            <div className={styles['overall']}>
                <div className={`container ${styles['content']}`}>
                    <h1 className={`text-center ${styles['text']} ${styles['title']}`}>&nbsp;{title}</h1>
                    <h1 className={`text-center ${styles['text']}`}>&nbsp;has been published successfully</h1>
                    <img src="/images/check-lg.svg" height='100' width='100'/> 
                </div>
                <div className={`container ${styles['buttons']}`}>
                    <a className={`btn btn-dark btn-lg ${styles['backBtn']}`} type="button" href='/dashboard'>Back to dashboard</a>
                    <a className={`btn btn-outline-secondary btn-lg ${styles['viewBtn']}`} type="button" href='#'>View item</a>
                    <a className={`btn btn-outline-secondary btn-lg ${styles['createBtn']}`} type="button" href='/add-item'>Create new item</a>
                </div>
            </div>
        </div>
    )
}
