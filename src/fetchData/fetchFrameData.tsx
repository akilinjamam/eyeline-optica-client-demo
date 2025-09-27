export type TQueryType = "eye glasses" | "sunglasses" | ""

export async function getFrame(query:TQueryType) {
    let modifiedQuery = "";

    if(query === ""){
        modifiedQuery = ""
    }else{
        modifiedQuery = `?type=${query}`
    }

  const res = await fetch(`https://eyeline-optica-server.onrender.com/api/v1/products${modifiedQuery}`, {
    
    next: { tags: ["frames"] },
  });

  if (!res.ok) throw new Error("Failed to fetch frames");

  return res.json();
}
export async function getLens(query:TQueryType) {
    let modifiedQuery = "";

    if(query === ""){
        modifiedQuery = ""
    }else{
        modifiedQuery = `?type=${query}`
    }

  const res = await fetch(`https://eyeline-optica-server.onrender.com/api/v1/lens${modifiedQuery}`, {
    
    next: { tags: ["lens"] },
  });

  if (!res.ok) throw new Error("Failed to fetch lens");

  return res.json();
}
export async function getcontactLens(query:TQueryType) {
    let modifiedQuery = "";

    if(query === ""){
        modifiedQuery = ""
    }else{
        modifiedQuery = `?type=${query}`
    }

  const res = await fetch(`https://eyeline-optica-server.onrender.com/api/v1/contact-lens${modifiedQuery}`, {
    
    next: { tags: ["lens"] },
  });

  if (!res.ok) throw new Error("Failed to fetch lens");

  return res.json();
}