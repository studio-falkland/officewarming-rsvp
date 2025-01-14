import { useFormContext, useWatch } from 'react-hook-form';
import { Button } from './ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Response } from '@/lib/types';
import { MouseEventHandler, useCallback, useMemo } from 'react';
import { shake } from 'radash';
import { AxiosError } from 'axios';

export default function RSVPForm() {
    const { setError, handleSubmit, setValue } = useFormContext<Response>();
    const persons = useWatch<Response>({ name: 'persons' });
    const parsedPersons = useMemo(() => (
        Number.parseInt(Number.isInteger(persons) ? persons as string : '1')
    ), [persons]);

    const onSubmit = useCallback(async (data: Response) => {
        // Remove any empty values from the response object
        const values = shake(data, (v) => !v);

        try {
            // Attempt to submit the values
            await window.axios.post('/rsvp', values);
        } catch (e: unknown) {
            // GUARD: Handle only AxiosErrors
            if (!(e instanceof AxiosError)) return;

            // Assign the root error message
            setError('root', { message: e.response?.data.message });

            // Loop through all form properties
            Object.keys(e.response?.data.errors).forEach((formKey) => {
                // Loop through all property error messages
                e.response?.data.errors[formKey].forEach((message: string) => {
                    // Set the error message
                    setError(formKey as keyof Response, { message });
                });
            })
        }
    }, []);

    const plusPerson: MouseEventHandler = useCallback((e) => {
        e.preventDefault();
        setValue('persons', parsedPersons + 1);
    }, [parsedPersons]);

    const minusPerson: MouseEventHandler = useCallback((e) => {
        e.preventDefault();
        setValue('persons', Math.max(parsedPersons - 1, 1));
    }, [parsedPersons]);

    return (
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
                        <div className="flex gap-2">
                            <Button type="button" onClick={minusPerson}>-</Button>
                            <FormControl>
                                <Input type="number" {...field} placeholder="1" />
                            </FormControl>
                            <Button type="button" onClick={plusPerson}>+</Button>
                        </div>
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
            <Button type="submit" className="mt-4">
                {parsedPersons > 1 ? 'We\'ll' : 'I\'ll'}
                {' '}
                be there!
            </Button>
            <p className="text-sm text-muted-foreground">Studio Falkland will use this information for informing you about the studiowarming. All data will be deleted after this use.</p>
        </form>
    );
}