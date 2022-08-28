// import React from "react";
// import { Layout, Typography, Row, Select, Input, Col } from "antd";
// const { Content } = Layout;
// const { Title } = Typography;
// const addDecisions = () => {
//   return (
//     <Layout>
//       <Content
//         className="site-layout"
//         style={{ padding: "0 50px", marginTop: 64 }}
//       >
//         <Title
//           level={1}
//           style={{ textAlign: "center", padding: "40px 0 40px" }}
//         >
//           تسجيل قرار وزارى جديد
//         </Title>
//       </Content>
//     </Layout>
//   );
// };

// export default addDecisions;

import { useState } from "react";
import { Input, FormItem } from "formik-antd";
import { Col } from "antd";
import * as yup from "yup";

import { Create } from "../common/actions";
import ToastHandling from "../common/toastify";

import Common from "../Register/common";
import ImageUpload from "../common/imageupload";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const AddDecisions = () => {
  const [fileList, setFileList] = useState([]);
  const initialValues = {
    faculty: "",
    year: "",

    decision: "",
    imgs: [],
    number: "",
  };
  const validationSchema = () =>
    yup.object({
      faculty: yup
        .string("ادخل اسم الكلية او المعهد او المدرسة ")
        .required("مطلوب"),
      year: yup
        .string("ادخل سنة اصدار القرار")
        .length(4, "  السنة يجب ان تتكون من 4 رقم")
        .required("مطلوب"),

      decision: yup.string("ادخل نص القرار").required("مطلوب"),
      number: yup.string("ادخل رقم القرار").required("مطلوب"),
    });

  const submitForm = async (values, { setSubmitting, resetForm }) => {
    let base64list = [];
    for (let file of fileList) {
      let durl = await getBase64(file.originFileObj);
      base64list.push(durl);
    }
    console.log(base64list);
    values.imgs = base64list;
    Create("/decisions", values).then((res) => {
      if (res) {
        ToastHandling("success", "تم تسجيل القرار بنجاح");
        resetForm({});
        setFileList([]);
      } else {
        setSubmitting(false);
        ToastHandling("error", res);
      }
      setSubmitting(false);
    });
  };

  return (
    <Common
      initialValue={initialValues}
      validationSchema={validationSchema}
      submitForm={submitForm}
    >
      <Col className='gutter-row' span={24}>
        <FormItem name='faculty' hasFeedback={true} showValidateSuccess={true}>
          <Input name='faculty' placeholder='اسم الكلية او المعهد او المدرسة' />
        </FormItem>
      </Col>
      <Col className='gutter-row' span={12}>
        <FormItem name='number' hasFeedback={true} showValidateSuccess={true}>
          <Input name='number' placeholder='رقم القرار' />
        </FormItem>
      </Col>
      <Col className='gutter-row' span={12}>
        <FormItem name='year' hasFeedback={true} showValidateSuccess={true}>
          <Input name='year' placeholder='السنة' />
        </FormItem>
      </Col>

      <Col className='gutter-row' span={24}>
        <FormItem name='decision' hasFeedback={true} showValidateSuccess={true}>
          <Input name='decision' placeholder='نص القرار' />
        </FormItem>
      </Col>
      <Col className='gutter-row' span={24}>
        <FormItem name='imgs' hasFeedback={true} showValidateSuccess={true}>
          <ImageUpload fileList={fileList} setFileList={setFileList} />
        </FormItem>
        {/* <ImageUpload fileList={fileList} setFileList={setFileList} /> */}
      </Col>
    </Common>
  );
};

export default AddDecisions;
