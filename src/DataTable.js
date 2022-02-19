import React from 'react';
import './DataTable.css';

/**
 * Component that represents a table. Contains the state.
 * @extends React.Component
 * State properties:
 *  - tableData: contains the table data to be rendered.
 */
class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerData: [],
            tableData: [],
            dataIsLoaded: false,
        }
    }

    componentDidMount() {
        // TO DO fetch code here
        
        // simulate loading time. 1000 ms
        setTimeout(() => {
            this.setState({
                headerData: new Array(5).fill("HEADER"),
                tableData: new Array(10).fill(new Array(5).fill("hello")),
                dataIsLoaded: true,
            });
        }, 1000);
    }

    render() {
        const {dataIsLoaded, headerData, tableData} = this.state;
        if (!dataIsLoaded) {
            return (
                <div>Loading, please wait... </div>
            );
        }

        const headerAndRowData = [headerData].concat(tableData);
        const rowComponents = headerAndRowData.map((row, idx) => {
            return (
                <DataTableRow
                    key={idx}
                    isHeader={idx === 0}
                    cells={headerAndRowData[idx]}
                />
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
            <DataTableCell
                key={idx}
                idx={idx}
                data={props.cells[idx]}
                isHeader={props.isHeader}
            />
        );
    });

    return (
        <div className={props.isHeader ? "dtable-header-row" : "dtable-row"}>
            {columnComponents}
        </div>
    );
}

/**
 * A single cell for a DataTable. Functional component.
 * @param {*} props 
 * @returns a DataTableCell component.
 */
function DataTableCell(props) {
    return (
        <div 
            className={props.isHeader ? "dtable-header-cell" : "dtable-cell"}
            onClick={() => console.log(props.idx)}>
            {props.data}
        </div>
    );
}


export default DataTable;