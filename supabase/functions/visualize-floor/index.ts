
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Detailed color profiles for accurate epoxy floor visualization
const COLOR_PROFILES: Record<string, string> = {
  'domino': `Transform ONLY the floor surface to have a premium epoxy coating with these EXACT specifications:
- This is a BLACK AND WHITE SPECKLED floor coating
- Base: Neutral grey epoxy base
- Flakes: SMALL dense black and white decorative flakes (like salt and pepper)
- Pattern: 60% white flakes, 40% black flakes, creating a classic speckled domino cookie appearance
- Flake size: Very small 1/16" to 1/8" flakes, densely packed at 80%+ coverage
- Texture: Fine speckled texture with visible individual flakes, matte to low-sheen finish
- Color: Black and white ONLY - no other colors
- Effect: High-contrast monochrome speckled floor similar to terrazzo or cookies & cream pattern
CRITICAL: DO NOT make solid colored floor. Must show visible black and white flakes throughout. Use mask to limit edits to floor only. Preserve all other elements exactly.`,

  'tidal-wave': `Transform ONLY the floor surface to have a premium epoxy coating with these EXACT specifications:
- This is a GREY floor with SUBTLE BLUE HINTS, not a blue floor
- Base: Medium grey epoxy base
- Flakes: SMALL decorative flakes in grey, dark grey, subtle blue-grey tones, and white accents
- Pattern: 50% medium grey flakes, 30% dark grey/charcoal flakes, 15% subtle blue-grey tones, 5% white flakes
- Flake size: Small 1/16" to 1/8" flakes, medium-dense at 70% coverage
- Texture: Natural stone-like texture with subtle color variation, matte finish
- Color: Predominantly GREY with very subtle blue undertones - looks like grey concrete with hints of blue, NOT a bright blue floor
- Effect: Natural grey stone appearance with oceanic grey-blue undertones, subtle and sophisticated
CRITICAL: DO NOT make bright blue floor. Must be predominantly GREY with subtle blue hints. Show visible flakes throughout. Use mask to limit edits to floor only.`,

  'wombat': `Transform ONLY the floor surface to have a premium epoxy coating with these EXACT specifications:
- This is a BROWN SPECKLED floor coating
- Base: Medium brown epoxy base  
- Flakes: SMALL decorative flakes in various brown tones (chocolate, tan, caramel)
- Pattern: 50% medium brown flakes, 30% tan flakes, 20% light brown/cream flakes
- Flake size: Small 1/16" to 1/8" flakes, medium-dense at 70% coverage
- Texture: Warm earth-tone texture with visible brown flakes, matte finish
- Color: Various brown tones creating a warm, earthy appearance
- Effect: Natural brown stone appearance with warm earth tones
CRITICAL: DO NOT make solid brown floor. Must show visible brown-toned flakes throughout. Use mask to limit edits to floor only.`,

  'raven': `Transform ONLY the floor surface to have a premium epoxy coating with these EXACT specifications:
- This is a DARK CHARCOAL/BLACK SPECKLED floor coating
- Base: Deep charcoal grey to black epoxy base
- Flakes: SMALL decorative flakes in black, charcoal, dark grey, with subtle silver highlights
- Pattern: 70% black/charcoal flakes, 25% dark grey flakes, 5% subtle silver metallic flakes
- Flake size: Small 1/16" to 1/8" flakes, dense at 80% coverage
- Texture: Deep dark texture with subtle metallic highlights, low-sheen matte finish
- Color: Very dark charcoal to black with subtle silver sparkle
- Effect: Dramatic dark floor with sophisticated silver accents
CRITICAL: DO NOT make solid black floor. Must show visible dark flakes with silver highlights. Use mask to limit edits to floor only.`,

  'cabin-fever': `Transform ONLY the floor surface to have a premium epoxy coating with these EXACT specifications:
- This is a WARM BROWN floor with ORANGE-RED ACCENTS
- Base: Rustic brown epoxy base
- Flakes: SMALL decorative flakes in brown, burnt orange, rust red, and tan tones
- Pattern: 45% rustic brown flakes, 30% burnt orange/rust flakes, 15% tan flakes, 10% cream flakes
- Flake size: Small 1/16" to 1/8" flakes, medium at 70% coverage
- Texture: Warm rustic texture with orange-brown tones, matte finish
- Color: Warm brown base with distinctive burnt orange and rust red accents
- Effect: Lodge-inspired floor with warm autumn/cabin colors
CRITICAL: DO NOT make solid brown floor. Must show visible brown and orange-toned flakes. Use mask to limit edits to floor only.`,

  'coyote': `Transform ONLY the floor surface to have a premium epoxy coating with these EXACT specifications:
- This is a LIGHT TAN/BEIGE SPECKLED floor coating
- Base: Light tan/sandy beige epoxy base
- Flakes: SMALL decorative flakes in tan, beige, cream, and light brown tones
- Pattern: 50% tan flakes, 30% beige flakes, 15% cream flakes, 5% light brown flakes
- Flake size: Small 1/16" to 1/8" flakes, medium at 70% coverage
- Texture: Soft neutral texture with warm sandy tones, matte finish
- Color: Light tan and beige tones creating a warm, sandy desert appearance
- Effect: Desert-inspired floor with soft neutral earth tones
CRITICAL: DO NOT make solid tan floor. Must show visible tan and beige flakes. Use mask to limit edits to floor only.`,

  'creek-bed': `Transform ONLY the floor surface to have a premium epoxy coating with these EXACT specifications:
- This is a MEDIUM GREY SPECKLED floor coating
- Base: Medium grey epoxy base
- Flakes: SMALL decorative flakes in various grey tones with white accents
- Pattern: 50% medium grey flakes, 30% darker grey flakes, 15% light grey flakes, 5% white flakes
- Flake size: Small 1/16" to 1/8" flakes, medium at 70% coverage
- Texture: Natural stone-like grey texture with white highlights, matte finish
- Color: Various grey tones creating a natural riverbed stone appearance
- Effect: Natural grey stone floor with subtle white accents
CRITICAL: DO NOT make solid grey floor. Must show visible grey-toned flakes with white accents. Use mask to limit edits to floor only.`,

  'orbit': `Transform ONLY the floor surface to have a premium epoxy coating with these EXACT specifications:
- This is a SILVER-GREY METALLIC floor coating
- Base: Light grey epoxy base with metallic sheen
- Flakes: SMALL decorative metallic flakes in silver, light grey, and white
- Pattern: 50% metallic silver flakes, 30% light grey flakes, 20% white flakes
- Flake size: Small 1/16" to 1/8" metallic flakes, dense at 75% coverage
- Texture: Modern metallic texture with subtle silver sparkle, low-sheen finish
- Color: Silver-grey with metallic highlights creating a modern, sophisticated look
- Effect: Contemporary metallic floor with silver sparkle and grey tones
CRITICAL: DO NOT make solid silver floor. Must show visible metallic silver and grey flakes. Use mask to limit edits to floor only.`
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
      `Transform ONLY the floor surface (use provided mask) to a professional ${colorName} epoxy floor coating with these specifications: SMALL VISIBLE DECORATIVE FLAKES creating speckled pattern (NOT solid color), satin matte finish with minimal shine, realistic textured appearance showing individual flakes. CRITICAL: DO NOT create solid colored floor - must show visible flake pattern. Use mask to limit edits to floor only. Preserve all other elements exactly as original.`
    
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
