const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {

    try {
    //Handle the case where the domain is not available
    if(!apiDomain) {
        return [];
    }
      const res = await fetch(`${apiDomain}/properties`);
  
      if(!res.ok){
        throw new Error('failed to fecth properties');
      }
      return res.json();
    } catch (error) {
      console.log(error);  
      return [];
    }
  }

  //Fetch single property
  async function fetchProperty(id: string | string[]) {

    try {
    //Handle the case where the domain is not available
    if(!apiDomain) {
        return null;
    }
      console.log(id)
      const res = await fetch(`${apiDomain}/properties/${id}`);
      
      if(!res.ok){
        throw new Error('failed to fecth properties');
      }
      return res.json();
    } catch (error) {
      console.log(error);  
      return null;
    }
  }

  export { fetchProperties, fetchProperty };