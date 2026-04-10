const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.adoptino.ro';

export async function fetchAPI(endpoint, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_URL}/api${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return null;
  }
}

export async function getAnimals(params = {}) {
  const defaultParams = { 'populate': 'images,association', 'pagination[pageSize]': '100' };
  return fetchAPI('/animals', { ...defaultParams, ...params });
}

export async function getAssociations(params = {}) {
  const defaultParams = { 'populate': 'logo', 'pagination[pageSize]': '100' };
  return fetchAPI('/associations', { ...defaultParams, ...params });
}

export async function getArticles(params = {}) {
  const defaultParams = { 'populate': 'cover_image', 'pagination[pageSize]': '100' };
  return fetchAPI('/articles', { ...defaultParams, ...params });
}

export async function getFAQs(params = {}) {
  const defaultParams = { 'sort': 'order:asc', 'pagination[pageSize]': '100' };
  return fetchAPI('/faqs', { ...defaultParams, ...params });
}

export function getStrapiMedia(media) {
  if (!media) return null;
  if (media.url?.startsWith('http')) return media.url;
  return `${API_URL}${media.url}`;
}