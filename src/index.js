const http = require('http');
const axios = require('axios');

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    res.setHeader('Access-Control-Allow-Origin', 'https://elementarybr.org/');
    const response = await axios.get('https://medium.com/elementarybr/latest?format=json')
    console.log(response.status);
    if (!response.data === 200) throw new Error('medium API did not return status 200')
    const json = JSON.parse(response.data.replace('])}while(1);</x>', ''))
    if (!json.success) throw new Error('medium JSON\'s success flag is not true')
    res.end(JSON.stringify(json));
  } catch (e) {
    res.end(JSON.stringify({error: String(e)}))
  }
});

app.listen(3000);
