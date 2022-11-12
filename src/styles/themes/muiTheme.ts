import { createTheme } from "@material-ui/core/styles";
import { colors, spacing, elevation } from "styles";

import type { Shadows } from "@material-ui/core/styles/shadows";

const original = createTheme();

const theme = createTheme({
    palette: {
        common: {
            black: colors.black,
            white: colors.white,
        },
        primary: {
            light: colors.green100,
            main: colors.green500,
            dark: colors.green900,
            contrastText: colors.white,
        },
        secondary: {
            light: colors.yellow100,
            main: colors.yellow500,
            dark: colors.yellow900,
            contrastText: colors.white,
        },
        success: {
            light: colors.alertGreen50,
            main: colors.alertGreen900,
        },
        warning: {
            light: colors.alertYellow50,
            main: colors.alertYellow900,
        },
        error: {
            light: colors.alertRed50,
            main: colors.alertRed900,
        },
        info: {
            light: colors.alertBlue50,
            main: colors.alertBlue900,
        },
        grey: {
            50: colors.grey50,
            100: colors.grey100,
            300: colors.grey300,
            500: colors.grey500,
            700: colors.grey700,
            900: colors.grey900,
        },
    },
    spacing: (value: any) => spacing[`spacing${value}`],
    shadows: [
        "none",
        elevation.shadow1,
        elevation.shadow2,
        elevation.shadow3,
        elevation.shadow4,
        ...original.shadows.slice(5),
    ] as Shadows,
    typography: {
        h1: {
            ...original.typography.h1,
            fontWeight: 300,
            fontSize: "96px",
            lineHeight: "112px",
            letterSpacing: "-1.5px",
        },
        h2: {
            ...original.typography.h2,
            fontWeight: 300,
            fontSize: "60px",
            lineHeight: "70px",
        },
        h3: {
            ...original.typography.h3,
            fontWeight: "normal",
            fontSize: "48px",
            lineHeight: "5px",
        },
        h4: {
            ...original.typography.h4,
            fontWeight: "normal",
            fontSize: "34px",
            lineHeight: "40px",
            letterSpacing: "0.25px",
        },
        h5: {
            ...original.typography.h5,
            fontWeight: "normal",
            fontSize: "24px",
            lineHeight: "28px",
        },
        h6: {
            ...original.typography.h6,
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "28px",
            letterSpacing: "0.15px",
        },
        body1: {
            ...original.typography.body1,
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.44px",
        },
        body2: {
            ...original.typography.body2,
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "0.25px",
        },
        subtitle1: original.typography.subtitle1,
        subtitle2: {
            ...original.typography.subtitle2,
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "24px",
            letterSpacing: "0.1px",
        },
        button: original.typography.button,
        caption: {
            ...original.typography.caption,
            fontWeight: "normal",
            fontSize: "12px",
            lineHeight: "16px",
            letterSpacing: "0.2px",
        },
        overline: {
            ...original.typography.overline,
            fontWeight: 500,
            fontSize: "10px",
            lineHeight: "16px",
            letterSpacing: "1.5px",
        },
    },
});

export default theme;
