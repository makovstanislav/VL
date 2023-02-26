import React from "react";


export default function Table({items}) {

    const tableBody = items.map(item => {
        return (
            <tr>
                <th>{item[0]}</th>
                <th>{item[1]}</th>
                <th>{item[2]}</th>
            </tr>
        )
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                {tableBody}
            </table>
        </div>
    )
}