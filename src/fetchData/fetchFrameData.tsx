

export async function getFrame(query: Record<string, string>) {

  const mergedQuery = query // always include type

  const params = new URLSearchParams(mergedQuery).toString();

  const res = await fetch(
    `https://eyeline-optica-server.onrender.com/api/v1/products?${params}`,
    {
      next: {revalidate: 120},
    }
  );

  if (!res.ok) throw new Error("Failed to fetch frames");

  return res.json();
}
export async function getLens(query: Record<string,string>) {
  
    const mergedQuery = query 

  const params = new URLSearchParams(mergedQuery).toString();

  const res = await fetch(`https://eyeline-optica-server.onrender.com/api/v1/lens?${params}`, {
      next: {revalidate: 120},
    });

  if (!res.ok) throw new Error("Failed to fetch lens");

  return res.json();
}
export async function getcontactLens(query:Record<string,string>) {
  const mergedQuery = query // always include type

  const params = new URLSearchParams(mergedQuery).toString();

  const res = await fetch(`https://eyeline-optica-server.onrender.com/api/v1/contact-lens?${params}`, {
      next: {revalidate: 120},
    });

  if (!res.ok) throw new Error("Failed to fetch lens");

  return res.json();
}