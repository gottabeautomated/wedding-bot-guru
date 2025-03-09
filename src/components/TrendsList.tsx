
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface Trend {
  id: number;
  title: string;
  category: string;
  imageSrc: string;
  description: string;
}

export const TrendsList = () => {
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const trends: Trend[] = [
    {
      id: 1,
      title: 'Rustikale Blumenarrangements',
      category: 'Dekoration',
      imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      description: 'Wildblumen und Feldblumen in rustikalen Gefäßen wie Glasgläsern, Holzkisten oder alten Teekannen arrangiert. Diese naturbelassene Deko passt perfekt zum rustikalen Stil und kann mit Elementen wie Jute, Spitze oder Holz ergänzt werden.'
    },
    {
      id: 2,
      title: 'Lichterketten & Kerzen',
      category: 'Beleuchtung',
      imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      description: 'Warmweiße Lichterketten, die unter einem transparenten Zeltdach oder zwischen Bäumen gespannt werden, schaffen eine magische Atmosphäre. Ergänzt durch rustikale Kerzenhalter aus Holz oder Metall für ein gemütliches Ambiente am Abend.'
    },
    {
      id: 3,
      title: 'Holztische & Vintage-Stühle',
      category: 'Möbel',
      imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      description: 'Massive Holztische ohne Tischdecken, eventuell mit Tischläufern aus Leinen oder Jute. Dazu verschiedene Vintage-Stühle für einen bewusst zusammengewürfelten, aber harmonischen Look. Besonders beliebt sind derzeit lange Tafeln statt vieler kleiner Tische.'
    },
    {
      id: 4,
      title: 'Personalisierte Namenskarten',
      category: 'Papeterie',
      imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      description: 'Handgeschriebene Namenskarten auf hochwertigem Naturpapier mit individuellen Details wie kleinen Olivenzweigen, Lavendelstängeln oder personifizierten Illustrationen verleihen jedem Platz eine besondere Note.'
    },
    {
      id: 5,
      title: 'Food Trucks & Live-Cooking',
      category: 'Catering',
      imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      description: 'Anstelle eines klassischen Menüs erfreuen sich Food Trucks oder Live-Cooking-Stationen großer Beliebtheit. Von Holzofen-Pizza über Taco-Bars bis hin zu Grill-Stationen – interaktives Essen schafft Gesprächsstoff und Unterhaltung.'
    },
    {
      id: 6,
      title: 'Natürliche Hochzeitstorten',
      category: 'Catering',
      imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      description: 'Semi-Naked-Cakes mit sichtbaren Schichten, dezent mit frischen Beeren, essbaren Blüten und Kräutern dekoriert, passen perfekt zum rustikalen Stil. Alternativ sind auch kleine Desserttische mit verschiedenen Kuchen und Süßigkeiten beliebt.'
    },
  ];
  
  const categories = [...new Set(trends.map(trend => trend.category))];
  
  const filteredTrends = selectedCategory 
    ? trends.filter(trend => trend.category === selectedCategory)
    : trends;
  
  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
            !selectedCategory ? 'bg-telegram-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          Alle Trends
        </button>
        
        {categories.map(category => (
          <button 
            key={category}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              selectedCategory === category ? 'bg-telegram-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Trends grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrends.map((trend) => (
          <motion.div
            key={trend.id}
            className="trend-card hover-scale cursor-pointer"
            onClick={() => setSelectedTrend(trend)}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img 
                src={trend.imageSrc} 
                alt={trend.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <div className="text-xs bg-secondary/50 text-secondary-foreground py-1 px-2 rounded-full inline-block mb-2">
                {trend.category}
              </div>
              <h3 className="text-base font-medium mb-2">{trend.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{trend.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Trend detail modal */}
      {selectedTrend && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative h-64 bg-gray-200">
              <img 
                src={selectedTrend.imageSrc} 
                alt={selectedTrend.title} 
                className="w-full h-full object-cover"
              />
              <button 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setSelectedTrend(null)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-sm bg-secondary/50 text-secondary-foreground py-1 px-3 rounded-full inline-block mb-2">
                {selectedTrend.category}
              </div>
              <h2 className="text-2xl font-bold mb-4">{selectedTrend.title}</h2>
              <p className="text-gray-600 mb-6">{selectedTrend.description}</p>
              
              <button className="flex items-center gap-2 py-2 px-4 bg-telegram-blue text-white rounded-lg hover:bg-telegram-blue/90 transition-colors">
                <Heart className="w-4 h-4" />
                Zu Favoriten hinzufügen
              </button>
            </div>
            
            <div className="border-t p-6">
              <h3 className="text-lg font-medium mb-4">Ähnliche Trends</h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {trends
                  .filter(t => t.category === selectedTrend.category && t.id !== selectedTrend.id)
                  .map(trend => (
                    <div 
                      key={trend.id}
                      className="flex-shrink-0 w-40 trend-card cursor-pointer"
                      onClick={() => setSelectedTrend(trend)}
                    >
                      <div className="h-24 bg-gray-200">
                        <img 
                          src={trend.imageSrc} 
                          alt={trend.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <h4 className="text-sm font-medium line-clamp-2">{trend.title}</h4>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
