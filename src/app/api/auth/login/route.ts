import { fetchUserIdByCredentialsEncoded } from "@/app/database/queries";

export async function POST(req: Request) {
    const data = await req.json();
    const token = await fetchUserIdByCredentialsEncoded(data);
    if (!token) {
      return Response.json({ error: 'Invalid credentials' }, {status: 401});
    }
    return Response.json({token}, {status: 200});
}
 