import { Button } from '@/Components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import { AxiosError } from 'axios';
import { shake } from 'radash';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export interface RSVPProps {
    response: Response | false;
}

interface Response {
    name: string;
    persons?: number;
    email?: string;
}

export default function RSVP({ response }: RSVPProps) {
    const form = useForm<Response>({ values: response || undefined});
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
        control
    } = form;
    const persons = watch('persons', 0);

    const onSubmit = useCallback(async (data: Response) => {
        const values = shake(data, (v) => !v);
        try {
            const result = await window.axios.post('/rsvp', values);
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                setError('root', { message: e.response?.data.message });
                Object.keys(e.response?.data.errors).forEach((formKey) => {
                    e.response?.data.errors[formKey].forEach((message: string) => {
                        setError(formKey as keyof Response, { message });
                    });
                })
            }
        }
    }, []);

    return (
        <div className="max-w-[480px] p-8 mx-auto">
            <Form {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <FormField
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your given name or that of your organisation
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="persons"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>№ of persons</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} placeholder="1" />
                                </FormControl>
                                <FormDescription>
                                    The size of your party. Don't forget to count yourself!
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    In case you'd like to receive an update e-mail with all details
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {(persons || 0) > 1 ? 'We\'ll' : 'I\'ll'}
                        {' '}
                        be there!
                    </Button>
                </form>
            </Form>
        </div>
    )
}