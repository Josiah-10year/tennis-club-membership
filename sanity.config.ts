import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import event from "./sanity/schemas/events-schema";



const config = defineConfig({

    projectId: "46b4kxer",

    dataset: "production",

    title: "Tennis Club Membership",

    apiVersion: "2024-02-27",

    basePath: "/admin",
    
    plugins: [structureTool()],
    schema: { types: [event]}

})

export { config };