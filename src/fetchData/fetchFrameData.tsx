/* eslint-disable @typescript-eslint/no-explicit-any */


export async function getFrame(query: Record<string, any>) {

  const mergedQuery = query // always include type

  const params = new URLSearchParams(mergedQuery).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products?weeklyDeals=false&${params}`,
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}lens?weeklyDeals=false&${params}`, {
      next: {revalidate: 120},
    });

  if (!res.ok) throw new Error("Failed to fetch lens");

  return res.json();
}
export async function getcontactLens(query:Record<string,string>) {
  const mergedQuery = query // always include type

  const params = new URLSearchParams(mergedQuery).toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}contact-lens?weeklyDeals=false&${params}`, {
      next: {revalidate: 120},
    });

  if (!res.ok) throw new Error("Failed to fetch lens");

  
  return res.json();
}
export async function getAccessory(query:Record<string,string>) {
  const mergedQuery = query // always include type

  const params = new URLSearchParams(mergedQuery).toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}accessory/get-accessories?weeklyDeals=false&${params}`, {
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
export async function getWeeklyDeals() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}search/get-deals`, {
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to fetch weeklyDeals");

  return res.json();
}
export async function getBanners() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}banner`, {
      next: {revalidate: 120},
    });
  if (!res.ok) throw new Error("Failed to fetch banner data");

  return res.json();
}


export async function getDoctors() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}doctors/`, {
      next: {revalidate: 120},
    });
  if (!res.ok) throw new Error("Failed to fetch doctors data");

  return res.json();
}
export async function getSlots(id:string) {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}schedule/get-slot/${id}`,{
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to fetch slot data");

  return res.json();
}