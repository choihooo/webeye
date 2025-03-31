import "chrome";

declare module "chrome" {
    export namespace sidePanel {
        interface SidePanelDetails {
            tabId: number;
        }

        interface SidePanel {
            onShown: {
                addListener(
                    callback: (details: SidePanelDetails) => void,
                ): void;
            };
            onHidden: {
                addListener(
                    callback: (details: SidePanelDetails) => void,
                ): void;
            };
        }
    }
}
