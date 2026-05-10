import { ChevronsUpDown, Command, LogOut, SearchIcon } from "lucide-react";
import { cn } from "../../../utils/cn";
import { useSidebar } from "../../../context/SidebarContext/useSidebar";

export const Sidebar = ({ children }) => {
  const { isMobile, isCollapsed, toggle } = useSidebar();

  return (
    <>
      {isMobile && <Overlay isCollapsed={isCollapsed} toggle={toggle} />}
      <aside
        className={cn(
          "h-full overflow-hidden bg-stone-100",
          "transition-all duration-200 ease-in-out",

          isMobile
            ? [
                "fixed top-0 left-0 z-50 w-60",
                !isCollapsed ? "translate-x-0 px-2" : "-translate-x-full",
              ]
            : ["relative", isCollapsed ? "w-0" : "w-64 px-2"],
        )}
      >
        {children}
      </aside>
    </>
  );
};

export function SidebarHeader({ children }) {
  return <div className="py-2 h-16">{children}</div>;
}

export function SidebarContent({ children }) {
  return (
    <div className="py-2 overflow-y-auto h-[calc(100vh-64px-48px-16px)] scrollbar-thin flex flex-col gap-4">
      {children}
    </div>
  );
}

export function SidebarGroup({ children }) {
  return <div>{children}</div>;
}

export function SidebarFooter({ children }) {
  return (
    <div className="h-12 border-t border-stone-300 px-2 flex items-center text-xs">
      {children}
    </div>
  );
}

function Overlay({ toggle, isCollapsed }) {
  return (
    <div
      onClick={toggle}
      className={cn(
        "fixed inset-0 z-40 bg-white/10 backdrop-blur-sm transition-opacity",
        !isCollapsed ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    />
  );
}

export function Account({ imgSrc, name, email }) {
  return (
    <div className="border-b border-stone-300 pb-2">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <div className="size-8 rounded strink-0 flex items-center justify-center text-white shrink-0 shadow">
          <img className="w-full h-full object-contain" src={imgSrc} alt="" />
        </div>
        <div className="text-start">
          <span className="text-sm font-medium block">{name}</span>
          <span className="text-xs block text-stone-500">{email}</span>
        </div>
        <ChevronsUpDown className="size-4" />
      </button>
    </div>
  );
}

export function Search() {
  return (
    <div className="bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm">
      <SearchIcon className="size-4 mr-2" />
      <input
        className="w-full bg-transparent placeholder:text-stone-400 focus:outline-0"
        type="text"
        placeholder="Search..."
      />
      <span className="flex items-center p-1 text-xs gap-0.5 shadow bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2">
        <Command className="size-3.5" /> K
      </span>
    </div>
  );
}

export function Routes({ icon: Icon, title }) {
  return (
    <div className="space-y-1">
      <Route icon={Icon} title={title} />
    </div>
  );
}

function Route({ icon: Icon, title }) {
  return (
    <button
      className={cn(
        "flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm hover:bg-stone-200",
      )}
    >
      <Icon className="size-4" />
      <span>{title}</span>
    </button>
  );
}

export function Logout() {
  return (
    <div className="w-full">
      <button className="px-2 py-1.5 font-medium w-full bg-red-200 hover:bg-red-300 transition-colors rounded flex items-center gap-2">
        <LogOut className="size-4" /> Logout
      </button>
    </div>
  );
}
