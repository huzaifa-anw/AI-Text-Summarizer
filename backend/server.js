import express from 'express'
import 'dotenv/config'
import { InferenceClient } from "@huggingface/inference";
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

app.get('/', (req, res) => {
    return res.send('welcome!');
})

app.post('/summary', async (req, res) => {
    const { textToSummarize } = req.body;
    if (!textToSummarize) return res.status(401).json({success: 'false', message: "textToSummarize input field is required"});

    try {
        const output = await hf.summarization({
            model: "facebook/bart-large-cnn",
            inputs: textToSummarize,
            provider: "hf-inference",
        });
        console.log(output);
        return res.status(200).json({success: true, summary: output.summary_text}); 
    } catch (error) {
        console.dir(error);
        res.status(200).json({success: 'false', message: 'something went wrong'})
    }

})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})