import { auth } from '@/auth';
import { axiosInstance } from './axiosInstance';
import { User } from './definitions';

// fetchlanguagename from localStorage
export function fetchLanguageName(): string {
  const language = localStorage.getItem('captionLanguage');
  if (language) {
    return language;
  }
  return '';
}



interface Field {
  value: string;
}

export function getLanguageName(field: Field): string {
  const languageMap: { [key: string]: string } = {
    en: 'English',
    hi: 'Hindi',
    fr: 'French',
    es: 'Spanish',
    de: 'German',
    it: 'Italian',
    ru: 'Russian',
    ja: 'Japanese',
    ko: 'Korean',
    zh: 'Chinese',
  };

  return (
    languageMap[field.value] || 'Please add a language from Edit Profile page'
  );
}
