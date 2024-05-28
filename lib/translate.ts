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

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key':
        process.env.NEXTLENSE_PUBLIC_RAPIDAPI_KEY ||
        '806e8e51fbmshd10d124bfd1947fp1c8d12jsn044e04d49402',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
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
