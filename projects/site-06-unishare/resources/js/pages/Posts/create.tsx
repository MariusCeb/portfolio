import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Classroom, User } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ChevronLeftIcon } from 'lucide-react';
import { FormEvent } from 'react';

export default function Create({ classroom }: { classroom: Classroom }) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const isAdmin = auth.user.isAdmin;

    const { data: priceData, setData: setPriceData, post: postPrice, processing: processingPrice, errors: priceErrors } = useForm({
        title: '',
        content: '',
        price: '',
    });

    const { data: fileData, setData: setFileData, post: postFile, processing: processingFile, errors: fileErrors } = useForm<{
        title: string;
        content: string;
        file: File | null;
    }>({
        title: '',
        content: '',
        file: null,
    });

    const handleSubmitPrice = (e: FormEvent) => {
        e.preventDefault();
        postPrice(route('classrooms.posts.store', classroom.id));
    };

    const handleSubmitFile = (e: FormEvent) => {
        e.preventDefault();

        postFile(route('classrooms.posts.store', classroom.id), {
            forceFormData: true,
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-xl space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Crea nuovo annuncio</h1>
                    <Link href={route('classrooms.show', classroom.id)}>
                        <Button variant="secondary" size="icon" className="size-9">
                            <ChevronLeftIcon />
                        </Button>
                    </Link>
                </div>

                <Tabs defaultValue={isAdmin ? 'price' : 'file'} className="w-full">
                    <TabsList className="w-full">
                        {isAdmin ? (
                            <TabsTrigger value="price" className="w-full">
                                Post con Prezzo
                            </TabsTrigger>
                        ) : null}
                        <TabsTrigger value="file" className="w-full">Post con File</TabsTrigger>
                    </TabsList>

                    {isAdmin ? (
                        <TabsContent value="price">
                            <form onSubmit={handleSubmitPrice} className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="title">Titolo</Label>
                                    <Input id="title" value={priceData.title} onChange={(e) => setPriceData('title', e.target.value)} />
                                    {priceErrors.title && <p className="text-red-500">{priceErrors.title}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="content">Contenuto</Label>
                                    <Textarea id="content" value={priceData.content} onChange={(e) => setPriceData('content', e.target.value)} />
                                    {priceErrors.content && <p className="text-red-500">{priceErrors.content}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="price">Prezzo (€)</Label>
                                    <Input id="price" type="number" className="no-spin" value={priceData.price} onChange={(e) => setPriceData('price', e.target.value)} />
                                    {priceErrors.price && <p className="text-red-500">{priceErrors.price}</p>}
                                </div>
                                <Button type="submit" disabled={processingPrice}>
                                    Crea Offerta di Ripetizioni
                                </Button>
                            </form>
                        </TabsContent>
                    ) : null}

                    {/* Form con file (tutti) */}
                    <TabsContent value="file">
                        <form onSubmit={handleSubmitFile} className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="title-file">Titolo</Label>
                                <Input id="title-file" value={fileData.title} onChange={(e) => setFileData('title', e.target.value)} />
                                {fileErrors.title && <p className="text-red-500">{fileErrors.title}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="content-file">Contenuto</Label>
                                <Textarea id="content-file" value={fileData.content} onChange={(e) => setFileData('content', e.target.value)} />
                                {fileErrors.content && <p className="text-red-500">{fileErrors.content}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="file">Allega un file</Label>
                                <Input id="file" type="file" onChange={(e) => setFileData('file', e.target.files?.[0] || null)} />
                                {fileErrors.file && <p className="text-red-500">{fileErrors.file}</p>}
                            </div>
                            <Button type="submit" disabled={processingFile}>
                                Crea Post
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
