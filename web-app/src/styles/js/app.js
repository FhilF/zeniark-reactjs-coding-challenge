import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor: "#085696",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    fontFamily: `"Poppins", sans-serif`,

    ".main": {
      position: "relative",
      width: "100%",
      ".bg-logo-container": {
        zIndex: 1,
        position: "fixed",
        right: 0,
        bottom: 0,
        ".zeniark-logo-bg": {
          height: "auto",
          width: "auto",
          maxHeight: "650px",
        },
      },
      ".content": {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        [theme.fn.largerThan("md")]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        position: "relative",
        zIndex: 2,
        height: "100%",
        ".container": {
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "40px",
          paddingBottom: "40px",
          ".content-paper": {
            background: "white",
            width: theme.breakpoints.sm,

            ".paper-main": {
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
              minHeight: "360px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              [theme.fn.largerThan("md")]: {
                paddingLeft: "36px",
                paddingRight: "36px",
              },
            },
          },
        },
      },
    },
  },
}));

export default useStyles;
