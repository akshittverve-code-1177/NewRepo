import { useState } from "react";

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const handleFetchData = async () => {
        if (!prompt.trim()) return;

        const userMessage = { role: 'user', text: prompt };
        setMessages((prev) => [...prev, userMessage]);
        setPrompt('');
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://192.168.1.170:8000/api/ai/ask`,
                // const response = await fetch(`http://127.0.0.1:8000/api/ai/ask`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "question": prompt
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // console.log(data);
            const messageText = data.answer || data.response || JSON.stringify(data);
            const aiMessage = { role: 'ai', text: messageText };
            setMessages((prev) => [...prev, aiMessage]);

        } catch (err) {
            setError(err.message);
            setMessages((prev) => [...prev, { role: 'error', text: `Error: ${err.message}` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col h-screen bg-[#212121] text-neutral-200 font-sans antialiased">
                <header className="flex items-center justify-between px-4 h-14 border-b border-neutral-800 bg-[#212121]/80 backdrop-blur sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-neutral-800 font-medium text-sm transition-colors cursor-pointer">
                            <span>Chato</span>
                            <span className="text-neutral-400">2.0</span>
                            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-xs">U</div>
                    </div>
                </header>

                <main className="ChatContainer flex-1 overflow-y-auto px-4 py-6">
                    <div className="max-w-3xl mx-auto flex flex-col gap-6">

                        {messages.length === 0 && (
                            <div className="text-center text-neutral-500 my-auto pt-20">
                                Start a conversation by typing a message below.
                            </div>
                        )}

                        {messages.map((msg, index) => {
                            if (msg.role === 'user') {
                                return (
                                    <div key={index} className="flex flex-row-reverse items-end gap-3 mb-4">                                   
                                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 font-semibold text-xs shadow-sm">
                                            U
                                        </div>

                                        <div className="flex flex-col items-end max-w-[75%] gap-1">                                      
                                            <div className="bg-[#2f2f2f] text-neutral-100 px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-sm wrap-break-word w-full">
                                                {msg.text}
                                                <span className="block text-[10px] text-neutral-400 text-right select-none">
                                                    {hours}:{minutes}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else if (msg.role === 'ai') {
                                return (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-[#10a37f] flex items-center justify-center text-white shrink-0">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        </div>
                                        <div className="flex flex-col gap-2 max-w-[80%] text-sm leading-relaxed text-neutral-200 pt-1">
                                            <p>{msg.text}</p>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index} className="text-xs text-red-400 bg-red-950/20 p-2 rounded-xl max-w-fit mx-auto border border-red-900/30">
                                        {msg.text}
                                    </div>
                                );
                            }
                        })}

                        {loading && (
                            <div className="flex items-start gap-4 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-[#10a37f] flex items-center justify-center text-white shrink-0 animate-pulse">...</div>
                                <div className="text-sm pt-1 text-neutral-400 italic">Thinking...</div>
                            </div>
                        )}

                    </div>
                </main>

                <footer className="p-4 bg-linear-to-t from-[#212121] via-[#212121] to-transparent">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-[#2f2f2f] border border-neutral-700/50 rounded-3xl p-3 shadow-lg focus-within:border-neutral-500 transition-all">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleFetchData();
                                    }
                                }}
                                rows="1"
                                placeholder="Message ChatGPT..."
                                className="w-full bg-transparent text-neutral-100 placeholder-neutral-400 text-sm focus:outline-none resize-none px-2 max-h-32"
                            ></textarea>
                            <div className="flex items-center justify-between pt-2 px-1 border-t border-neutral-700/30 mt-2">
                                <div className="flex items-center gap-1 text-neutral-400">
                                    <button className="p-1.5 hover:bg-neutral-700/50 rounded-xl transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                                    </button>
                                </div>
                                <button
                                    onClick={handleFetchData}
                                    disabled={loading || !prompt.trim()}
                                    className={`p-2 rounded-full transition-colors font-medium cursor-pointer ${prompt.trim() ? "bg-white text-black hover:bg-neutral-200" : "bg-neutral-700 text-neutral-500 cursor-not-allowed"
                                        }`}
                                >
                                    <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </button>
                            </div>
                        </div>
                        <div className="text-center text-[11px] text-neutral-500 mt-2">
                            Chato 2.0 can make mistakes.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
