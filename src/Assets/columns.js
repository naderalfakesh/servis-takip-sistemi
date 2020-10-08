const columns = [
  { title: "Müşteri", field: "customer" },
  { title: "Ürün", field: "product" },
  {
    title: "Satış Yetkili ",
    field: "salesPersonal",
    lookup: { ha: "Hakan A.", hk: "Hüseyin K.", ag: "Alev G." },
  },
  { title: "Geliş Tarihi", field: "deliveryDate", type: "date" },
  {
    title: "Geliş Yeri",
    field: "deliveryPlace",
    lookup: { y: "Yenibosna", s: "Selimpaşa" },
  },
  { title: "Teslim alan", field: "personal" },
  { title: "Görsel durum", field: "inspection" },
  { title: "Gidiş Tarihi", field: "dispatchDate", type: "date" },
  {
    title: "Gidiş Yeri",
    field: "dispatchPlace",
    lookup: { y: "Yenibosna", s: "Selimpaşa" },
  },
];

export default columns;
