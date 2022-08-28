import { useState } from "react";
import "./style.css";
import "antd/dist/antd.css";
import {
  Typography,
  Space,
  Form,
  Input,
  Select,
  Button,
  Image,
  Row,
  Col,
  message,
  Descriptions,
  Checkbox,
} from "antd";
import { CameraFilled, CloseOutlined } from "@ant-design/icons";
import { clinics, videoConstraints } from "./meta data";
import Webcam from "react-webcam";
import { handleCapture, handleSearch, handleUpdate } from "./utils&hooks";

const { Title } = Typography;
const { Option } = Select;
const { Group } = Checkbox;

const Medical = () => {
  const [updateForm] = Form.useForm();
  const [registered, setRegistered] = useState(null);
  const [medicalState, setMedicalState] = useState("لائق");
  const [photos, setPhotos] = useState([]);

  return (
    <div className='main-container'>
      <Space direction='vertical' size={30} align='center'>
        <Title level={2}> الكشف الطبي</Title>

        <Input.Search
          size='large'
          placeholder={"رقم الملف"}
          allowClear
          enterButton='بحث'
          onSearch={(val) => {
            if (val) handleSearch(val, setRegistered);
          }}
        />

        {registered && (
          <>
            <Descriptions title='بيانات المتقدم' bordered>
              <Descriptions.Item label='الإسم'>
                {registered.name}
              </Descriptions.Item>
              {/* <Descriptions.Item label='الرقم القومي'>
                {registered.nationalId}
              </Descriptions.Item> */}
              <Descriptions.Item label='الرقم الثلاثي'>
                {registered.tribleNum}
              </Descriptions.Item>
            </Descriptions>

            <Form form={updateForm}>
              <Form.Item
                label='الحالة الطبية'
                name='medicalState'
                rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
                initialValue={"لائق"}
              >
                <Select onChange={(val) => setMedicalState(val)}>
                  <Option value={"لائق"}>لائق</Option>
                  <Option value={"غير لائق"}>لائق غير</Option>
                </Select>
              </Form.Item>
              {medicalState === "غير لائق" && (
                <Form.Item
                  label='تخصص'
                  name='clinic'
                  rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
                >
                  <Group options={clinics} />
                </Form.Item>
              )}
            </Form>
            <Title level={4}>تصوير الطالب</Title>
            <Webcam
              audio={false}
              screenshotFormat='image/jpeg'
              width={520}
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <>
                  <div className='cam-dev'>
                    <Button
                      onClick={() => {
                        handleCapture(
                          photos,
                          setPhotos,
                          getScreenshot,
                          registered.nationalId,
                          registered.name
                        );
                      }}
                    >
                      <Space>
                        <CameraFilled /> تصوير
                      </Space>
                    </Button>
                  </div>
                </>
              )}
            </Webcam>
            <Row gutter={[10, 0]} justify='center'>
              {photos.map((photo, index) => {
                return (
                  <Col className='img-container'>
                    <CloseOutlined
                      className='discard-icon'
                      onClick={() => {
                        setPhotos(photos.filter((e, i) => i !== index));
                      }}
                    />
                    <Image src={photo} height={150} width={150}></Image>
                  </Col>
                );
              })}
            </Row>
            <Button
              type='primary'
              shape='round'
              size='large'
              onClick={() => {
                updateForm.validateFields().then(() => {
                  handleUpdate(
                    updateForm.getFieldValue(),
                    photos,
                    registered.fileNo
                  ).then(() => {
                    message.success("تم التسجيل بنجاح");
                    setTimeout(() => {
                      window.location.reload(false);
                    }, 500);
                  });
                });
              }}
            >
              تسجيل
            </Button>
          </>
        )}
      </Space>
    </div>
  );
};

export default Medical;
