'use client';

import { useState } from 'react';
import { JobCardsTable } from '@/components/job-cards-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  CalendarIcon,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { format } from 'date-fns';
import { mockJobCards, mockQuotes } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export default function JobCardsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isNewJobCardModalOpen, setIsNewJobCardModalOpen] = useState(false);

  // New job card form state
  const [jobCardNumber, setJobCardNumber] = useState(
    `JC${String(mockJobCards.length + 1).padStart(3, '0')}`
  );
  const [quoteNumber, setQuoteNumber] = useState('');
  const [customerReference, setCustomerReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [requestQuote, setRequestQuote] = useState(false);
  const [jobDate, setJobDate] = useState<Date>(new Date());
  const [fromLocation, setFromLocation] = useState('');

  // Collapsible sections state - using a single state to manage all
  const [openCollapsible, setOpenCollapsible] = useState<
    'vehicle' | 'instructions' | 'parts' | 'engineChecks' | null
  >(null);
  const isVehicleOpen = openCollapsible === 'vehicle';
  const isInstructionsOpen = openCollapsible === 'instructions';
  const isPartsOpen = openCollapsible === 'parts';
  const isEngineChecksOpen = openCollapsible === 'engineChecks';

  // Vehicle information state
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleReg, setVehicleReg] = useState('');
  const [vehicleVIN, setVehicleVIN] = useState('');

  // Instructions state
  const [instructions, setInstructions] = useState('');

  const [instructions2, setInstructions2] = useState('');
  const [instructions3, setInstructions3] = useState('');
  const [instructions4, setInstructions4] = useState('');
  // Parts required state
  const [partsRequired, setPartsRequired] = useState('');

  // Engine checks state
  const [engineChecks, setEngineChecks] = useState('');

  // Get unique clients and statuses for filters
  const uniqueClients = Array.from(
    new Set(mockJobCards.map((card) => card.client))
  );
  const uniqueStatuses = Array.from(
    new Set(mockJobCards.map((card) => card.status))
  );

  // Filter job cards based on search and filters
  const filteredJobCards = mockJobCards.filter((jobCard) => {
    const matchesSearch =
      searchQuery === '' ||
      Object.values(jobCard).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesClient = !selectedClient || jobCard.client === selectedClient;
    const matchesStatus = !selectedStatus || jobCard.status === selectedStatus;

    const cardDate = new Date(jobCard.created);
    const matchesDateFrom = !dateFrom || cardDate >= dateFrom;
    const matchesDateTo = !dateTo || cardDate <= dateTo;

    return (
      matchesSearch &&
      matchesClient &&
      matchesStatus &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  // Get accepted quotes for dropdown
  const acceptedQuotes = mockQuotes.filter((quote) => quote.status === 'open');

  const handleCreateJobCard = () => {
    // Here you would handle the creation of a new job card
    console.log({
      jobCardNumber,
      quoteNumber,
      customerReference,
      paymentMethod,
      requestQuote,
      jobDate,
      fromLocation,
      vehicleInfo: {
        make: vehicleMake,
        model: vehicleModel,
        year: vehicleYear,
        registration: vehicleReg,
        vin: vehicleVIN,
      },
      instructions,
      partsRequired,
      engineChecks,
    });

    // Close the modal
    setIsNewJobCardModalOpen(false);

    // Reset form fields
    setJobCardNumber(`JC${String(mockJobCards.length + 1).padStart(3, '0')}`);
    setQuoteNumber('');
    setCustomerReference('');
    setPaymentMethod('CASH');
    setRequestQuote(false);
    setJobDate(new Date());
    setFromLocation('');
    setVehicleMake('');
    setVehicleModel('');
    setVehicleYear('');
    setVehicleReg('');
    setVehicleVIN('');
    setInstructions('');
    setInstructions2('');
    setInstructions3('');
    setInstructions4('');
    setPartsRequired('');
    setEngineChecks('');
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
      <div className='flex items-center justify-between py-6'>
        <h2 className='text-3xl font-bold tracking-tight'>Job Cards</h2>
        <Dialog
          open={isNewJobCardModalOpen}
          onOpenChange={setIsNewJobCardModalOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className='h-4 w-4 mr-2' />
              New Job Card
            </Button>
          </DialogTrigger>
          <DialogContent className='w-[95%] md:w-[95%] lg:w-[80%] max-w-none max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>Create New Job Card</DialogTitle>
            </DialogHeader>
            <div className='py-4 space-y-6'>
              {/* First Row */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <Label htmlFor='jobCardNumber'>Job Card Number</Label>
                  <Input
                    id='jobCardNumber'
                    value={jobCardNumber}
                    onChange={(e) => setJobCardNumber(e.target.value)}
                    disabled
                    className='bg-gray-100'
                  />
                </div>
                <div>
                  <Label htmlFor='quoteNumber'>Quote Number</Label>
                  <Select value={quoteNumber} onValueChange={setQuoteNumber}>
                    <SelectTrigger id='quoteNumber'>
                      <SelectValue placeholder='Select Quote' />
                    </SelectTrigger>
                    <SelectContent>
                      {acceptedQuotes.map((quote) => (
                        <SelectItem key={quote.id} value={quote.id}>
                          {quote.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor='customerReference'>Customer Reference</Label>
                  <Input
                    id='customerReference'
                    value={customerReference}
                    onChange={(e) => setCustomerReference(e.target.value)}
                    placeholder='Enter reference'
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-end'>
                <div>
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className='flex flex-wrap space-x-4'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='CASH' id='cash' />
                      <Label htmlFor='cash'>CASH</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='ACC' id='acc' />
                      <Label htmlFor='acc'>ACC</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='C/CARD' id='ccard' />
                      <Label htmlFor='ccard'>C/CARD</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Button
                    variant={requestQuote ? 'default' : 'outline'}
                    onClick={() => setRequestQuote(!requestQuote)}
                    className='w-full'
                  >
                    {requestQuote ? 'QUOTE REQUESTED' : 'REQUEST QUOTE'}
                  </Button>
                </div>
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-start text-left'
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {jobDate ? format(jobDate, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={jobDate}
                        onSelect={(date) => date && setJobDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Third Row - FROM */}
              <div>
                <Label htmlFor='fromLocation'>FROM</Label>
                <Input
                  id='fromLocation'
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  placeholder='Enter location'
                  className='w-full'
                />
              </div>

              {/* Fourth Row - Vehicle Information (Collapsible) */}
              <Collapsible
                open={isVehicleOpen}
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    setOpenCollapsible('vehicle');
                  } else {
                    setOpenCollapsible(null);
                  }
                }}
                className='border rounded-md'
              >
                <CollapsibleTrigger className='flex items-center justify-between w-full p-4 font-medium text-left'>
                  <span>Vehicle Information</span>
                  {isVehicleOpen ? (
                    <ChevronUp className='h-4 w-4' />
                  ) : (
                    <ChevronDown className='h-4 w-4' />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className='p-4 pt-0 space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='vehicleMake'>Make</Label>
                      <Input
                        id='vehicleMake'
                        value={vehicleMake}
                        onChange={(e) => setVehicleMake(e.target.value)}
                        placeholder='Enter make'
                      />
                    </div>
                    <div>
                      <Label htmlFor='vehicleModel'>Model</Label>
                      <Input
                        id='vehicleModel'
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        placeholder='Enter model'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <Label htmlFor='vehicleYear'>Year</Label>
                      <Input
                        id='vehicleYear'
                        value={vehicleYear}
                        onChange={(e) => setVehicleYear(e.target.value)}
                        placeholder='Enter year'
                      />
                    </div>
                    <div>
                      <Label htmlFor='vehicleReg'>Registration</Label>
                      <Input
                        id='vehicleReg'
                        value={vehicleReg}
                        onChange={(e) => setVehicleReg(e.target.value)}
                        placeholder='Enter registration'
                      />
                    </div>
                    <div>
                      <Label htmlFor='vehicleVIN'>VIN</Label>
                      <Input
                        id='vehicleVIN'
                        value={vehicleVIN}
                        onChange={(e) => setVehicleVIN(e.target.value)}
                        placeholder='Enter VIN'
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Fifth Row - Instructions (Collapsible) */}
              <Collapsible
                open={isInstructionsOpen}
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    setOpenCollapsible('instructions');
                  } else {
                    setOpenCollapsible(null);
                  }
                }}
                className='border rounded-md'
              >
                <CollapsibleTrigger className='flex items-center justify-between w-full p-4 font-medium text-left'>
                  <span>Instructions</span>
                  {isInstructionsOpen ? (
                    <ChevronUp className='h-4 w-4' />
                  ) : (
                    <ChevronDown className='h-4 w-4' />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className='p-4 pt-0'>
                  <div className='space-y-4'>
                    <Textarea
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder='Enter detailed instructions'
                      className='min-h-[100px]'
                    />
                    <Textarea
                      value={instructions2}
                      onChange={(e) => setInstructions2(e.target.value)}
                      placeholder='Enter detailed instructions'
                      className='min-h-[100px]'
                    />
                    <Textarea
                      value={instructions3}
                      onChange={(e) => setInstructions3(e.target.value)}
                      placeholder='Enter detailed instructions'
                      className='min-h-[100px]'
                    />
                    <Textarea
                      value={instructions4}
                      onChange={(e) => setInstructions4(e.target.value)}
                      placeholder='Enter detailed instructions'
                      className='min-h-[100px]'
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Sixth Row - Parts Required (Collapsible) */}
              <Collapsible
                open={isPartsOpen}
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    setOpenCollapsible('parts');
                  } else {
                    setOpenCollapsible(null);
                  }
                }}
                className='border rounded-md'
              >
                <CollapsibleTrigger className='flex items-center justify-between w-full p-4 font-medium text-left'>
                  <span>Parts Required</span>
                  {isPartsOpen ? (
                    <ChevronUp className='h-4 w-4' />
                  ) : (
                    <ChevronDown className='h-4 w-4' />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className='p-4 pt-0'>
                  <Textarea
                    value={partsRequired}
                    onChange={(e) => setPartsRequired(e.target.value)}
                    placeholder='List parts required'
                    className='min-h-[100px]'
                  />
                </CollapsibleContent>
              </Collapsible>

              {/* Seventh Row - Engine Checks (Collapsible) */}
              <Collapsible
                open={openCollapsible === 'engineChecks'}
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    setOpenCollapsible('engineChecks');
                  } else if (openCollapsible === 'engineChecks') {
                    setOpenCollapsible(null);
                  }
                }}
                className='border rounded-md'
              >
                <CollapsibleTrigger className='flex items-center justify-between w-full p-4 font-medium text-left'>
                  <span>Engine Checks</span>
                  {isEngineChecksOpen ? (
                    <ChevronUp className='h-4 w-4' />
                  ) : (
                    <ChevronDown className='h-4 w-4' />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className='p-4 pt-0'>
                  <Textarea
                    value={engineChecks}
                    onChange={(e) => setEngineChecks(e.target.value)}
                    placeholder='Enter engine check details'
                    className='min-h-[100px]'
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
            <DialogFooter className='sm:justify-end'>
              <Button
                variant='outline'
                onClick={() => setIsNewJobCardModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateJobCard}>Create Job Card</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_200px_200px_200px_200px] items-end'>
        <div className='relative'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
          <Input
            placeholder='Search job cards...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-9'
          />
        </div>

        <Select
          value={selectedClient || undefined}
          onValueChange={setSelectedClient}
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter by Client' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Clients</SelectItem>
            {uniqueClients.map((client) => (
              <SelectItem key={client} value={client}>
                {client}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedStatus || undefined}
          onValueChange={setSelectedStatus}
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter by Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            {uniqueStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='justify-start text-left font-normal'
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {dateFrom ? format(dateFrom, 'PPP') : 'From Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={dateFrom}
              onSelect={setDateFrom}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='justify-start text-left font-normal'
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {dateTo ? format(dateTo, 'PPP') : 'To Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={dateTo}
              onSelect={setDateTo}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <JobCardsTable
        key='job-cards-table'
        jobCards={filteredJobCards}
        quotes={mockQuotes}
      />
    </div>
  );
}
