
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Detailed color profiles for accurate epoxy floor visualization
const COLOR_PROFILES: Record<string, string> = {
  'domino': `Apply Torginol Domino flake color to the floor surface. This is a premium epoxy coating with:
- Black and white speckled pattern (like domino cookies or salt & pepper)
- Small 1/16" to 1/8" decorative flakes densely packed
- 60% white flakes, 40% black flakes
- High-contrast monochrome appearance
- Satin finish with visible texture, not glossy
CRITICAL: Apply ONLY to floor area using mask. Must show visible black and white flakes, NOT solid color. Preserve all other elements exactly.`,

  'tidal-wave': `Apply Torginol Tidal Wave flake color to the floor surface. This is a premium epoxy coating with:
- Light gray, off-white, medium gray, charcoal, with subtle navy blue accent flakes
- Small 1/16" to 1/8" decorative flakes densely packed
- Approximate ratio: 55% light gray/off-white, 30% medium gray, 10% charcoal, 5% navy blue accents
- Cool-toned, predominantly light gray appearance with very subtle blue hints
- Satin finish with visible flake texture, not glossy
CRITICAL: Apply ONLY to floor area using mask. Must show mostly WHITE and LIGHT GRAY flakes with minimal navy blue accents, NOT a blended or solid color. Preserve all other elements exactly.`,

  'wombat': `Apply Torginol Wombat flake color to the floor surface. This is a premium epoxy coating with:
- Medium gray, charcoal, dark gray, and taupe flakes
- Small 1/16" to 1/8" decorative flakes densely packed
- Approximate ratio: 30% medium gray, 30% charcoal, 25% dark gray, 15% taupe
- Predominantly gray, darker stone-like appearance with subtle warm taupe accents
- Satin finish with visible flake texture, not glossy
CRITICAL: Apply ONLY to floor area using mask. Must show distinct GRAY and charcoal flakes as actual chips with darker overall appearance, NOT a blended or solid color. Preserve all other elements exactly.`,

  'raven': `Apply Torginol Raven flake color to the floor surface. This is a premium epoxy coating with:
- Charcoal black, dark gray, and small white accent flakes
- Small 1/16" to 1/8" decorative flakes densely packed
- Approximate ratio: 70% charcoal black, 20% dark gray, 10% white accents
- Dark, high-contrast, modern appearance
- Satin finish with visible flake texture, not glossy
CRITICAL: Apply ONLY to floor area using mask. Must show visible black, gray, and white flake chips, NOT a blended solid color. Preserve all other elements exactly.`,

  'cabin-fever': `Apply Torginol Cabin Fever flake color to the floor surface. This is a premium epoxy coating with:
- Light tan, gray, beige, and small black accent flakes
- Small 1/16" to 1/8" decorative flakes densely packed
- Approximate ratio: 40% light tan, 35% gray, 15% beige, 10% small black accents
- Neutral gray-tan stone appearance, NOT red or brown tones
- Satin finish with visible flake texture, not glossy
CRITICAL: Apply ONLY to floor area using mask. Must show distinct TAN and GRAY flakes as individual chips. NO BROWN or RED tones - keep it neutral gray-tan. NOT a blended color. Preserve all other elements exactly.`,

  'coyote': `Apply Torginol Coyote flake color to the floor surface. This is a premium epoxy coating with:
- Off-white, light gray, light tan, light brown, and black flakes
- VERY SMALL 1/16" decorative flakes (tiny chips, NOT large flakes)
- Approximate ratio: 30% off-white, 25% light gray, 20% light tan, 15% light brown, 10% black
- Light, bright appearance with white, gray, tan, and subtle brown tones
- Satin finish with visible flake texture, not glossy
CRITICAL: Apply ONLY to floor area using mask. Flakes must be VERY SMALL (1/16"). Must show distinct off-white, gray, tan, and brown flake chips. NOT a blended color. Preserve all other elements exactly.`,

  'creek-bed': `Apply Torginol Creek Bed flake color to the floor surface. This is a premium epoxy coating with:
- Neutral grey and beige mix (river stone appearance)
- Small 1/16" to 1/8" decorative flakes
- Grey, beige, taupe, and cream tones
- Natural riverbed stone appearance
- Satin finish with visible texture, not glossy
CRITICAL: Apply ONLY to floor area using mask. Must show visible grey and beige flakes, NOT solid color.`,

  'orbit': `Apply Torginol Orbit flake color to the floor surface. This is a premium epoxy coating with:
- Dark blue, charcoal, medium gray, bright blue, and white accent flakes
- Small 1/16" to 1/8" decorative flakes densely packed
- Approximate ratio: 30% dark blue, 25% charcoal/black, 25% medium gray, 20% bright blue/white accents
- Bold blue and gray appearance with darker accents
- Satin finish with visible flake texture, not glossy
CRITICAL: Apply ONLY to floor area using mask. Must show distinct blue, charcoal, and gray flakes as actual chips, NOT a blended solid color. Preserve all other elements exactly.`
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    const openAIOrgId = Deno.env.get('OPENAI_ORG_ID')
    const openAIProjectId = Deno.env.get('OPENAI_PROJECT_ID')
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const { image, colorName, colorId, mask } = await req.json()

    console.log(`Transforming floor with ${colorName} (${colorId}) using gpt-image-1, mask provided: ${!!mask}`)
    console.log(`Using org: ${openAIOrgId ? 'yes' : 'no'}, project: ${openAIProjectId ? 'yes' : 'no'}`)

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
    
    // Use detailed color profile or fallback to generic prompt
    const detailedPrompt = COLOR_PROFILES[colorId] || 
      `Apply Torginol ${colorName} epoxy floor coating to the floor surface. Use small visible decorative flakes (1/16" to 1/8") creating a speckled pattern. Satin finish with realistic texture and minimal shine (NOT glossy). CRITICAL: Apply ONLY to floor area using mask. Must show visible flake pattern, NOT solid color. Preserve all other elements exactly.`
    
    formData.append('prompt', detailedPrompt)
    formData.append('model', 'gpt-image-1')
    formData.append('size', '1024x1024') // Max size supported by gpt-image-1 edits API
    formData.append('n', '1')

    // Build headers with organization and project if available
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${openAIApiKey}`,
    }
    
    if (openAIOrgId) {
      headers['OpenAI-Organization'] = openAIOrgId
    }
    
    if (openAIProjectId) {
      headers['OpenAI-Project'] = openAIProjectId
    }

    // Call OpenAI Image Edit API with gpt-image-1
    const response = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', response.status, error)
      
      // Pass through specific error statuses to client
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded. Please try again in a moment.',
            details: error.error?.message 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
            status: 429 
          }
        )
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: 'Payment required. Please check your OpenAI billing.',
            details: error.error?.message 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
            status: 402 
          }
        )
      }
      
      if (response.status === 403) {
        return new Response(
          JSON.stringify({ 
            error: 'Access forbidden. Please verify your OpenAI organization.',
            details: error.error?.message 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
            status: 403 
          }
        )
      }
      
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
