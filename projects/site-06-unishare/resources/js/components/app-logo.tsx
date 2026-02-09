import LightLogo from '../../../public/VectNameWhite.png';
import DarkLogo from '../../../public/VectNameBlack.png';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                {/* Logo visibile in tema chiaro */}
                <img
                    src={LightLogo}
                    alt="Logo chiaro"
                    className="size-8 block dark:hidden"
                />
                {/* Logo visibile in tema scuro */}
                <img
                    src={DarkLogo}
                    alt="Logo scuro"
                    className="size-8 hidden dark:block"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">UniShare</span>
            </div>
        </>
    );
}
