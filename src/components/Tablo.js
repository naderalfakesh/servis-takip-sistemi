import React, {useState} from "react";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function MaterialTableDemo({
                                              columns,
                                              data,
                                              isLoading,
                                              handleAdd,
                                              handleEdit,
                                              handleDelete,
                                          }) {
    const [gridApi, setGridApi] = useState(null);
    const onButtonClick = e => {
        const selectedNodes = gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        console.log(selectedData)
    }

    function onGridReady(params) {
        setGridApi(params.api);
    }

    return (
        <div className="ag-theme-alpine" style={{height: "100%", width: "100%"}}>
            <button onClick={onButtonClick}>Get selected rows</button>
            <AgGridReact
                onGridReady={onGridReady}
                rowData={data}
                rowSelection="multiple"
                animateRows
                defaultColDef={{
                    sortable: true,
                    filter: true,
                    editable: true,
                    headerCheckboxSelectionFilteredOnly: true,
                }}
            >
                {columns.map((col, i) => (
                    <AgGridColumn field={col.field} headerName={col.title} key={i} checkboxSelection={i === 0} pinned
                                  resizable/>
                ))}


            </AgGridReact>

        </div>
    );
}
