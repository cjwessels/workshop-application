'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FileCheck, Calculator } from 'lucide-react';

interface StatsProps {
  openJobCards: number;
  openQuotes: number;
  awaitingQuotes: number;
  readyToInvoice: number;
}

export function DashboardStats({
  openJobCards,
  openQuotes,
  awaitingQuotes,
  readyToInvoice,
}: StatsProps) {
  return (
    <div className='grid gap-6 md:grid-cols-4'>
      <Card className='bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
            Open Job Cards
          </CardTitle>
          <FileText className='h-4 w-4 text-blue-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            {openJobCards}
          </div>
        </CardContent>
      </Card>
      <Card className='bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
            Awaiting Quotes
          </CardTitle>
          <Calculator className='h-4 w-4 text-red-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            {awaitingQuotes}
          </div>
        </CardContent>
      </Card>
      <Card className='bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
            Open Quotes
          </CardTitle>
          <Calculator className='h-4 w-4 text-green-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            {openQuotes}
          </div>
        </CardContent>
      </Card>
      <Card className='bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-gray-600 dark:text-gray-400'>
            Ready to Invoice
          </CardTitle>
          <FileCheck className='h-4 w-4 text-purple-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            {readyToInvoice}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
