import React, { useState, useEffect } from "react";
import { Layout, Typography, Row, Select, Input, Col } from "antd";
import Table from "../common/table";
import Columns from "../common/columnTable";
import { Fetch } from "../common/actions";
import ToastHandling from "../common/toastify";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export default function RegisteredPeople() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState();

  // const handleType = (event) => {
  //   Fetch(`/persons/peopleFilteration?name=${event.target.value}`).then(
  //     (res) => {
  //       if (res?.data) {
  //         setData(res.data);
  //       } else {
  //         ToastHandling("error", res.data.message);
  //       }
  //     }
  //   );
  // };

  // const handleChange = (event) => {
  //   Fetch(`/persons/peopleFilteration?persontype="${event}"`).then((res) => {
  //     if (res?.data) {
  //       let Data = [];
  //       res.data.map((item) =>
  //         Data.push({
  //           ...item,
  //           joinDate: item.joinDate
  //             ? new Date(item.joinDate).toLocaleDateString("ar")
  //             : null,
  //           registerDate: item.registerDate
  //             ? new Date(item.registerDate).toLocaleDateString("ar")
  //             : null,
  //           leavingDate: item.leavingDate
  //             ? new Date(item.leavingDate).toLocaleDateString("ar")
  //             : null,
  //         })
  //       );
  //       setData(Data);
  //     } else {
  //       ToastHandling("error", res.data.message);
  //     }
  //   });
  // };

  // const handleVaccine = (event) => {
  //   Fetch(`/persons/peopleFilteration?VaccineType="${event}"`).then((res) => {
  //     if (res?.data) {
  //       let Data = [];
  //       res.data.map((item) =>
  //         Data.push({
  //           ...item,
  //           joinDate: item.joinDate
  //             ? new Date(item.joinDate).toLocaleDateString("ar")
  //             : null,
  //           registerDate: item.registerDate
  //             ? new Date(item.registerDate).toLocaleDateString("ar")
  //             : null,
  //           leavingDate: item.leavingDate
  //             ? new Date(item.leavingDate).toLocaleDateString("ar")
  //             : null,
  //         })
  //       );
  //       setData(Data);
  //     } else {
  //       ToastHandling("error", res.data.message);
  //     }
  //   });
  // };

  useEffect(() => {
    Fetch(`/decisions`).then((res) => {
      setCount(res.data.length);
      const Data = res.data;
      Data.forEach((item) => {
        if (item.sum >= item.totalSum * (60 / 100)) {
          item.magmo3State = "ناجح";
        } else {
          item.magmo3State = "دون المجموع";
        }
      });
      setData(Data);
    });
  }, []);

  // const elnsbaa = data.filter((elnsba) => elnsba.totalSum * (60 / 100));
  // console.log("elnsbaa", elnsbaa);

  const Options = {
    count: count,
    page: 0,
    rowsPerPage: 10,
    filter: true,
    filterType: "dropdown",
    responsive: "sample",
    serverSide: false,
  };

  const columns = [
    {
      label: "رقم القرار",
      name: "number",
    },
    {
      label: "اسم الكلية او المعهد",

      name: "faculty",
      // options: {
      //   filter: false,
      //   empty: true,
      //   customBodyRender: (dataIndex, rowIndex, updateIndex) => {
      //     // console.log(rowIndex.rowData[0]);
      //     return <Link to={`confirm/${data._id}`}>{dataIndex}</Link>;
      //   },
      // },
    },
    {
      label: "السنة",
      name: "year",
    },

    {
      label: "نص القرار",
      name: "decision",
    },
    {
      label: "صفحة القرار",
      name: "_id",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex, updateIndex) => {
          // console.log(rowIndex.rowData[0]);
          return <Link to={`confirm/${dataIndex}`}>صورة القرار</Link>;
        },
      },
    },
    // {
    //   label: "صورة القرار",
    //   name: "imgs",
    //   options: {
    //     filter: false,
    //     empty: true,
    //     customBodyRender: (dataIndex, rowIndex, updateIndex) => {
    //       // console.log(rowIndex.rowData[0]);
    //       return <Link to={`confirm/${rowIndex.rowData[2]}`}>{dataIndex}</Link>;
    //     },
    //   },
    // },
  ];

  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <Title
          level={1}
          style={{ textAlign: "center", padding: "40px 0 40px" }}
        >
          كشف القرارات الوزارية
        </Title>

        <Row gutter={24}>
          <Col className="gutter-row" span={8}>
            {/* <Input
              type="text"
              style={{
                padding: "14px 30px",
                fontSize: "20px",
                fontWeight: "600",
                border: "1px solid",
              }}
              onChange={handleType}
              name="name"
              className="form-control"
              id="name"
              placeholder=" الاسم ..."
            /> */}
          </Col>

          <Col className="gutter-row" span={8}></Col>

          <Col className="gutter-row" span={8}></Col>
        </Row>
        <Table
          dataTable={data}
          table="compliants"
          Columns={Columns("compliants", columns)}
          options={Options}
        />
      </Content>
    </Layout>
  );
}
