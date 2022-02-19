import React from 'react';
import './DataTable.css';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        }
    }

    render() {
        return (
            <div class="dtable">
                <DataTableRow data={this.state.dataArray[0]} />
                <DataTableRow data={this.state.dataArray[1]} />
                <DataTableRow data={this.state.dataArray[2]} />
            </div>
        );
    }
}


function DataTableRow(props) {
    return (
        <div class="dtable-row">
            <DataTableColumn data={props.data[0]} />
            <DataTableColumn data={props.data[1]} />
            <DataTableColumn data={props.data[2]} />
        </div>
    );
}


function DataTableColumn(props) {
    return (
        <div class="dtable-col">{props.data}</div>
    );
}


export default DataTable;