
import React, { useState } from 'react';
import { TelegramChatView } from '@/components/TelegramChatView';
import { DashboardView } from '@/components/DashboardView';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function Index() {
  const [viewMode, setViewMode] = useState<'telegram' | 'dashboard'>('telegram');

  return (
    <div className="container py-8">
      <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as 'telegram' | 'dashboard')}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 font-playfair">
            <span className="text-telegram-blue">Weddingplanner</span>-Agent
          </h1>
          <p className="text-gray-600 mb-6">KI-gestützter Hochzeitsplaner über Telegram</p>
          
          <TabsList className="inline-flex">
            <TabsTrigger value="telegram">Telegram Chat</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="telegram" className="flex justify-center">
          <TelegramChatView />
        </TabsContent>
        
        <TabsContent value="dashboard">
          <DashboardView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
