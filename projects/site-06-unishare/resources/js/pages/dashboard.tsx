import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Classroom, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { classrooms } = usePage<{ classrooms: Classroom[] }>().props;

    // Stati per il dialog di modifica
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Funzione per aprire dialog di modifica e pre-popolare i campi
    function openEditDialog(classroom: Classroom) {
        setEditingClassroom(classroom);
        setName(classroom.name);
        setDescription(classroom.description || '');
        setDialogOpen(true);
    }

    // Funzione per salvare modifiche
    function saveChanges() {
        if (!editingClassroom) return;

        router.put(
            `/classrooms/${editingClassroom.id}`,
            {
                name,
                description,
            },
            {
                onSuccess: () => {
                    setDialogOpen(false);
                    setEditingClassroom(null);
                },
            },
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid grid-cols-4 gap-6 p-4">
                {classrooms.map((classroom) => (
                    <div
                        key={classroom.id}
                        className="relative flex flex-col rounded-xl border p-6 shadow-sm transition hover:scale-[1.02] hover:shadow-lg"
                    >
                        <Link href={`/classrooms/${classroom.id}`} className="mb-4">
                            <h2 className="text-xl font-bold">{classroom.name}</h2>
                            {classroom.description && <p className="line-clamp-3 text-sm text-muted-foreground">{classroom.description}</p>}
                        </Link>

                        {classroom.is_admin && (
                            <div className="mt-auto flex justify-end gap-3">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="size-8"
                                    onClick={() => openEditDialog(classroom)}
                                    aria-label="Modifica classroom"
                                >
                                    <Pencil className="size-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="size-8"
                                    onClick={() => {
                                        if (confirm('Sei sicuro di voler eliminare questa classroom?')) {
                                            router.delete(`/classrooms/${classroom.id}`);
                                        }
                                    }}
                                    aria-label="Elimina classroom"
                                >
                                    <Trash className="size-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Dialog di modifica classroom */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifica Classroom</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                        <label className="flex flex-col">
                            Nome
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="flex flex-col">
                            Descrizione
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                        </label>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Annulla
                        </Button>
                        <Button onClick={saveChanges}>Salva</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
