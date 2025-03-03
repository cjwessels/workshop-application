export const mockJobCards = [
  {
    id: 'JC001',
    title: 'Engine overhaul',
    client: 'TechCorp Inc.',
    status: 'open',
    created: '2024-03-20',
    value: 15000,
  },
  {
    id: 'JC002',
    title: 'Block Pressure Test',
    client: 'HomeStyle Motors Ltd.',
    status: 'open',
    created: '2024-03-19',
    value: 25000,
  },
  {
    id: 'JC003',
    title: 'cylinder block resleeving',
    client: 'Gerhard Botha',
    status: 'ready_for_invoice',
    created: '2024-03-18',
    value: 8000,
  },
];

export const mockQuotes = [
  {
    id: 'Q001',
    jobCardId: 'JC001',
    description: 'Initial Quote',
    amount: 15000,
    status: 'open',
    created: '2024-03-20',
  },
  {
    id: 'Q002',
    jobCardId: 'JC001',
    description: 'Revised Quote',
    amount: 16500,
    status: 'open',
    created: '2024-03-21',
  },
  {
    id: 'Q003',
    jobCardId: 'JC002',
    description: 'Initial Quote',
    amount: 25000,
    status: 'open',
    created: '2024-03-19',
  },
  {
    id: 'Q004',
    jobCardId: 'JC002',
    description: 'Accepted Quote',
    amount: 25000,
    status: 'open',
    created: '2024-03-19',
  },
  {
    id: 'Q005',
    jobCardId: 'JC003',
    description: 'Accepted Quote',
    amount: 8000,
    status: 'open',
    created: '2024-03-19',
  },
];

export const mockStats = {
  openJobCards: 2,
  awaitingQuotes: 2,
  openQuotes: 3,
  readyToInvoice: 1,
};
