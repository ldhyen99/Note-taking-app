import { server } from '../config'

const API_URL = `${server}/api/notes/`

async function fetchAPIGET(query, { variables } = {}) {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     
    })
  
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }
    return json.data
}

async function fetchAPIPOST(query, { variables } = {}) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
  
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getListNote() {
    const data = await fetchAPIGET()
    return data
}