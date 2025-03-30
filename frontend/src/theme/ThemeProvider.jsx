import { ConfigProvider, App } from "antd";

const ThemeProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#222831",
          borderRadius: 2,
        },
        components: {
          Button: {
            controlHeight: 45,
            controlOutline: "none",
          },
          Input: {
            controlHeight: 45,
            colorBorder: "#ccc",
            controlOutline: "none",
          },
          Select: {
            controlHeight: 45,
            colorBorder: "#ccc",
            controlOutline: "none",
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};

export default ThemeProvider;
