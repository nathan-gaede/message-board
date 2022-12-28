const defaultTheme = {
    palette: {
      primary: {
        main: "#0f0f0f",
      },
      secondary: {
        main: "#00ff00",
      },
    },
    components: {
      // Name of the component
      MuiButton: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: false, // No more ripple, on the whole application 💣!
          // color: "secondary",
        },
      },
      MuiTextField: {
        defaultProps: {
          // The props to change the default for.
          // defaultValue: "Type your response here...",
        },
      },
    },
  };

export default defaultTheme;