// src/types/webextension.d.ts
declare global {
    interface Browser {
        sidePanel: {
            setOptions: (options: {
                tabId: number;
                path: string;
                enabled: boolean;
            }) => Promise<void>;
        };
    }
}

export {};
