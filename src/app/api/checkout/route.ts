import { insertOrder, insertUser, setPasswordToNewUser } from '@/app/database/queries';
import { authVerification } from '@/app/lib/secure';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const POST = async function handler(req: NextRequest, res: NextResponse) {   
  const data = await req.json();

  return authVerification(req, async (user: any) => {
    data.idUser = user.id
    const result = await insertOrder(data)
    return NextResponse.json(result)
  });
}
  

export {POST};
 