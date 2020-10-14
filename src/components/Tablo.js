import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./tablo.css";
import Button from "@material-ui/core/Button";

export default function MaterialTableDemo({
  columns,
  data,
  isLoading,
  handleSelect,
  handleAdd,
  handleEdit,
  handleDelete,
}) {
  const [gridApi, setGridApi] = useState(null);
  const onButtonClick = (e, type) => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    console.log(type, selectedData);
  };
  const handleRowSelect = (e) => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    handleSelect(selectedData);
  };

  function onGridReady(params) {
    setGridApi(params.api);
  }

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <div>
        <Button size="small" variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button size="small" variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </div>
      <AgGridReact
        rowData={data}
        onGridReady={onGridReady}
        onCellValueChanged={(e) => onButtonClick(e, "cell")}
        onRowValueChanged={(e) => onButtonClick(e, "row")}
        onBtCopyRows={(e) => onButtonClick(e, "copy")}
        rowSelection="multiple"
        onRowSelected={handleRowSelect}
        isLoading={true}
        animateRows
        editType={"fullRow"}
        showLoadingOverlay={isLoading}
        suppressHorizontalScroll="true"
        defaultColDef={{
          sortable: true,
          filter: true,
          editable: false,
          headerCheckboxSelectionFilteredOnly: true,
        }}
      >
        {columns.map((col, i) => (
          <AgGridColumn field={col.field} headerName={col.title} key={i} checkboxSelection={i === 0} resizable />
        ))}
      </AgGridReact>
    </div>
  );
}
