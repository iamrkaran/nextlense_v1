'use client';

import Error from '@/components/Error';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useMount from '@/hooks/useMount';
import { axiosInstance } from '@/lib/axiosInstance';
import { CreatePost } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

function CreatePage() {
  const pathname = usePathname();
  const isCreatePage = pathname === '/dashboard/create';
  const router = useRouter();
  const mount = useMount();
  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      caption: '',
      location: '',
      status: 'PUBLIC',
    },
  });

  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const createPost = async (values: z.infer<typeof CreatePost>) => {
    // Destructure the user object to get the accessToken
    const { accessToken } = session?.user as { accessToken: string };

    // Initialize a new FormData instance
    const formData = new FormData();

    // Append the file to formData
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    // Append the optional fields to formData only if they are present
    if (values.caption) {
      formData.append('caption', values.caption);
    }
    if (values.location) {
      formData.append('location', values.location);
    }
    if (values.status) {
      formData.append('status', values.status);
    }

    // Make the API request
    const res = await axiosInstance.post(`/api/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    toast.success('Post created successfully');
    console.log(res.data);

    // // Navigate to the new post page
    // router.push(`/dashboard/p/${res.data._id}`);

    return res.data;
  };

  if (!mount) return null;

  return (
    <div>
      <Dialog
        open={isCreatePage}
        onOpenChange={(open) => !open && router.back()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new post</DialogTitle>

            <div className="h-[100px] overflow-hidden rounded-md">
              <AspectRatio ratio={1 / 1} className="relative h-32">
                {selectedFile && (
                  <Image
                    priority
                    src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                    alt="Post preview"
                    fill
                    sizes="100%"
                    className="rounded-md object-cover"
                  />
                )}
              </AspectRatio>
            </div>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                const res = await createPost(values);
                if (res) {
                  return toast.error(<Error res={res} />);
                }
              })}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="caption">Caption</FormLabel>
                    <FormControl>
                      <Input
                        type="caption"
                        id="caption"
                        placeholder="Write a caption..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="location">Location</FormLabel>
                    <FormControl>
                      <Input
                        type="location"
                        id="location"
                        placeholder="Add a location..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <FormControl>
                      <select
                        id="status"
                        {...field}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="PUBLIC">Public</option>
                        <option value="PRIVATE">Private</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
                className="col-span-3"
              />

              <Button type="submit" disabled={!selectedFile}>
                Create Post
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreatePage;
