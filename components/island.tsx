import React, { useMemo, useState } from 'react'

const Island = ({ children = <></> }) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                // bg image
                backgroundImage: `url('/images/island.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '90vh',
                position: 'relative',

            }}
            className=''>
            <Coco onClick={() => setOpen((v) => !v)} />
            <CocoAssistant open={open} onClose={() => setOpen(false)} />
            {children}

        </div>
    )
}

export default Island;




const FAQS = [
    {
        id: "inbox-1",
        category: "Coco Inbox",
        question: "What is Coco Inbox?",
        answer:
            "Coco Inbox is an email and communication management platform that centralizes messages, automates frequent responses, and offers an assistant to quickly find information.",
    },
    {
        id: "inbox-2",
        category: "Coco Inbox",
        question: "How do I find an important email?",
        answer:
            "Use the search bar (keywords, sender, date). You can also filter by labels: 'invoice', 'support', 'order'. The assistant offers automatic suggestions based on keywords.",
    },
    {
        id: "inbox-3",
        category: "Coco Inbox",
        question: "Can I create automatic replies?",
        answer:
            "Yes — Coco offers 'Templates' that you can launch manually or trigger via rules (e.g., if subject contains 'payment' -> send 'Payment received' template).",
    },

    // Emails
    {
        id: "email-1",
        category: "Email",
        question: "How do I set up my email address on Coco?",
        answer:
            "In Settings > Accounts > Add account: enter your email and password or configure via IMAP/SMTP. Coco guides the rest automatically.",
    },
    {
        id: "email-2",
        category: "Email",
        question: "Does Coco support IMAP/SMTP and OAuth?",
        answer:
            "Yes: IMAP/SMTP for most services, and OAuth for Gmail/Microsoft to avoid password entry.",
    },

    // eSIM
    {
        id: "esim-1",
        category: "eSIM",
        question: "What is a 'ready to use' eSIM?",
        answer:
            "A 'ready to use' eSIM is a digital mobile profile that you can activate without a physical card. Coco can manage eSIMs to send QR codes/activate profiles via the interface.",
    },
    {
        id: "esim-2",
        category: "eSIM",
        question: "How do I activate an eSIM via Coco?",
        answer:
            "You receive a QR code or an activation link. On your phone: Settings > Add a mobile plan > Scan the QR code. Coco provides the QR and step-by-step instructions.",
    },
    {
        id: "esim-3",
        category: "eSIM",
        question: "Can I transfer a physical line to an eSIM?",
        answer:
            "This depends on your operator. Coco provides the standard steps and necessary documents to request the transfer (portability).",
    },

    // Security
    {
        id: "sec-1",
        category: "Security",
        question: "Are emails secure on Coco?",
        answer:
            "Coco encrypts emails at rest and in transit (TLS). For sensitive exchanges, enable S/MIME or PGP client-side if you want end-to-end encryption.",
    },
    {
        id: "sec-2",
        category: "Security",
        question: "How does Coco protect eSIMs and QR codes?",
        answer:
            "Activation QR codes are delivered via secure links and expire after use. Access to eSIM management is restricted by access control and audit.",
    },
    {
        id: "sec-3",
        category: "Security",
        question: "What to do in case of account compromise?",
        answer:
            "Immediately revoke active sessions in Settings > Security, change the password, enable two-factor authentication (2FA), and contact support for an audit.",
    },
];





function Coco({ onClick }) {
    return (
        <div
            className="absolute bottom-6 left-6 flex items-center justify-center z-50 cursor-pointer"
            onClick={onClick}
        >
            <style>{`
        @keyframes pulse-blue {
          0% { transform: scale(0.6); opacity: 0.7; }
          50% { transform: scale(1); opacity: 0.25; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>

            {/* Pulsing blue circle */}
            <div
                style={{
                    position: 'absolute',
                    width: 260,
                    height: 260,
                    borderRadius: '50%',
                    background: 'rgba(59,130,246,0.35)',
                    zIndex: 0,
                    animation: 'pulse-blue 2s infinite',
                }}
            />

            {/* Coco image */}
            <div
                style={{
                    backgroundImage: `url('/images/coco.gif')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    zIndex: 10,
                    position: 'relative',
                }}
            />
        </div>
    );
}





function CocoAssistant({ open, onClose }) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return FAQS;
        return FAQS.filter(
            (f) =>
                f.question.toLowerCase().includes(q) ||
                f.answer.toLowerCase().includes(q) ||
                f.category.toLowerCase().includes(q)
        );
    }, [query]);

    return (
        <div
            className={`absolute bottom-40 left-6 transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
            style={{ width: 360, zIndex: 50 }}
        >
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                    <div>
                        <h3 className="font-semibold text-gray-800">Coco Assistant</h3>
                        <p className="text-xs text-gray-500">FAQ & aide rapide</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <div className="p-4 border-b border-gray-100">
                    <input
                        placeholder="Rechercher (eSIM, sécurité...)"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-300 focus:outline-none"
                    />
                </div>

                <div className="max-h-64 overflow-auto px-4 py-3">
                    {selected ? (
                        <div>
                            <p className="font-semibold text-gray-800 mb-1">{selected.question}</p>
                            <p className="text-sm text-gray-700 mb-3">{selected.answer}</p>
                            <button
                                className="text-xs px-2 py-1 rounded bg-gray-100"
                                onClick={() => setSelected(null)}
                            >
                                ← Back
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {results.map((f) => (
                                <li
                                    key={f.id}
                                    className="cursor-pointer p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-100"
                                    onClick={() => setSelected(f)}
                                >
                                    <div className="font-medium text-gray-800 text-sm">{f.question}</div>
                                    <div className="text-xs text-gray-500">{f.category}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
