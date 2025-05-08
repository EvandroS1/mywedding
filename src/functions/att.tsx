import IUsers from "../../types/user";
import getUsers from "./getUsers";

export default async function att() {
    const data: IUsers[] = await getUsers();
    return data
  }

