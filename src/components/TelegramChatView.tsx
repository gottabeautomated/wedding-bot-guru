import React, { useState } from 'react';
import { ChevronLeft, MoreVertical, Send, Image, Paperclip, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { TelegramMessage } from './TelegramMessage';
import { TelegramInlineKeyboard } from './TelegramInlineKeyboard';
interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
  inlineKeyboard?: string[];
  imageSrc?: string;
}
export const TelegramChatView = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    text: "Hallo Nina und Christoph! Ich bin euer Weddingplanner-Agent. Erzählt mir von euren Hochzeitsplänen - habt ihr schon ein Datum oder erste Ideen?",
    sender: 'bot',
    timestamp: '10:02'
  }, {
    id: 2,
    text: "Wir planen unsere Hochzeit für Juli 2025 mit etwa 80 Gästen in München oder Umgebung. Wir mögen es eher rustikal, gerne mit Garten.",
    sender: 'user',
    timestamp: '10:03'
  }, {
    id: 3,
    text: "Vielen Dank für die Infos! Juli 2025 in München mit rustikalem Stil klingt wunderbar. Ich habe ein paar passende Locations für euch gefunden:",
    sender: 'bot',
    timestamp: '10:04'
  }, {
    id: 4,
    text: "Hier sind drei Locations, die zu euren Vorstellungen passen könnten:",
    sender: 'bot',
    timestamp: '10:04',
    imageSrc: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    inlineKeyboard: ["Gut Kaltenbrunn", "Schlossgut Oberambach", "Gut Sonnenhausen"]
  }, {
    id: 5,
    text: "Für welche Location möchtet ihr mehr Details erfahren? Oder soll ich weitere Vorschläge machen?",
    sender: 'bot',
    timestamp: '10:05'
  }, {
    id: 6,
    text: "Gut Kaltenbrunn sieht schön aus. Kannst du uns mehr Infos dazu geben?",
    sender: 'user',
    timestamp: '10:07'
  }, {
    id: 7,
    text: "Hier sind die Details zu Gut Kaltenbrunn:\n\n- Preis: ab 120€ pro Person\n- Kapazität: bis zu 120 Gäste\n- Besonderheiten: Historisches Gut mit Seezugang, großer Garten, rustikale Scheune\n- Verfügbare Termine im Juli 2025: 5., 12., 19., 26.",
    sender: 'bot',
    timestamp: '10:08',
    inlineKeyboard: ["Termin anfragen", "Zur Vergleichsliste", "Weitere Locations"]
  }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages([...messages, newUserMessage]);
    setInputText('');

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      // Check for specific keywords and respond accordingly
      if (inputText.toLowerCase().includes('fotografen') || inputText.toLowerCase().includes('todo')) {
        const newBotMessage: Message = {
          id: messages.length + 2,
          text: "Ich habe 'Fotografen bis Ende März buchen' zu eurer To-Do-Liste hinzugefügt. Hier ist eure aktualisierte Liste:",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        setMessages(prev => [...prev, newBotMessage]);
      } else if (inputText.toLowerCase().includes('trend') || inputText.toLowerCase().includes('idee')) {
        const newBotMessage: Message = {
          id: messages.length + 2,
          text: "Basierend auf eurem rustikalen Stil habe ich diese aktuellen Trends für euch gefunden:",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          imageSrc: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
          inlineKeyboard: ["Tischdekorationen", "Blumenarrangements", "Beleuchtung"]
        };
        setMessages(prev => [...prev, newBotMessage]);
      } else {
        const newBotMessage: Message = {
          id: messages.length + 2,
          text: "Danke für eure Nachricht! Wie kann ich euch bei eurer Hochzeitsplanung weiterhelfen?",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          inlineKeyboard: ["To-Do-Liste", "Trendideen", "Locations", "Budget"]
        };
        setMessages(prev => [...prev, newBotMessage]);
      }
    }, 1500);
  };
  return <div className="w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg border border-gray-200">
      {/* Telegram header */}
      <div className="telegram-header">
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-5 h-5" />
          <div>
            <h3 className="font-medium text-base">HochzeitsImpuls</h3>
            <p className="text-xs text-white/80">zuletzt online um 10:10</p>
          </div>
        </div>
        <MoreVertical className="w-5 h-5" />
      </div>
      
      {/* Chat messages */}
      <div className="telegram-chat-container h-[500px]">
        {messages.map((message, index) => <motion.div key={message.id} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1,
        duration: 0.3
      }}>
            <TelegramMessage text={message.text} sender={message.sender} timestamp={message.timestamp} imageSrc={message.imageSrc} />
            
            {message.inlineKeyboard && <TelegramInlineKeyboard buttons={message.inlineKeyboard} />}
          </motion.div>)}
        
        {isTyping && <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 ml-2">
            <div className="flex gap-1">
              <span className="animate-pulse">●</span>
              <span className="animate-pulse" style={{
            animationDelay: '0.2s'
          }}>●</span>
              <span className="animate-pulse" style={{
            animationDelay: '0.4s'
          }}>●</span>
            </div>
            <span>Weddingplanner-Agent schreibt...</span>
          </div>}
      </div>
      
      {/* Input area */}
      <div className="bg-white border-t border-gray-200 p-3 flex items-center gap-2">
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-telegram-blue transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-telegram-blue transition-colors">
            <Image className="w-5 h-5" />
          </button>
        </div>
        <input type="text" className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-telegram-blue" placeholder="Nachricht schreiben..." value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} />
        <button className="text-telegram-blue" onClick={handleSend}>
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>;
};