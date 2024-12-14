import Paper from './shared/Paper';
import Button from './shared/Button';

export default function DocumentPaper() {
  return (
    <Paper>
      <div className="p-[32px] flex gap-4">
        <Button size="large">Open Child Document</Button>
      </div>
    </Paper>
  );
} 