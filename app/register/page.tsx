<<<<<<< HEAD
import { getAllTopics, getAllInterests, getAllUsers } from "../../sanity/sanity-utils";
=======
import { getAllTopics, getAllInterests, getAllUsersUsernameAndEmail } from "../../sanity/sanity-utils";
import { useState } from "react";
>>>>>>> 7345bf8fb2bfa30bf9e494b8935eeb72c3ae2d4a
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../components/RegisterSH"
import { URL } from "url";

export default async function Register(){
  const topics = await getAllTopics();
  const interests = await getAllInterests();
  const users = await getAllUsersUsernameAndEmail();
  
  return (
    <Form topicsArrayProp={topics} interestsArrayProp={interests} userArrayProp={users}/>
  )
}