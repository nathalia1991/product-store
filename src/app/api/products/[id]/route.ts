
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const productResponse = await fetch('https://fakestoreapi.com/products/' + params.id);
  return Response.json(await productResponse.json());
}
 