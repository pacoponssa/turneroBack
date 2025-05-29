// controllers/aiController.js
const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`;

exports.askQuestion = async (req, res) => {
    const { question } = req.body; // Recibimos la pregunta del cuerpo de la petición

    if (!question) {
        return res.status(400).json({ error: 'La pregunta es requerida en el cuerpo de la solicitud.' });
    }

    if (!GOOGLE_API_KEY) {
        console.error('Error: GOOGLE_API_KEY no está configurada.');
        return res.status(500).json({ error: 'Error de configuración del servidor: API Key no encontrada.' });
    }

    try {
        const payload = {
            contents: [
                {
                    parts: [
                        {
                            text: question
                        }
                    ]
                }
            ]
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        console.log("Enviando pregunta a Gemini:", question);
        const response = await axios.post(API_URL, payload, { headers });

        // La respuesta de Gemini puede venir en diferentes formatos,
        // usualmente el texto está en candidates[0].content.parts[0].text
        if (response.data && response.data.candidates && response.data.candidates.length > 0 &&
            response.data.candidates[0].content && response.data.candidates[0].content.parts && response.data.candidates[0].content.parts.length > 0) {
            
            const aiResponse = response.data.candidates[0].content.parts[0].text;
            console.log("Respuesta de Gemini:", aiResponse);
            res.json({
                question: question,
                answer: aiResponse
            });
        } else {
            // Si la respuesta no tiene la estructura esperada (por ejemplo, por filtros de seguridad)
            console.warn("Respuesta de Gemini no contiene el texto esperado o fue bloqueada:", response.data);
            let reason = "La respuesta de la IA no pudo ser procesada.";
            if (response.data && response.data.promptFeedback && response.data.promptFeedback.blockReason) {
                reason = `La solicitud fue bloqueada por: ${response.data.promptFeedback.blockReason}`;
            }
            res.status(500).json({ error: reason, details: response.data });
        }

    } catch (error) {
        console.error('Error al conectar con Google AI:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.error) {
             return res.status(error.response.status || 500).json({
                error: 'Error al procesar la solicitud con Google AI.',
                details: error.response.data.error.message
            });
        }
        res.status(500).json({ error: 'Error interno del servidor al conectar con Google AI.' });
    }
};