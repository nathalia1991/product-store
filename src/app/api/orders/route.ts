import { fetchOrders, insertUser, setPasswordToNewUser } from '@/app/database/queries';
import { authVerification } from '@/app/lib/secure';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const GET = async function handler(req: NextRequest, res: NextResponse) {    
  return authVerification(req, async (user: any) => {
    const result = await fetchOrders(user)
    return NextResponse.json(result)
  });
}

export {GET};
 