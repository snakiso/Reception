import {useContext, useEffect} from "react";
import {StylesContext} from "../app/App.tsx";


export const DynamicStyles = () => {


    const styles = useContext(StylesContext)
    useEffect(() => {
        if (styles) {
            const root = document.documentElement;

            root.style.setProperty("--color_action", styles.colors.action);
            root.style.setProperty("--color_primary", styles.colors.primary);
            root.style.setProperty("--color_secondary", styles.colors.secondary);
            root.style.setProperty("--color_secondary_2", styles.colors.secondary_2);
            root.style.setProperty("--color_secondary_3", styles.colors.secondary_3);
            root.style.setProperty("--color_active", styles.colors.active);
            root.style.setProperty("--color_reg_no", styles.colors.regNo);
            root.style.setProperty("--color_reg_yes", styles.colors.regYes);
            root.style.setProperty("--color_bg", styles.colors.bg);
            root.style.setProperty("--color_error", styles.colors.error);
            root.style.setProperty("--color_warning", styles.colors.warning);
            root.style.setProperty("--color_success", styles.colors.success);
            root.style.setProperty("--app-background", `url(${styles.background})`);
        }
    }, [styles]);

    return null;
};
