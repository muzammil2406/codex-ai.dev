'use client';
import { useState } from 'react';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { UserNav } from './user-nav';
import { LoginDialog } from './login-dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthButton() {
  const { user, isUserLoading } = useUser();
  const [isLoginOpen, setLoginOpen] = useState(false);

  if (isUserLoading) {
    return <Skeleton className="h-10 w-24" />;
  }

  return user ? (
    <UserNav user={user} />
  ) : (
    <>
      <Button onClick={() => setLoginOpen(true)}>Login</Button>
      <LoginDialog isOpen={isLoginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
