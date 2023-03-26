export default function TableComponent({samplesData}) {
    
    const tableBody = samplesData.map(sample => {
        return (
            <tr key={sample.uid}>
                <td className={'w-5'}>{sample.uid}</td>
                <td className={'w-50'}>{sample.title}</td>
                <td>{sample.type}</td>
                <td>{sample.date}</td>
                <td><button type="button" className="btn btn-outline-secondary">Edit</button></td>
            </tr>
        )
    })

    return (
        <>
            <h2>Your specimen</h2>
            <div className="table-responsive">
                <table className={"table table-striped table-sm"}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date created</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {tableBody}
                </tbody>
                </table>
            </div>
        </>
    )
}