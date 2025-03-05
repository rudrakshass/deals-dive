import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
