import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../Assets/Icons';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  Tablo: {
    overflow: "hidden",
  },
});

export default function MaterialTableDemo(props) {
  const classes = useStyles();

  return (
    <div className={classes.Tablo} >
    <MaterialTable
      title="Servis Takip Listesi"
      icons={tableIcons}
      columns={props.columns}
      data={props.data}
      isLoading={props.isLoading}
      options={{
        exportButton: false,
        filtering: false,
        addRowPosition: "first",
        paginationType: "stepped",
        pageSize: 20,
        maxBodyHeight: "72vh",
        minBodyHeight: "72vh",
        headerStyle: {whiteSpace: "nowrap"},
        rowStyle: {whiteSpace: "nowrap"}
      }}
      editable={{
        onRowAdd: newData =>{ 
          props.handleAdd(newData)
          return new Promise(resolve => {resolve();})
        },
        onRowUpdate: (newData, oldData) =>{ 
          props.handleEdit(newData)
          return new Promise(resolve => {resolve();})
        },
        onRowDelete: oldData =>{ 
          props.handleDelete(oldData)
          return new Promise(resolve => {resolve();})
        }
      }}
      detailPanel={rowData => {
        return (
          <div
                style={{
                  fontSize: 100,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#FDD835',
                }}
              >
                {rowData.product}
              </div>
        )
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
      localization={{
        toolbar: {
            nRowsSelected: '{0} SATIR SEÇİLDİ'
        },
        header: {
            actions: 'AKSİYON'
        },
        body: {
            emptyDataSourceMessage: 'GÖSTERİLECEK SATIR YOK',
            addTooltip : 'Ekle',
            deleteTooltip: 'Sil',
            editTooltip: 'Değiştir',
            filterRow: {
                filterTooltip: 'SÜZGEÇ'
            },
            editRow:{
              deleteText: 'Bunu silmek istediğinizden emin misiniz?',
              cancelTooltip: 'İptal',
              saveTooltip: 'Kaydet',
            },
            toolbar:{
              searchTooltip: 'Ara',
              searchPlaceholder: 'Ara',
            }
        }
    }}
    />
    </div>
  );
}
