// FIXME: Update this configuration file based on your project information

import { extendTheme } from "@chakra-ui/react";

export const AppConfig = {
  site_name: "ellis-docs.com",
  title: "Ellis Docs",
  description: "Ellis Docs (Ellis & Associates, Incorporation)",
  locale: "en",
};

export const blueDefaultTheme = extendTheme({
  colors: {
    white: {
      100: "#ffffff",
      200: "#f3f3f3",
      500: "#f9f9f9",
    },
    blue: {
      40: "#bce1f7",
      50: "#bce1f7",
      400: "#95b8d6",
      // 500: "#6686ad",
      // 500: "#54749e",
      500: "#3f5e8c",
      // 500: "#5d9ce978",
      600: "#2f4c7e",
      // 700: "#2f4c7e8a",
      700: "#3c66ae80",
      900: "#1f3c71",
      // 900: "#3275ad", //palette
      1000: "#0a214c",
    },
    orange: {
      40: "#f7cc95",
      50: "#f7cc95",
      400: "#f1b9769c",
      // 500: "#eaa252",
      500: "#e3912d",
      600: "#e48e33",
      700: "#df7f1bb0",
      900: "#df7f1b",
    },
    green: {
      100: "#C6F6D5",
      200: "#9AE6B4",
      400: "#48BB78",
      500: "#38A169",
    },
    danger: {
      100: "#FF4A23",
      200: "#ff8b71",
    },
    nav: {
      100: "rgba(190, 227, 248, .7)",
    },
    gray: {
      50: "#F7FAFC",
      100: "#00000005", // 100: "transparent", // 100: "#dfe3e7", // 100: "#1d1d1d66",
      200: "#efecea",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#ccc",
    },
  },
  fonts: {
    heading: `Raleway, sans-serif`,
    text: "Raleway, sans-serif",
    body: "Raleway, sans-serif",
  },
  components: {
    // Define your custom variants for components here
    Button: {
      variants: {
        solid: {
          button: {
            backgroundColor: "#3182CE",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          },
          _focus: {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.5)",
          },
        },
      },
    },
  },
  styles: {
    global: {
      "select:disabled": {
        opacity: "0.6 !important",
      },
      "input:disabled": {
        opacity: "0.6 !important",
      },
      "textarea:disabled": {
        opacity: "0.6 !important",
      },
    },
  },
});
export const orangeDefaultTheme = extendTheme({
  colors: {
    white: {
      100: "#ffffff",
      200: "#f3f3f3",
      500: "#f9f9f9",
    },
    blue: {
      40: "#bce1f7",
      50: "#bce1f7",
      400: "#95b8d6",
      500: "#3f5e8c",
      600: "#2f4c7e",
      700: "#3c66ae80",
      900: "#1f3c71",
      1000: "#0a214c",
      1100: "#4468A9",
    },
    orange: {
      40: "#f7cc95",
      50: "#f7cc95",
      400: "#f1b9769c",
      500: "#e3912d",
      600: "#e48e33",
      700: "#df7f1bb0",
      900: "#df7f1b",
    },
    gray: {
      100: "#00000005", // 100: "transparent", // 100: "#dfe3e7", // 100: "#1d1d1d66",
      200: "#efecea",
    },
    nav: {
      100: "rgba(190, 227, 248, .7)",
    },
  },
  fonts: {
    heading: `Raleway, sans-serif`,
    text: "Raleway, sans-serif",
    body: "Raleway, sans-serif",
  },
  components: {
    // Define your custom variants for components here
    Button: {
      variants: {
        solid: {
          button: {
            backgroundColor: "#3182CE",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          },
          _focus: {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.5)",
          },
        },
      },
    },
    Select: {
      baseStyle: {
        _disabled: {
          opacity: 0.7,
        },
      },
    },
    Option: {
      baseStyle: {
        _disabled: {
          opacity: 0.7,
        },
      },
    },
    Input: {
      baseStyle: {
        _disabled: {
          opacity: 0.7,
        },
      },
    },
  },
  styles: {
    global: {
      "select:disabled": {
        opacity: "0.6 !important",
      },
      "input:disabled": {
        opacity: "0.6 !important",
      },
      "textarea:disabled": {
        opacity: "0.6 !important",
      },
    },
  },
});
export const greenTheme = extendTheme({
  colors: {
    white: {
      100: "#ffffff",
      200: "#f3f3f3",
      500: "#f9f9f9",
    },
    blue: {
      40: "#b2c4c3",
      50: "#b2c4c3",
      400: "#91abaa",
      // 500: "#6686ad",
      // 500: "#54749e",
      700: "#709290",
      // 500: "#5d9ce978",
      1100: "#4f7976",
      // 700: "#2f4c7e8a",
      500: "#2e5f5d",
      600: "#204e4c",
      // 900: "#3275ad", //palette
      900: "#1a413f",
      1000: "#153432",
    },
    orange: {
      400: "#f0e7ce",
      40: "#e8dcb5",
      50: "#e1d09d",
      // 500: "#eaa252",
      700: "#d6be78",
      500: "#caac53",
      600: "#bf9b2e",
      900: "#B48909",
    },
    green: {
      100: "#C6F6D5",
      200: "#9AE6B4",
      400: "#48BB78",
      500: "#38A169",
    },
    danger: {
      100: "#FF4A23",
      200: "#ff8b71",
    },
    nav: {
      100: "rgba(190, 227, 248, .7)",
    },
    gray: {
      50: "#F7FAFC",
      100: "#00000005", // 100: "transparent", // 100: "#dfe3e7", // 100: "#1d1d1d66",
      200: "#efecea",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#ccc",
    },
  },
  fonts: {
    heading: `Raleway, sans-serif`,
    text: "Raleway, sans-serif",
    body: "Raleway, sans-serif",
  },
  components: {
    // Define your custom variants for components here
    Button: {
      variants: {
        solid: {
          button: {
            backgroundColor: "#3182CE",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          },
          _focus: {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.5)",
          },
        },
      },
    },
  },
  styles: {
    global: {
      "select:disabled": {
        opacity: "0.6 !important",
      },
      "input:disabled": {
        opacity: "0.6 !important",
      },
      "textarea:disabled": {
        opacity: "0.6 !important",
      },
    },
  },
});
export const purpleTheme = extendTheme({
  colors: {
    white: {
      100: "#ffffff",
      200: "#f3f3f3",
      500: "#f9f9f9",
    },
    blue: {
      40: "#f1ece6",
      50: "#f1ece6",
      400: "#ddcebf",
      // 500: "#6686ad",
      // 500: "#54749e",
      700: "#c9b199",
      // 500: "#5d9ce978",
      1100: "#b49473",
      // 700: "#2f4c7e8a",
      500: "#a0774c",
      600: "#8b5a26",
      // 900: "#3275ad", //palette
      900: "#773d00",
      1000: "#412200",
    },
    orange: {
      40: "#f7cc95",
      50: "#f7cc95",
      400: "#f1b9769c",
      500: "#e3912d",
      600: "#e48e33",
      700: "#df7f1bb0",
      900: "#df7f1b",
    },
    green: {
      100: "#C6F6D5",
      200: "#9AE6B4",
      400: "#48BB78",
      500: "#38A169",
    },
    danger: {
      100: "#FF4A23",
      200: "#ff8b71",
    },
    nav: {
      100: "rgba(190, 227, 248, .7)",
    },
    gray: {
      50: "#F7FAFC",
      100: "#00000005", // 100: "transparent", // 100: "#dfe3e7", // 100: "#1d1d1d66",
      200: "#efecea",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#ccc",
    },
  },
  fonts: {
    heading: `Raleway, sans-serif`,
    text: "Raleway, sans-serif",
    body: "Raleway, sans-serif",
  },
  components: {
    // Define your custom variants for components here
    Button: {
      variants: {
        solid: {
          button: {
            backgroundColor: "#3182CE",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          },
          _focus: {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.5)",
          },
        },
      },
    },
  },
  styles: {
    global: {
      "select:disabled": {
        opacity: "0.6 !important",
      },
      "input:disabled": {
        opacity: "0.6 !important",
      },
      "textarea:disabled": {
        opacity: "0.6 !important",
      },
    },
  },
});
export const darkTheme = extendTheme({
  colors: {
    white: {
      100: "#636363",
      200: "#565656",
      500: "#3a3a3a",
    },
    textColor: {
      500: "#ffffffd9",
    },
    blue: {
      40: "#919191",
      50: "#919191",
      400: "#868686", // 400: "#868686", // 400: "#ffffff",
      700: "#7a7a7a",
      1100: "#636363",
      500: "#4c4c4c",
      600: "#363636",
      900: "#1d1d1d", // 900: "#1d1d1d", // 900: "#ffffff",
      1000: "#080808",
    },
    orange: {
      400: "#1f1f1fd6",
      40: "#363636d6",
      50: "#4c4c4cd6",
      700: "#636363d6",
      500: "#4c4c4cd6",
      600: "#919191d6",
      // 900: "#848484d6",
      900: "#acacac", // 900: "#131313", // 900: "#ffffff",
    },
    green: {
      100: "#C6F6D5",
      200: "#9AE6B4",
      400: "#48BB78",
      500: "#38A169",
    },
    danger: {
      100: "#FF4A23",
      200: "#ff8b71",
    },
    red: {
      50: "#2f0800",
    },
    nav: {
      100: "rgba(190, 227, 248, .7)",
    },
    gray: {
      50: "#F7FAFC",
      100: "#1d1d1d66",
      200: "#777777", // efecea
      300: "#CBD5E0",
      // 400: "#A0AEC0",
      400: "#c8c8c8",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#ccc",
    },
  },
  fonts: {
    heading: `Raleway, sans-serif`,
    text: "Raleway, sans-serif",
    body: "Raleway, sans-serif",
  },
  components: {
    // Define your custom variants for components here
    Button: {
      variants: {
        solid: {
          button: {
            backgroundColor: "#3182CE",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          },
          _focus: {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.5)",
          },
        },
      },
    },
  },
  styles: {
    global: () => ({
      div: {
        color: "#fff",
      },
      span: {
        color: "#fff",
      },
      p: {
        color: "#fff",
      },
      h1: {
        color: "#fff",
      },
      h2: {
        color: "#fff",
      },
      h3: {
        color: "#fff",
      },
      h4: {
        color: "#fff",
      },
      h5: {
        color: "#fff",
      },
      h6: {
        color: "#fff",
      },
      th: {
        color: "#fff",
      },
      td: {
        color: "#fff",
      },
    }),
  },
});

// theme 1
export const theme1 = extendTheme({
  colors: {
    white: {
      100: "#ffffff",
      200: "#f3f3f3",
      500: "#f9f9f9",
    },
    blue: {
      40: "#bce1f7",
      50: "#bce1f7",
      400: "#95b8d6",
      // 500: "#6686ad",
      // 500: "#54749e",
      500: "#3f5e8c",
      // 500: "#5d9ce978",
      600: "#2f4c7e",
      // 700: "#2f4c7e8a",
      700: "#3c66ae80",
      900: "#1f3c71",
      // 900: "#3275ad", //palette
      1000: "#0a214c",
    },
    orange: {
      40: "#ecf5fd",
      50: "#e0eefb",
      400: "#cde5f9",
      500: "#badbf6",
      600: "#a7d1f4",
      700: "#94c7f1",
      900: "#81bdef",
    },
    nav: {
      100: "rgba(190, 227, 248, .7)",
    },
  },
  fonts: {
    heading: `Raleway, sans-serif`,
    text: "Raleway, sans-serif",
    body: "Raleway, sans-serif",
  },
  components: {
    // Define your custom variants for components here
    Button: {
      variants: {
        solid: {
          button: {
            backgroundColor: "#3182CE",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          },
          _focus: {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.5)",
          },
        },
      },
    },
    Select: {
      baseStyle: {
        _disabled: {
          opacity: 0.7,
        },
      },
    },
    Option: {
      baseStyle: {
        _disabled: {
          opacity: 0.7,
        },
      },
    },
    Input: {
      baseStyle: {
        _disabled: {
          opacity: 0.7,
        },
      },
    },
  },
  styles: {
    global: {
      "select:disabled": {
        opacity: "0.6 !important",
      },
      "input:disabled": {
        opacity: "0.6 !important",
      },
      "textarea:disabled": {
        opacity: "0.6 !important",
      },
    },
  },
});

export const theme2 = extendTheme({
  colors: {
    white: {
      100: "#ffffff",
      200: "#f3f3f3",
      500: "#f9f9f9",
    },
    blue: {
      40: "#f7cc95",
      50: "#f7cc95",
      400: "#f4c791",
      // 500: "#6686ad",
      // 500: "#54749e",
      500: "#f1b9769c",
      // 500: "#5d9ce978",
      600: "#e3912d",
      // 700: "#2f4c7e8a",
      700: "#e48e33",
      900: "#df7f1bb0",
      // 900: "#3275ad", //palette
      1000: "#df7f1b",
    },

    orange: {
      40: "#fdf2e4",
      50: "#fcedda",
      400: "#fbe6ca",
      // 500: "#eaa252",
      500: "#fae0bf",
      600: "#f9d9b0",
      700: "#f8d1a0",
      900: "#F7CC95",
    },
    green: {
      100: "#C6F6D5",
      200: "#9AE6B4",
      400: "#48BB78",
      500: "#38A169",
    },
    danger: {
      100: "#FF4A23",
      200: "#ff8b71",
    },
    nav: {
      100: "rgba(190, 227, 248, .7)",
    },
    gray: {
      50: "#F7FAFC",
      100: "#00000005", // 100: "transparent", // 100: "#dfe3e7", // 100: "#1d1d1d66",
      200: "#efecea",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#ccc",
    },
  },
  fonts: {
    heading: `Raleway, sans-serif`,
    text: "Raleway, sans-serif",
    body: "Raleway, sans-serif",
  },
  components: {
    // Define your custom variants for components here
    Button: {
      variants: {
        solid: {
          button: {
            backgroundColor: "#3182CE",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          },
          _focus: {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.5)",
          },
        },
      },
    },
  },
  styles: {
    global: {
      "select:disabled": {
        opacity: "0.6 !important",
      },
      "input:disabled": {
        opacity: "0.6 !important",
      },
      "textarea:disabled": {
        opacity: "0.6 !important",
      },
    },
  },
});

// export const theme3 = extendTheme({
//   colors: {
//     white: {
//       100: "#ffffff",
//       200: "#f3f3f3",
//       500: "#f9f9f9",
//     },

//     blue: {
//       40: "#ecf5fd",
//       50: "#ecf5fd",
//       400: "#e0eefb",
//       // 500: "#6686ad",
//       // 500: "#54749e",
//       500: "#cde5f9",
//       // 500: "#5d9ce978",
//       600: "#badbf6",
//       // 700: "#2f4c7e8a",
//       700: "#a7d1f4",
//       900: "#94c7f1",
//       // 900: "#3275ad", //palette
//       1000: "#81bdef",
//     },

//     orange: {
//       40: "#f8fcfe",
//       50: "#eef8fd",
//       400: "#e4f3fc",
//       // 500: "#eaa252",
//       500: "#daeefb", // "#5299fd",
//       600: "#d0eaf9",
//       700: "#c6e6f8",
//       900: "#bce1f7",
//     },
//     green: {
//       100: "#C6F6D5",
//       200: "#9AE6B4",
//       400: "#48BB78",
//       500: "#38A169",
//     },
//     danger: {
//       100: "#FF4A23",
//       200: "#ff8b71",
//     },
//     nav: {
//       100: "rgba(190, 227, 248, .7)",
//     },
//     gray: {
//       50: "#F7FAFC",
//       100: "#00000005", // 100: "transparent", // 100: "#dfe3e7", // 100: "#1d1d1d66",
//       200: "#efecea",
//       300: "#CBD5E0",
//       400: "#A0AEC0",
//       500: "#718096",
//       600: "#4A5568",
//       700: "#2D3748",
//       800: "#1A202C",
//       900: "#ccc",
//     },
//   },
//   fonts: {
//     heading: `Raleway, sans-serif`,
//     text: "Raleway, sans-serif",
//     body: "Raleway, sans-serif",
//   },
//   components: {
//     // Define your custom variants for components here
//     Button: {
//       variants: {
//         solid: {
//           button: {
//             backgroundColor: "#3182CE",
//             color: "#fff",
//             padding: "0.5rem 1rem",
//             border: "none",
//             borderRadius: "0.25rem",
//             fontSize: "1rem",
//             fontWeight: 500,
//             lineHeight: 1.5,
//             cursor: "pointer",
//             transition: "background-color 0.3s ease",
//           },
//           _focus: {
//             outline: "none",
//             boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.5)",
//           },
//         },
//       },
//     },
//   },
//   styles: {
//     global: {
//       "select:disabled": {
//         opacity: "0.6 !important",
//       },
//       "input:disabled": {
//         opacity: "0.6 !important",
//       },
//       "textarea:disabled": {
//         opacity: "0.6 !important",
//       },
//     },
//   },
// });

export const theme3 = extendTheme({
  colors: {
    white: {
      100: "#ffffff",
      200: "#f3f3f3",
      500: "#f9f9f9",
    },

    blue: {
      40: "#ecf5fd",
      50: "#c9c9c9",
      400: "#c9c9c9",
      500: "#a0a0a0",
      600: "#cccccc",
      700: "#7d7d7d",
      900: "#666666",
      // 1000: "#a6a6a6",
      1000: "#999999",
    },
    orange: {
      40: "#f7cc95",
      50: "#f7cc95",
      400: "#f1b9769c",
      // 500: "#eaa252",
      500: "#e3912d",
      600: "#e48e33",
      700: "#df7f1bb0",
      900: "#df7f1b",
    },
    green: {
      100: "#C6F6D5",
      200: "#9AE6B4",
      400: "#48BB78",
      500: "#38A169",
    },
    danger: {
      100: "#FF4A23",
      200: "#ff8b71",
    },
    nav: {
      100: "rgba(190, 227, 248, .7)",
    },
    gray: {
      50: "#F7FAFC",
      100: "#00000005", // 100: "transparent", // 100: "#dfe3e7", // 100: "#1d1d1d66",
      200: "#efecea",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#ccc",
    },
  },
  fonts: {
    heading: `Raleway, sans-serif`,
    text: "Raleway, sans-serif",
    body: "Raleway, sans-serif",
  },
  components: {
    // Define your custom variants for components here
    Button: {
      variants: {
        solid: {
          button: {
            backgroundColor: "#3182CE",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          },
          _focus: {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.5)",
          },
        },
      },
    },
  },
  styles: {
    global: {
      "select:disabled": {
        opacity: "0.6 !important",
      },
      "input:disabled": {
        opacity: "0.6 !important",
      },
      "textarea:disabled": {
        opacity: "0.6 !important",
      },
    },
  },
});
