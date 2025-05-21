
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useWeb3 } from '@/context/Web3Context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Download, Filter } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

// Mock transaction data
const mockTransactions = [
  {
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    to: '0xabcdef1234567890abcdef1234567890abcdef12',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    value: '0.1',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    status: 'confirmed',
    type: 'sent'
  },
  {
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    to: '0x1234567890abcdef1234567890abcdef12345678',
    from: '0xfedcba0987654321fedcba0987654321fedcba09',
    value: '0.05',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    status: 'confirmed',
    type: 'received'
  },
  {
    hash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    to: '0xfedcba0987654321fedcba0987654321fedcba09',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    value: '0.2',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    status: 'pending',
    type: 'sent'
  },
  {
    hash: '0xaabbccddeeff1122334455667788990011223344556677889900aabbccddeeff',
    to: '0xfedcba0987654321fedcba0987654321fedcba09',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    value: '0.015',
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    status: 'failed',
    type: 'sent'
  },
  {
    hash: '0x1122334455667788990011223344556677889900aabbccddeeff1122334455667',
    to: '0x1234567890abcdef1234567890abcdef12345678',
    from: '0xfedcba0987654321fedcba0987654321fedcba09',
    value: '0.3',
    timestamp: Date.now() - 1000 * 60 * 60 * 72, // 3 days ago
    status: 'confirmed',
    type: 'received'
  }
];

const TransactionHistory = () => {
  const { t } = useLanguage();
  const { account } = useWeb3();
  
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Apply filters
  useEffect(() => {
    let filtered = [...transactions];
    
    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter(tx => new Date(tx.timestamp) >= dateFrom);
    }
    
    if (dateTo) {
      // Add 1 day to include the end date fully
      const endDate = new Date(dateTo);
      endDate.setDate(endDate.getDate() + 1);
      filtered = filtered.filter(tx => new Date(tx.timestamp) <= endDate);
    }
    
    // Amount range filter
    if (minAmount) {
      filtered = filtered.filter(tx => parseFloat(tx.value) >= parseFloat(minAmount));
    }
    
    if (maxAmount) {
      filtered = filtered.filter(tx => parseFloat(tx.value) <= parseFloat(maxAmount));
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }
    
    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(tx => tx.type === typeFilter);
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, dateFrom, dateTo, minAmount, maxAmount, statusFilter, typeFilter]);
  
  // Reset filters
  const handleResetFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setMinAmount('');
    setMaxAmount('');
    setStatusFilter('all');
    setTypeFilter('all');
  };
  
  // Export to PDF (mock function)
  const handleExportPDF = () => {
    alert('Export to PDF functionality would go here!');
    // In a real app, you would use a library like jsPDF to generate a PDF
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };
  
  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 6)}`;
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-900/30 text-green-300';
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-300';
      case 'failed':
        return 'bg-red-900/30 text-red-300';
      default:
        return 'bg-gray-900/30 text-gray-300';
    }
  };
  
  const getTypeClass = (type: string) => {
    switch (type) {
      case 'sent':
        return 'text-red-400';
      case 'received':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };
  
  const getTypeSymbol = (type: string) => {
    return type === 'sent' ? '-' : '+';
  };
  
  return (
    <div className="container mx-auto px-4 pb-20 md:pb-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('transactionHistory')}</h1>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-crypto-accent1/30 text-white hover:bg-crypto-accent1/10"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {t('filters')}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-crypto-accent1/30 text-white hover:bg-crypto-accent1/10"
            onClick={handleExportPDF}
          >
            <Download className="h-4 w-4 mr-2" />
            {t('export')}
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="mb-6 p-4 glass-card rounded-lg">
          <h2 className="text-lg font-medium mb-4">{t('filters')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range Filter */}
            <div className="space-y-2">
              <Label>{t('dateRange')}</Label>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-crypto-card border-crypto-accent1/30"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, 'PP') : 'From'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-crypto-card border-crypto-accent1/30">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-crypto-card border-crypto-accent1/30"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, 'PP') : 'To'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-crypto-card border-crypto-accent1/30">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Amount Range Filter */}
            <div className="space-y-2">
              <Label>{t('amountRange')}</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  className="bg-crypto-card border-crypto-accent1/30"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  className="bg-crypto-card border-crypto-accent1/30"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="space-y-2">
              <Label>{t('status')}</Label>
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="bg-crypto-card border-crypto-accent1/30">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="bg-crypto-card border-crypto-accent1/30">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">{t('pending')}</SelectItem>
                  <SelectItem value="confirmed">{t('confirmed')}</SelectItem>
                  <SelectItem value="failed">{t('failed')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Type Filter */}
            <div className="space-y-2">
              <Label>{t('transactionType')}</Label>
              <Select 
                value={typeFilter} 
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="bg-crypto-card border-crypto-accent1/30">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-crypto-card border-crypto-accent1/30">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-2">
            <Button 
              variant="outline" 
              onClick={handleResetFilters}
              className="border-crypto-accent1/30 text-white hover:bg-crypto-accent1/10"
            >
              {t('clearFilters')}
            </Button>
          </div>
        </div>
      )}
      
      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-crypto-accent1/20">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">{t('date')}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Hash</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">{t('transactionType')}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.hash} className="border-b border-crypto-accent1/10 hover:bg-crypto-accent1/5">
                  <td className="px-4 py-3 text-sm">
                    <div>{formatDate(tx.timestamp)}</div>
                    <div className="text-xs text-gray-400">{formatTime(tx.timestamp)}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <a 
                      href={`https://etherscan.io/tx/${tx.hash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-crypto-accent1 hover:underline"
                    >
                      {truncateHash(tx.hash)}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`capitalize ${getTypeClass(tx.type)}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={getTypeClass(tx.type)}>
                      {getTypeSymbol(tx.type)}{tx.value} ETH
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(tx.status)}`}>
                      {t(tx.status)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-center text-gray-400" colSpan={5}>
                  {t('noTransactions')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
