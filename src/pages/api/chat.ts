import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: import.meta.env.GEMINI_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const messages = body.messages;

        // The first message is always the system prompt coming from the client
        const systemInstruction = messages[0].content;

        // Map the remaining messages to Gemini's format
        const history = messages.slice(1).map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: history,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            },
        });

        return new Response(
            JSON.stringify({
                message: response.text,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error("Gemini Error:", error);
        return new Response(
            JSON.stringify({
                error: 'Failed to generate response',
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
};
