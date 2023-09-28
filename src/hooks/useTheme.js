import { useEffect, useState } from "react";

export const useThemeDetector = () => {
	const [isDarkTheme, setIsDarkTheme] = useState();

	useEffect(() => {
		const windowObject = window;

		const isDark = windowObject.matchMedia("(prefers-color-scheme: dark)");

		if (isDark.matches) {
			setIsDarkTheme(true);
		} else {
			setIsDarkTheme(false);
		}
	}, []);

	return isDarkTheme;
};
