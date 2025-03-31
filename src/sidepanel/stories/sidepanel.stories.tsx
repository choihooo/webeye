import * as React from "react";
import { Sidepanel } from "../component";
import { ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Components/Sidepanel",
    component: Sidepanel,
} as ComponentMeta<typeof Sidepanel>;

export const Render = () => <Sidepanel />;
