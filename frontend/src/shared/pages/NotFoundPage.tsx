import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl font-bold text-muted-foreground">404</CardTitle>
          <CardDescription className="text-lg">
            Oops! The page you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link to="/">
            <Button className="w-full">
              Go Back Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}