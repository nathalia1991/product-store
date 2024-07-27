import { insertUser, setPasswordToNewUser } from '@/app/database/queries';
import { authVerification } from '@/app/lib/secure';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const GET = async function handler(req: NextRequest, res: NextResponse) {    
  return authVerification(req, (user: any) => NextResponse.json(user));
}

const POST = async function handler(req: NextRequest, res: NextResponse) {    
  const data = await req.json();
  const userId = await insertUser(data);
  
  if (!userId) {
    return NextResponse.json({})
  }

  const paswordResult = await setPasswordToNewUser(userId, data.password);
  
  return NextResponse.json({id: userId, pr: paswordResult})
}


export {GET, POST};
 