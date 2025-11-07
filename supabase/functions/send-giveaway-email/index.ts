import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GiveawayEmailRequest {
  name: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email }: GiveawayEmailRequest = await req.json();

    console.log(`Sending giveaway welcome email to: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Legacy Industrial Coatings <support@legacyindustrialcoatings.com>",
      to: [email],
      subject: "You're Entered! Free Garage Floor Coating Giveaway",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a;">Thank You for Entering, ${name}!</h1>
          
          <p style="font-size: 16px; line-height: 1.6;">
            We're excited to have you entered in our <strong>FREE Garage Floor Coating Giveaway</strong>!
          </p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1a1a1a; margin-top: 0;">About Legacy Industrial Coatings</h2>
            <p style="line-height: 1.6;">
              Legacy Industrial Coatings specializes in premium polyurea floor coatings for residential garages, 
              commercial spaces, and industrial facilities throughout the Dallas/Fort Worth area.
            </p>
            <ul style="line-height: 1.8;">
              <li><strong>Lifetime Warranty</strong> - We stand behind our work</li>
              <li><strong>1-Day Installation</strong> - Minimal disruption to your schedule</li>
              <li><strong>Superior Durability</strong> - 4x stronger than epoxy</li>
              <li><strong>UV Resistant</strong> - Won't yellow or fade over time</li>
            </ul>
          </div>
          
          <h3 style="color: #1a1a1a;">What Happens Next?</h3>
          <p style="line-height: 1.6;">
            We'll be drawing the winner soon! If selected, we'll contact you at the information you provided. 
            The winner receives a complete garage floor coating installation - a value of up to $5,200!
          </p>
          
          <p style="line-height: 1.6;">
            In the meantime, feel free to explore our website or reach out if you have any questions about our services.
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #1a1a1a; color: white; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px;">
              <strong>Contact Us:</strong><br/>
              Phone: (214) 555-0100<br/>
              Email: support@legacyindustrialcoatings.com<br/>
              Web: legacyindustrialcoatings.com
            </p>
          </div>
          
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            Good luck in the giveaway!<br/>
            <strong>The Legacy Industrial Coatings Team</strong>
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-giveaway-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
