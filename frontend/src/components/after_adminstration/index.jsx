import React, { useState, useEffect } from "react";
import { Layout, Row, Select, Input, Button, Col, AutoComplete } from "antd";
import { useHistory, Link } from "react-router-dom";
import Table from "../common/table";
import Columns from "../common/columnTable";
import { Fetch } from "../common/actions";
import ToastHandling from "../common/toastify";
import { dataWeapon } from "../common/data";

const { Content } = Layout;
const { Option } = Select;

export default function RegisteredPeople() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [weapon, setWeapon] = useState(dataWeapon);
  const history = useHistory();

  const handlePrint = () => {
    history.push("/report");
  };

  const onWeapon = (searchText) => {
    setWeapon(
      dataWeapon.filter((data) =>
        data.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  useEffect(() => {
    Fetch(`/volanteers`).then((res) => {
      setCount(res.data.length);
      // let Data = [];
      // res.data.map((item) => {
      //   let VaccineType = [];
      //   if (item.covidVaccine.doses[0]) {
      //     item.covidVaccine.doses.map((type) => VaccineType.push(type.type));
      //     return Data.push({
      //       ...item,
      //       joinDate: item.joinDate
      //         ? new Date(item.joinDate).toLocaleDateString("ar")
      //         : null,
      //       registerDate: item.registerDate
      //         ? new Date(item.registerDate).toLocaleDateString("ar")
      //         : null,
      //       leavingDate: item.leavingDate
      //         ? new Date(item.leavingDate).toLocaleDateString("ar")
      //         : null,
      //       covidVaccine: VaccineType.join(","),
      //       VaccineOne: item.covidVaccine?.doses[0]?.vaccineDate
      //         ? new Date(
      //             item.covidVaccine?.doses[0]?.vaccineDate
      //           ).toLocaleDateString("ar")
      //         : null,
      //       VaccineTwo: item.covidVaccine?.doses[1]?.vaccineDate
      //         ? new Date(
      //             item.covidVaccine?.doses[1]?.vaccineDate
      //           ).toLocaleDateString("ar")
      //         : null,
      //       VaccineThree: item.covidVaccine?.doses[2]?.vaccineDate
      //         ? new Date(
      //             item.covidVaccine?.doses[2]?.vaccineDate
      //           ).toLocaleDateString("ar")
      //         : null,
      //     });
      //   }
      // });
      setData(res.data);
    });
  }, []);
  const columns = [
    {
      label: "رقم الملف",
      name: "fileNo",
    },
    {
      label: "الاسم",
      name: "name",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex, updateIndex) => {
          return (
            <Link to={`confirm/${rowIndex.rowData[0].replaceAll("/", "-")}`}>
              {dataIndex}
            </Link>
          );
        },
      },
    },
    {
      label: "الرقم القومي",
      name: "nationalId",
    },

    {
      label: "الرقم الثلاثى ",
      name: "tribleNum",
    },
    // {
    //   label: "نوع الشهادة",
    //   name: "category",
    // },
    {
      label: "المجموع الكلى",
      name: "totalSum",
    },
    {
      label: "مجموع الطالب",
      name: "sum",
    },
    // {
    //   label: "النتيجة النهائية",
    //   name: "name",
    // },
    {
      label: "السلاح",
      name: "corp",
    },
  ];

  const Options = {
    count: count,
    page: 0,
    rowsPerPage: 10,
    filter: true,
    filterType: "dropdown",
    responsive: "sample",
    serverSide: false,
  };

  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64, textAlign: "center" }}
      >
        <Button
          onClick={handlePrint}
          style={{
            minWidth: "200px",
            minHeight: "70px",
            borderRadius: "20px",
            padding: 0,
            transition: "all .3s ease-in",
            fontSize: "20px",
            fontWeight: 600,
            background: "#3a6351",
            margin: "30px 0",
            color: "#fff",
            position: "relative",
          }}
        >
          طباعة نموذج 78
        </Button>
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
              // onChange={handleType}
              name="name"
              className="form-control"
              id="name"
              placeholder=" الاسم ..."
            /> */}
          </Col>
          <Col className="gutter-row" span={8}>
            {/* <AutoComplete
              name="corp"
              dataSource={weapon}
              placeholder="السلاح"
              onSearch={onWeapon}
              allowClear
            /> */}
          </Col>
          <Col className="gutter-row" span={8}>
            {/* <Select
              style={{ width: "100%", marginBottom: "10px" }}
              native
              name="gover"
              placeholder="نوع الشهادة"
              // onChange={handleChange}
            >
              <Option value={"عام"}>اعدادى عام</Option>
              <Option value={"ازهر"}>اعدادى ازهر</Option>
              <Option value={"مهنى"}>مهنى</Option>
            </Select> */}
          </Col>
        </Row>

        <Table
          dataTable={data}
          table="commission"
          Columns={Columns("commission", columns)}
          options={Options}
        />
      </Content>
    </Layout>
  );
}
