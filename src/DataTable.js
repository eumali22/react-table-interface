import React from 'react';
import './DataTable.css';

/**
 * Component that represents a table. It is stateful.
 * @extends React.Component
 * State properties:
 *  - tableData: contains the table data to be rendered.
 */
class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            dataIsLoaded: false,
        }
    }

    componentDidMount() {
        // TO DO fetch code here
        
        // simulate loading time. 1000 ms
        setTimeout(() => {
            this.setState({
                tableData: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]],
                dataIsLoaded: true,
            });
        }, 1000);
    }

    render() {
        const {dataIsLoaded, tableData} = this.state;
        if (!dataIsLoaded) {
            return (
                <div>Loading, please wait... </div>
            );
        }

        // create the row components
        const rowComponents = tableData.map((row, idx) => {
            return (
                <DataTableRow key={idx} cells={tableData[idx]} />
            );
        });

        return (
            <div className="dtable">{rowComponents}</div>
        );
    }
}

/**
 * A row for a DataTable. Functional component.
 * @param {*} props an object; should have property called cells.
 * @returns a DataTableRow component containing DataTableColumn components.
 */
function DataTableRow(props) {
    // create the cells
    const columnComponents = props.cells.map((col, idx) => {
        return (
            <DataTableCell key={idx} data={props.cells[idx]} />
        );
    });

    return (
        <div className="dtable-row">{columnComponents}</div>
    );
}

/**
 * A single cell for a DataTable. Functional component.
 * @param {*} props 
 * @returns a DataTableCell component.
 */
function DataTableCell(props) {
    return (
        <div className="dtable-cell">{props.data}</div>
    );
}


export default DataTable;