import axios from 'axios';

export const translateText = async (
  text: string,
  username: string,
): Promise<string> => {
  // Fetch target language from local storage
  let targetLang; // Declare targetLang outside the if statement

  targetLang = localStorage.getItem('captionLanguage');

  if (!targetLang) {
    targetLang = 'hi'; // Default to Hindi if no language is set in local storage
  }

  const encodedParams = new URLSearchParams();
  encodedParams.set('q', text);
  encodedParams.set('target', targetLang);
  encodedParams.set('source', 'en');
  encodedParams.set('format', 'text');

  const options = {
    method: 'POST',
    url: 'https://google-translator9.p.rapidapi.com/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '08f0745ab0mshe19034fceea2319p18cc30jsnf4cc567ff156',
      'X-RapidAPI-Host': 'google-translator9.p.rapidapi.com'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
    throw new Error('Translation failed');
  }
};
