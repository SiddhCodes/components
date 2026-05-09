import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../../../assets/react.svg";
import { cn } from "../../../utils/cn";
import { Container } from "../../Container";
import { useState } from "react";

export const DropdownNavbar = () => {
  const menus = [
    {
      name: "Product",
      subMenu: [
        {
          name: "Agents",
        },
        {
          name: "Code Review",
        },
        {
          name: "Cloud",
        },
        {
          name: "Tab",
        },
        {
          name: "CLI",
        },
        {
          name: "Marketplace",
        },
      ],
    },

    {
      name: "Enterprise",
      path: "/enterprise",
    },

    {
      name: "Pricing",
      path: "/pricing",
    },

    {
      name: "Resources",
      subMenu: [
        {
          name: "Changelog",
        },
        {
          name: "Blog",
        },
        {
          name: "Docs",
        },
        {
          name: "Community",
        },
        {
          name: "Help",
        },
        {
          name: "Workshops",
        },
        {
          name: "Forum",
        },
        {
          name: "Careers",
        },
      ],
      gridCols: 2,
    },
  ];

  return (
    <header className={cn("h-12 fixed inset-0 bg-[#F7F7F4]")}>
      <Container>
        <nav className={cn("flex justify-between w-full py-2 px-4")}>
          <div className="flex items-center gap-2 z-50">
            <img src={logo} alt="" />
            <h3>React</h3>
          </div>
          <ul className="hidden lg:flex items-center gap-2">
            {menus.map((menu, index) => (
              <DesktopMenu key={index} menu={menu} />
            ))}
          </ul>
          <div className="flex items-center gap-x-5">
            <button className="cursor-pointer px-2 py-0.5 md:px-4 md:py-1  bg-zinc-900 hover:bg-zinc-900/96 text-[#F7F7F4] rounded-md">
              Download
            </button>
            <div className="lg:hidden">
              <MobileMenu menu={menus} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

function DesktopMenu({ menu }) {
  const { name } = menu;
  const hasSubMenu = menu.subMenu?.length > 0;
  return (
    <li className="group/link">
      <span className="flex items-center gap-1 cursor-pointer hover:text-[#787671] py-1 px-2 rounded-sm">
        {name}
        {hasSubMenu && (
          <ChevronDown className="h-5 w-5 group-hover/link:rotate-180 transition-all duration-200" />
        )}
      </span>
      {hasSubMenu && (
        <div
          className={cn(
            "absolute top-12 z-50 rounded-sm bg-[#F2F1ED] px-2 py-1 shadow",
            "transition-all duration-200 ease-out",
            "opacity-0 invisible group-hover/link:opacity-100 group-hover/link:visible",
          )}
        >
          <div
            className={cn(
              "grid gap-x-4 gap-y-2",
              menu.gridCols === 3
                ? "grid-cols-3"
                : menu.gridCols === 2
                  ? "grid-cols-2"
                  : "grid-cols-1",
            )}
          >
            {menu.subMenu.map((subMenu, i) => (
              <span key={i} className="hover:text-[#787671] cursor-pointer">
                {subMenu.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

function MobileMenu({ menu }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="flex cursor-pointer z-50 relative"
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      <div
        className={cn(
          "fixed top-12 right-0 h-screen bg-[#F2F1ED] p-4",
          "overflow-hidden transition-all duration-200 ease-in-out",
          isOpen ? "w-full opacity-100" : "w-0 opacity-0",
        )}
      >
        <ul>
          {menu.map(({ name, subMenu }, i) => {
            const hasSubMenu = subMenu?.length > 0;

            const isClicked = clicked === i;

            return (
              <li key={name}>
                <span
                  onClick={() => setClicked(isClicked ? null : i)}
                  className="flex items-center cursor-pointer justify-between gap-1 py-4 hover:text-[#787671]"
                >
                  {name}
                  {hasSubMenu && (
                    <ChevronDown
                      className={cn(
                        "ml-auto transition-all duration-200",
                        isClicked && "rotate-180",
                      )}
                    />
                  )}
                </span>
                {hasSubMenu && (
                  <ul
                    className={cn(
                      "grid transition-all duration-300",
                      isClicked
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      {subMenu.map(({ name }) => (
                        <li
                          key={name}
                          className="hover:text-[#787671] cursor-pointer flex gap-5 p-2"
                        >
                          <span>{name}</span>
                        </li>
                      ))}
                    </div>
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
