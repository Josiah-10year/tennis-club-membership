import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
//events
import event from "./sanity/schemas/events-schema";

//court imports
import court from "./sanity/schemas/courts-schema";
import courtBooking from "./sanity/schemas/court-booking-schema";

//user imports
import user from "./sanity/schemas/user-schema";
//?? imports
import topic from "./sanity/schemas/topic-schema";
import interest from "./sanity/schemas/interest-schema";

//post boards imports
import comment from "./sanity/schemas/comment-schema";
import post from "./sanity/schemas/post-schema";


const config = defineConfig({

    projectId: "46b4kxer",

    dataset: "production",

    title: "Tennis Club Membership",

    apiVersion: "2024-02-27",

    basePath: "/admin",
    
    plugins: [structureTool()],
    schema: { types: [event, court, courtBooking, user, topic, interest, comment, post]}

})

export { config };