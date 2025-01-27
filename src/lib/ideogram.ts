import { supabase } from './supabase';

const IDEOGRAM_API_KEY = 'oupBL5VrF6NixAt3IawGsLZEGkTlRg7B_Vum8q7-KA4i6dtb4Cex589fEkFe3ZzY7CwV7PDiY-5UODgzSQW4GQ';

const removeDiacritics = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const generateImagePrompt = (content: string, metadata: any): string => {
  const style = metadata?.preferredImageStyle || 'modern';
  const industry = metadata?.industry || '';
  const brandValues = metadata?.brandValues || '';
  const colorPalette = metadata?.colorPalette || 'Ocean Blue';
  const postLanguage = metadata?.postLanguage || 'en';

  let prompt = `Create a professional ${style} style image for a social media post about: ${content}. 
    Industry: ${industry}. 
    Brand values: ${brandValues}. 
    Color palette: ${colorPalette}. 
    Make it visually appealing and suitable for social media.`;

  // Remove Polish diacritics if the language is Polish
  if (postLanguage === 'pl') {
    prompt = removeDiacritics(prompt);
  }

  return prompt;
};

export const generateImage = async (content: string, metadata: any): Promise<string | null> => {
  try {
    const prompt = generateImagePrompt(content, metadata);
    
    const response = await fetch("/api/ideogram/generate", {
      method: "POST",
      headers: {
        "api-key": IDEOGRAM_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": window.location.origin
      },
      body: JSON.stringify({
        image_request: {
          prompt,
          aspect_ratio: "ASPECT_1_1",
          model: "V_2",
          magic_prompt_option: "AUTO"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response:', errorText);
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    // Sprawdź typ odpowiedzi
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Invalid response type: ${contentType}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.data?.[0]?.url) {
      throw new Error('No image URL in response');
    }

    // Transform image URL to use our proxy
    const imageUrl = data.data[0].url.replace('https://ideogram.ai/api/images', '/api/images');
    
    // Fetch and save image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch generated image');
    }
    
    const imageBlob = await imageResponse.blob();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      throw new Error(`Authentication error: ${authError.message}`);
    }
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Generate filename
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const filePath = `${user.id}/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(filePath, imageBlob, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      throw new Error(`Upload error: ${uploadError.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('post-images')
      .getPublicUrl(filePath);

    return publicUrl;

  } catch (error) {
    console.error('Error in generateImage:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

export const regenerateImageForPost = async (postId: string, content: string, metadata: any): Promise<void> => {
  try {
    const imageUrl = await generateImage(content, metadata);
    
    if (!imageUrl) {
      throw new Error('Failed to generate new image');
    }

    const { error } = await supabase
      .from('posts')
      .update({ image_url: imageUrl })
      .eq('id', postId);

    if (error) throw error;

  } catch (error) {
    console.error('Error regenerating image:', error);
    throw error;
  }
};