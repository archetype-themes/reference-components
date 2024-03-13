export function getProductJSON(handle) {
  return getJSONFromEndpoint(`products/${handle}.js`);
}

export async function getJSONFromEndpoint(endpoint) {
  const response = await fetchDataFromEndpoint(endpoint);
  return response.json();
}

export async function getTextFromEndpoint(endpoint) {
  const response = await fetchDataFromEndpoint(endpoint);
  return response.text();
}

export async function fetchDataFromEndpoint(endpoint) {
  const response = await fetch(`${Shopify.routes.root}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from endpoint: ${endpoint}`);
  }

  return response;
}
