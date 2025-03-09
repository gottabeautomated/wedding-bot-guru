
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, MapPin, Users, Euro, CalendarDays, Heart, ExternalLink } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  imageSrc: string;
  description: string;
  basePrice: string;
  pricePerPerson: string;
  beveragePackage: string;
  capacity: string;
  extras: string[];
  rating: number;
  address: string;
  availableDates: string[];
}

export const LocationComparison = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  const locations: Location[] = [
    {
      id: 1,
      name: 'Gut Kaltenbrunn',
      imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      description: 'Historisches Gut mit Seezugang und großem Garten. Die rustikale Scheune bietet Platz für bis zu 120 Gäste und hat einen unvergleichlichen Charme mit Holzbalken und Steinwänden.',
      basePrice: '4.000€',
      pricePerPerson: '120€',
      beveragePackage: '45€ pro Person',
      capacity: 'bis zu 120 Gäste',
      extras: ['Seezugang', 'Große Terrasse', 'Historische Scheune', 'Übernachtungsmöglichkeiten'],
      rating: 4.7,
      address: 'Gut Kaltenbrunn 1-3, 83703 Gmund am Tegernsee',
      availableDates: ['5. Juli 2025', '12. Juli 2025', '19. Juli 2025', '26. Juli 2025']
    },
    {
      id: 2,
      name: 'Schlossgut Oberambach',
      imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      description: 'Malerisches Bio-Hotel mit traumhaftem Blick auf den Starnberger See. Die weitläufige Parkanlage und die eleganten Räumlichkeiten bieten eine perfekte Kulisse für eine romantische Hochzeit.',
      basePrice: '5.500€',
      pricePerPerson: '145€',
      beveragePackage: '55€ pro Person',
      capacity: 'bis zu 100 Gäste',
      extras: ['Bio-Küche', 'Seeblick', 'Wellness-Bereich', 'Luxuriöse Unterkünfte'],
      rating: 4.8,
      address: 'Oberambach 1, 82541 Münsing',
      availableDates: ['5. Juli 2025', '19. Juli 2025']
    },
    {
      id: 3,
      name: 'Gut Sonnenhausen',
      imageSrc: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      description: 'Idyllisch gelegenes Bio-Gut mit weitläufigen Gärten und historischen Gebäuden. Die liebevoll restaurierte Tenne bietet eine authentische Atmosphäre für rustikale Hochzeitsfeiern.',
      basePrice: '3.800€',
      pricePerPerson: '110€',
      beveragePackage: '40€ pro Person',
      capacity: 'bis zu 150 Gäste',
      extras: ['Bio-Landwirtschaft', 'Weitläufige Gärten', 'Historische Tenne', 'Bauernhof-Feeling'],
      rating: 4.5,
      address: 'Sonnenhausen 1, 85625 Glonn',
      availableDates: ['12. Juli 2025', '26. Juli 2025']
    }
  ];
  
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${
              i < fullStars 
                ? 'text-yellow-400 fill-yellow-400' 
                : i === fullStars && hasHalfStar 
                  ? 'text-yellow-400 fill-yellow-400/50' 
                  : 'text-gray-300'
            }`} 
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Location-Vergleich</h2>
        <p className="text-gray-600">Vergleiche die Details unserer Top-Locations für eure rustikale Gartenhochzeit</p>
      </div>
      
      {/* Comparison Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Location</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Grundpreis</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Preis pro Person</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Getränkepauschale</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Kapazität</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Bewertung</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr 
                key={location.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors cursor-pointer`}
                onClick={() => setSelectedLocation(location)}
              >
                <td className="py-4 px-4 border-b">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={location.imageSrc} 
                        alt={location.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{location.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 border-b">{location.basePrice}</td>
                <td className="py-4 px-4 border-b">{location.pricePerPerson}</td>
                <td className="py-4 px-4 border-b">{location.beveragePackage}</td>
                <td className="py-4 px-4 border-b">{location.capacity}</td>
                <td className="py-4 px-4 border-b">{renderRating(location.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {locations.map((location) => (
          <motion.div
            key={location.id}
            className="location-card hover-scale cursor-pointer"
            onClick={() => setSelectedLocation(location)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-48 bg-gray-200 relative">
              <img 
                src={location.imageSrc} 
                alt={location.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center">
                {renderRating(location.rating)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">{location.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="w-3 h-3 mr-1" />
                <span>München Umgebung</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{location.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {location.extras.slice(0, 3).map((extra, index) => (
                  <span key={index} className="text-xs bg-gray-100 py-1 px-2 rounded-full">
                    {extra}
                  </span>
                ))}
                {location.extras.length > 3 && (
                  <span className="text-xs bg-gray-100 py-1 px-2 rounded-full">
                    +{location.extras.length - 3}
                  </span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span>Ab {location.pricePerPerson}/Person</span>
                <span className="font-medium text-telegram-blue">Details</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Location detail modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative h-64 bg-gray-200">
              <img 
                src={selectedLocation.imageSrc} 
                alt={selectedLocation.name} 
                className="w-full h-full object-cover"
              />
              <button 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setSelectedLocation(null)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedLocation.name}</h2>
                  <div className="flex items-center mt-1 text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{selectedLocation.address}</span>
                  </div>
                </div>
                <div>{renderRating(selectedLocation.rating)}</div>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedLocation.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Details</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Euro className="w-4 h-4 mr-2 text-telegram-blue" />
                      <span className="text-gray-700">Grundpreis: </span>
                      <span className="ml-1 font-medium">{selectedLocation.basePrice}</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Euro className="w-4 h-4 mr-2 text-telegram-blue" />
                      <span className="text-gray-700">Preis pro Person: </span>
                      <span className="ml-1 font-medium">{selectedLocation.pricePerPerson}</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Euro className="w-4 h-4 mr-2 text-telegram-blue" />
                      <span className="text-gray-700">Getränkepauschale: </span>
                      <span className="ml-1 font-medium">{selectedLocation.beveragePackage}</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-telegram-blue" />
                      <span className="text-gray-700">Kapazität: </span>
                      <span className="ml-1 font-medium">{selectedLocation.capacity}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Besonderheiten</h3>
                  <ul className="space-y-2">
                    {selectedLocation.extras.map((extra, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        <span>{extra}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Verfügbare Termine im Juli 2025</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.availableDates.map((date, index) => (
                    <div 
                      key={index}
                      className="px-3 py-2 border border-gray-200 rounded-md text-sm flex items-center gap-2"
                    >
                      <CalendarDays className="w-4 h-4 text-telegram-blue" />
                      {date}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 py-2 px-4 bg-telegram-blue text-white rounded-lg hover:bg-telegram-blue/90 transition-colors">
                  <Heart className="w-4 h-4" />
                  Zu Favoriten hinzufügen
                </button>
                
                <button className="flex items-center gap-2 py-2 px-4 border border-telegram-blue text-telegram-blue rounded-lg hover:bg-telegram-blue/10 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Website besuchen
                </button>
                
                <button className="flex items-center gap-2 py-2 px-4 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  <CalendarDays className="w-4 h-4" />
                  Termin anfragen
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
