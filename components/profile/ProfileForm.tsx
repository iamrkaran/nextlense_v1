'use client';

import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';

import { User as UserType } from '@/lib/definitions';
import { UserUpdateSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import ProfileAvatar from './ProfileAvatar';
import UserAvatar from './UserAvatar';
import { useSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/axiosInstance';

function ProfileForm({ profile }: { profile: UserType }) {
  const { data: session } = useSession();
  const updateProfile = async (values: z.infer<typeof UserUpdateSchema>) => {
    const { accessToken } = session?.user as { accessToken: string };
    try {
      await axiosInstance.patch(`/api/user/profile`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return { message: 'Profile updated successfully' };
    } catch (error) {
      return { message: 'An error occurred' };
    }
  };
  const form = useForm<z.infer<typeof UserUpdateSchema>>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      bio: profile.bio || '',
      website: profile.website || '',
    },
  });
  const { isDirty, isSubmitting, isValid } = form.formState;

  return (
    <div className="max-w-xl space-y-8 py-10 lg:p-10">
      <div className="flex items-center gap-x-2 md:gap-x-5">
        <ProfileAvatar user={profile}>
          <div className="flex md:w-32 md:justify-end">
            <UserAvatar user={profile} className="h-24 w-24 cursor-pointer" />
          </div>
        </ProfileAvatar>
        <div>
          <p className="font-medium">{profile.username}</p>
          <ProfileAvatar user={profile}>
            <p className="cursor-pointer text-sm font-bold text-blue-500 hover:text-white">
              Change profile photo
            </p>
          </ProfileAvatar>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            const { message } = await updateProfile(values);
            toast(message);
          })}
          className="grid gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-left">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-left">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-left">
                    Website
                  </FormLabel>
                  <FormControl aria-disabled>
                    <Input placeholder="Website" {...field} />
                  </FormControl>
                </div>

                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-left">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </div>
                <FormDescription className="text-xs md:ml-24">
                  {field.value?.length} / 150
                </FormDescription>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="md:ml-24"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ProfileForm;
