import {createContext, useEffect} from "react";
import {Helmet} from "react-helmet";
import {Router} from "./router/router";
import {SettingsData} from "../types/settings.type.ts";
import {UseSettings} from "../services/useSettings.ts";
import {UseStyles} from "../services/useStyles.ts";
import {DynamicStyles} from "../styles/DynamicStyles.tsx";
import {StylesResponse} from "../types/style.type.ts";
import {useFetching} from "../hooks/useFetching.ts";

export const SettingsContext = createContext<SettingsData | undefined>(
    undefined,
);

export const StylesContext = createContext<StylesResponse | undefined>(
    undefined,
);


export function App() {
    useFetching()
    const {settings} = UseSettings()
    const {styles, isSuccess} = UseStyles()

    useEffect(() => {

    }, [settings, styles]);


    return (
        isSuccess &&
        <>
            <StylesContext.Provider value={styles}>
                <Helmet>
                    <title>{styles?.event_title}</title>
                </Helmet>
                <DynamicStyles/>
                <SettingsContext.Provider value={settings}>
                    <Router/>
                </SettingsContext.Provider>
            </StylesContext.Provider>
        </>
    )
}
