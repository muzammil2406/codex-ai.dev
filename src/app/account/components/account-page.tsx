'use client';

import { useUser } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { LoginDialog } from '@/components/auth/login-dialog';
import { useState } from 'react';

export default function AccountPage() {
  const { user, isUserLoading } = useUser();
  const [isLoginOpen, setLoginOpen] = useState(false);

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  };

  if (isUserLoading) {
    return (
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">My Account</CardTitle>
            <CardDescription>View and manage your account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-2xl text-center">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Access Denied</CardTitle>
            <CardDescription>You must be logged in to view this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLoginOpen(true)}>Login</Button>
            <LoginDialog isOpen={isLoginOpen} onOpenChange={setLoginOpen} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">My Account</CardTitle>
          <CardDescription>View and manage your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
              <AvatarFallback className="text-2xl">{getInitials(user.displayName)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.displayName || 'Anonymous User'}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Subscription</h3>
            <p className="text-muted-foreground">You are currently on the <span className="font-semibold text-primary">Free</span> plan.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">User ID</h3>
            <p className="text-sm text-muted-foreground font-code">{user.uid}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
