import { getAllTopics, getAllInterests, getAllUsers } from "../../sanity/sanity-utils";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../components/RegisterSH"
import { URL } from "url";

export default async function Register(){
  const topics = await getAllTopics();
  // const topicsArray : string[] = []
  // let x = 0;

  // for (const item of topics) {
  //   topicsArray[x]=(item.name);
  //   // console.log(item._id)
  //   x=x+1
  // }

  const interests = await getAllInterests();

  return (
    <Form topicsArrayProp={topics} interestsArrayProp={interests}/>
  )
}