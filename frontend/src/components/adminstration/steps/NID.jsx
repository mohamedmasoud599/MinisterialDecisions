import { Space, Typography, Form, Input, Button, message } from "antd";
import { Fetch } from "../../common/actions";
const { Title } = Typography;

const NID = ({
  stepsLength,
  currentStep,
  next,
  setRegisteredPerson,
  setId,
}) => {
  const [form] = Form.useForm();

  return (
    <>
      <Space size={50} direction='vertical'>
        <Title level={3}>ادخل الرقم القومي الخاص بطالب التطوع</Title>
        <Form form={form}>
          <Form.Item
            label='الرقم القومي'
            name='nid'
            rules={[
              { required: true, message: " هذا الحقل مطلوب !" },
              {
                len: 14,
                message: "هذا الحقل يجب أن يتكون من  14 رقم",
              },
            ]}
          >
            <Input placeholder={"الرقم القومي"} />
          </Form.Item>
        </Form>
        <div>
          {currentStep < stepsLength - 1 && (
            <Button
              type='primary'
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    const number = values.nid;

                    Fetch(`volanteers/${number}`).then((res) => {
                      if (res) {
                        setRegisteredPerson(res.data);
                      } else setId(number);
                      next();
                    });
                  })
                  .catch((errors) => {
                    message.warning("من فضلك ادخل رقم صحيح");
                    console.log(errors);
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

export default NID;
