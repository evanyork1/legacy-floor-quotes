import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Client with user's token to check permissions
    const supabaseUser = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    // Admin client with service role
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Get the current user
    const { data: { user: currentUser }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !currentUser) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if caller is admin
    const { data: isAdmin } = await supabaseAdmin.rpc('has_role', {
      _user_id: currentUser.id,
      _role: 'admin',
    });

    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(JSON.stringify({ error: 'user_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prevent self-deactivation
    if (user_id === currentUser.id) {
      return new Response(JSON.stringify({ error: 'Cannot deactivate yourself' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Deactivating user:', user_id);

    // Ban the user in Supabase Auth
    const { error: banError } = await supabaseAdmin.auth.admin.updateUserById(user_id, {
      ban_duration: 'none', // Permanent ban until manually unbanned
      user_metadata: { banned: true },
    });

    if (banError) {
      console.error('Failed to ban user:', banError);
      return new Response(JSON.stringify({ error: 'Failed to ban user: ' + banError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update profile to mark as inactive
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        is_active: false,
        deactivated_at: new Date().toISOString(),
      })
      .eq('id', user_id);

    if (profileError) {
      console.error('Failed to update profile:', profileError);
      // Try to unban if profile update failed
      await supabaseAdmin.auth.admin.updateUserById(user_id, {
        ban_duration: 'none',
        user_metadata: { banned: false },
      });
      return new Response(JSON.stringify({ error: 'Failed to update profile' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('User deactivated successfully:', user_id);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
