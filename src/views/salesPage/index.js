import React, { useState, useEffect } from "react";
import Tablo from "../../components/Tablo";
import { db } from "../../firebase/firebaseConfig";
import columns from "./columns";
import firebase from "firebase/app";

export default function MainContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [servisListesi, setServisListesi] = useState([]);

  useEffect(() => {
    servisFetcher();
  });

  const servisFetcher = () => {
    setIsLoading(true);
    db.collection("services")
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
    data.createdAt = firebase.firestore.Timestamp.now();
    try {
      //if the date was already firebase timestamp no need to apply
      data.deliveryDate = firebase.firestore.Timestamp.fromDate(data.deliveryDate);
    } catch (e) {}
    try {
      //if the date was already firebase timestamp no need to apply
      data.dispatchDate = firebase.firestore.Timestamp.fromDate(data.dispatchDate);
    } catch (e) {}

    setIsLoading(true);
    db.collection("services")
      .add(data)
      .then((e) => {
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const handleEdit = (data) => {
    try {
      //if the date was already firebase timestamp no need to apply
      data.deliveryDate = firebase.firestore.Timestamp.fromDate(data.deliveryDate);
    } catch (e) {}
    try {
      //if the date was already firebase timestamp no need to apply
      data.dispatchDate = firebase.firestore.Timestamp.fromDate(data.dispatchDate);
    } catch (e) {}

    setIsLoading(true);
    const newData = { ...data };
    delete newData.id;
    db.collection("services")
      .doc(data.id)
      .update(newData)
      .then(() => setIsLoading(false));
  };

  const handleDelete = (data) => {
    setIsLoading(true);
    db.collection("services")
      .doc(data.id)
      .delete()
      .then(() => setIsLoading(false));
  };

  return (
    <Tablo
      data={servisListesi}
      columns={columns}
      isLoading={isLoading}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
