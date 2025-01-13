import { router } from '@inertiajs/react';
import { AxiosError } from 'axios';
import { shake } from 'radash';
import { useCallback, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

interface Data {
    name: string;
    persons?: number;
    email?: string;
}

export default function RSVP() {
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<Data>();
    const persons = watch('persons', 0);

    const onSubmit = useCallback(async (data: Data) => {
        const values = shake(data, (v) => !v);
        try {
            const result = await window.axios.post('/rsvp', values);
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                setError('root', { message: e.response?.data.message });
                Object.keys(e.response?.data.errors).forEach((formKey) => {
                    e.response?.data.errors[formKey].forEach((message) => {
                        setError(formKey, { message });
                    });
                })
            }
        }
    }, []);

    console.log(errors);

    return (
        <div className="max-w-[400px] p-8 mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <label className="flex flex-col">
                    <span>Name</span>
                    <input type="text" {...register('name')} />
                    {errors.name && (
                        <span>{errors.name.message}</span>
                    )}
                </label>
                <label className="flex flex-col">
                    <span>№ of persons</span>
                    <input type="number" {...register('persons')} placeholder="1" />
                </label>
                <label className="flex flex-col">
                    <span>Email (if you'd like to receive updates)</span>
                    <input type="text" {...register('email')} />
                </label>
                <button type="submit">
                    {(persons || 0) > 1 ? 'We\'ll' : 'I\'ll'}
                    {' '}
                    be there!
                </button>
            </form>
        </div>
    )
}