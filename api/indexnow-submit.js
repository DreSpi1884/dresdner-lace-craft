export default async function handler(_request, response) {
  const params = new URLSearchParams({
    url: "https://www.dresdnerspitzen.de/404",
    key: "8887fd65c85020f9cce012312ed241ac",
    keyLocation: "https://www.dresdnerspitzen.de/8887fd65c85020f9cce012312ed241ac.txt",
  });

  const result = await fetch(`https://www.bing.com/indexnow?${params.toString()}`);
  const body = await result.text();

  response.status(result.status).send(body || `IndexNow response: ${result.status}`);
}
