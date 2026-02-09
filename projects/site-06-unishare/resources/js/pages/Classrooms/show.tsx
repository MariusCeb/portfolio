import PostCard from '@/components/postCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Classroom, Post } from '@/types';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { FolderOpen } from 'lucide-react';
import { useMemo, useState } from 'react';

const ClassroomPage = ({ posts = [] }: { posts?: Post[] }) => {
    const { classroom } = usePage<{ classroom: Classroom }>().props;

    const [localPosts, setLocalPosts] = useState(posts || []);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState<'newest' | 'oldest' | 'lowest' | 'highest'>('newest');
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const {
        data: editData,
        setData: setEditData,
        put,
        processing: editProcessing,
        reset,
        errors: editErrors,
    } = useForm({
        title: '',
        content: '',
        price: '',
        file: null as File | null,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: classroom.name, href: `/classrooms/${classroom.id}` },
    ];

    const openEditDialog = (post: Post) => {
        setEditingPost(post);
        setEditData({
            title: post.title ?? '',
            content: post.content ?? '',
            price: post.price !== null && post.price !== undefined ? String(post.price) : '',
            file: null,
        });
    };

    const clearDialog = () => {
        setEditingPost(null);
        reset();
        window.location.reload();
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPost) return;

        if (editingPost.price !== null) {
            // post con prezzo
            put(route('posts.update', editingPost.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setLocalPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, ...editData, price: editData.price } : p)));
                    clearDialog();
                },
            });
        } else {
            // post con file, gratuito
            const form = new FormData();
            form.append('_method', 'PUT');
            form.append('title', editData.title);
            form.append('content', editData.content ?? '');
            form.append('price', ''); // forza a stringa vuota se esiste
            if (editData.file) form.append('file', editData.file);

            router.post(route('posts.update', editingPost.id), form, {
                preserveScroll: true,
                onSuccess: () => {
                    setLocalPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, ...editData, price: null } : p)));
                    clearDialog();
                },
            });
        }
    };

    const handleDelete = (postId: number) => {
        if (!confirm('Sei sicuro di voler eliminare questo post?')) return;

        router.delete(route('posts.destroy', postId), {
            onSuccess: () => {
                setLocalPosts((prev) => prev.filter((post) => post.id !== postId));
            },
            preserveScroll: true,
        });
    };

    const sortedPosts = useMemo(() => {
        return [...localPosts].sort((a, b) => {
            switch (sortOption) {
                case 'newest':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'oldest':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case 'lowest':
                    return Number(a.price || 0) - Number(b.price || 0);
                case 'highest':
                    return Number(b.price || 0) - Number(a.price || 0);
                default:
                    return 0;
            }
        });
    }, [localPosts, sortOption]);

    const filteredPosts = useMemo(() => {
        const searchLower = searchQuery.toLowerCase();
        return sortedPosts.filter(
            (post) => post.title.toLowerCase().includes(searchLower) || (post.content ?? '').toLowerCase().includes(searchLower),
        );
    }, [sortedPosts, searchQuery]);

    const pricedPosts = filteredPosts.filter((post) => post.price !== null);
    const freePosts = filteredPosts.filter((post) => post.price === null);

    console.log('isAdmin', classroom.is_admin);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold">{classroom.name}</h1>
                        <p className="text-gray-600">Codice classroom: {classroom.join_code}</p>
                    </div>
                    <Link href={route('classrooms.posts.create', classroom.id)}>
                        <Button className="w-full md:w-auto">Crea nuovo post</Button>
                    </Link>
                </div>

                {/* Search & Sort */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <Input
                        placeholder="Cerca tra i post..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-64"
                    />
                    <Select value={sortOption} onValueChange={(v) => setSortOption(v as 'newest' | 'oldest' | 'lowest' | 'highest')}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Ordina per" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Più recenti</SelectItem>
                            <SelectItem value="oldest">Più vecchi</SelectItem>
                            <SelectItem value="lowest">Prezzo crescente</SelectItem>
                            <SelectItem value="highest">Prezzo decrescente</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <h2 className="mb-4 text-2xl font-semibold">Annunci a Pagamento</h2>
                {/* Section: Annunci con Prezzo */}
                {pricedPosts.length > 0 ? (
                    <div className="mb-12">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {pricedPosts.map((post) => (
                                <PostCard
                                    isAdmin={classroom.is_admin}
                                    key={post.id}
                                    post={post}
                                    onEdit={openEditDialog}
                                    onDelete={handleDelete}
                                    onView={setSelectedPost}
                                    setDialogOpen={setDialogOpen}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border bg-gray-50 py-12 text-center">
                        <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Nessun post trovato</h3>
                        <p className="mt-1 text-gray-500">Crea il primo post per questa classroom</p>
                    </div>
                )}
                <h2 className="mb-4 mt-2 text-2xl font-semibold">Materiale Condiviso</h2>
                {/* Section: Materiale Condiviso */}
                {freePosts.length > 0 ? (
                    <div className="mb-12">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {freePosts.map((post) => (
                                <PostCard
                                    isAdmin={classroom.is_admin}
                                    key={post.id}
                                    post={post}
                                    onEdit={openEditDialog}
                                    onDelete={handleDelete}
                                    onView={setSelectedPost}
                                    setDialogOpen={setDialogOpen}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border bg-gray-50 py-12 text-center">
                        <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Nessun post trovato</h3>
                        <p className="mt-1 text-gray-500">Crea il primo post per questa classroom</p>
                    </div>
                )}

                {/* Dialog Dettagli */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        {selectedPost && (
                            <>
                                <DialogHeader>
                                    <DialogTitle>{selectedPost.title}</DialogTitle>
                                    <DialogDescription>Annuncio #{selectedPost.id}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-2 py-2">
                                    <p>
                                        <strong>Descrizione:</strong> {selectedPost.content}
                                    </p>
                                    {selectedPost.price !== null ? (
                                        <p>
                                            <strong>Prezzo:</strong> €{selectedPost.price}
                                        </p>
                                    ) : (
                                        selectedPost.file_path && (
                                            <p>
                                                <strong>File:</strong>{' '}
                                                <a
                                                    href={`/storage/${selectedPost.file_path}`}
                                                    download
                                                    className="text-blue-600 underline hover:text-blue-800"
                                                >
                                                    Scarica allegato
                                                </a>
                                            </p>
                                        )
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button onClick={() => setDialogOpen(false)}>Chiudi</Button>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Dialog Modifica */}
                <Dialog open={!!editingPost} onOpenChange={(open) => !open && clearDialog()}>
                    <DialogContent>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Modifica Post</DialogTitle>
                            </DialogHeader>

                            <div>
                                <Label htmlFor="title">Titolo</Label>
                                <Input id="title" value={editData.title} onChange={(e) => setEditData('title', e.target.value)} />
                                {editErrors.title && <p className="text-sm text-red-500">{editErrors.title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="content">Contenuto</Label>
                                <Textarea id="content" value={editData.content} onChange={(e) => setEditData('content', e.target.value)} />
                                {editErrors.content && <p className="text-sm text-red-500">{editErrors.content}</p>}
                            </div>

                            {editingPost?.price !== null ? (
                                <div>
                                    <Label htmlFor="price">Prezzo</Label>
                                    <Input id="price" type="number" value={editData.price} onChange={(e) => setEditData('price', e.target.value)} />
                                    {editErrors.price && <p className="text-sm text-red-500">{editErrors.price}</p>}
                                </div>
                            ) : (
                                <div>
                                    <Label htmlFor="file">File</Label>
                                    <Input id="file" type="file" onChange={(e) => setEditData('file', e.target.files?.[0] || null)} />
                                    {editErrors.file && <p className="text-sm text-red-500">{editErrors.file}</p>}
                                </div>
                            )}

                            <DialogFooter>
                                <Button type="submit" disabled={editProcessing}>
                                    Salva
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default ClassroomPage;
