'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { axiosInstance } from '@/lib/axiosInstance';
import { User } from '@/lib/definitions';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import UserAvatar from './UserAvatar';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

function ProfileAvatar({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: session } = useSession();
  const currentUser = session?.user as User;
  const isCurrentUser = currentUser && currentUser._id === user._id;

  const [open, setOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      try {
        const { accessToken } = session?.user as { accessToken: string };
        const response = await axiosInstance.patch(
          '/api/user/profile-picture',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        toast.success('Profile picture updated successfully');
        setOpen(false);
      } catch (error) {
        toast.error('Error updating profile picture');
        console.error('Error updating profile picture', error);
      }
    }
  };
  if (!isCurrentUser)
    return <UserAvatar user={user} className="h-20 w-20 md:h-36 md:w-36" />;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profilePicture</DialogTitle>
          <DialogDescription>
            Update your profile picture by uploading a new one.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="file" className="text-right"></Label>
          <Image
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : user.profilePicture ?? ''
            }
            alt={user.username}
            className="mx-auto h-40 w-40 rounded-full"
            height={160}
            width={160}
          />

          <Label htmlFor="file" className="text-right"></Label>
          <Input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button
            className="mt-5 w-full"
            type="submit"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </DialogFooter>
        <DialogClose className="postOption w-full border-0 p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileAvatar;
