const express = require('express');
const app = express();
app.use(express.json());
const fetch = require('node-fetch');

app.get('/api/weather', (req,res) => {
    let location = req.query
    const lat = parseFloat(location["lat"]);
    const lon = parseFloat(location["lon"]); 

    const apiUrl = 'https://openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=439d4b804bc8187953eb36d2a8c26a02';

    fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
            const name = data["name"]
            const weatherLike = data["weather"][0]["main"]
			res.send(name+' : '+weatherLike);
		})
		.catch(err => {
			res.redirect('/error');
		});

} );

app.listen(3000, () => {
    console.log('Listening on port 3000')
});