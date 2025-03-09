
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, List, Users, Heart, Image, MapPin } from 'lucide-react';
import { TodoList } from './TodoList';
import { WeddingCountdown } from './WeddingCountdown';
import { TrendsList } from './TrendsList';
import { LocationComparison } from './LocationComparison';
import { GuestList } from './GuestList';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Heart },
    { id: 'todos', label: 'To-Dos', icon: List },
    { id: 'trends', label: 'Trends', icon: Image },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'guests', label: 'Gäste', icon: Users },
  ];
  
  return (
    <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive 
                ? 'bg-telegram-blue text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export const DashboardView = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'todos':
        return <TodoList />;
      case 'trends':
        return <TrendsList />;
      case 'locations':
        return <LocationComparison />;
      case 'guests':
        return <GuestList />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="dashboard-card">
                <div className="dashboard-card-title">
                  <Clock className="w-5 h-5 text-telegram-blue" />
                  Countdown
                </div>
                <WeddingCountdown date="2025-07-19" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="dashboard-card">
                <div className="dashboard-card-title">
                  <List className="w-5 h-5 text-telegram-blue" />
                  To-Do Übersicht
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Erledigt</span>
                      <span className="text-sm font-medium">8/20</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Nächste Aufgaben:</p>
                    <div className="todo-item">
                      <div className="w-5 h-5 rounded-full border-2 border-telegram-blue flex-shrink-0"></div>
                      <div>
                        <p className="text-sm">Fotografen buchen</p>
                        <p className="text-xs text-gray-500">Bis 31. März</p>
                      </div>
                    </div>
                    <div className="todo-item">
                      <div className="w-5 h-5 rounded-full border-2 border-telegram-blue flex-shrink-0"></div>
                      <div>
                        <p className="text-sm">Save-the-Date Karten versenden</p>
                        <p className="text-xs text-gray-500">Bis 15. April</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 text-sm text-telegram-blue font-medium hover:bg-gray-50 rounded-md transition-colors">
                    Alle To-Dos anzeigen
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="md:col-span-2"
            >
              <div className="dashboard-card">
                <div className="dashboard-card-title">
                  <Image className="w-5 h-5 text-telegram-blue" />
                  Aktuelle Trends
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="trend-card hover-scale">
                    <div className="h-32 bg-gray-200 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                        alt="Rustikale Blumenarrangements" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs bg-secondary/50 text-secondary-foreground py-1 px-2 rounded-full inline-block mb-1">
                        Dekoration
                      </div>
                      <h4 className="text-sm font-medium">Rustikale Blumenarrangements</h4>
                    </div>
                  </div>
                  
                  <div className="trend-card hover-scale">
                    <div className="h-32 bg-gray-200 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                        alt="Lichterketten & Kerzen" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs bg-secondary/50 text-secondary-foreground py-1 px-2 rounded-full inline-block mb-1">
                        Beleuchtung
                      </div>
                      <h4 className="text-sm font-medium">Lichterketten & Kerzen</h4>
                    </div>
                  </div>
                  
                  <div className="trend-card hover-scale">
                    <div className="h-32 bg-gray-200 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                        alt="Holztische & Vintage-Stühle" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs bg-secondary/50 text-secondary-foreground py-1 px-2 rounded-full inline-block mb-1">
                        Möbel
                      </div>
                      <h4 className="text-sm font-medium">Holztische & Vintage-Stühle</h4>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="md:col-span-2"
            >
              <div className="dashboard-card">
                <div className="dashboard-card-title">
                  <MapPin className="w-5 h-5 text-telegram-blue" />
                  Favorisierte Locations
                </div>
                <div className="space-y-4">
                  <div className="location-card overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 h-32 bg-gray-200">
                        <img 
                          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                          alt="Gut Kaltenbrunn" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 sm:w-2/3">
                        <h4 className="font-medium mb-1">Gut Kaltenbrunn</h4>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-xs bg-gray-100 py-1 px-2 rounded-full">Rustikal</span>
                          <span className="text-xs bg-gray-100 py-1 px-2 rounded-full">Seezugang</span>
                          <span className="text-xs bg-gray-100 py-1 px-2 rounded-full">Garten</span>
                        </div>
                        <p className="text-sm text-gray-600">Ab 120€ pro Person • Bis zu 120 Gäste</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 text-sm text-telegram-blue font-medium hover:bg-gray-50 rounded-md transition-colors">
                    Alle Locations vergleichen
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="md:col-span-2"
            >
              <div className="dashboard-card">
                <div className="dashboard-card-title">
                  <Users className="w-5 h-5 text-telegram-blue" />
                  Gästeliste
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-telegram-blue">45</p>
                        <p className="text-xs text-gray-500">Eingeladen</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-green-500">32</p>
                        <p className="text-xs text-gray-500">Zugesagt</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-red-500">8</p>
                        <p className="text-xs text-gray-500">Abgesagt</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xl font-bold">80</p>
                      <p className="text-xs text-gray-500">Geplant</p>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 text-sm text-telegram-blue font-medium hover:bg-gray-50 rounded-md transition-colors">
                    Gästeliste verwalten
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        );
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <motion.h1 
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-playfair text-telegram-blue">Nina & Christoph</span>
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hochzeit am 19. Juli 2025
        </motion.p>
      </div>
      
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {renderContent()}
    </div>
  );
};
