const API = 'http://127.0.0.1:5000/'

const apiFetch = async (endpoint, method = 'POST', body = null, headers = {}, modifyBody = true) => {
  if (body)
    body = modifyBody ? JSON.stringify(body) : body

  const request = await fetch(API + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'},
    body
  })

  const string = await request.text()
  const data = string === "" ? {} : JSON.parse(string);
  return {data, request}
}

export default apiFetch

