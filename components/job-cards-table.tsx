'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface JobCard {
  id: string;
  title: string;
  client: string;
  status: string;
  created: string;
  value: number;
}

interface Quote {
  id: string;
  jobCardId: string;
  description: string;
  amount: number;
  status: string;
  created: string;
}

interface JobCardsTableProps {
  jobCards: JobCard[];
  quotes: Quote[];
}

function uuidv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

export function JobCardsTable({ jobCards, quotes }: JobCardsTableProps) {
  const [openRow, setOpenRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setOpenRow(openRow === id ? null : id);
  };

  const getRelatedQuotes = (jobCardId: string) => {
    return quotes.filter((quote) => quote.jobCardId === jobCardId);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
      case 'ready_for_invoice':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr className='border-b border-gray-200 dark:border-gray-700'>
            <th className='w-[48px] px-4 py-3 text-left'></th>
            <th className='w-[120px] px-4 py-3 text-left font-medium'>
              Job Card ID
            </th>
            <th className='w-[200px] px-4 py-3 text-left font-medium'>Title</th>
            <th className='w-[180px] px-4 py-3 text-left font-medium'>
              Client
            </th>
            <th className='w-[120px] px-4 py-3 text-left font-medium'>
              Status
            </th>
            <th className='w-[120px] px-4 py-3 text-left font-medium'>
              Created
            </th>
            <th className='w-[120px] px-4 py-3 text-right font-medium'>
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {jobCards.map((jobCard) => (
            <>
              <tr
                key={`row-${jobCard.id}`}
                className='bg-white border-b hover:bg-gray-50'
                onClick={() => toggleRow(jobCard.id)}
              >
                <td className='w-[48px] px-4 py-3'>
                  <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                    {openRow === jobCard.id ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </td>
                <td className='w-[120px] px-4 py-3'>{jobCard.id}</td>
                <td className='w-[200px] px-4 py-3'>{jobCard.title}</td>
                <td className='w-[180px] px-4 py-3'>{jobCard.client}</td>
                <td className='w-[120px] px-4 py-3'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      jobCard.status
                    )}`}
                  >
                    {jobCard.status}
                  </span>
                </td>
                <td className='w-[120px] px-4 py-3'>{jobCard.created}</td>
                <td className='w-[120px] px-4 py-3 text-right'>
                  R{jobCard.value.toLocaleString()}
                </td>
              </tr>

              {openRow === jobCard.id && (
                // <tr key={`quotes-${jobCard.id}`}>
                <tr key={`quotes-${uuidv4()}`}>
                  <td
                    colSpan={7}
                    className='p-0 bg-gray-50 dark:bg-gray-800/50'
                  >
                    <div className='py-4'>
                      <div className='px-4 mb-2'>
                        <h4 className='text-sm font-semibold text-gray-900 dark:text-gray-100'>
                          Related Quotes
                        </h4>
                      </div>
                      <div className='px-4'>
                        <table className='w-full'>
                          <thead>
                            <tr className='border-b border-gray-200 dark:border-gray-700'>
                              <th className='w-[120px] px-4 py-2 text-left font-medium'>
                                Quote ID
                              </th>
                              <th className='px-4 py-2 text-left font-medium'>
                                Description
                              </th>
                              <th className='w-[120px] px-4 py-2 text-left font-medium'>
                                Status
                              </th>
                              <th className='w-[120px] px-4 py-2 text-left font-medium'>
                                Created
                              </th>
                              <th className='w-[120px] px-4 py-2 text-right font-medium'>
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {getRelatedQuotes(jobCard.id).map((quote) => (
                              <tr
                                key={quote.id}
                                className='border-b border-gray-200 dark:border-gray-700'
                              >
                                <td className='w-[120px] px-4 py-2'>
                                  {quote.id}
                                </td>
                                <td className='px-4 py-2'>
                                  {quote.description}
                                </td>
                                <td className='w-[120px] px-4 py-2'>
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                      quote.status
                                    )}`}
                                  >
                                    {quote.status}
                                  </span>
                                </td>
                                <td className='w-[120px] px-4 py-2'>
                                  {quote.created}
                                </td>
                                <td className='w-[120px] px-4 py-2 text-right'>
                                  R{quote.amount.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
