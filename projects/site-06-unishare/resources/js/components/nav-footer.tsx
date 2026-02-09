import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { User } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState, type ComponentPropsWithoutRef } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function NavFooter({ className, ...props }: ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const isAdmin = auth?.user?.isAdmin;

    const [open, setOpen] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('classrooms.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(route('classrooms.join'), { join_code: joinCode }, {
            onSuccess: () => {
                setOpen(false);
                setJoinCode('');
            },
            onError: (errors) => {
                // opzionale: gestisci gli errori se necessario
                console.error(errors);
            },
        });
    };


    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu className="flex flex-col gap-3">
                    <SidebarMenuItem>
                        <Badge variant={isAdmin ? 'default' : 'secondary'} className="ml-auto">
                            {isAdmin ? 'Admin' : 'User'}
                        </Badge>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <PlusIcon className="h-4 w-4" />
                                    Nuova Classroom
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{isAdmin ? 'Gestione Classroom' : 'Unisciti a una Classroom'}</DialogTitle>
                                    <DialogDescription>
                                        {isAdmin
                                            ? 'Crea una nuova classroom oppure entra con un codice'
                                            : 'Inserisci il codice per entrare in una classroom'}
                                    </DialogDescription>
                                </DialogHeader>

                                {isAdmin ? (
                                    <Tabs defaultValue="create" className="mt-4">
                                        <TabsList className="mb-4">
                                            <TabsTrigger value="create">Crea</TabsTrigger>
                                            <TabsTrigger value="join">Entra</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="create">
                                            <form onSubmit={handleCreate} className="space-y-4">
                                                <Input
                                                    placeholder="Nome Classroom"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    required
                                                />
                                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                                <Textarea
                                                    placeholder="Descrizione (opzionale)"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                />
                                                <DialogFooter>
                                                    <Button type="submit">Crea</Button>
                                                </DialogFooter>
                                            </form>
                                        </TabsContent>

                                        <TabsContent value="join">
                                            <form onSubmit={handleJoin} className="space-y-4">
                                                <Input
                                                    placeholder="Codice Classroom"
                                                    value={joinCode}
                                                    onChange={(e) => setJoinCode(e.target.value)}
                                                    required
                                                />
                                                <DialogFooter>
                                                    <Button type="submit">Entra</Button>
                                                </DialogFooter>
                                            </form>
                                        </TabsContent>
                                    </Tabs>
                                ) : (
                                    <form onSubmit={handleJoin} className="space-y-4 mt-4">
                                        <Input
                                            placeholder="Codice Classroom"
                                            value={joinCode}
                                            onChange={(e) => setJoinCode(e.target.value)}
                                            required
                                        />
                                        <DialogFooter>
                                            <Button type="submit">Entra</Button>
                                        </DialogFooter>
                                    </form>
                                )}
                            </DialogContent>
                        </Dialog>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
