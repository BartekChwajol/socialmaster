import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function TestImage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateTestImage = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch("/api/ideogram/generate", {
        method: "POST",
        headers: {
          "api-key": "oupBL5VrF6NixAt3IawGsLZEGkTlRg7B_Vum8q7-KA4i6dtb4Cex589fEkFe3ZzY7CwV7PDiY-5UODgzSQW4GQ",
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          image_request: {
            prompt: "A serene tropical beach scene. Dominating the foreground are tall palm trees with lush green leaves, standing tall against a backdrop of a sandy beach. The beach leads to the azure waters of the sea, which gently kisses the shoreline. In the distance, there is an island or landmass with a silhouette of what appears to be a lighthouse or tower. The sky above is painted with fluffy white clouds, some of which are tinged with hues of pink and orange, suggesting either a sunrise or sunset.",
            aspect_ratio: "ASPECT_10_16",
            model: "V_2",
            magic_prompt_option: "AUTO"
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!data.data?.[0]?.url) {
        throw new Error(`No image URL in response: ${JSON.stringify(data)}`);
      }

      setGeneratedImageUrl(data.data[0].url);
      toast.success('Image generated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error generating image:', errorMessage);
      setError(errorMessage);
      toast.error('Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="glass-effect rounded-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Test Image Generation</h1>
          
          <div className="space-y-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateTestImage}
              disabled={isGenerating}
              className="w-full bg-accent text-dark py-3 rounded-full font-semibold hover:bg-white transition-colors duration-300 disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate Test Image'}
            </motion.button>

            {error && (
              <div className="bg-red-500/20 text-red-400 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Error:</h3>
                <pre className="text-sm overflow-auto whitespace-pre-wrap">{error}</pre>
              </div>
            )}

            {generatedImageUrl && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Generated Image:</h2>
                <img
                  src={generatedImageUrl}
                  alt="Generated test image"
                  className="w-full h-auto rounded-lg"
                />
                <div className="text-sm text-gray-300 break-all">
                  <strong>Image URL:</strong> {generatedImageUrl}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}