import { NextRequest, NextResponse } from "next/server";
import { decode } from "./jwt";
import { getUserById } from "../database/queries";

export async function authVerification(request: NextRequest, nextFunction: any) {
    if (request.headers.get('auth_token')) {
      const token = request.headers.get('auth_token');
      const tokenParsed = decode(token);
      
      if (!tokenParsed?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const user = await getUserById(tokenParsed.id)
      if (!user) {      
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      return nextFunction(user);
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }