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
import { addMessageSchema, AddMessageType } from '@/schemas/addMessageSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import supabase from '@/supabaseConfig';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Navbar from './Navbar';
import { useToast } from '@/hooks/use-toast';

export default function AddMessage() {
  document.title = 'Add a Message';

  const { toast } = useToast();

  const form = useForm<AddMessageType>({
    resolver: zodResolver(addMessageSchema),
    defaultValues: {
      message: '',
      from: '',
    },
  });

  async function onSubmit(data: AddMessageType) {
    console.log(data);
    const response = await supabase
      .from('Messages')
      .insert(data)
      .select()
      .single();
    if (response.error) {
      alert('An error occurred, please try again');
    } else {
      console.log('Message added successfully', response.data);
      toast({
        title: 'Message added successfully',
        description: 'Your message has been added to the matrix',
      });
      form.reset({
        message: '',
        from: '',
      });
    }
  }

  return (
    <div className='bg-black text-green-500 h-screen flex flex-col justify-center items-center px-12 '>
      <div className='max-w-2xl space-y-6'>
        <h2>
          This is a virtual birthday card for David. Write a message below.
          Messages can be anonymous if you'd like. I have to manually add these
          messages to the matrix so it may take time to see it on the homepage.
          However you can preview your message
        </h2>
        <Navbar />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Message <span className='text-lg text-red-600'>*</span>{' '}
                    <span className='invisible'>Required</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder='Add Message' {...field} />
                  </FormControl>
                  <FormDescription>
                    All messages are public and viewable by everyone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='from'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input placeholder='From' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='ring-white bg-green-700 transition-colors hover:bg-green-800 active:bg-green-900'
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
