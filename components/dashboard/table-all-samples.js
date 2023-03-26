export default function AllSamplesTable({samplesData}) {

    console.log(samplesData)
    const tableBody = samplesData.map(sample => {
        return (
            <tr key={sample.uid}>
                <td className={'w-5'}>{sample.title}</td>
                <td className={'w-50'}>{sample.strain}</td>
                <td>{sample.type}</td>
                <td>{sample.site}</td>
                <td>{sample.availability}</td>
                <td>{sample.price}</td>
            </tr>
        )
    })

    return (
        <>
            <h2>Search samples</h2>
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