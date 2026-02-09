import { Button } from '@/components/ui/button';
import { Post } from '@/types';
import { Pencil, Trash } from 'lucide-react';

const PostCard = ({
    post,
    onEdit,
    onDelete,
    onView,
    setDialogOpen,
    isAdmin,
}: {
    post: Post;
    onEdit: (p: Post) => void;
    onDelete: (id: number) => void;
    onView: (p: Post) => void;
    setDialogOpen: (b: boolean) => void;
    isAdmin: boolean;
}) => (
    <div className="relative flex flex-col rounded-lg border bg-white p-5 shadow-sm transition hover:shadow">
        <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>

        {post.price !== null && <p className="mb-2 text-sm text-gray-700">Prezzo: €{post.price}</p>}

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{post.content}</p>

        <div className="mt-auto flex items-center justify-between">
            <span
                className="cursor-pointer text-sm text-blue-600 hover:underline"
                onClick={() => {
                    onView(post);
                    setDialogOpen(true);
                }}
            >
                Dettagli
            </span>

            {isAdmin && (
                <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="size-8" onClick={() => onEdit(post)}>
                        <Pencil className="size-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="size-8" onClick={() => onDelete(post.id)}>
                        <Trash className="size-4" />
                    </Button>
                </div>
            )}
        </div>
    </div>
);

export default PostCard;
