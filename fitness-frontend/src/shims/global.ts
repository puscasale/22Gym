export {};

declare global {
    interface Window {
        global: typeof globalThis;
    }
}

if (typeof window.global === 'undefined') {
    window.global = window;
}
