import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import type { DuplicateLead } from '@/types/crm';

interface DuplicateLeadModalProps {
  duplicate: DuplicateLead | null;
  onClose: () => void;
}

export function DuplicateLeadModal({ duplicate, onClose }: DuplicateLeadModalProps) {
  if (!duplicate) return null;

  return (
    <Dialog open={!!duplicate} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <DialogTitle>Duplicate Lead Found</DialogTitle>
              <DialogDescription>
                A lead with this phone or email already exists
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <p className="font-medium">{duplicate.name}</p>
          {duplicate.phone && (
            <p className="text-sm text-muted-foreground">Phone: {duplicate.phone}</p>
          )}
          {duplicate.email && (
            <p className="text-sm text-muted-foreground">Email: {duplicate.email}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Added by: {duplicate.created_by_name}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
