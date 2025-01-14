import RSVPForm from '@/Components/RSVPForm';
import { Accordion } from '@/Components/ui/accordion';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Form } from '@/Components/ui/form';
import { Response, RSVPProps } from '@/lib/types';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function RSVP({ response }: RSVPProps) {
    const form = useForm<Response>({ defaultValues: response || undefined });
    const [showPreviousResponse, setShowPreviousResponse] = useState(response ? true : false);
    const { formState: { isSubmitSuccessful }, reset, setValue } = form;

    const handleNew = useCallback(() => {
        reset({ name: undefined, persons: undefined, email: undefined });
        setShowPreviousResponse(false);
    }, []);

    const handlePrevious = useCallback(() => {
        setValue('update', true);
        setShowPreviousResponse(false);
    }, []);

    return (
        <div className="md:columns-2 gap-0 h-screen dark">
            <div className="md:h-full overflow-y-auto bg-background p-8 md:p-16 flex-col flex gap-4 text-white leading-relaxed">
                <h2 className="text-2xl font-bold text-white">Studiowarming</h2>
                <p>We've been working on a place where we can collaborate, work and most importantly have some fun. We'd love to show you what we've made.</p>
                <p>We're warmly welcoming you to join our studiowarming on <b>February 14th</b> from <b>19:00</b> onwards. We'll provide beer, snacks and entertainment.</p>
                <p>Find us at <b>Torenallee 32-06</b> in <b>Eindhoven</b>. We're located in the Apparatenfabriek, 5th floor. </p>
                <p>RSVP on the <span className="md:inline hidden">right</span><span className="inline md:hidden">bottom</span> so we can take your attendance into account.</p>
                <p>We hope to see you soon!</p>
                <div className="flex gap-4">
                    <p>
                        Lei<br />
                        <a className="underline opacity-60 text-sm" href="https://falkland.studio" target="_blank">
                            Studio Falkland
                        </a>
                    </p><p>
                        Marijn<br />
                        <a className="underline opacity-60 text-sm" href="https://theimaginationstation.nl" target="_blank">
                            The Imagination Station
                        </a>
                    </p><p>
                        Ilse<br />
                        <a className="underline opacity-60 text-sm" href="https://ilsepouwels.nl" target="_blank">
                            Ilse Pouwels
                        </a>
                    </p><p>
                        Jesus<br />
                        <a className="underline opacity-60 text-sm" href="https://ecoforma.design" target="_blank">
                            Ecoforma
                        </a>
                    </p>
                </div>
                <Accordion type="multiple">
                    <AccordionItem value="getting-there">
                        <AccordionTrigger>How can we get there?</AccordionTrigger>
                        <AccordionContent>
                            <p className="mb-4">We're located in Apparatenfabriek,  Strijp-S, Eindhoven (on Google Maps, find <a  className="underline" target="_blank" href="https://maps.app.goo.gl/L9GWVbch6ki72vY38">Seats2Meet Eindhoven Strijp-S</a>). The front door is closed at night. <a href="tel:+31642030098" className="underline">Call Lei</a> to get someone to open the door for you. </p>
                            <h3 className="font-semibold mb-2">By car</h3>
                            <p className="mb-4">Find <a className="underline" href="https://maps.app.goo.gl/WKsRFCsNTNgp7LoY8" target="_blank">"Parkeergarage Om de Hoek"</a> and navigate there. Please note that parking is paid. When exiting the garage, move towards the bus stop. Walk between the two left-most buildings, and find the entrance labeled "Apparatenfabriek".</p>
                            <h3 className="font-semibold mb-2">By public transport</h3>
                            <p>Navigate to <a className="underline" href="https://maps.app.goo.gl/gTG5vFtZvR1Y78pHA" target="_blank">"bus stop Eindhoven, Strijp S"</a>. Once exited at the bus stop, turn left. Cross the alleyway between the two large buildings. Once crossed, turn left again and find the entrance labeled "Apparatenfabriek".</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="gifts">
                        <AccordionTrigger>Is there anything we can get you?</AccordionTrigger>
                        <AccordionContent>Plants! 🪴 We'd love some plants to decorate the office! If you're able to, we encourage you to pool together for bigger plants.</AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="text-muted-foreground flex gap-6 justify-between">
                    <p>Website hosted in EU 🇪🇺</p>
                    <p><a className="underline" href="https://github.com/studio-falkland/officewarming-rsvp" target="_blank">Open Source</a></p>
                </div>
            </div>
            <div className="h-full p-8 flex items-center justify-center relative">
                <img src="/office-bg.webp" className="absolute inset-0 -z-0 object-cover w-full h-full bg-blue-50 pointer-events-none" />
                <div className="max-w-[480px] z-10">
                    <Form {...form}>
                        {showPreviousResponse ? (
                            <Card className="text-center">
                                <CardHeader>
                                    <CardTitle>✅</CardTitle>
                                    <CardTitle>You've already RSVP'ed</CardTitle>
                                    <CardDescription>Thanks for that! In case you need to, you can either edit your previous response, or create a new one.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-2">
                                        <Button variant="outline" onClick={handlePrevious}>
                                            Edit previous RSVP
                                        </Button>
                                        <Button variant="outline" onClick={handleNew}>
                                            Create new RSVP
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            isSubmitSuccessful ? (
                                <Card>
                                    <CardHeader className="text-center">
                                        <CardTitle>✅</CardTitle>
                                        <CardTitle>Thanks for responding!</CardTitle>
                                        <CardDescription>We look forward to seeing you on February 14th.</CardDescription>
                                    </CardHeader>
                                </Card>
                            ) : (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Répondez, s'il vous plaît</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <RSVPForm />
                                    </CardContent>
                                </Card>
                            )
                        )}
                    </Form>
                </div>
            </div>
        </div>
    )
}