import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';

interface SalesRecord {
  id: string;
  customer_name: string;
  amount: number;
  sold_at: string;
  description?: string;
}

export function SalesSection() {
  const { user } = useAuth();
  const [sales, setSales] = useState<SalesRecord[]>([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);

  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  useEffect(() => {
    if (user) {
      fetchSales();
      fetchMonthlyStats();
    }
  }, [user]);

  const fetchSales = async () => {
    const { data, error } = await supabase
      .from('sales_records')
      .select('*')
      .eq('rep_id', user?.id)
      .order('sold_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching sales:', error);
      return;
    }

    setSales(data || []);
  };

  const fetchMonthlyStats = async () => {
    const { data, error } = await supabase
      .from('sales_records')
      .select('amount')
      .eq('rep_id', user?.id)
      .gte('sold_at', format(monthStart, 'yyyy-MM-dd'))
      .lte('sold_at', format(monthEnd, 'yyyy-MM-dd'));

    if (error) {
      console.error('Error fetching monthly stats:', error);
      return;
    }

    const total = data?.reduce((sum, record) => sum + Number(record.amount), 0) || 0;
    setMonthlyTotal(total);
    setMonthlyCount(data?.length || 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlyTotal)}</div>
            <p className="text-xs text-muted-foreground">
              {format(monthStart, 'MMM yyyy')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyCount}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Deal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyCount > 0 ? formatCurrency(monthlyTotal / monthlyCount) : '$0'}
            </div>
            <p className="text-xs text-muted-foreground">
              Per deal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            Your latest closed deals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No sales recorded yet. Keep closing those deals!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sales.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-background"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{sale.customer_name}</span>
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(sale.sold_at), 'MMM d, yyyy')}
                      </Badge>
                    </div>
                    {sale.description && (
                      <p className="text-sm text-muted-foreground">
                        {sale.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">
                      {formatCurrency(sale.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}