export default function AppearanceToggleButton() {
    const toggleDark = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <button onClick={toggleDark} className="rounded bg-neutral-200 px-4 py-2 dark:bg-neutral-800">
            Cambia Tema
        </button>
    );
}
