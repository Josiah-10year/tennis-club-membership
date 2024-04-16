import { getAllTopics, getAllInterests, getAllUsersUsernameAndEmail } from "../../sanity/sanity-utils";
import Form from "../components/RegisterSH"

export default async function Register(){
  const topics = await getAllTopics();
  const interests = await getAllInterests();
  const users = await getAllUsersUsernameAndEmail();
  
  return (
    <Form topicsArrayProp={topics} interestsArrayProp={interests} userArrayProp={users}/>
  )
}