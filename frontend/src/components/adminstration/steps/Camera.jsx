import React, { useState } from "react";
import { Col, Typography, Button, Row, Image, message } from "antd";
import { CameraFilled } from "@ant-design/icons";

import Webcam from "react-webcam";
import camerWatermark from "../../../services/camera-watermark.js";

import { Create } from "../../common/actions";

const { Title } = Typography;

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const handleCapture = (photos, setPhotos, getScreenshot, data) => {
  const shot = getScreenshot();

  camerWatermark(shot, data).then((rslt) => {
    setPhotos([...photos, rslt]);
  });
};

const handleUpload = (photos, registeredPerson) => {
  Create(`/volanteers/${registeredPerson.nationalId}/examinationPhotos`, {
    examinationPhotos: photos,
  }).then(() => {
    message.success("تم التسجيل بنجاح");
    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
  });
};

const StudentCamera = ({ registeredPerson }) => {
  const [photos, setPhotos] = useState([]);
  return (
    <>
      <Row justify='center' gutter={[20, 20]}>
        {" "}
        <Col span={24}>
          <Title level={4}> صور الطالب </Title>
        </Col>
        <Col span={24}>
          {" "}
          <Webcam
            audio={false}
            screenshotFormat='image/jpeg'
            width={520}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <>
                <br></br>
                <Button
                  onClick={() => {
                    handleCapture(
                      photos,
                      setPhotos,
                      getScreenshot,
                      registeredPerson
                    );
                  }}
                >
                  <CameraFilled /> تصوير
                </Button>
              </>
            )}
          </Webcam>
        </Col>
        <br></br>
        <Col span={24}>
          <Row gutter={[10, 0]} justify='center'>
            {photos.map((photo) => {
              return (
                <Col>
                  <Image src={photo} height={150} width={150}></Image>
                </Col>
              );
            })}
          </Row>
        </Col>
        <div>
          <Button
            type='primary'
            onClick={() => {
              handleUpload(photos, registeredPerson);
            }}
          >
            تسجيل
          </Button>
        </div>
      </Row>
    </>
  );
};

export default StudentCamera;
