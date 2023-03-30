import styles from '../../styles/all-samples.module.css'

export default function AllSamplesTable({samplesData, priceAsc, sortByPrice}) {

    // console.log(samplesData)
    const tableBody = samplesData.map(sample => {
        return (
            <tr>
                <td className={styles['col-1']}>{sample.title}</td>
                <td>{sample.strain}</td>
                <td>{sample.type}</td>
                <td>{sample.site}</td>
                <td>{sample.availability}</td>
                <td>{sample.price}</td>
            </tr>
        )
    })

    return (
        <>
            <div className="table-responsive">
                <table className='table table-striped table-sm'>
                    <thead>
                        <tr>
                            <th className={styles['col-1']}>Item name</th>
                            <th>Strain</th>
                            <th>Type</th>
                            <th>Site</th>
                            <th>Availability</th>
                            <th className={styles['col-price']}>Price &nbsp; {!priceAsc ? <img src="/images/caret-down-fill.svg" onClick={sortByPrice}/> : <img src="/images/caret-up-fill.svg" onClick={sortByPrice}/>}</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {tableBody}
                    </tbody>
                </table>
            </div>
        </>
    )
}