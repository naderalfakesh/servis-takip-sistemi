import React, {useState} from "react";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./tablo.css";

export default function MaterialTableDemo({
  columns,
  data,
  isLoading,
  handleAdd,
  handleEdit,
  handleDelete
}) {
  const [gridApi, setGridApi] = useState(null);
  const onButtonClick = (e, type) => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log(type, selectedData);
  };

  function onGridReady(params) {
    setGridApi(params.api);
  }

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "100%",
        width: "100%"
      }}
    >
      <AgGridReact
        rowData={[...Array(50).fill(data[0]), ...Array(50).fill(data[1])]}
        onGridReady={onGridReady}
        onCellValueChanged={e => onButtonClick(e, "cell")}
        onRowValueChanged={e => onButtonClick(e, "row")}
        onBtCopyRows={e => onButtonClick(e, "copy")}
        rowSelection="multiple"
        animateRows
        editType={"fullRow"}
        suppressHorizontalScroll="true"
        defaultColDef={{
          sortable: true,
          filter: true,
          editable: false,
          headerCheckboxSelectionFilteredOnly: true
        }}
      >
        {columns.map((col, i) => (
          <AgGridColumn
            field={col.field}
            headerName={col.title}
            key={i}
            checkboxSelection={i === 0}
            resizable
          />
        ))}
      </AgGridReact>
    </div>
  );
}
