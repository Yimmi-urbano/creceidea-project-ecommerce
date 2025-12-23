'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }): React.ReactElement {
	const [theme, setThemeState] = useState<Theme>('dark');

	useEffect(() => {
		// Get theme from localStorage or default to dark
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		if (savedTheme !== null) {
			setThemeState(savedTheme);
			document.documentElement.classList.toggle('dark', savedTheme === 'dark');
		} else {
			// Default to dark theme
			document.documentElement.classList.add('dark');
		}
	}, []);

	const setTheme = (newTheme: Theme): void => {
		setThemeState(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
	};

	const toggleTheme = (): void => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};

	// We no longer return null here to avoid hydration mismatches.
	// The useEffect will handle any theme changes once mounted.

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextType {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}
