'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const BetaLoginPage = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Redirect to platform.mytutorai.app/login
    // Accept both 'invite' and 'code' as parameter names
    const inviteCode = searchParams.get('invite') || searchParams.get('code');
    const targetUrl = inviteCode
      ? `https://platform.mytutorai.app/login?invite=${inviteCode}`
      : 'https://platform.mytutorai.app/login';

    console.log('Redirecting to:', targetUrl);
    window.location.href = targetUrl;
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Reindirizzamento...</p>
      </div>
    </div>
  );
};

export default BetaLoginPage;

/*
 * ARCHITECTURAL CHANGE (2025-11-11):
 * This page now redirects to platform.mytutorai.app/login
 *
 * Reason: Supabase Auth cookies don't work across different domains.
 * The login page must be on the same domain as the main app.
 *
 * Old flow (broken):
 * mytutorai.app/beta-login → login → redirect → platform.mytutorai.app → no session (different domain)
 *
 * New flow (working):
 * mytutorai.app/beta-login → redirect → platform.mytutorai.app/login → login → stays on same domain ✅
 */
