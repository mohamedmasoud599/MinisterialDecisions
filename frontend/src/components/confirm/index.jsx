import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Image, Button } from "antd";
import { Fetch, Update } from "../common/actions";
import { useParams } from "react-router-dom";
import ToastHandling from "../common/toastify";

import "./confirm.css";

const base = `http://${window.location.hostname}:8000/`;

const ConfirmPanel = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const params = useParams();

  useEffect(() => {
    Fetch(`/decisions/${params.id}`).then((res) => {
      if (res.data) {
        console.log(res.data);
        setData(res.data);
        setLoading(true);
      } else {
        ToastHandling("error", res.data.message);
        setData({});
      }
    });
  }, []);

  return (
    <Row
      className="previewContainer"
      gutter={30}
      justify="center"
      align="middle"
    >
      <Col className="imgpreview" span={12}>
        {data && (
          <Image.PreviewGroup>
            {data?.imgs?.map((img) => {
              return <Image src={`${base}/${img}`}></Image>;
            })}
          </Image.PreviewGroup>
        )}
      </Col>
      {/* <Col className="datapreview" span={12}>
        <Divider orientation="right"> القرار</Divider>
        <div className="databox">
          <Row justify="center">
            <Col span={12}>
              <h4 class="header">اسم الكلية او المعهد او المدرسة : </h4>
              <h3> {data?.faculty}</h3>
            </Col>
            <Col span={12}>
              <h4 class="header"> السنة : </h4>
              <h3> {data?.year}</h3>
            </Col>
            <Col span={12}>
              <h4 class="header"> نص القرار : </h4>
              <h3> {data?.decision}</h3>
            </Col>
          </Row>
        </div>
      </Col> */}
    </Row>
  );
};

export default ConfirmPanel;
