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
import { useNavigate } from 'react-router-dom';

export default function AddMessage() {
  document.title = 'Add a Message';

  const navigate = useNavigate();

  const { toast } = useToast();

  const form = useForm<AddMessageType>({
    resolver: zodResolver(addMessageSchema),
    defaultValues: {
      message:
        JSON.parse(localStorage.getItem('previewMessage') || '{}').message ||
        '',
      from:
        JSON.parse(localStorage.getItem('previewMessage') || '{}').from || '',
    },
  });

  async function onSubmit(data: AddMessageType) {
    const response = await supabase
      .from('Messages')
      .insert(data)
      .select()
      .single();
    if (response.error) {
      alert('An error occurred, please try again');
      return;
    }

    toast({
      title: 'Message added successfully',
      description: 'Your message has been added to the matrix',
    });
    form.reset({
      message: '',
      from: '',
    });
    localStorage.removeItem('previewMessage');
  }

  function handlePreview() {
    const values = form.getValues();
    if (!values.message) {
      alert('Please add a message before previewing');
      return;
    }
    localStorage.setItem('previewMessage', JSON.stringify(values));
    navigate('/addnote/preview');
  }

  return (
    <div className='bg-black text-green-500 min-h-screen flex flex-col justify-center items-center px-12 '>
      <div className='max-w-2xl space-y-6'>
        <Navbar />
        <h2>
          This is a virtual birthday card for David. Write a message below.
          Messages can be anonymous if you'd like, but they are public. you can
          preview your message.
        </h2>
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
            <div className='flex gap-3'>
              <Button
                type='submit'
                className='ring-white bg-green-700 transition-colors hover:bg-green-800 active:bg-green-900'
              >
                Submit
              </Button>
              <Button
                type='button'
                className='ring-white bg-gray-500 transition-colors hover:bg-gray-800 active:bg-gray-900'
                onClick={handlePreview}
              >
                Preview Message
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
