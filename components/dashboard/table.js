export default function TableComponent({samplesData}) {

    const tableBody = samplesData.map(sample => {
        return (
            <tr key={sample.uid}>
                <td>{sample.uid}</td>
                <td>{sample.title}</td>
                <td>{sample.type}</td>
                <td>{sample.date}</td>
                <td><button type="button" className="btn btn-outline-secondary">Edit</button></td>
             </tr>
        )
    })

    return (
        <>
            <h2>Section title</h2>
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