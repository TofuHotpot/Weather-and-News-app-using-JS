async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherApiKey  = 'INSERT YOUR API KEY HERE';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod !== 200) {
            throw new Error(weatherData.message);
        }

        displayWeather(weatherData);
        getNews(); 
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        document.getElementById('weatherResult').textContent = 'Failed to fetch weather data';
    }
}

function displayWeather(data) {
    const { name, main: { temp, humidity }, weather } = data;
    const weatherDescription = weather[0].description;

    document.getElementById('weatherResult').innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${weatherDescription}</p>
        <i class="wi wi-cloud"></i>
    `;
}

async function getNews() {
    const newsApiKey = 'INSERT YOUR API KEY HERE';
    const newsUrl = `https://gnews.io/api/v4/top-headlines?token=${newsApiKey}&lang=en`;

    try {
        const newsResponse = await fetch(newsUrl);
        const newsData = await newsResponse.json();
        if (!newsData.articles) {
            console.error("Failed to fetch news articles:", newsData);
            return; 
        }
        displayNews(newsData.articles);
    } catch (error) {
        console.error("Failed to fetch news:", error);
        document.getElementById('weatherResult').textContent += '\nFailed to fetch news';
    }
}

function displayNews(articles) {
    const newsElement = document.getElementById('newsResult');
    newsElement.innerHTML = ''; 
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'news-article';
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsElement.appendChild(articleElement);
    });
}