import { useEffect } from 'react';

/**
 * Hook personalizado para detectar atajos de teclado
 * @param key - Tecla a detectar (ej: 'k', 'Enter', 'Escape')
 * @param callback - Función a ejecutar cuando se detecta el atajo
 * @param options - Opciones adicionales (ctrl, cmd, shift, alt)
 */
export function useKeyboardShortcut(
    key: string,
    callback: () => void,
    options: {
        ctrl?: boolean;
        cmd?: boolean;
        shift?: boolean;
        alt?: boolean;
        enabled?: boolean;
    } = {}
) {
    const { ctrl = false, cmd = false, shift = false, alt = false, enabled = true } = options;

    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            // Verificar si la tecla coincide
            const keyMatch = event.key.toLowerCase() === key.toLowerCase();

            // Verificar modificadores
            const ctrlMatch = ctrl ? event.ctrlKey : !event.ctrlKey;
            const cmdMatch = cmd ? event.metaKey : !event.metaKey;
            const shiftMatch = shift ? event.shiftKey : !event.shiftKey;
            const altMatch = alt ? event.altKey : !event.altKey;

            // En Mac, Cmd+K; en Windows/Linux, Ctrl+K
            const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const modifierMatch = isMac
                ? (cmd ? event.metaKey : true) && (ctrl ? event.ctrlKey : !event.ctrlKey)
                : (ctrl ? event.ctrlKey : true) && (cmd ? event.metaKey : !event.metaKey);

            if (keyMatch && modifierMatch && shiftMatch && altMatch) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [key, callback, ctrl, cmd, shift, alt, enabled]);
}

/**
 * Hook específico para Cmd/Ctrl + K (búsqueda global)
 */
export function useGlobalSearchShortcut(callback: () => void, enabled: boolean = true) {
    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            // Detectar Cmd+K (Mac) o Ctrl+K (Windows/Linux)
            const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const isShortcut = isMac
                ? event.metaKey && event.key.toLowerCase() === 'k'
                : event.ctrlKey && event.key.toLowerCase() === 'k';

            if (isShortcut) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [callback, enabled]);
}
