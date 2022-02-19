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
            editableRows: null,
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
            editableRows: new Array(dataArr.length).fill(false),
        });
    }

    componentDidMount() {
        let url = "http://localhost:3001/employees";
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText);
                }
                return response;
            })
            .then(response => response.json())
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
                    idx={idx}
                    isHeader={false}
                    cells={headerData.map((x) => elt[x])}
                    onDblClick={(i) => this.handleDblClick(i)}
                    isEditMode={this.state.editableRows[idx]}
                />
            );
        });

        return (
            <div className="dtable">{[headerComponent].concat(rowComponents)}</div>
        );
    }

    /**
     * Double clicking any cell will edit the whole row.
     * Only one row can be editable at a time.
     * @param {int} idx the row index.
     */
    handleDblClick(idx) {
        const {editableRows, tableData} = this.state;
        if (editableRows[idx]) { // skip update
            return false;
        }

        const newArr = new Array(tableData.length).fill(false);
        newArr[idx] = true; // set to editable
        this.setState({
            editableRows: newArr, 
        });
    }
    
}

/**
 * A row for a DataTable. Functional component.
 * @param {*} props expected:
 *  - isHeader
 *  - idx
 *  - cells
 *  - onDblClick
 *  - isEditMode
 * @returns a DataTableRow component containing DataTableColumn components.
 */
function DataTableRow(props) {
    // create the cells
    const columnComponents = props.cells.map((col, idx) => {
        return (
            <DataTableCell
                key={idx}
                rowIdx={props.idx}
                idx={idx}
                data={props.cells[idx]}
                isHeader={props.isHeader}
                onDblClick={props.onDblClick}
                rowIsEditMode={props.isEditMode}
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
 * @param {*} props expected:
 *  - rowIdx
 *  - idx
 *  - data
 *  - isHeader
 *  - rowIsEditMode
 * @returns a DataTableCell component.
 */
function DataTableCell(props) {
    if (props.rowIsEditMode) {
        return (
            <div
                className={props.isHeader ? "dtable-header-cell" : "dtable-cell"}
            >
                <input type="text" value={props.data}>
                    
                </input>
            </div>
            
        );
    } else {
        return (
            <div
                className={props.isHeader ? "dtable-header-cell" : "dtable-cell"}
                onClick={() => console.log(props.rowIdx + "," + props.idx)}
                onDoubleClick={() => props.onDblClick(props.rowIdx)}
            >
                {props.data}
            </div>
        );
    }
    
}


export default DataTable;