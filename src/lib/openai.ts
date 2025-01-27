import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true // Enable client-side usage
});

// Modyfikacja funkcji generatePrompt aby uwzględniała wszystkie pola profilu
export const generatePrompt = async (userMetadata: any, startDate: Date) => {
  try {
    if (!userMetadata) {
      throw new Error('Brak danych profilu. Uzupełnij swój profil w ustawieniach.');
    }

    const metadata = {
      industry: userMetadata.industry || 'Nieznana',
      targetAudience: userMetadata.targetAudience || 'Ogólna',
      contentTypes: Array.isArray(userMetadata.contentTypes) ? userMetadata.contentTypes.join(', ') : 'Różne',
      tone: Array.isArray(userMetadata.tone) ? userMetadata.tone.join(', ') : 'Neutralny',
      keywords: userMetadata.keywords || '',
      brandValues: userMetadata.brandValues || '',
      uniqueSellingPoints: userMetadata.uniqueSellingPoints || '',
      hashtagStrategy: userMetadata.hashtagStrategy || '',
      contentLength: userMetadata.contentLength || 'medium',
      contentStyle: userMetadata.contentStyle || '',
      callToAction: userMetadata.callToAction || '',
      emoticons: userMetadata.emoticons || false,
      languageStyle: userMetadata.languageStyle || 'formal',
      competitors: userMetadata.competitors || '',
      marketingGoals: userMetadata.marketingGoals || '',
      preferredImageStyle: userMetadata.preferredImageStyle || '',
      postLanguage: userMetadata.postLanguage || 'pl' // Domyślnie polski
    };

    const systemPrompt = `
      Jesteś ekspertem od social media marketingu specjalizującym się w branży: ${metadata.industry}.
      
      Profil:
      - Branża: ${metadata.industry}
      - Grupa docelowa: ${metadata.targetAudience}
      - Preferowane typy treści: ${metadata.contentTypes}
      - Ton komunikacji: ${metadata.tone}
      - Słowa kluczowe: ${metadata.keywords}
      - Wartości marki: ${metadata.brandValues}
      - Unikalne cechy: ${metadata.uniqueSellingPoints}
      - Strategia hashtagów: ${metadata.hashtagStrategy}
      - Długość treści: ${metadata.contentLength}
      - Styl treści: ${metadata.contentStyle}
      - Call to Action: ${metadata.callToAction}
      - Używaj emotikon: ${metadata.emoticons ? 'tak' : 'nie'}
      - Styl języka: ${metadata.languageStyle}
      - Konkurencja: ${metadata.competitors}
      - Cele marketingowe: ${metadata.marketingGoals}
      - Styl grafik: ${metadata.preferredImageStyle}
      - Język postów: ${metadata.postLanguage}
      
      Wygeneruj krótką, angażującą treść posta (max 280 znaków) w języku ${metadata.postLanguage}.
      Treść powinna być zwięzła i gotowa do publikacji.
      
      Data publikacji: ${startDate.toLocaleDateString('pl-PL')}
      
      Format odpowiedzi:
      [Treść posta w języku ${metadata.postLanguage}]
      #hashtag1 #hashtag2 #hashtag3
    `;

    const userPrompt = `Wygeneruj post na social media w języku ${metadata.postLanguage} dla firmy z branży ${metadata.industry} na dzień ${startDate.toLocaleDateString('pl-PL')}.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('Nie udało się wygenerować treści. Spróbuj ponownie.');
    }

    return generatedContent;

  } catch (error: any) {
    console.error('Error generating prompt:', error);
    if (error.response?.status === 401) {
      throw new Error('Nieprawidłowy klucz API. Sprawdź konfigurację.');
    } else if (error.response?.status === 429) {
      throw new Error('Przekroczono limit zapytań do API. Spróbuj ponownie później.');
    }
    throw new Error(error?.message || 'Nie udało się wygenerować treści. Spróbuj ponownie.');
  }
};