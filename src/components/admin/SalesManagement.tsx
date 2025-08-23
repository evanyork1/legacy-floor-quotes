import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, DollarSign, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface SalesRecord {
  id: string;
  rep_id: string;
  customer_name: string;
  amount: number;
  sold_at: string;
  description?: string;
  rep?: {
    full_name?: string;
  };
}

interface Profile {
  id: string;
  full_name?: string;
}

export function SalesManagement() {
  const [sales, setSales] = useState<SalesRecord[]>([]);
  const [reps, setReps] = useState<Profile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [selectedRep, setSelectedRep] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [soldAt, setSoldAt] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchSales();
    fetchReps();
  }, []);

  const fetchSales = async () => {
    const { data, error } = await supabase
      .from('sales_records')
      .select(`
        *,
        rep:profiles!sales_records_rep_id_fkey(full_name)
      `)
      .order('sold_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching sales:', error);
      return;
    }

    setSales(data || []);
  };

  const fetchReps = async () => {
    // Get all users with 'rep' role
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        user_roles!inner(role)
      `)
      .eq('user_roles.role', 'rep');

    if (error) {
      console.error('Error fetching reps:', error);
      return;
    }

    setReps(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRep || !customerName.trim() || !amount.trim()) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('sales_records')
        .insert({
          rep_id: selectedRep,
          customer_name: customerName,
          amount: parseFloat(amount),
          sold_at: soldAt,
          description: description.trim() || null,
        });

      if (error) throw error;

      // Reset form
      setSelectedRep('');
      setCustomerName('');
      setAmount('');
      setSoldAt(format(new Date(), 'yyyy-MM-dd'));
      setDescription('');
      setShowForm(false);
      
      fetchSales();

      toast({
        title: 'Success',
        description: 'Sale recorded successfully!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (saleId: string) => {
    if (!confirm('Are you sure you want to delete this sale record?')) return;

    const { error } = await supabase
      .from('sales_records')
      .delete()
      .eq('id', saleId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete sale record',
        variant: 'destructive',
      });
      return;
    }

    fetchSales();
    toast({
      title: 'Success',
      description: 'Sale record deleted',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Add Sale Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Sales Management
              </CardTitle>
              <CardDescription>
                Record sales for your team members
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? 'Cancel' : 'Add Sale'}
            </Button>
          </div>
        </CardHeader>
        
        {showForm && (
          <CardContent className="border-t">
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rep">Sales Rep</Label>
                  <Select value={selectedRep} onValueChange={setSelectedRep}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sales rep" />
                    </SelectTrigger>
                    <SelectContent>
                      {reps.map((rep) => (
                        <SelectItem key={rep.id} value={rep.id}>
                          {rep.full_name || 'Unnamed User'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="amount">Sale Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="soldAt">Sale Date</Label>
                  <Input
                    id="soldAt"
                    type="date"
                    value={soldAt}
                    onChange={(e) => setSoldAt(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details about the sale..."
                  rows={3}
                />
              </div>
              
              <Button type="submit" disabled={loading}>
                {loading ? 'Recording...' : 'Record Sale'}
              </Button>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Sales Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            All recorded sales across your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No sales recorded yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sales Rep</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      {format(new Date(sale.sold_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {sale.rep?.full_name || 'Unnamed User'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {sale.customer_name}
                    </TableCell>
                    <TableCell className="font-semibold text-primary">
                      {formatCurrency(sale.amount)}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {sale.description || '-'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(sale.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}