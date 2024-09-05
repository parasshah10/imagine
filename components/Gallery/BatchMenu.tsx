import { MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';

export default function BatchMenu() {
  return (
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <MoreVertical className="h-4 w-4" />
    </Button>
  );
}
