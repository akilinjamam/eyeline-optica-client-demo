/* eslint-disable @typescript-eslint/no-explicit-any */


export async function getFrame(query: Record<string, any>) {

  const mergedQuery = query // always include type

  const params = new URLSearchParams(mergedQuery).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products?${params}`,
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}lens?${params}`, {
      next: {revalidate: 120},
    });

  if (!res.ok) throw new Error("Failed to fetch lens");

  return res.json();
}
export async function getcontactLens(query:Record<string,string>) {
  const mergedQuery = query // always include type

  const params = new URLSearchParams(mergedQuery).toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}contact-lens?${params}`, {
      next: {revalidate: 120},
    });

  if (!res.ok) throw new Error("Failed to fetch lens");

  
  return res.json();
}
export async function getAccessory(query:Record<string,string>) {
  const mergedQuery = query // always include type

  const params = new URLSearchParams(mergedQuery).toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}accessory/get-accessories?${params}`, {
      next: {revalidate: 120},
    });

  if (!res.ok) throw new Error("Failed to fetch accessory");

  
  return res.json();
}
export async function getBlog(query:Record<string,string>) {
  const mergedQuery = query // always include type

  const params = new URLSearchParams(mergedQuery).toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}blog?${params}`, {
      next: {revalidate: 120},
    });

  if (!res.ok) throw new Error("Failed to fetch accessory");

  
  return res.json();
}