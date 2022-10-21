import "../assets/css/jquery.dataTables.css";
import React, { Component } from "react";

const $ = require("jquery");
$.Datatable = require("datatables.net");

export default class Tbl extends Component {
  componentDidMount() {
    this.$el = $("#mainTable");
    this.$el.DataTable({
      data: this.props.data,
      columns: [
        { title: "ID", data: "id" },
        { title: "Nama", data: "nama" },
        { title: "Foto", data: "foto" },
        { title: "Harga Beli", data: "hargabeli." },
        { title: "Harga Jual", data: "hargajual" },
        { title: "Stok", data: "stok" },
      ],
    });
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <table id="mainTable" class="table table-striped" width="100%"></table>
      </div>
    );
  }
}
