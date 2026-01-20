import { client } from "@/sanity/lib/client";

export interface ClientProjectsResponse {
  clientName: string;
  projects: any[];
}

export async function fetchClientProjects(
  clientId: string,
): Promise<ClientProjectsResponse> {
  const result = await client.fetch(
    `*[_type=="client" && _id=="${clientId}"][0]{clientName,"projects":*[_type=="clientProject" && references(^._id)]}`,
    {
      clientId,
    },
  );

  if (!result) {
    throw new Error("No data returned from Sanity");
  }

  return result;
}
