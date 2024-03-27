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
  const response = await fetch(`${window.Shopify.routes.root}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from endpoint: ${endpoint}`);
  }

  return response;
}

export async function submitCartData(formData) {
  const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
    body: formData,
    method: "POST",
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });

  if (!response.ok) {
    throw new Error(`Failed to submit form data`);
  }

  return response.json();
}
