import IUsers from "../../types/user";

export default async function getUsers ()  {
  try {
    const response = await fetch(
      "https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/shopProfile"
    );
    const data: IUsers[] = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching convidados:", error);
    return [];
  }
};