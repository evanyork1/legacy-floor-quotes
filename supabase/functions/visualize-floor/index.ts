
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
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const { image, colorName, mask } = await req.json()

    console.log(`Transforming floor with ${colorName} color using gpt-image-1, mask provided: ${!!mask}`)

    // Convert base64 image to blob
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
    const imageBlob = new Blob([binaryData], { type: 'image/png' })

    // Create form data for image edit API
    const formData = new FormData()
    formData.append('image', imageBlob, 'floor.png')
    
    // Add mask if provided
    if (mask) {
      const maskBase64 = mask.replace(/^data:image\/\w+;base64,/, '')
      const maskBinary = Uint8Array.from(atob(maskBase64), c => c.charCodeAt(0))
      const maskBlob = new Blob([maskBinary], { type: 'image/png' })
      formData.append('mask', maskBlob, 'mask.png')
    }
    
    // Enhanced prompt for realistic floor-only transformation
    const prompt = `Transform ONLY the floor surface (use provided mask) to a professional ${colorName} epoxy coating. The floor must have: realistic ${colorName.toLowerCase()} colored epoxy base with decorative color flakes scattered throughout, high-gloss wet-look finish typical of epoxy garage floors, proper light reflections and shine. CRITICAL: Use the mask to limit ALL edits strictly to the masked floor region. Do not change walls, ceiling, doors, windows, objects, lighting, shadows, or perspective. Only modify the masked floor surface texture and color to look like a freshly applied epoxy coating.`
    
    formData.append('prompt', prompt)
    formData.append('model', 'gpt-image-1')
    formData.append('size', '1024x1024')
    formData.append('n', '1')

    // Call OpenAI Image Edit API with gpt-image-1
    const response = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', error)
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const editedImage = `data:image/png;base64,${data.data[0].b64_json}`

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
