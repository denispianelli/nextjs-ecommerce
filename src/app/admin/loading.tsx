import { Loader2 } from 'lucide-react';

export default function loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh_-_81px)]">
      <Loader2 className="size-16 animate-spin" />
    </div>
  );
}
