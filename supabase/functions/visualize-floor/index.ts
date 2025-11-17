
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Detailed color profiles for accurate epoxy floor visualization
const COLOR_PROFILES: Record<string, string> = {
  'domino': `Transform ONLY the floor surface to have a premium epoxy coating with these exact specifications:
- Base: Satin-finish clear polyaspartic base coat
- Flake composition: 60% white flakes, 40% black flakes, evenly distributed
- Flake density: 75-80% coverage creating a dense speckled pattern
- Flake sizes: Varied from 1/8" to 1/4", randomly scattered for organic look
- Texture: Individual flake edges clearly visible with natural textured depth, matte appearance
- Finish: Satin clear topcoat with subtle sheen and visible texture (NOT glossy or reflective)
- Effect: Professional epoxy floor with visible flake texture, natural matte finish, minimal shine
CRITICAL: Use mask to limit edits to floor only. Preserve walls, ceiling, doors, windows, objects, lighting, shadows, and perspective exactly as original.`,

  'tidal-wave': `Transform ONLY the floor surface to have a premium epoxy coating with these exact specifications:
- Base: Satin-finish clear polyaspartic base coat
- Flake composition: 50% ocean blue flakes, 30% grey flakes, 20% white flakes
- Flake density: 70-75% coverage creating a coastal ocean-inspired pattern
- Flake sizes: Varied from 1/8" to 1/4", creating wave-like visual movement
- Texture: Organic distribution with blue-grey color flow, visible textured surface
- Finish: Satin clear topcoat with natural matte appearance (NOT glossy or wet-looking)
- Effect: Ocean-inspired epoxy floor with flowing blue-grey tones, visible texture, minimal reflection
CRITICAL: Use mask to limit edits to floor only. Preserve walls, ceiling, doors, windows, objects, lighting, shadows, and perspective exactly as original.`,

  'wombat': `Transform ONLY the floor surface to have a premium epoxy coating with these exact specifications:
- Base: Satin-finish clear polyaspartic base coat
- Flake composition: 50% medium brown flakes, 30% tan flakes, 20% cream flakes
- Flake density: 70-75% coverage creating warm earth-tone pattern
- Flake sizes: Varied from 1/8" to 1/4", naturally scattered with visible texture
- Texture: Rich brown tones with tan highlights, natural textured depth
- Finish: Satin clear topcoat with subtle sheen (NOT glossy, minimal reflection)
- Effect: Warm brown epoxy floor with natural earth-tone variation, visible flake texture, matte appearance
CRITICAL: Use mask to limit edits to floor only. Preserve walls, ceiling, doors, windows, objects, lighting, shadows, and perspective exactly as original.`,

  'raven': `Transform ONLY the floor surface to have a premium epoxy coating with these exact specifications:
- Base: Satin-finish clear polyaspartic base coat
- Flake composition: 70% deep black flakes, 20% charcoal grey flakes, 10% silver flakes
- Flake density: 80-85% coverage creating dramatic dark pattern
- Flake sizes: Varied from 1/8" to 1/4", densely distributed with visible texture
- Texture: Deep black base with subtle grey and silver highlights, natural textured surface
- Finish: Satin clear topcoat with minimal sheen (NOT glossy or mirror-like)
- Effect: Dramatic dark epoxy floor with subtle metallic highlights, visible texture, matte finish
CRITICAL: Use mask to limit edits to floor only. Preserve walls, ceiling, doors, windows, objects, lighting, shadows, and perspective exactly as original.`,

  'cabin-fever': `Transform ONLY the floor surface to have a premium epoxy coating with these exact specifications:
- Base: Satin-finish clear polyaspartic base coat
- Flake composition: 50% rustic brown flakes, 30% burnt orange flakes, 20% cream flakes
- Flake density: 70-75% coverage creating warm rustic pattern
- Flake sizes: Varied from 1/8" to 1/4", organic distribution with visible texture
- Texture: Warm rustic tones with burnt orange accents, natural textured depth
- Finish: Satin clear topcoat with subtle sheen (NOT glossy, minimal reflection)
- Effect: Rustic lodge-inspired epoxy floor with warm brown-orange tones, visible flake texture, natural matte appearance
CRITICAL: Use mask to limit edits to floor only. Preserve walls, ceiling, doors, windows, objects, lighting, shadows, and perspective exactly as original.`,

  'coyote': `Transform ONLY the floor surface to have a premium epoxy coating with these exact specifications:
- Base: Satin-finish clear polyaspartic base coat
- Flake composition: 50% sandy tan flakes, 30% beige flakes, 20% cream flakes
- Flake density: 70-75% coverage creating desert-inspired pattern
- Flake sizes: Varied from 1/8" to 1/4", naturally scattered with visible texture
- Texture: Soft tan tones with beige highlights, natural textured surface
- Finish: Satin clear topcoat with subtle sheen (NOT glossy, minimal reflection)
- Effect: Desert-inspired epoxy floor with warm tan-beige tones, visible flake texture, natural matte appearance
CRITICAL: Use mask to limit edits to floor only. Preserve walls, ceiling, doors, windows, objects, lighting, shadows, and perspective exactly as original.`,

  'creek-bed': `Transform ONLY the floor surface to have a premium epoxy coating with these exact specifications:
- Base: Satin-finish clear polyaspartic base coat
- Flake composition: 50% medium grey flakes, 30% stone grey flakes, 20% white flakes
- Flake density: 70-75% coverage creating natural stone-like pattern
- Flake sizes: Varied from 1/8" to 1/4", river rock inspired distribution with visible texture
- Texture: Natural grey stone tones with white highlights, clearly visible textured surface
- Finish: Satin clear topcoat with natural matte appearance (NOT glossy or wet-looking)
- Effect: Natural stone-inspired epoxy floor with grey tones, visible flake texture, minimal shine
CRITICAL: Use mask to limit edits to floor only. Preserve walls, ceiling, doors, windows, objects, lighting, shadows, and perspective exactly as original.`,

  'orbit': `Transform ONLY the floor surface to have a premium epoxy coating with these exact specifications:
- Base: Satin-finish clear polyaspartic base coat
- Flake composition: 50% metallic silver flakes, 30% grey flakes, 20% white flakes
- Flake density: 75-80% coverage creating modern metallic pattern
- Flake sizes: Varied from 1/8" to 1/4", creating subtle metallic texture effect
- Texture: Metallic silver base with grey and white accents, visible textured surface
- Finish: Satin clear topcoat with subtle metallic sheen (NOT mirror-like or overly glossy)
- Effect: Modern metallic epoxy floor with subtle silver sparkle, visible texture, natural satin finish
CRITICAL: Use mask to limit edits to floor only. Preserve walls, ceiling, doors, windows, objects, lighting, shadows, and perspective exactly as original.`
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
      `Transform ONLY the floor surface (use provided mask) to a professional ${colorName} epoxy coating with satin finish, visible decorative color flakes, realistic texture, and minimal shine (NOT glossy). CRITICAL: Use mask to limit edits to floor only. Preserve all other elements exactly as original.`
    
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
