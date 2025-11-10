import { Auth0Client, filterDefaultIdTokenClaims } from '@auth0/nextjs-auth0/server';
import { NextResponse } from 'next/server';
import { poolService } from './api/poolService';

export const auth0 = new Auth0Client({
  async onCallback(error, context, session) {
    if (error) {
      throw error;
    }

    if (session?.user) {
      await poolService.players.createPlayer(session.user);
    }

    // complete the redirect to the provided returnTo URL
    return NextResponse.redirect(
      new URL(context.returnTo || "/", process.env.APP_BASE_URL)
    );
  },
  authorizationParameters: {
    scope: "openid profile email admin",
    audience: "http://localhost:5234",
  },
})