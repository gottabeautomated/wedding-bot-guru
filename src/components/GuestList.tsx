
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, Plus, UserPlus, Mail, Phone, CheckCircle, XCircle, Edit, Trash } from 'lucide-react';

interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'invited' | 'confirmed' | 'declined' | 'pending';
  group: string;
  dietaryRestrictions: string;
  notes: string;
}

export const GuestList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  
  // Example guest data
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: 1,
      name: 'Anna & Michael Schmidt',
      email: 'anna.schmidt@example.com',
      phone: '+49 151 1234567',
      status: 'confirmed',
      group: 'Familie Braut',
      dietaryRestrictions: 'Vegetarisch',
      notes: 'Kommen mit 2 Kindern (4 und 6 Jahre)'
    },
    {
      id: 2,
      name: 'Thomas & Lisa Müller',
      email: 'mueller@example.com',
      phone: '+49 176 9876543',
      status: 'invited',
      group: 'Freunde Bräutigam',
      dietaryRestrictions: '',
      notes: ''
    },
    {
      id: 3,
      name: 'Sarah Weber',
      email: 'sarah.weber@example.com',
      phone: '+49 162 4567890',
      status: 'declined',
      group: 'Arbeitskollegen',
      dietaryRestrictions: 'Laktoseintoleranz',
      notes: 'Hat leider einen wichtigen Termin an dem Tag'
    },
    {
      id: 4,
      name: 'Familie Becker',
      email: 'becker@example.com',
      phone: '+49 177 3334444',
      status: 'confirmed',
      group: 'Familie Bräutigam',
      dietaryRestrictions: 'Glutenfrei (Julia)',
      notes: '4 Personen'
    },
    {
      id: 5,
      name: 'Julia & Markus Hoffmann',
      email: 'hoffmann@example.com',
      phone: '+49 175 5556666',
      status: 'invited',
      group: 'Freunde gemeinsam',
      dietaryRestrictions: '',
      notes: ''
    }
  ]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-600';
      case 'declined':
        return 'bg-red-100 text-red-600';
      case 'invited':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'declined':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };
  
  const statusLabels: Record<string, string> = {
    'invited': 'Eingeladen',
    'confirmed': 'Zugesagt',
    'declined': 'Abgesagt',
    'pending': 'Ausstehend'
  };
  
  const filteredGuests = guests.filter(guest => {
    // Apply name search
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guest.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = selectedStatus === 'all' || guest.status === selectedStatus;
    
    // Apply group filter
    const matchesGroup = selectedGroup === 'all' || guest.group === selectedGroup;
    
    return matchesSearch && matchesStatus && matchesGroup;
  });
  
  // Calculate totals
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(g => g.status === 'confirmed').length;
  const declinedGuests = guests.filter(g => g.status === 'declined').length;
  const pendingGuests = guests.filter(g => g.status === 'invited' || g.status === 'pending').length;
  
  // Extract unique groups for the filter
  const groups = ['all', ...new Set(guests.map(g => g.group))];
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Gästeliste</h2>
        <p className="text-gray-600">Verwalte alle Gäste und ihren RSVP-Status</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <motion.div 
          className="bg-white rounded-lg shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-500 text-sm mb-1">Gesamt</p>
          <p className="text-2xl font-bold">{totalGuests}</p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-lg shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-gray-500 text-sm mb-1">Zugesagt</p>
          <p className="text-2xl font-bold text-green-600">{confirmedGuests}</p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-lg shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-gray-500 text-sm mb-1">Abgesagt</p>
          <p className="text-2xl font-bold text-red-600">{declinedGuests}</p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-lg shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <p className="text-gray-500 text-sm mb-1">Ausstehend</p>
          <p className="text-2xl font-bold text-blue-600">{pendingGuests}</p>
        </motion.div>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Suche nach Namen oder Email..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-telegram-blue"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <button 
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={18} />
            Filter
            <ChevronDown size={16} className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {filterOpen && (
            <motion.div 
              className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-10 w-60"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-3 border-b">
                <p className="font-medium mb-2">Status</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      checked={selectedStatus === 'all'} 
                      onChange={() => setSelectedStatus('all')} 
                    />
                    <span>Alle</span>
                  </label>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <label key={value} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        checked={selectedStatus === value} 
                        onChange={() => setSelectedStatus(value)} 
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="p-3">
                <p className="font-medium mb-2">Gruppe</p>
                <div className="space-y-2">
                  {groups.map(group => (
                    <label key={group} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="group" 
                        checked={selectedGroup === group} 
                        onChange={() => setSelectedGroup(group)} 
                      />
                      <span>{group === 'all' ? 'Alle' : group}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-telegram-blue text-white rounded-lg hover:bg-telegram-blue/90 ml-auto">
          <Plus size={18} />
          Gast hinzufügen
        </button>
      </div>
      
      {/* Guest list */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gast
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kontakt
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gruppe
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notizen
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGuests.map((guest, index) => (
              <motion.tr 
                key={guest.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-telegram-blue/10 rounded-full flex items-center justify-center">
                      <UserPlus className="h-5 w-5 text-telegram-blue" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                      {guest.dietaryRestrictions && (
                        <div className="text-xs text-gray-500">Diät: {guest.dietaryRestrictions}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {guest.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {guest.phone}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(guest.status)}`}>
                    {getStatusIcon(guest.status)}
                    <span className={getStatusIcon(guest.status) ? "ml-1" : ""}>
                      {statusLabels[guest.status]}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {guest.group}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">
                    {guest.notes || "-"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button className="text-telegram-blue hover:text-telegram-blue/80">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            
            {filteredGuests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  <p>Keine passenden Gäste gefunden</p>
                  <p className="text-sm mt-1">Versuche, die Suchkriterien anzupassen</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
