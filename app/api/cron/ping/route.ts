import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

// Ping endpoint to keep Supabase project active
// Free tier projects pause after 1 week of inactivity
export async function GET(request: Request) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ status: 'skipped', message: 'Supabase not configured' });
    }

    // Simple query to keep the database active
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('id')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({
      status: 'ok',
      message: 'Supabase pinged successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Ping error:', error);
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
