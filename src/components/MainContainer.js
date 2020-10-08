import React, { Component } from "react";
import Tablo from "./Tablo";
import { db } from "../firebase/firebaseConfig";
import columns from "../Assets/columns";
import firebase from "firebase/app";

export default class MainContainer extends Component {
  state = {
    servisListesi: [],
    isLoading: true,
  };

  servisFetcher = () => {
    this.setState({ isLoading: true });
    db.collection("services")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const servisListesi = snap.docs.map((e) => {
          const data = e.data();
          try {
            //if the date was already firebase timestamp no need to apply
            data.deliveryDate = data.deliveryDate.toDate();
            data.dispatchDate = data.dispatchDate.toDate();
          } catch (e) {}
          return Object.assign({}, { id: e.id }, data);
        });
        this.setState({ servisListesi, isLoading: false });
      });

    // db.collection("services")
    //   .get()
    //   .then(snap => {
    //     const servisListesi = snap.docs.map(e => e.data());
    //     this.setState({ servisListesi });
    //   })
    //   .catch(e => console.log(e));
  };

  componentDidMount() {
    this.servisFetcher();
    // const rootRef = RTdb.ref().child('services');
    // const nameRef = rootRef.child('name')
    // nameRef.on('value',snap=>console.log(snap.val()) )
    // nameRef.set("naseralfatare")
  }

  handleAdd = (data) => {
    data.createdAt = firebase.firestore.Timestamp.now();
    try {
      //if the date was already firebase timestamp no need to apply
      data.deliveryDate = firebase.firestore.Timestamp.fromDate(
        data.deliveryDate
      );
    } catch (e) {}
    try {
      //if the date was already firebase timestamp no need to apply
      data.dispatchDate = firebase.firestore.Timestamp.fromDate(
        data.dispatchDate
      );
    } catch (e) {}

    this.setState({ isLoading: true });
    db.collection("services")
      .add(data)
      .then((e) => {
        console.log(e);
        this.setState({ isLoading: false });
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  handleEdit = (data) => {
    try {
      //if the date was already firebase timestamp no need to apply
      data.deliveryDate = firebase.firestore.Timestamp.fromDate(
        data.deliveryDate
      );
    } catch (e) {}
    try {
      //if the date was already firebase timestamp no need to apply
      data.dispatchDate = firebase.firestore.Timestamp.fromDate(
        data.dispatchDate
      );
    } catch (e) {}

    this.setState({ isLoading: true });
    const newData = { ...data };
    delete newData.id;
    db.collection("services")
      .doc(data.id)
      .update(newData)
      .then(() => this.setState({ isLoading: false }));
  };

  handleDelete = (data) => {
    this.setState({ isLoading: true });
    db.collection("services")
      .doc(data.id)
      .delete()
      .then(() => this.setState({ isLoading: false }));
  };

  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <Tablo
          data={this.state.servisListesi}
          columns={columns}
          isLoading={this.state.isLoading}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
