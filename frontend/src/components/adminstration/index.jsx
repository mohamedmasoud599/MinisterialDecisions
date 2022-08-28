import { useState } from "react";
import "antd/dist/antd.css";
import "./style.css";
import { Steps, ConfigProvider, Row, Tabs } from "antd";
import locale from "antd/lib/date-picker/locale/ar_EG";
import "moment/locale/ar";

//steps components
import NID from "./steps/NID";
import DataEntry from "./steps/DataEntry";
import DataView from "./steps/DataView";
import StudentCamera from "./steps/Camera";

const { TabPane } = Tabs;
const { Step } = Steps;

const VaccineRegisteration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [registeredPerson, setRegisteredPerson] = useState(null);
  const [id, setId] = useState();

  const steps = [
    { title: "الرقم القومي" },
    { title: "تسجيل البيانات" },
    { title: "شهادة الطالب " },
    { title: " صور الطالب " },
  ];

  const next = (offset = 1) => {
    setCurrentStep(currentStep + offset);
  };

  return (
    <ConfigProvider locale={locale} direction='rtl'>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          margin: "10px auto",
          fontSize: 14,
          backgroundColor: "rgba(242, 242, 242,0.9)",
          height: "100%",
          width: "100%",
          boxShadow: "0 0 2px 0px #b1b1b1",
        }}
      >
        <Steps type='navigation' current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <Row
          align='middle'
          justify='center'
          style={{
            minHeight: 400,
          }}
        >
          <Tabs activeKey={(currentStep + 1).toString()}>
            <TabPane key='1'>
              <NID
                stepsLength={steps.length}
                currentStep={currentStep}
                next={next}
                setRegisteredPerson={setRegisteredPerson}
                setId={setId}
              />
            </TabPane>
            <TabPane key='2'>
              <DataEntry
                stepsLength={steps.length}
                currentStep={currentStep}
                next={next}
                registeredPerson={registeredPerson}
                setRegisteredPerson={setRegisteredPerson}
                id={id}
              />
            </TabPane>
            <TabPane key='3'>
              <DataView
                stepsLength={steps.length}
                currentStep={currentStep}
                next={next}
                registeredPerson={registeredPerson}
              />
            </TabPane>
            <TabPane key='4'>
              <StudentCamera
                stepsLength={steps.length}
                currentStep={currentStep}
                next={next}
                registeredPerson={registeredPerson}
              />
            </TabPane>
          </Tabs>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default VaccineRegisteration;
