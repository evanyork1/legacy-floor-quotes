
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')
    if (!lovableApiKey) {
      throw new Error('Lovable API key not configured')
    }

    const { image, colorName } = await req.json()

    console.log(`Transforming floor with ${colorName} color using Lovable AI`)

    // Enhanced prompt for realistic floor-only transformation
    const prompt = `Transform the floor in this image to a professional ${colorName} epoxy coating. The floor must have: realistic ${colorName.toLowerCase()} colored epoxy base with decorative color flakes scattered throughout, high-gloss wet-look finish typical of epoxy garage floors, proper light reflections and shine. Keep all other elements (walls, ceiling, doors, windows, objects, lighting) exactly as they are - only modify the floor surface.`

    // Call Lovable AI Gateway with image editing
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: image
                }
              }
            ]
          }
        ],
        modalities: ['image', 'text']
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Lovable AI API error:', error)
      throw new Error(`Lovable AI API error: ${error.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const editedImage = data.choices?.[0]?.message?.images?.[0]?.image_url?.url

    if (!editedImage) {
      throw new Error('No image returned from Lovable AI')
    }

    console.log('Floor transformation completed successfully')

    return new Response(
      JSON.stringify({ 
        visualizedImage: editedImage,
        colorUsed: colorName,
        method: 'ai-enhanced'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error in visualize-floor function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate floor visualization',
        details: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 500 
      }
    )
  }
})
