import React, { useState, useEffect } from "react";
import Tablo from "../../components/Tablo";
import { db } from "../../firebase/firebaseConfig";
import columns from "./columns";
import firebase from "firebase/app";

export default function SalesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [servisListesi, setServisListesi] = useState([]);
  const [selectedRows, setSelectedRows] = useState(null);

  useEffect(() => {
    servisFetcher();
  });

  const servisFetcher = () => {
    setIsLoading(true);
    db.collection("saleServices")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const servisList = snap.docs.map((e) => {
          const data = e.data();
          try {
            //if the date was already firebase timestamp no need to apply
            data.deliveryDate = data.deliveryDate.toDate();
            data.dispatchDate = data.dispatchDate.toDate();
          } catch (e) {}
          return Object.assign({}, { id: e.id }, data);
        });
        setServisListesi(servisList);
        setIsLoading(false);
      });
  };

  const handleAdd = (data) => {
    const testData = {
      reference: "Ref12345678",
      salesMan: "Hakan Akbulak",
      customer: "Kolayik",
      product: "22kw 04p",
      job: "Flanş tak",
      deliveryTerms: "Depo teslim",
      deliveryPlace: "Yenibosna",
      deliveryDate: new Date(),
      price: "25000 TL",
      status: "New entry",
      createdAt: new Date(),
      updatedAt: null,
    };
    // data.createdAt = firebase.firestore.Timestamp.now();
    // try {
    //   //if the date was already firebase timestamp no need to apply
    //   data.deliveryDate = firebase.firestore.Timestamp.fromDate(data.deliveryDate);
    // } catch (e) {}
    // try {
    //   //if the date was already firebase timestamp no need to apply
    //   data.dispatchDate = firebase.firestore.Timestamp.fromDate(data.dispatchDate);
    // } catch (e) {}

    setIsLoading(true);
    db.collection("saleServices")
      .add(testData)
      .then((e) => {
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const handleEdit = (data) => {
    console.log("edit");
    return;
    // try {
    //   //if the date was already firebase timestamp no need to apply
    //   data.deliveryDate = firebase.firestore.Timestamp.fromDate(data.deliveryDate);
    // } catch (e) {}
    // try {
    //   //if the date was already firebase timestamp no need to apply
    //   data.dispatchDate = firebase.firestore.Timestamp.fromDate(data.dispatchDate);
    // } catch (e) {}

    // setIsLoading(true);
    // const newData = { ...data };
    // delete newData.id;
    // db.collection("saleServices")
    //   .doc(data.id)
    //   .update(newData)
    //   .then(() => setIsLoading(false));
  };

  const handleDelete = () => {
    const selectedIds = selectedRows.map((row) => row.id);
    if (selectedIds && selectedIds.length > 1) {
      db.collection("saleServices")
        .where(firebase.firestore.FieldPath.documentId(), "in", selectedIds)
        .get()
        .then(function (querySnapshot) {
          // Once we get the results, begin a batch
          let batch = db.batch();

          querySnapshot.forEach(function (doc) {
            // For each doc, add a delete operation to the batch
            batch.delete(doc.ref);
          });

          // Commit the batch
          return batch.commit();
        })
        .then(function () {
          console.log("deletion finished");
        });
    } else {
      selectedRows.forEach((row) => {
        setIsLoading(true);
        db.collection("saleServices")
          .doc(row.id)
          .delete()
          .then(() => {
            setIsLoading(false);
            console.log("Succsess: ");
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
          });
      });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Tablo
        data={servisListesi}
        columns={columns}
        isLoading={isLoading}
        handleSelect={setSelectedRows}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
