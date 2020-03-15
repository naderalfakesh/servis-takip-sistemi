import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../Assets/Icons';

export default function MaterialTableDemo(props) {
  return (
    <MaterialTable
      title="Servis Takip Listesi"
      icons={tableIcons}
      columns={props.columns}
      data={props.data}
      style={{minHeight:"100vh"}}
      isLoading={props.isLoading}
      options={{
        exportButton: false,
        filtering: false,
        addRowPosition: "first",
        paginationType: "stepped",
        pageSize: 10
        // minBodyHeight: "100vh"
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
  );
}
