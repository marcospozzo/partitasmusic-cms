export default async function fetchApi(url) {
  const response = await fetch(url, {
    mode: "cors",
  });
  const json = await response.json();
  return json;
}
