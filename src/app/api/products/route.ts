import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const GET = async function handler(req: NextRequest, res: NextResponse) {
  const productsResponse = await fetch('https://fakestoreapi.com/products');
  return Response.json(await productsResponse.json());
}

export {GET};
 