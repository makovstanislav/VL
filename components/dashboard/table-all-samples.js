export default function AllSamplesTable({samplesData}) {

    // console.log(samplesData)
    const tableBody = samplesData.map(sample => {
        return (
            <tr>
                <td>{sample.title}</td>
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
                <table className={"table table-striped table-sm"}>
                <tbody>
                    {tableBody}
                </tbody>
                </table>
            </div>
        </>
    )
}