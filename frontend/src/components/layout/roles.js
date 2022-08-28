/// icons

const UserRole = () => {
  return [
    {
      pathname: "/RegisteredPeople",
      string: "كشف القرارات الوزارية",
    },
  ];
};

const AdminRole = () => {
  return [
    {
      pathname: "/adminstration",
      string: "تسجيل قرار وزارى جديد",
    },

    {
      pathname: "/RegisteredPeople",
      string: "كشف القرارات الوزارية",
    },
  ];
};

export { UserRole, AdminRole };
