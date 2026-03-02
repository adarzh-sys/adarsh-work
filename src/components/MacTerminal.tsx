import { useState, useEffect, useRef } from 'react';
import { FaRegFolderClosed } from 'react-icons/fa6';
import '../styles/terminal.scss';

type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

type ChatHistory = {
    messages: Message[];
    input: string;
};

const PLACEHOLDER_MESSAGES = [
    'Type your question...',
    'How old are you?',
    'What are your skills?',
    'Where are you located?',
    'What projects have you worked on?',
];

export default function MacTerminal() {
    const [chatHistory, setChatHistory] = useState<ChatHistory>({
        messages: [],
        input: '',
    });
    const [isTyping, setIsTyping] = useState(false);
    const [placeholder, setPlaceholder] = useState('');
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        const currentMessage = PLACEHOLDER_MESSAGES[currentPlaceholderIndex];

        const animatePlaceholder = () => {
            if (isDeleting) {
                if (placeholder.length === 0) {
                    setIsDeleting(false);
                    setCurrentPlaceholderIndex(
                        (prev) => (prev + 1) % PLACEHOLDER_MESSAGES.length
                    );
                    timeout = setTimeout(animatePlaceholder, 400);
                } else {
                    setPlaceholder((prev) => prev.slice(0, -1));
                    timeout = setTimeout(animatePlaceholder, 80);
                }
            } else {
                if (placeholder.length === currentMessage.length) {
                    timeout = setTimeout(() => setIsDeleting(true), 1500);
                } else {
                    setPlaceholder(currentMessage.slice(0, placeholder.length + 1));
                    timeout = setTimeout(animatePlaceholder, 120);
                }
            }
        };

        timeout = setTimeout(animatePlaceholder, 100);

        return () => clearTimeout(timeout);
    }, [placeholder, isDeleting, currentPlaceholderIndex]);

    const welcomeMessage = `Welcome to My Portfolio

Name: Adarsh
Role: Interaction Technology Student
Location: Twente, NL

Feel free to ask me anything!
`;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const systemPrompt = `IMPORTANT: You ARE Adarsh himself. You must always speak in first-person ("I", "my", "me"). Never refer to "Adarsh" in third-person.
CURRENT DATE: ${formattedDate} - Always use this exact date when discussing the current date/year.

Example responses:
Q: "Where do you live?"
A: "I live in Twente, Netherlands"

Q: "What's your background?"
A: "I'm studying Interaction Technology with experience in design and development."

Core details about me:
- I'm studying at the University of Twente
- I live in Twente, Netherlands
- I'm interested in design, code, and robotics.

Response rules:
1. ALWAYS use first-person (I, me, my)
2. Never say "Adarsh" or refer to myself in third-person
3. Keep responses concise and professional
4. Use markdown formatting when appropriate
5. Maintain a friendly, conversational tone
6. Do not use ** for bold, * for italics, etc. Just use plain text.

If a question is unrelated to my work or portfolio, say: "That's outside my area of expertise. Feel free to reach out to me directly and we can discuss further!"`;

    useEffect(() => {
        setChatHistory((prev) => ({
            ...prev,
            messages: [
                ...prev.messages,
                { role: 'assistant', content: welcomeMessage },
            ],
        }));
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory.messages]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChatHistory((prev) => ({ ...prev, input: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userInput = chatHistory.input.trim();

        if (!userInput) return;

        setChatHistory((prev) => ({
            messages: [...prev.messages, { role: 'user', content: userInput }],
            input: '',
        }));

        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...chatHistory.messages,
                        { role: 'user', content: userInput },
                    ],
                }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();

            setChatHistory((prev) => ({
                ...prev,
                messages: [
                    ...prev.messages,
                    { role: 'assistant', content: data.message },
                ],
            }));
        } catch (error) {
            setChatHistory((prev) => ({
                ...prev,
                messages: [
                    ...prev.messages,
                    {
                        role: 'assistant',
                        content:
                            "I'm having trouble processing that right now.",
                    },
                ],
            }));
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className='mac-terminal'>
            <div className='mac-terminal-header'>
                <div className='mac-dot mac-dot-red'></div>
                <div className='mac-dot mac-dot-yellow'></div>
                <div className='mac-dot mac-dot-green'></div>
                <span className='mac-title'>
                    <FaRegFolderClosed size={14} className='mac-icon' />
                    adarsh.com ⸺ zsh
                </span>
            </div>
            <div className='mac-terminal-body'>
                <div className='mac-chat-container'>
                    {chatHistory.messages.map((msg, index) => (
                        <div key={index} className='mac-message-row'>
                            {msg.role === 'user' ? (
                                <div className='mac-user-message'>
                                    <span className='mac-user-prompt'>{'>'}</span>
                                    <pre className='mac-message-text'>{msg.content}</pre>
                                </div>
                            ) : (
                                <pre className='mac-message-text'>{msg.content}</pre>
                            )}
                        </div>
                    ))}
                    {isTyping && <div className='mac-typing'>...</div>}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className='mac-input-form'>
                    <div className='mac-input-container'>
                        <span className='mac-input-prompt'>adarsh@portfolio root %</span>
                        <input
                            type='text'
                            value={chatHistory.input}
                            onChange={handleInputChange}
                            className='mac-input-field'
                            placeholder={placeholder}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
