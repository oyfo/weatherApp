module.exports = {
    responseBody1: '{"cod":"200","message":0.0067,"cnt":3,"list":[{"dt":1559466000,"main":{"temp":26.19,"temp_min":23.84,"temp_max":26.19,"pressure":1019.12,"sea_level":1019.12,"grnd_level":1004.59,"humidity":63,"temp_kf":2.35},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":{"all":34},"wind":{"speed":1.92,"deg":330.725},"rain":{"3h":3.312},"sys":{"pod":"d"},"dt_txt":"2019-06-02 09:00:00"},{"dt":1559476800,"main":{"temp":27.69,"temp_min":25.92,"temp_max":27.69,"pressure":1018.48,"sea_level":1018.48,"grnd_level":1003.81,"humidity":51,"temp_kf":1.77},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":27},"wind":{"speed":2.05,"deg":353.035},"rain":{},"sys":{"pod":"d"},"dt_txt":"2019-06-02 12:00:00"},{"dt":1559487600,"main":{"temp":27.54,"temp_min":26.36,"temp_max":27.54,"pressure":1017.74,"sea_level":1017.74,"grnd_level":1002.95,"humidity":50,"temp_kf":1.18},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":3},"wind":{"speed":1.7,"deg":26.172},"sys":{"pod":"d"},"dt_txt":"2019-06-02 15:00:00"}],"city":{"id":3081368,"name":"Wroclaw","coord":{"lat":51.1,"lon":17.0333},"country":"PL","population":9999,"timezone":7200}}',
    responseBody2: '{"cod":"200","message":0.0108,"cnt":3,"list":[{"dt":1559466000,"main":{"temp":24.67,"temp_min":21.34,"temp_max":24.67,"pressure":1009.98,"sea_level":1009.98,"grnd_level":1005.15,"humidity":59,"temp_kf":3.34},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":4.93,"deg":206.633},"sys":{"pod":"d"},"dt_txt":"2019-06-02 09:00:00"},{"dt":1559476800,"main":{"temp":23.33,"temp_min":20.82,"temp_max":23.33,"pressure":1009.74,"sea_level":1009.74,"grnd_level":1005.02,"humidity":61,"temp_kf":2.5},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":5.61,"deg":210.614},"sys":{"pod":"d"},"dt_txt":"2019-06-02 12:00:00"},{"dt":1559487600,"main":{"temp":24.33,"temp_min":22.66,"temp_max":24.33,"pressure":1009.37,"sea_level":1009.37,"grnd_level":1004.36,"humidity":52,"temp_kf":1.67},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":79},"wind":{"speed":7.4,"deg":216.504},"sys":{"pod":"d"},"dt_txt":"2019-06-02 15:00:00"}],"city":{"id":2643743,"name":"London","coord":{"lat":51.5073,"lon":-0.1277},"country":"GB","population":1000000,"timezone":3600}}',
    responseBody3: '{"cod":"404","message":0.0108,"cnt":3,"list":[{"dt":1559466000,"main":{"temp":24.67,"temp_min":21.34,"temp_max":24.67,"pressure":1009.98,"sea_level":1009.98,"grnd_level":1005.15,"humidity":59,"temp_kf":3.34},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":4.93,"deg":206.633},"sys":{"pod":"d"},"dt_txt":"2019-06-02 09:00:00"},{"dt":1559476800,"main":{"temp":23.33,"temp_min":20.82,"temp_max":23.33,"pressure":1009.74,"sea_level":1009.74,"grnd_level":1005.02,"humidity":61,"temp_kf":2.5},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":5.61,"deg":210.614},"sys":{"pod":"d"},"dt_txt":"2019-06-02 12:00:00"},{"dt":1559487600,"main":{"temp":24.33,"temp_min":22.66,"temp_max":24.33,"pressure":1009.37,"sea_level":1009.37,"grnd_level":1004.36,"humidity":52,"temp_kf":1.67},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":79},"wind":{"speed":7.4,"deg":216.504},"sys":{"pod":"d"},"dt_txt":"2019-06-02 15:00:00"}],"city":{"id":2643743,"name":"London","coord":{"lat":51.5073,"lon":-0.1277},"country":"GB","population":1000000,"timezone":3600}}',
    forecast: {
        Wroclaw:
        [{
            date: '2019-06-02 09:00:00',
            temp: 26.19,
            description: 'moderate rain',
        },
        {
            date: '2019-06-02 12:00:00',
            temp: 27.69,
            description: 'scattered clouds',
        },
        {
            date: '2019-06-02 15:00:00',
            temp: 27.54,
            description: 'clear sky',
        }],
        London:
        [{
            date: '2019-06-02 09:00:00',
            temp: 24.67,
            description: 'overcast clouds',
        },
        {
            date: '2019-06-02 12:00:00',
            temp: 23.33,
            description: 'overcast clouds',
        },
        {
            date: '2019-06-02 15:00:00',
            temp: 24.33,
            description: 'broken clouds',
        }],
    },
};
