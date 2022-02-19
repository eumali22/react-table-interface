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
            headerData: null,
            tableData: null,
            dataIsLoaded: false,
            dataFetchError: null,
        }
    }

    processJsonData(dataArr) {
        // get fields and set headerData. Must have at least one record
        if (!dataArr && !dataArr[0]) { // no content
            return false;
        }
        
        this.setState({
            headerData: Object.keys(dataArr[0]),
            tableData: dataArr,
        });
        
    }

    componentDidMount() {
        // TO DO fetch code here
        let url = "http://localhost:3001/employees";
        fetch(url)
            .then(manageFetchErrors)
            .then(res => res.json())
            .then(json => {
                this.processJsonData(json);
                this.setState({ dataIsLoaded: true });
            })
            .catch((error) => {
                console.error('ERROR: ', error);
                this.setState({ dataFetchError: error });
            });
    }

    render() {
        const {dataIsLoaded, headerData, tableData, dataFetchError} = this.state;
        
        if (dataFetchError) {
            return (<div>{"Error with fetching data: " + dataFetchError}</div>);
        }
        if (!dataIsLoaded) {
            return <div>Loading, please wait... </div>
        }
        
        const headerComponent =
            <DataTableRow
                key={"-1"}
                isHeader={true} 
                cells={headerData}
            />

        const rowComponents = tableData.map((elt, idx) => {
            return (
                <DataTableRow
                    key={idx}
                    isHeader={false}
                    cells={headerData.map((x) => elt[x])}
                />
            );
        });

        return (
            <div className="dtable">{[headerComponent].concat(rowComponents)}</div>
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


function manageFetchErrors(response) {
    if (!response.ok) {
        throw Error(response.status + " " + response.statusText);
    }
    return response;
}

export default DataTable;