import { DashboardStats } from '@/components/dashboard-stats';
import { JobCardsTable } from '@/components/job-cards-table';
import { mockStats, mockJobCards, mockQuotes } from '@/lib/mock-data';

export default function Home() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
      <div className='flex items-center justify-between py-6'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100'>
          Dashboard
        </h2>
      </div>
      <DashboardStats
        openJobCards={mockStats.openJobCards}
        awaitingQuotes={mockStats.awaitingQuotes}
        openQuotes={mockStats.openQuotes}
        readyToInvoice={mockStats.readyToInvoice}
      />
      <div className='bg-white dark:bg-gray-800 shadow-sm rounded-lg'>
        <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
            Open Job Cards
          </h3>
        </div>
        <div className='p-6'>
          <JobCardsTable jobCards={mockJobCards} quotes={mockQuotes} />
        </div>
      </div>
    </div>
  );
}
