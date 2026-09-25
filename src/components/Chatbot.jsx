import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bot,
  MessageSquare,
  X,
  Send,
  Sparkles,
  RefreshCw,
  Download,
  ExternalLink,
  Code2,
  Briefcase,
  Award,
  BookOpen,
  Mail,
  User,
  ChevronDown,
  Minimize2,
  Maximize2,
  HelpCircle,
  FolderGit2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { downloadResumeFile } from '../services/api';

const QUICK_PROMPTS = [
  {
    id: 'experience',
    icon: Briefcase,
    label: 'Experience & Background',
    prompt: "Tell me about Dipronil's work experience and background.",
  },
  {
    id: 'skills',
    icon: Code2,
    label: 'Tech Stack & Skills',
    prompt: "What technologies, frameworks, and tools does Dipronil specialize in?",
  },
  {
    id: 'projects',
    icon: FolderGit2,
    label: 'Featured Projects',
    prompt: "Show me some of Dipronil's best projects and live applications.",
  },
  {
    id: 'resume',
    icon: Download,
    label: 'Download Resume / CV',
    prompt: "How can I download Dipronil's resume?",
  },
  {
    id: 'certificates',
    icon: Award,
    label: 'Certifications',
    prompt: "What verified certifications and credentials does he have?",
  },
  {
    id: 'contact',
    icon: Mail,
    label: 'Contact & Hiring',
    prompt: "How can I contact Dipronil for job opportunities or freelance work?",
  },
];

export default function Chatbot() {
  const { personal = {}, stats = [], projects = [], certificates = [], mediumPosts = [] } = usePortfolio();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const initialWelcome = {
    id: 'msg-welcome',
    sender: 'bot',
    text: `👋 Hi there! I'm **Dipronil's AI Assistant**. I can answer questions about his experience, technical skills, engineering projects, blogs, or help you download his CV.`,
    options: [
      { text: '💼 View Experience', action: 'ask_experience' },
      { text: '🚀 Explore Projects', action: 'ask_projects' },
      { text: '📄 Download CV', action: 'ask_resume' },
      { text: '📬 Get in Touch', action: 'ask_contact' },
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState([initialWelcome]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping]);

  // Generate intelligent response based on input query
  const generateBotReply = (query) => {
    const q = query.toLowerCase();

    // 1. Resume / CV
    if (q.includes('resume') || q.includes('cv') || q.includes('curriculum') || q.includes('download')) {
      return {
        text: `📄 You can download **Dipronil Das's latest CV / Resume (PDF)** directly. It includes his 5+ years of full stack engineering experience, major production projects, and verified credentials.`,
        actionType: 'resume_download',
        links: [
          { label: 'Download CV (PDF)', action: 'download_cv', icon: Download },
        ],
      };
    }

    // 2. Experience / Background
    if (q.includes('experience') || q.includes('background') || q.includes('work') || q.includes('company') || q.includes('role') || q.includes('years')) {
      return {
        text: `💼 **Dipronil Das** has over **5+ years of software engineering experience** developing scalable full stack web applications, high-throughput microservices, REST APIs, and modern React interfaces. He is currently based in Kolkata, India and available for full-time opportunities.`,
        links: [
          { label: 'View Experience Section', href: '/#experience', isSection: true },
          { label: 'Let’s Talk / Hire', href: '/#contact', isSection: true },
        ],
      };
    }

    // 3. Skills / Tech Stack
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('react') || q.includes('node') || q.includes('javascript') || q.includes('python') || q.includes('sql') || q.includes('docker')) {
      return {
        text: `⚡ **Dipronil's Core Tech Stack:**\n\n• **Frontend:** React 19, Vite, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3\n• **Backend:** Node.js, Express.js, RESTful APIs, Microservices, Python\n• **Databases:** MySQL, MongoDB, PostgreSQL, Redis, Qdrant\n• **DevOps & Cloud:** Docker, Linux, Nginx, Git, CI/CD`,
        links: [
          { label: 'Explore Skills Matrix', href: '/#skills', isSection: true },
          { label: 'View Projects', href: '/projects', isRoute: true },
        ],
      };
    }

    // 4. Projects
    if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('app') || q.includes('valet') || q.includes('rag') || q.includes('ecommerce')) {
      const topProjects = projects.slice(0, 3).map((p) => p.title).join(', ') || 'check-valet, Multi-Vendor Baby Products, RAG AI System';
      return {
        text: `🚀 Dipronil has engineered **18+ production-ready systems**, including:\n\n• **check-valet**: Smart real-time valet parking SaaS\n• **Multi-Vendor E-Commerce**: Scalable online store\n• **RAG AI System**: Vector search & document retrieval platform\n• **AI SQL Assistant**: Natural language to SQL compiler`,
        links: [
          { label: 'View All 18+ Projects', href: '/projects', isRoute: true },
        ],
      };
    }

    // 5. Contact / Hire / Email
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('phone') || q.includes('message')) {
      return {
        text: `📬 **Get in touch with Dipronil:**\n\n• **Email:** ${personal.email || 'dipronildas.net@gmail.com'}\n• **Phone:** ${personal.phone || '+919804633142'}\n• **Location:** ${personal.location || 'Kolkata, India'}\n• **Status:** ${personal.availability || 'Available for Full-time Roles'}\n\nYou can also send a direct message via the portfolio contact form!`,
        links: [
          { label: 'Open Contact Form', href: '/#contact', isSection: true },
        ],
      };
    }

    // 6. Certifications
    if (q.includes('cert') || q.includes('certificate') || q.includes('coursera') || q.includes('udemy') || q.includes('credential')) {
      return {
        text: `🎓 Dipronil holds **verified certifications** including:\n\n• **Node.js 3rd Edition** (Udemy)\n• **MERN Stack 2024** (Udemy)\n• **Angular & Node.js MEAN Stack** (Udemy)\n• **Python for Everybody Specialization** (Coursera / Univ. of Michigan)`,
        links: [
          { label: 'View All Certificates', href: '/certificates', isRoute: true },
        ],
      };
    }

    // 7. Blogs / Articles
    if (q.includes('blog') || q.includes('article') || q.includes('medium') || q.includes('writing') || q.includes('read')) {
      return {
        text: `✍️ Dipronil regularly publishes technical in-depth articles on Medium covering **System Design, Rate Limiting (Token Bucket), Database Optimization, and Microservices**.`,
        links: [
          { label: 'Explore Technical Blogs', href: '/blogs', isRoute: true },
          { label: 'Medium Profile', href: personal.medium || 'https://medium.com/@dipronildas.net', external: true },
        ],
      };
    }

    // Default Fallback
    return {
      text: `Thanks for asking! As Dipronil's assistant, I can guide you through his **projects**, **tech skills**, **work experience**, **certifications**, or provide his **contact info** & **resume**. What would you like to explore?`,
      options: [
        { text: '🚀 View Projects', action: 'ask_projects' },
        { text: '📄 Download CV', action: 'ask_resume' },
        { text: '⚡ Skills & Stack', action: 'ask_skills' },
        { text: '📬 Contact Info', action: 'ask_contact' },
      ],
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const reply = generateBotReply(query);
      const botMsg = {
        id: `msg-reply-${Date.now()}`,
        sender: 'bot',
        text: reply.text,
        links: reply.links,
        options: reply.options,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleOptionClick = (action) => {
    if (action === 'ask_experience') {
      handleSendMessage('Tell me about your work experience and background.');
    } else if (action === 'ask_skills') {
      handleSendMessage('What technical skills and technologies do you use?');
    } else if (action === 'ask_projects') {
      handleSendMessage('Show me your featured projects.');
    } else if (action === 'ask_resume') {
      handleSendMessage('How can I download your resume/CV?');
    } else if (action === 'ask_contact') {
      handleSendMessage('How can I get in touch with you?');
    } else if (action === 'ask_certs') {
      handleSendMessage('What certifications do you have?');
    }
  };

  const handleLinkClick = async (link) => {
    if (link.action === 'download_cv') {
      await downloadResumeFile();
      return;
    }

    if (link.external) {
      window.open(link.href, '_blank', 'noopener,noreferrer');
      return;
    }

    if (link.isRoute) {
      navigate(link.href);
      setIsOpen(false);
      return;
    }

    if (link.isSection) {
      if (window.location.pathname === '/') {
        const id = link.href.replace('/#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(link.href);
      }
      setIsOpen(false);
    }
  };

  const handleClearChat = () => {
    setMessages([initialWelcome]);
  };

  return (
    <>
      {/* Floating Chatbot Bubble Trigger */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && hasUnread && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-2xl backdrop-blur-md cursor-pointer animate-bounce hover:border-cyan-400 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Chat with AI Assistant</span>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className="relative group p-4 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
          ) : (
            <>
              <Bot className="w-6 h-6 animate-pulse" />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] transition-all duration-300 ${
            isMinimized ? 'bottom-20 h-16' : 'bottom-20 h-[580px] max-h-[82vh]'
          }`}
        >
          <div className="w-full h-full flex flex-col rounded-3xl bg-[#0a0f1d]/95 backdrop-blur-2xl border border-slate-800 shadow-2xl shadow-black/60 overflow-hidden">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white">Dipronil AI</h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Assistant
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-medium">Online • Ask anything</p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={handleClearChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? 'Expand chat' : 'Minimize chat'}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body (Hidden when minimized) */}
            {!isMinimized && (
              <>
                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-slate-800">
                  {messages.map((msg) => {
                    const isBot = msg.sender === 'bot';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}
                      >
                        {isBot && (
                          <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}

                        <div className={`max-w-[85%] space-y-2.5`}>
                          <div
                            className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                              isBot
                                ? 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-sm'
                                : 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-tr-sm shadow-md shadow-cyan-600/20'
                            }`}
                          >
                            {msg.text}
                          </div>

                          {/* Quick Interactive Links / Actions */}
                          {msg.links && msg.links.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {msg.links.map((link, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleLinkClick(link)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-all cursor-pointer shadow-sm active:scale-95"
                                >
                                  {link.icon ? (
                                    <link.icon className="w-3.5 h-3.5" />
                                  ) : (
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  )}
                                  <span>{link.label}</span>
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Suggested follow-up options */}
                          {msg.options && msg.options.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {msg.options.map((opt, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleOptionClick(opt.action)}
                                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors cursor-pointer"
                                >
                                  {opt.text}
                                </button>
                              ))}
                            </div>
                          )}

                          <span className="block text-[10px] text-slate-400 px-1">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-2.5 justify-start animate-in fade-in duration-150">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-400 text-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-100" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-200" />
                        <span className="pl-1 text-slate-400">Thinking...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Carousel */}
                <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/40 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
                  {QUICK_PROMPTS.map((qp) => {
                    const IconComp = qp.icon;
                    return (
                      <button
                        key={qp.id}
                        onClick={() => handleSendMessage(qp.prompt)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900/90 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 whitespace-nowrap transition-colors shrink-0 cursor-pointer"
                      >
                        <IconComp className="w-3 h-3 text-cyan-400" />
                        <span>{qp.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Input Toolbar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 border-t border-slate-800/80 bg-slate-900/70 flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask AI about Dipronil (e.g. skills, projects)..."
                    className="flex-1 px-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white disabled:opacity-40 transition-all cursor-pointer shadow-md shadow-cyan-500/20 shrink-0"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}
