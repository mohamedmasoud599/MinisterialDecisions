import {
  Space,
  Typography,
  Form,
  Input,
  Button,
  message,
  Row,
  Select,
  DatePicker,
  Divider,
  Progress,
  AutoComplete,
} from "antd";

import moment from "moment";
import locale from "antd/lib/date-picker/locale/ar_EG";
import { Create } from "../../common/actions";
import { corps, centers } from "./data";

import React, { useEffect, useState } from "react";

const { Title } = Typography;

const { Option } = Select;

const bloodTypes = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

const DataEntry = ({
  stepsLength,
  currentStep,
  next,
  registeredPerson,
  setRegisteredPerson,
  id,
}) => {
  const [form] = Form.useForm();
  const [percent, setPercent] = useState(0);
  const [success, setSuccess] = useState(false);
  const [successDegree, setSuccessDegree] = useState();

  useEffect(() => {
    if (registeredPerson) {
      registeredPerson.joinDate = new moment(registeredPerson.joinDate);
      form.setFieldsValue(registeredPerson);
      let sum = form.getFieldValue("sum");
      let totalSum = form.getFieldValue("totalSum");
      let sd = Number((totalSum * 0.6).toString().slice(0, 5));
      setSuccessDegree(sd);
      if (sum >= sd) setSuccess(true);
      setPercent((sum / totalSum) * 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Space size={50} direction='vertical'>
        <br></br>
        <Title level={3}>إدخال بيانات الطالب المتطوع</Title>
        <Form form={form}>
          <Title level={4}>البيانات الأساسية</Title>
          <br></br>
          <Row justify='space-around'>
            <Form.Item
              label='الإسم الكامــل'
              name='name'
              rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
            >
              <Input disabled={registeredPerson != null} />
            </Form.Item>
            <Form.Item
              label='رقم الملف'
              name='fileNo'
              rules={[
                { required: true, message: " هذا الحقل مطلوب !" },
                {
                  pattern: "^([-]?[1-9][0-9]*|0)$",
                  message: "هذا الحقل يتكون من ارقام فقط",
                },
              ]}
            >
              <Input disabled={registeredPerson != null} />
            </Form.Item>
            <Form.Item
              label='الرقم الثلاثي'
              name='tribleNum'
              rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
            >
              <Input disabled={registeredPerson != null} />
            </Form.Item>
            <Form.Item
              label='العنـــوان'
              name='address'
              rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
            >
              <Input disabled={registeredPerson != null} />
            </Form.Item>
          </Row>
          <Row justify='space-around'>
            <Form.Item
              label='الديـــــــــانة'
              name='religion'
              rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
            >
              <Select
                style={{ width: 330 }}
                disabled={registeredPerson != null}
              >
                <Option key={"مسلم"} value={"مسلم"}>
                  {"مسلم"}
                </Option>
                <Option key={"مسيحي"} value={"مسيحي"}>
                  {"مسيحي"}
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              label='نوع الشهادة'
              name='qualification'
              rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
            >
              <Select
                style={{ width: 330 }}
                disabled={registeredPerson != null}
              >
                <Option key={"إعدادي عام"} value={"إعدادي عام"}>
                  {"إعدادي عام"}
                </Option>
                <Option key={"إعدادي أزهري"} value={"إعدادي أزهري"}>
                  {"إعدادي أزهري"}
                </Option>
                <Option key={"إعدادي مهني"} value={"إعدادي مهني"}>
                  {"إعدادي مهني"}
                </Option>
                <Option key={"إعدادي رياضي"} value={"إعدادي رياضي"}>
                  {"إعدادي رياضي"}
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              label='كود المركز'
              name='centerNum'
              rules={[
                { required: true, message: " هذا الحقل مطلوب !" },
                {
                  validator: (_, value) => {
                    if (centers[value]) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("كود مركز غير صحيح"));
                  },
                },
              ]}
            >
              <AutoComplete
                disabled={registeredPerson != null}
                options={Object.keys(centers).map((k) => {
                  return { value: k };
                })}
                style={{ width: 350 }}
                placeholder='ادخل رقم المركز'
                onSelect={(data) => {
                  form.setFieldsValue({ center: centers[data] });
                }}
                onChange={(data) => {
                  if (centers[data]) {
                    form.setFieldsValue({ center: centers[data] });
                  }
                }}
              />
            </Form.Item>
            <Form.Item label='المركز' name='center'>
              <Input style={{ width: 350, color: "black" }} disabled />
            </Form.Item>
          </Row>
          <Divider />
          <Title level={4}>البيانات الطبية</Title>
          <br></br>
          <Row justify='space-around'>
            <Form.Item
              label='الــــــــــوزن'
              name='weight'
              rules={[
                { required: true, message: " هذا الحقل مطلوب !" },
                {
                  validator: (_, value) => {
                    if (isNaN(value))
                      return Promise.reject(
                        new Error("هذا الحقل يجب ان يتكون من أرقام فقط")
                      );
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input disabled={registeredPerson != null} />
            </Form.Item>
            <Form.Item
              label='الطـــــــــول'
              name='length'
              rules={[
                { required: true, message: " هذا الحقل مطلوب !" },
                {
                  validator: (_, value) => {
                    if (isNaN(value))
                      return Promise.reject(
                        new Error("هذا الحقل يجب ان يتكون من أرقام فقط")
                      );
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input disabled={registeredPerson != null} />
            </Form.Item>
            <Form.Item
              label='محيط الصدر'
              name='chestCircumference'
              rules={[
                { required: true, message: " هذا الحقل مطلوب !" },
                {
                  validator: (_, value) => {
                    if (isNaN(value))
                      return Promise.reject(
                        new Error("هذا الحقل يجب ان يتكون من أرقام فقط")
                      );
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input disabled={registeredPerson != null} />
            </Form.Item>
            <Form.Item
              label='فصيلة الدم'
              name='bloodType'
              rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
            >
              <Select
                style={{ width: 330 }}
                disabled={registeredPerson != null}
              >
                {bloodTypes.map((type) => {
                  return (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Row>
          <Divider />
          <Title level={4}>البيانات النهائية</Title>
          <br></br>
          <Row justify='space-around'>
            <Form.Item
              label='المجموع الكلي'
              name='totalSum'
              rules={[
                { required: true, message: " هذا الحقل مطلوب !" },

                {
                  validator: (_, value) => {
                    if (isNaN(value))
                      return Promise.reject(
                        new Error("هذا الحقل يجب ان يتكون من أرقام فقط")
                      );
                    let current = form.getFieldValue("sum");
                    if (current > value) {
                      return Promise.reject(
                        new Error(
                          "قيمة المجموع لا يمكن ان تكون اكبر من قيمة المجموع الكلي"
                        )
                      );
                    } else {
                      setSuccessDegree(
                        Number((value * 0.6).toString().slice(0, 5))
                      );
                      if (current >= successDegree) setSuccess(true);
                      else setSuccess(false);
                      setPercent((current / value) * 100);
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input disabled={registeredPerson != null} />
            </Form.Item>

            <Form.Item
              label='مجموع الطالب'
              name='sum'
              rules={[
                { required: true, message: " هذا الحقل مطلوب !" },

                {
                  validator: (_, value) => {
                    if (isNaN(value))
                      return Promise.reject(
                        new Error("هذا الحقل يجب ان يتكون من أرقام فقط")
                      );
                    let total = form.getFieldValue("totalSum");
                    if (value > total) {
                      return Promise.reject(
                        new Error(
                          "قيمة المجموع لا يمكن ان تكون اكبر من قيمة المجموع الكلي"
                        )
                      );
                    } else {
                      if (value >= successDegree) setSuccess(true);
                      else setSuccess(false);
                      setPercent((value / total) * 100);
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input disabled={registeredPerson != null} />
            </Form.Item>

            <Form.Item
              label='تاريخ الإلحــاق'
              name='joinDate'
              rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
            >
              <DatePicker
                disabled={registeredPerson != null}
                placeholder='تاريخ الإلحاق'
                locale={locale}
                name='bod'
                format={"D-M-YYYY"}
              />
            </Form.Item>
            <Form.Item
              label='رقم الدفعة'
              name='batchNum'
              rules={[{ required: true, message: " هذا الحقل مطلوب !" }]}
            >
              <Input disabled={registeredPerson != null} />
            </Form.Item>
          </Row>
          <Row justify='center' align='middle'>
            <Space size={50}>
              <div>
                <Title level={3}>
                  {" "}
                  حالة الطالب : {success ? "ناجح" : "راسب"}{" "}
                </Title>
                <Title level={4}>درجة النجاح : {successDegree}</Title>
              </div>
              <Progress
                type='circle'
                percent={percent}
                strokeColor={success ? "#52c41a" : "#ff4d4f"}
                format={(percent) => {
                  return percent.toString().slice(0, 5);
                }}
              />
            </Space>
          </Row>
        </Form>
        <div>
          {currentStep < stepsLength - 1 && (
            <Button
              type='primary'
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    if (registeredPerson) next();
                    else {
                      let payload = { ...values, nationalId: id };
                      delete payload.center;
                      payload.joinDate = payload.joinDate._d;
                      console.log(payload);
                      Create("/volanteers", payload).then(() => {
                        setRegisteredPerson(payload);
                        next();
                      });
                    }
                  })
                  .catch((errors) => {
                    message.warning("من فضلك ادخل بيانات صحيحة ");
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

export default DataEntry;
