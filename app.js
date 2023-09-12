const express = require('express');
const app = express();
const axios = require('axios');
const CORS = require('cors');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.json());

app.use(CORS());

app.post('/generate-joke', async (req, res) => {
    try {
        const joke = await generateContent('joke', req.body.keyword);
        res.json({ joke });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});

app.post('/generate-story', async (req, res) => {
    try {
        const story = await generateContent('story', req.body.keyword);
        res.json({ story });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});

app.post('/generate-quote', async (req, res) => {
    try {
        const quote = await generateContent('quote', req.body.keyword);
        res.json({ quote });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});

app.post('/generate-shayari', async (req, res) => {
    try {
        const shayari = await generateContent('shayari', req.body.keyword);
        res.json({ shayari });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});

async function generateContent(type, keyword) {
    let prompt = '';

    switch (type) {
        case 'joke':
            prompt = `Tell me a joke about ${keyword}`;
            break;
        case 'story':
            prompt = `Tell me a story about ${keyword}`;
            break;
        case 'quote':
            prompt = `Give me a informative quote related to ${keyword}  keep it max to 100 tokens`;
            break;
        case 'shayari':
            prompt = `Shayari about ${keyword} keep it max to 100 tokens`;
            break;
        default:
            prompt = `Generate something about ${keyword}`;
    }

    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
        prompt,
        max_tokens: 100, // Adjust the number of tokens as needed,
        temperature: 0.7,
        n: 1

    }, {
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data.choices[0].text;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});