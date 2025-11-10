/**
 * Supabase Client Configuration for TutorAI Frontend
 * Created: 2025-11-10
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qaksqbriceydoeorbbhd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFha3NxYnJpY2V5ZG9lb3JiYmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzY3NjgsImV4cCI6MjA2NzcxMjc2OH0.wD9mSu7QK96Eu1e6Mf1CVAgaYFM_Aep5W6aDoaT4Jz0';

// Backend API URL
export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://tutor-agent-aff7.onrender.com';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});

/**
 * Validate invite code (PUBLIC endpoint)
 */
export async function validateInviteCode(code: string, email: string = '') {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/invites/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, email })
    });

    if (!response.ok) {
      throw new Error(`Validation failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Invite validation error:', error);
    return {
      valid: false,
      reason: 'network_error',
      message: 'Impossibile verificare il codice. Riprova.'
    };
  }
}

/**
 * Redeem invite code after registration (AUTHENTICATED endpoint)
 */
export async function redeemInviteCode(code: string, accessToken: string) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/invites/redeem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ code })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Redemption failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Invite redemption error:', error);
    throw error;
  }
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

/**
 * Get current session
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

/**
 * Types for TypeScript
 */
export interface InviteValidationResponse {
  valid: boolean;
  hours_granted?: number;
  invite_type?: string;
  message: string;
  reason?: string;
}

export interface InviteRedemptionResponse {
  success: boolean;
  hours_granted: number;
  message: string;
}
