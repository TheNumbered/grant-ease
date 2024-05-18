
export const CenteredLayout = ({ children, extras, styles }) => {
  return <section
    className="centered-layout"
    style={{
      display: "flex",
      backgroundImage: 'url("./subtle-prism.svg")',
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      ...styles,
    }}
    {...extras}
  >{children}</section>;
};
