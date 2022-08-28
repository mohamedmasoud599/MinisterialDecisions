import { Formik } from "formik";
import { Form, Input, FormItem, SubmitButton } from "formik-antd";
import { Row, Col } from "antd";

const Common = (props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={props.initialValue}
      validationSchema={props.validationSchema}
      onSubmit={props.submitForm}
    >
      {({ handleReset, isSubmitting, dirty }) => (
        <Form>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              {/* <FormItem
                name="name"
                hasFeedback={true}
                showValidateSuccess={true}
              >
                <Input name="name" placeholder="اسم الكلية" />
              </FormItem> */}
            </Col>
            {props.children}
          </Row>
          <SubmitButton name="push" className="btn" disabled={isSubmitting}>
            تسجيل قرار
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default Common;
