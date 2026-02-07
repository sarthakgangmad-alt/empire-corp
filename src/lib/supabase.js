import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hzrpwquivfermoztgzfb.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6cnB3cXVpdmZlcm1venRnemZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzk5MzEsImV4cCI6MjA4NTk1NTkzMX0.kVBvFXtSJMX8UdGollrDqm4Tj6fOschSx7XpoRTfHPs"

// Fail-safe initialization to prevent white screen on deployment if env vars are missing
let supabaseInstance = null;

if (supabaseUrl && supabaseAnonKey) {
    try {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    } catch (e) {
        console.error('Failed to initialize Supabase:', e)
    }
} else {
    console.warn('Supabase URL or Anon Key is missing. App running in offline/mock mode.')
}

// Export a safe proxy that warns instead of crashing on access
export const supabase = supabaseInstance || new Proxy({}, {
    get: (target, prop) => {
        if (prop === 'then') return undefined;
        // Mock common auth methods
        if (prop === 'auth') {
            return {
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
                getSession: () => Promise.resolve({ data: { session: null }, error: null }),
                signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
                signOut: () => Promise.resolve({ error: null }),
                getUser: () => Promise.resolve({ data: { user: null }, error: null }),
            };
        }
        // Chainable mock for database queries
        const safeResult = { data: [], error: { message: 'Supabase environment variables missing.' } };
        const mockBuilder = new Proxy({}, {
            get: (t, p) => {
                if (p === 'then') return (resolve) => resolve(safeResult);
                return () => mockBuilder;
            }
        });
        return () => mockBuilder;
    }
});
