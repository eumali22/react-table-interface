import React from 'react';
import './DataTable.css';
import OutsideClickHandler from './OutsideClickHandler.js';

/**
 * Component that represents a table. Contains the state.
 * @extends React.Component
 * State properties:
 *  - tableData: contains the table data to be rendered.
 */
class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleRowEdit = this.handleRowEdit.bind(this);

        this.state = {
            headerData: null,
            tableData: null,
            dataIsLoaded: false,
            dataFetchError: null,
            editableRows: null,
            rowBeforeEdit: null,
        }
    }


    /**
     * Double clicking any cell will edit the whole row.
     * Only one row can be editable at a time.
     * @param {int} idx the row index.
     */
    handleDblClick(idx) {
        const { editableRows, tableData } = this.state;
        if (editableRows[idx]) { // skip update
            return false;
        }

        const newArr = new Array(tableData.length).fill(false);
        newArr[idx] = true; // set to editable
        const rowBackup = [...tableData[idx]]; // save row snapshot
        this.setState({
            editableRows: newArr,
            rowBeforeEdit: rowBackup,
        });
    }

    handleChange(rowIdx, cellIdx, newValue) {
        const newTableData = [...this.state.tableData];
        newTableData[rowIdx][cellIdx] = newValue;
        this.setState({tableData: newTableData});
    }

    handleRowEdit(idx, isSave) {
        if (!isSave) { // cancel/revert changes
            const newTable = [...this.state.tableData];
            newTable[idx] = [...this.state.rowBeforeEdit];
            this.setState({
                editableRows: new Array(this.state.tableData.length).fill(false),
                tableData: newTable,
                rowBeforeEdit: null,
            });
        } else {
            this.setState({
                editableRows: new Array(this.state.tableData.length).fill(false),
                rowBeforeEdit: null,
            });
        }
        
    }

    processJsonData(dataArr) {
        // get fields and set headerData. Must have at least one record
        if (!dataArr && !dataArr[0]) { // no content
            return false;
        }
        
        // convert dataArr to 2d array
        const fields = Object.keys(dataArr[0]);
        const table2DArr = dataArr.map((record) => {
            return fields.map((fieldname) => {
                return record[fieldname];
            });
        });

        this.setState({
            headerData: fields,
            tableData: table2DArr,
            editableRows: new Array(dataArr.length).fill(false),
        });
    }

    componentDidMount() {
        let url = this.props.dataSourceUrl;
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
            return <div>{"Error with fetching data: " + dataFetchError}</div>
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
                    cells={elt}
                    onDblClick={(i) => this.handleDblClick(i)}
                    isEditMode={this.state.editableRows[idx]}
                    onFieldChange={this.handleChange}
                    handleRowEdit={this.handleRowEdit}
                />
            );
        });

        return (
            <div className="dtable">{[headerComponent].concat(rowComponents)}</div>
        );
    }

    
}

class DataTableRow extends React.Component {
    render() {
        // create the cells
        const columnComponents = this.props.cells.map((col, idx) => {
            return (
                <DataTableCell
                    key={idx}
                    rowIdx={this.props.idx}
                    idx={idx}
                    data={this.props.cells[idx]}
                    isHeader={this.props.isHeader}
                    onDblClick={this.props.onDblClick}
                    rowIsEditMode={this.props.isEditMode}
                    onFieldChange={this.props.onFieldChange}
                />
            );
        });

        if (this.props.isEditMode) {
            return (
                <OutsideClickHandler
                    onOutsideClick={() => this.props.handleRowEdit(this.props.idx, false)}
                    customClass={"dtable-row-wrapper heyclass selected-row"}
                >
                    <div className={"dtable-row"}>
                        {columnComponents}
                    </div>
                    <div className="dtable-row-btn-panel">
                        <input type="button" value="Cancel"
                            onClick={() => this.props.handleRowEdit(this.props.idx, false)} />
                        <input type="button" value="Save"
                            onClick={() => this.props.handleRowEdit(this.props.idx, true)} />
                    </div>
                </OutsideClickHandler>
            );
        } else {
            return (
                <div className="dtable-row-wrapper">
                    <div className={this.props.isHeader ? "dtable-header-row" : "dtable-row"}>
                        {columnComponents}
                    </div>
                </div>
            );
        }
    }
}

class DataTableCell extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onFieldChange(this.props.rowIdx, this.props.idx, e.target.value);
    }

    render() {
        if (this.props.rowIsEditMode) {
            return (
                <div className={"dtable-cell"}>
                    <input className="dt-field" type="text"
                        value={this.props.data}
                        onChange={this.handleChange} />
                </div>
            );
        } else {
            return (
                <div
                    className={this.props.isHeader ? "dtable-header-cell" : "dtable-cell"}
                    onDoubleClick={() => this.props.onDblClick(this.props.rowIdx)}
                >
                    {this.props.data}
                </div>
            );
        }
    }
    
}


export default DataTable;