import React, { useState } from "react";
import { Space, Form, Typography, Button } from "antd";
import { Create } from "../../common/actions";
import ImageUpload from "../../common/imageupload";

const { Title } = Typography;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

async function handleUpload(fileList, nid) {
  let base64list = [];
  for (let file of fileList) {
    let durl = await getBase64(file.originFileObj);
    base64list.push(durl);
  }
  await Create(`/volanteers/${nid}/certificates`, { certificates: base64list });
}

const DataView = ({ registeredPerson, currentStep, stepsLength, next }) => {
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  return (
    <>
      <Space size={50} direction='vertical'>
        <Title level={3}>رفع صورة شهادة الطالب </Title>
        <Form form={form}>
          <Form.Item
            name='Certificate'
            rules={[
              {
                validator: () => {
                  if (fileList.length === 0)
                    return Promise.reject(new Error("صورة الشهادة مطلوبة"));
                  else {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <ImageUpload fileList={fileList} setFileList={setFileList} />
          </Form.Item>
        </Form>
        <div>
          {currentStep < stepsLength - 1 && (
            <Button
              type='primary'
              onClick={() => {
                handleUpload(fileList, registeredPerson.nationalId).then(() => {
                  next();
                });
              }}
            >
              الخطوة التالية
            </Button>
          )}
        </div>
      </Space>
    </>
  );
};

export default DataView;
