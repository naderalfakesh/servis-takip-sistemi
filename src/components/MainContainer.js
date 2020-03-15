import React, { Component } from "react";
import Tablo from "./Tablo";
import { RTdb } from "../firebase/firebaseConfig";

export default class MainContainer extends Component {
  state = {
    nader: ""
  };
  componentDidMount() {
    // db.collection("services")
    //   .get()
    //   .then(snap => {
    //     const nader = snap.docs.map(e => {
    //       return Object.assign({}, { id: e.id }, e.data().name);
    //     });
    //     this.setState({ nader });
    //   })
    //   .catch(e => console.log(e));
    const rootRef = RTdb.ref().child('services');
    const nameRef = rootRef.child('name')
    nameRef.on('value',snap=>console.log(snap.val()) )
    nameRef.set("naseralfatare")
}
  render() {
    return (
      <div>
        <Tablo />
      </div>
    );
  }
}
