import React, { useEffect, useState } from "react";
import "./reports.scss";
import { Layout, Button, Row, Col, Typography } from "antd";
import { Fetch } from "../common/actions";

const { Content } = Layout;

const Table = () => {
  return (
    <Layout>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div className="report-container">
          <div className="header">
            <p className="tit">
              إدارة التجنيد والتعبئة <br />
              منطقة تجنيد وتعبئة الزقازيق
            </p>
          </div>
          <div className="table">
            <div>
              <h1 className="titl">
                بسم الله الرحمن الرحيم
                {/* {new Date().toLocaleDateString("ar")} */}
              </h1>

              <ul
                style={{
                  listStyleType: "none",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <li>
                  اخطار تأثير عن متطوع بالمادة 20 من القانون رقم 127 لسنة 1980
                  {/* {new Date().toLocaleDateString("ar")} */}
                </li>
                <li>(نموذج 78 جند)</li>
              </ul>
            </div>
            <table>
              <tr>
                <th>رقم الملف</th>
                <th>الاسم واللقب بالكامل</th>
                <th>الرقم القومى</th>
                <th>الرقم الثلاثى</th>
                <th>تاريخ الميلاد</th>
                <th>مركز</th>
                <th>محافظة</th>
                <th>تاريخ الالتحاق</th>
              </tr>
              <tr>
                <td>17204</td>
                <td>مصطفى حمدى منير عبدالفتاح</td>
                <td>29803241300859</td>
                <td>1103/42/1998</td>
                <td>01-01-2003</td>
                <td>ابو حماد</td>
                <td>الشرقية</td>
                <td>08-04-2022</td>
              </tr>
            </table>
            <ul
              style={{
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-between",
                margin: "20px",
              }}
            >
              <li>الدفعة (161)</li>
              <li>السلاح / ...................</li>
            </ul>
            <ul
              style={{
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-between",
                margin: "20px",
              }}
            >
              <li>
                {" "}
                الاختار عاليه مرسل للتآشير بموجية قرين المذكور بالدفتر 18 جند
              </li>
            </ul>
            <ul
              style={{
                listStyleType: "none",
                display: "flex",
                justifyContent: "space-between",
                margin: "20px",
              }}
            >
              <li> التـــــــاريــخ {new Date().toLocaleDateString("ar")}</li>
            </ul>
            {/* <p style={{ textAlign: "right", margin: "20px" }}>
              الاختار عاليه مرسل للتآشير بموجية قرين المذكور بالدفتر 18 جند
              وحفظة
            </p>
            <p style={{ textAlign: "right", margin: "20px" }}>
              التـــــــاريــخ {new Date().toLocaleDateString("ar")}
            </p> */}
          </div>

          <Row gutter={24}>
            <Col span={8} pull={16}>
              <Typography
                style={{
                  fontFamily: "arial",
                  fontSize: "28px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                التوقيع (----------------)
              </Typography>
              <Typography
                style={{
                  fontFamily: "arial",
                  fontSize: "37px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                عميد / حاتم عبده السيد
              </Typography>
              <Typography
                style={{
                  fontFamily: "arial",
                  fontSize: "37px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                مدير منطقة تجنيد وتعبئة الزقازيق
              </Typography>
            </Col>
          </Row>
          <Button className="no-print btn" onClick={() => window.print()}>
            طباعة نموذج 78
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Table;
